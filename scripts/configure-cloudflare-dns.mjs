const API = 'https://api.cloudflare.com/client/v4';
const zoneName = process.env.CLOUDFLARE_ZONE_NAME ?? 'zydhan.com';
const pagesHost = process.env.PAGES_HOST ?? 'zydhanlinnar11.github.io';
const token = process.env.CLOUDFLARE_API_TOKEN;
const apply = process.env.APPLY === 'true';

const IPV4 = ['185.199.108.153', '185.199.109.153', '185.199.110.153', '185.199.111.153'];
const IPV6 = [
	'2606:50c0:8000::153',
	'2606:50c0:8001::153',
	'2606:50c0:8002::153',
	'2606:50c0:8003::153'
];

if (!token || token.startsWith('REPLACE')) {
	console.error(
		'CLOUDFLARE_API_TOKEN is missing or still a placeholder. ' +
			'Set the GitHub Actions secret to a Cloudflare token with Zone:Read and DNS:Edit.'
	);
	process.exit(1);
}

async function cloudflare(path, init = {}) {
	const response = await fetch(`${API}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			...init.headers
		}
	});
	const body = await response.json().catch(() => null);

	if (!response.ok || !body?.success) {
		const detail = JSON.stringify(body?.errors ?? body ?? {});
		throw new Error(`${init.method ?? 'GET'} ${path} failed (${response.status}): ${detail}`);
	}

	return body;
}

const zones = await cloudflare(`/zones?name=${encodeURIComponent(zoneName)}`);
const zone = zones.result?.[0];
if (!zone) throw new Error(`Cloudflare zone not found: ${zoneName}`);

const records = [];
for (let page = 1; ; page += 1) {
	const data = await cloudflare(`/zones/${zone.id}/dns_records?per_page=100&page=${page}`);
	records.push(...data.result);
	if (page >= (data.result_info?.total_pages ?? 1)) break;
}

const desired = [
	...IPV4.map((content) => ({ type: 'A', name: zoneName, content, proxied: false, ttl: 1 })),
	...IPV6.map((content) => ({ type: 'AAAA', name: zoneName, content, proxied: false, ttl: 1 })),
	{
		type: 'CNAME',
		name: `www.${zoneName}`,
		content: pagesHost,
		proxied: false,
		ttl: 1
	}
];

const managedNames = new Set([zoneName, `www.${zoneName}`]);
const managedTypes = new Set(['A', 'AAAA', 'CNAME']);
const existing = records.filter(
	(record) => managedNames.has(record.name) && managedTypes.has(record.type)
);

const matches = (record, target) =>
	record.type === target.type && record.name === target.name && record.content === target.content;

const toDelete = existing.filter((record) => !desired.some((target) => matches(record, target)));
const toCreate = desired.filter((target) => !existing.some((record) => matches(record, target)));
const toUpdate = desired
	.map((target) => {
		const record = existing.find((candidate) => matches(candidate, target));
		if (!record || record.proxied === target.proxied) return null;
		return { record, target };
	})
	.filter(Boolean);

console.log(`Zone: ${zoneName} (${zone.id})`);
console.log(`Mode: ${apply ? 'APPLY' : 'DRY RUN'}`);
console.log('');

if (toDelete.length === 0 && toCreate.length === 0 && toUpdate.length === 0) {
	console.log('DNS already matches the GitHub Pages configuration.');
	process.exit(0);
}

for (const record of toDelete) {
	console.log(`delete ${record.type} ${record.name} -> ${record.content}`);
}
for (const target of toCreate) {
	console.log(`create ${target.type} ${target.name} -> ${target.content} (DNS only)`);
}
for (const { record, target } of toUpdate) {
	console.log(`update ${record.type} ${record.name} -> ${target.content} (DNS only)`);
}

if (!apply) {
	console.log('');
	console.log('Dry run only. Re-run with APPLY=true to change Cloudflare.');
	process.exit(0);
}

for (const record of toDelete) {
	await cloudflare(`/zones/${zone.id}/dns_records/${record.id}`, { method: 'DELETE' });
}

for (const target of toCreate) {
	await cloudflare(`/zones/${zone.id}/dns_records`, {
		method: 'POST',
		body: JSON.stringify(target)
	});
}

for (const { record, target } of toUpdate) {
	await cloudflare(`/zones/${zone.id}/dns_records/${record.id}`, {
		method: 'PATCH',
		body: JSON.stringify({ proxied: target.proxied, ttl: target.ttl })
	});
}

console.log('');
console.log('Cloudflare DNS updated. Allow a few minutes for propagation.');
