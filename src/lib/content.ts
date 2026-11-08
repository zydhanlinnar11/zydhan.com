import { links } from './links';

export type Lang = 'id';
export interface Stat { value: string; label: string; labelShort: string; accent?: boolean; }
export interface Role { id: string; title: string; org: string; location: string; period: string; current?: boolean; summary?: string; bullets: string[]; pdfBullets?: string[]; pdfOrg?: string; chips: string[]; }
export interface PdfContent { headline: string; summary: string; projects: { text: string; href?: string }[]; }
export interface SkillGroup { name: string; items: string[]; }
export interface Education { school: string; detail: string; period: string; }
export interface Writing { title: string; meta: string; href: string; cta: string; onCv?: boolean; }
export interface FeaturedProject { date: string; dateShort: string; title: string; description: string; descriptionShort: string; chips: string[]; href: string; }
export interface Content {
	hero: { title: string; body: string; ctaPrimary: string; ctaSecondary: string };
	freelance: { title: string; body: string; bodyShort: string };
	stats: Stat[];
	featuredProjects: FeaturedProject[];
	roles: Role[];
	skills: SkillGroup[];
	education: Education;
	writings: Writing[];
	summary: string;
	pdf: PdfContent;
	tagline: string;
	experienceNote: string;
	name: string;
	contact: { title: string; body: string; bodyShort: string; ctaEmail: string; ctaLinkedIn: string };
	footer: { copyright: string; github: string; linkedin: string };
	sectionTitles: { recentRoles: string; allRoles: string; featured: string; writings: string; summary: string; experience: string; skills: string; education: string };
}

export const content: Record<Lang, Content> = {
	id: {
		hero: {
			title: 'Aku memimpin tim developer dan mendampingi klien sampai sistemnya dipakai.',
			body: 'Zydhan Linnar Putra, backend engineer di Surabaya. Aku memimpin 20 developer di ITS dan mendampingi go-live SEVIMA PENA langsung di lokasi klien.',
			ctaPrimary: 'Lihat CV lengkap',
			ctaSecondary: 'Ajak kerja sama'
		},
		freelance: {
			title: 'Menerima proyek freelance',
			body: 'Proyek apa pun boleh dibicarakan. Yang paling sering kukerjakan: backend dan API, modernisasi sistem lama, dan arsitektur untuk beban besar.',
			bodyShort:
				'Proyek apa pun boleh dibicarakan. Paling sering: backend dan API, modernisasi sistem lama, arsitektur beban besar.'
		},
		stats: [
			{
				value: '1 juta+',
				label: 'pengguna pendaftaran UTBK-SNBT',
				labelShort: 'pengguna UTBK-SNBT',
				accent: true
			},
			{
				value: '~US$60 ribu',
				label:
					'penghematan per tahun dari optimasi SSO SNPMB, sekitar Rp1 miliar pada kurs 2024',
				labelShort: 'hemat per tahun, sekitar Rp1 miliar (kurs 2024)'
			},
			{
				value: '140+',
				label: 'aplikasi tetap kompatibel saat migrasi SSO ke Azure AD',
				labelShort: 'aplikasi tetap kompatibel'
			},
			{
				value: '15+',
				label: 'mahasiswa magang dibimbing dalam DDD dan Clean Architecture',
				labelShort: 'magang dibimbing'
			}
		],
		featuredProjects: [
			{
				date: '2026, memimpin arsitektur',
				dateShort: '2026',
				title: 'SEVIMA PENA',
				description:
					'Platform K-12 dari nol sampai launch, terintegrasi dengan CBT, SSO, FinanceCloud, dan Edufin.',
				descriptionShort: 'Platform K-12 dari nol sampai launch.',
				chips: ['Go', 'React'],
				href: '/cv#peran-pena'
			},
			{
				date: '2022 – sekarang, full-stack',
				dateShort: '2022 – sekarang',
				title: 'UTBK-SNBT dan SSO SNPMB',
				description:
					'Registrasi seleksi nasional untuk 1 juta+ pengguna, ditambah SSO yang menghemat sekitar Rp1 miliar per tahun.',
				descriptionShort: 'Registrasi nasional untuk 1 juta+ pengguna.',
				chips: ['Go', 'Firestore', 'Cloud Run'],
				href: '/cv#peran-snpmb'
			},
			{
				date: '2023 – 2025, arsitek',
				dateShort: '2023 – 2025',
				title: 'Sistem Enrollment Mahasiswa ITS',
				description:
					'Menggantikan sistem PHP 5 berumur 17 tahun dengan Go, PostgreSQL, Next.js, dan Kafka.',
				descriptionShort: 'Menggantikan sistem PHP 5 berumur 17 tahun.',
				chips: ['Go', 'PostgreSQL', 'Kafka'],
				href: '/cv#peran-dptsi'
			},
			{
				date: '2023 – 2025, inisiator',
				dateShort: '2023 – 2025',
				title: 'myITS Portal Mobile',
				description:
					'Aplikasi lintas platform untuk mahasiswa, staf, dan dosen, target 30 ribu+ pengguna.',
				descriptionShort: 'Aplikasi lintas platform, target 30 ribu+ pengguna.',
				chips: ['Expo', 'React Native'],
				href: '/cv#peran-dptsi'
			}
		],
		roles: [
			{
				id: 'peran-pena',
				title: 'Software Engineer di SEVIMA PENA',
				org: 'SEVIMA (PT Sentra Vidya Utama)',
				location: 'Surabaya, on-site',
				period: 'Jan 2026 – sekarang',
				current: true,
				summary: 'Memimpin arsitektur dan tim engineering produk K-12',
				bullets: [
					'Memimpin arsitektur inti (Go dan React) dan tim engineering produk K-12, dari setup awal sampai launch untuk ~3.500 siswa dan guru.',
					'Code review, kolaborasi dengan PM dan klien, serta komunikasi infrastruktur dengan OpSec (database, monitoring, server). Menerapkan alur kerja agentic coding untuk menaikkan throughput tim.',
					'Integrasi dengan CBT dan SSO dalam 2 minggu, dukungan on-site saat go-live untuk ~2.000 pengguna awal.',
					'Integrasi dengan platform Sentra Finansial Teknologi (FinanceCloud dan Edufin) untuk pengelolaan keuangan dan agregator pembayaran.',
					'Mengoperasikan tracing, logging, dan performance monitoring dengan Sentry.'
				],
				pdfBullets: [
					'Memimpin arsitektur inti (Go, React) dan tim engineering produk K-12, dari setup awal sampai launch untuk ~3.500 siswa dan guru.',
					'Mengintegrasikan CBT dan SSO dalam 2 minggu dan mendampingi go-live on-site untuk ~2.000 pengguna awal; berkoordinasi dengan PM, klien, dan OpSec soal infrastruktur.',
					'Mengintegrasikan platform FinanceCloud dan Edufin untuk pengelolaan keuangan dan agregator pembayaran; mengoperasikan tracing, logging, dan monitoring dengan Sentry.'
				],
				chips: ['Go', 'React', 'SSO', 'Sentry']
			},
			{
				id: 'peran-sevima',
				title: 'Full-stack Developer di SEVIMA',
				org: 'SEVIMA (PT Sentra Vidya Utama)',
				location: '',
				period: 'Sep 2025 – Jan 2026',
				bullets: [
					'Memimpin migrasi data asinkron pada siAkadCloud (monolit PHP) dengan RabbitMQ.',
					'Mengganti UI/UX alur penilaian di Edlink (Laravel dan Nuxt 2) dengan menjaga kompatibilitas API untuk aplikasi mobile dan PWA.',
					'Menulis dokumentasi setup Edlink untuk mempercepat onboarding.'
				],
				pdfBullets: [
					'Memimpin migrasi data asinkron pada siAkadCloud (monolit PHP) dengan RabbitMQ.',
					'Mengganti UI/UX alur penilaian Edlink (Laravel, Nuxt 2) dengan menjaga kompatibilitas API untuk aplikasi mobile dan PWA; menulis dokumentasi setup untuk mempercepat onboarding.'
				],
				chips: ['Laravel', 'Nuxt', 'RabbitMQ']
			},
			{
				id: 'peran-dptsi',
				title: 'Full-stack Developer di DPTSI ITS',
				org: 'Direktorat Pengembangan Teknologi dan Sistem Informasi',
				pdfOrg: 'DPTSI ITS',
				location: '',
				period: 'Sep 2023 – Agu 2025',
				summary: 'Sistem enrollment mahasiswa, SSO proxy, myITS Portal Mobile',
				bullets: [
					'Membangun Student Enrollment System (Go, PostgreSQL, Next.js, Kafka) yang menggantikan sistem PHP 5 berumur 17 tahun.',
					'Membuat SSO proxy untuk Microsoft Entra ID OIDC dengan dukungan MFA, menjaga kompatibilitas 140+ aplikasi.',
					'Membimbing 15+ mahasiswa magang dalam DDD dan Clean Architecture, memimpin 20 developer, dan membuat framework Go internal bergaya Laravel (18 modul).',
					'Memulai aplikasi myITS Portal Mobile (Expo React Native) untuk 30 ribu+ pengguna.'
				],
				pdfBullets: [
					'Membangun Student Enrollment System (Go, PostgreSQL, Next.js, Kafka) yang menggantikan sistem PHP 5 berumur 17 tahun.',
					'Membuat SSO proxy untuk Microsoft Entra ID OIDC dengan dukungan MFA, menjaga kompatibilitas 140+ aplikasi.',
					'Memimpin 20 developer, membimbing 15+ mahasiswa magang dalam DDD dan Clean Architecture, dan membuat framework Go internal bergaya Laravel (18 modul).',
					'Memulai aplikasi myITS Portal Mobile (Expo React Native) untuk 30 ribu+ pengguna.'
				],
				chips: ['Go', 'Next.js', 'Kafka', 'OIDC', 'React Native']
			},
			{
				id: 'peran-snpmb',
				title: 'Full-stack Engineer di SNPMB',
				org: 'BPPP Kemdiktisaintek, part-time dan berjalan paralel dengan peran lain',
				pdfOrg: 'SNPMB BPPP Kemdiktisaintek',
				location: '',
				period: '2022 – sekarang',
				current: true,
				summary: 'UTBK-SNBT dan SSO nasional, part-time paralel',
				bullets: [
					'Mengoptimalkan SSO berbasis PHP dengan Cloud Run, menghemat sekitar US$60.000 per tahun (sekitar Rp1 miliar pada kurs 2024).',
					'Merancang sistem registrasi UTBK-SNBT (Go, Next.js, Firestore, Google Cloud Storage) yang dipakai 1 juta+ pengguna.',
					'Berkoordinasi dengan 10+ developer untuk integrasi data, dan membangun CI/CD dengan Cloud Build.',
					'Mengoperasikan tracing, logging, dan performance monitoring SSO dan UTBK-SNBT dengan OpenTelemetry.'
				],
				pdfBullets: [
					'Mengoptimalkan SSO berbasis PHP dengan Cloud Run (serverless), menghemat sekitar US$60.000 per tahun (sekitar Rp1 miliar, kurs 2024).',
					'Merancang sistem registrasi UTBK-SNBT (Go, Next.js, Firestore, Cloud Storage) untuk 1 juta+ pengguna; membangun CI/CD dengan Cloud Build.',
					'Berkoordinasi dengan 10+ developer untuk integrasi data; mengoperasikan tracing dan monitoring dengan OpenTelemetry.'
				],
				chips: ['Go', 'Firestore', 'Cloud Run', 'OpenTelemetry']
			},
			{
				id: 'peran-intern',
				title: 'Web Developer Intern di DPTSI ITS',
				org: '',
				location: '',
				period: 'Agu 2021 – Jun 2023',
				summary: 'Laravel dan PHP; riset micro-frontend sebagai skripsi',
				bullets: [],
				chips: []
			}
		],
		skills: [
			{ name: 'Backend', items: ['Go', 'PHP / Laravel', 'Node.js', 'Python', 'OIDC / OAuth2'] },
			{ name: 'Frontend', items: ['React', 'Next.js', 'Vue / Nuxt', 'React Native'] },
			{ name: 'Arsitektur', items: ['DDD', 'CQRS', 'Hexagonal', 'Modular monolith'] },
			{
				name: 'Data, cloud, dan observability',
				items: [
					'PostgreSQL',
					'Firestore',
					'Kafka',
					'RabbitMQ',
					'GCP',
					'Docker',
					'Sentry',
					'OpenTelemetry'
				]
			}
		],
		education: {
			school: 'Institut Teknologi Sepuluh Nopember',
			detail: 'S1 Teknik Informatika, Surabaya',
			period: 'Agu 2019 – Sep 2023'
		},
		writings: [
			{
				title: 'Simple and Easy REST API Implementation with Laravel',
				meta: 'Dev.to',
				href: links.devto,
				cta: 'Baca di Dev.to',
				onCv: true
			},
			{
				title: 'Better way to debug Go code in Visual Studio Code',
				meta: 'LinkedIn · 4.432 tayangan',
				href: links.linkedinDebug,
				cta: 'Baca di LinkedIn',
				onCv: false
			}
		],
		summary:
			'Software engineer dengan fokus back-end (Go, PHP, Node.js) dan arsitektur modern (DDD, CQRS, Hexagonal). Memimpin modernisasi sistem lama ke Go dan Next.js, serta optimasi performa yang menghemat sekitar US$60.000 per tahun (sekitar Rp1 miliar pada kurs 2024). Terbiasa membimbing developer junior, berkolaborasi lintas tim, dan mengoperasikan tracing, logging, serta performance monitoring: Sentry di SEVIMA PENA, OpenTelemetry di SNPMB SSO dan UTBK-SNBT.',
		pdf: {
			headline:
				'Backend-Focused Full-Stack Developer | 5+ Tahun Pengalaman | Arsitek, Modernisasi Sistem, & Mentor',
			summary:
				'Software engineer dengan fokus Back-End Development (Go/PHP/Node.js) dan arsitektur modern (DDD, CQRS, Hexagonal). Berpengalaman memimpin modernisasi sistem lama ke Go dan Next.js serta optimasi performa yang menghemat sekitar US$60.000 per tahun. Terbiasa membimbing developer junior, berkolaborasi lintas tim, dan mengoperasikan tracing, logging, serta performance monitoring (Sentry, OpenTelemetry).',
			projects: [
				{ text: 'Situs portofolio pribadi: https://zydhan.com', href: links.domain },
				{
					text: 'Artikel di Dev.to: "Simple and Easy REST API Implementation with Laravel"',
					href: links.devto
				}
			]
		},
		tagline:
			'Software Engineer di SEVIMA PENA, memimpin arsitektur inti dan tim engineering. Sebelumnya memimpin 20 developer di DPTSI ITS dan membimbing 15+ mahasiswa magang.',
		experienceNote: 'Pengalaman profesional sejak Agustus 2021 (5+ tahun)',
		name: 'Zydhan Linnar Putra',
		contact: {
			title: 'Ada sistem yang perlu dibangun atau dirombak?',
			body:
				'Tulis apa yang ingin dibangun, kapan harus selesai, dan batasannya. Aku balas lewat email atau LinkedIn.',
			bodyShort:
				'Tulis apa yang ingin dibangun dan kapan harus selesai, lewat email atau LinkedIn.',
			ctaEmail: 'Kirim email',
			ctaLinkedIn: 'Hubungi di LinkedIn'
		},
		footer: {
			copyright: '© 2026 Zydhan Linnar Putra',
			github: 'GitHub',
			linkedin: 'LinkedIn'
		},
		sectionTitles: {
			recentRoles: 'Tiga peran terakhir',
			allRoles: 'Lihat semua peran di CV',
			featured: 'Proyek unggulan',
			writings: 'Tulisan',
			summary: 'Ringkasan',
			experience: 'Pengalaman',
			skills: 'Keahlian',
			education: 'Pendidikan'
		}
	}
};

export function getContent(lang: Lang = 'id'): Content {
	return content[lang];
}
