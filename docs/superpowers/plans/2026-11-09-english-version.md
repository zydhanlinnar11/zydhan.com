# zydhan.com versi bahasa Inggris — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Situs dwibahasa: EN di `/` dan `/cv`, ID di `/id` dan `/id/cv`, toggle bahasa di top bar (desktop) dan MobileMenu (mobile), SEO/OpenGraph per bahasa, deploy via push ke `main`.

**Architecture:** Isi `/` dan `/cv` dipindah ke komponen bersama (`HomePage.svelte`, `CVPage.svelte`) yang menerima `lang: Lang`; tiap rute jadi pembungkus tipis. String UI yang hardcoded dikumpulkan ke `ui-copy.ts` per bahasa. Toggle bahasa = navigasi URL (tanpa state) lewat helper `swapLangPath`. Karena `app.html` statis, `html lang` per halaman dibereskan skrip post-build yang meng-rewrite output `build/`.

**Tech Stack:** SvelteKit (Svelte 5, runes) + `adapter-static` (prerender semua), TypeScript, Vitest, Playwright (browser `chromium-headless-shell`), pnpm.

**Spec:** `docs/superpowers/specs/2026-11-09-english-version-design.md` (keputusan & struktur URL); `docs/superpowers/specs/2026-11-01-zydhan-com-rewrite-design.md` untuk konteks anti-tujuan klaim.

## Global Constraints

- EN di `/` dan `/cv`; ID di `/id` dan `/id/cv`. ID anchor (`#ringkasan`, `#peran-pena`, `#peran-snpmb`, dst.) tidak dilokalkan — sama di kedua bahasa.
- Semua halaman prerender statis; tidak ada server, tidak ada `+server.ts`.
- Terjemahan tidak boleh menaikkan gelar/angka. Paritas angka: "1 juta+" → "1 million+", "US$60.000" → "US$60,000", "Rp1 miliar" → "Rp1 billion", "Agu 2021" → "Aug 2021", "5+ tahun" → "5+ years". Dilarang: klaim "tech lead".
- Nama produk/org tidak diterjemahkan: SEVIMA PENA, UTBK-SNBT, SNPMB, DPTSI ITS, myITS, siAkadCloud, Edlink, FinanceCloud, Edufin, Dev.to. Judul artikel di `writings` sudah EN — tidak diubah.
- Angka EN memakai gaya AS ("US$60,000", "4,432 views", "3,500 students").
- Tidak ada halaman bahasa campur, termasuk `aria-label`. `404.html` jadi EN penuh (satu file statis, tidak bisa per-bahasa di GitHub Pages).
- Semua link internal lewat `resolve()` dari `$app/paths` (base-path aware; preview branch hidup di `/zydhan.com`). Rute bahasa-aware lewat helper Task 3, bukan `href="/..."` literal.
- Verifikasi lokal tiap akhir task: `pnpm check && pnpm lint && pnpm test && pnpm test:e2e` hijau.
- Playwright lokal hanya install `chromium-headless-shell` (ringan, permintaan pemilik); CI diubah ke flag `--only-shell`.
- Branch kerja `english-version` (dari `main`); commit kecil per langkah; merge ke `main` hanya di Task 7.

## Review Focus

Mode galat yang tidak tertutup test; masing-masing dipin oleh test (task pemilik dicantumkan):

1. **Teks lupa-terjemah** (TopBar, ThemeToggle, MobileMenu, FloatingBar + overlay Navigasi, PrintCV, Redirect.svelte, subject mailto, `imageAlt` Seo, 404) → test e2e Task 4: `page.content()` di `/` dan `/cv` tidak match regex frasa Indonesia; di `/id` dan `/id/cv` tidak match regex frasa EN. Reviewer Task 5 greps ulang seluruh diff untuk string sisa.
2. **`html lang` salah setelah prerender** → test e2e Task 4 (`expect(page.locator('html')).toHaveAttribute('lang', ...)`) + verifikasi grep `build/` di Task 3.
3. **Toggle memindah halaman salah** (`/cv` ke `/id` alih-alih `/id/cv`; MobileMenu mereset ke Home) → test e2e Task 4 skenario 1–2.
4. **Anchor/rute lama mati** (`/cv#peran-pena` dari featured project, stub `/id/projects/snpmb-utbk-snbt-2023`) → unit test `redirects.test.ts` (Task 3) + e2e klik featured project dari `/id` (Task 4).
5. **Regresi visual/aksesibilitas komponen baru** (pill EN/ID atau segmented Bahasa menggeser layout top bar; target sentuh < 44px; kontras; fallback `backdrop-filter`) → Task 6: screenshot semua breakpoint × tema dibandingkan mockup; axe sudah ada di smoke test.

---

## Pemetaan subagent (pipeline pemilik)

| Task | Pelaksana | Gate |
|------|-----------|------|
| 1 | subagent penerjemah | draft TS lulus `pnpm check` |
| 2 | subagent reviewer terjemahan | berulang sampai disetujui |
| 3–4 | **satu** subagent implementasi | unit + e2e hijau |
| 5 | subagent reviewer implementasi | berulang sampai hijau |
| 6 | lead + implementer (feedback loop visual) | screenshot layak vs mockup |
| 7 | subagent deploy | workflow Pages hijau + cek live |

---

### Task 1: Draft terjemahan EN (subagent penerjemah)

**Files:**
- Create: `src/lib/content.en.ts`

**Interfaces (input):** `Content` interface (`src/lib/content.ts` baris 11–28) dan seluruh nilai `content.id` (baris 30–288), plus enumerasi string UI di bawah. Draft harus lulus `pnpm check`, jadi beri tipe `Content`.

- [ ] **Step 1: Enumerasi semua string yang perlu EN**

Baca file-file ini utuh dan catat setiap string (jangan satu pun tertinggal):
- `src/lib/content.ts` — semua teks, KECUALI: `id` role, `href`, slug, chips teknologi, nama institusi/org, periode, angka.
- `src/lib/components/TopBar.svelte` — `aria-label="Zydhan, ke Home"`, `aria-label="Utama"`, `Hubungi saya`, `aria-label="Buka menu"`.
- `src/lib/components/ThemeToggle.svelte` — `aria-label="Ganti tema"`.
- `src/lib/components/MobileMenu.svelte` — `aria-label="Menu"`, `aria-label="Zydhan, ke Home"`, `Tutup`, label `Tema`/`Terang`/`Gelap`, plus semua string lain di file.
- `src/lib/components/FloatingBar.svelte` — `Aksi cepat`, `Unduh PDF`, `Hubungi`, `Lihat CV`, `Navigasi`, `Isi CV`, `Tutup`, plus semua string overlay/dialog lain di file.
- `src/lib/components/PrintCV.svelte` — judul bagian print (`Ringkasan Profesional`, `Pengalaman Kerja`, `Proyek & Tulisan`) dan label lain di file.
- `src/lib/components/Redirect.svelte` — teks `Memindahkan ke` dan takarir lanjutannya.
- `src/lib/links.ts` — subject mailto: `Proyek freelance`, `Tautan rusak di zydhan.com`.
- `src/routes/+page.svelte` dan `src/routes/cv/+page.svelte` — title/description `Seo` yang hardcoded, string UI halaman (`Unduh PDF`, dsb.), plus default `imageAlt` di `Seo.svelte`.
- `static/404.html` — title, meta description, semua teks tampil.

Buat versi EN tiap string. Field `bodyShort`/`labelShort`/`descriptionShort` harus lebih pendek dari pasangan panjangnya.

- [ ] **Step 2: Tulis draft `src/lib/content.en.ts`**

```ts
import type { Content } from './content';

export const enContent: Content = { /* seluruh field EN, paritas klaim dengan id */ };

export const enChrome = {
	topBar: { contact: 'Contact me', logoAria: 'Zydhan, go to Home', navAria: 'Main', openMenuAria: 'Open menu', switchLangAria: '...' },
	themeToggle: { aria: 'Toggle theme' },
	mobileMenu: { /* dialogAria, closeLabel, closeAria, logoAria, langHeading, indonesia, english, themeHeading, light, dark, dll. */ },
	floatingBar: { /* quickAria, downloadPdf, contact, viewCv, navigation, fillCv, closeAria, dll. */ },
	print: { summaryHeading: 'Professional Summary', experienceHeading: 'Work Experience', projectsHeading: 'Projects & Writing' /* + sisanya dari PrintCV */ },
	redirectPage: { to: 'Redirecting to', manual: 'If you are not redirected automatically, click the link.' },
	mailto: { freelanceSubject: 'Freelance project', brokenSubject: 'Broken link on zydhan.com' },
	seo: { homeTitle: '...', homeDescription: '...', cvTitle: '...', cvDescription: '...', imageAlt: '...' },
	pages: { downloadPdf: 'Download PDF' /* + string UI halaman lain dari enumerasi */ },
	notFound: { title: 'Page not found', description: '...', heading: '...', body: '...', backLink: 'Back to home' }
} as const;
```

Struktur kunci `enChrome` di atas adalah kontrak untuk Task 3 — pertahankan persis. Gaya: bahasa Inggris natural kelas native, setara ringkas dengan aslinya, tanpa selera pemasaran baru, tanpa menaikkan gelar. Ikutkan angka sesuai Global Constraints.

- [ ] **Step 3: Verifikasi & commit**

Run: `pnpm check && pnpm lint && pnpm test`
Expected: HIJAU (file baru belum diimpor siapa pun).
Commit: `git add src/lib/content.en.ts && git commit -m "feat: draft copy EN (konten + chrome)"`

### Task 2: Review terjemahan (subagent reviewer berbeda konteks; gate berulang)

**Files:** Modify bila perlu: `src/lib/content.en.ts`.

- [ ] **Step 1: Reviewer menilai draft** lima sumbu: (1) fidelitas tanpa menambah/menaikkan klaim — bandingkan field-by-field dengan `content.id` dan Global Constraints; (2) nativeness — tidak ada kalimat kaku atau kalka; (3) konsistensi istilah (SSO, go-live, enrollment, mentoring, code review); (4) semua `*Short` benar-benar lebih pendek dari pasangannya; (5) kelengkapan — reviewer greps repo untuk string asli yang belum muncul di draft.
- [ ] **Step 2: Revisi berulang.** Reviewer menulis perbaikan langsung ke `src/lib/content.en.ts`; verifikasi `pnpm check && pnpm lint && pnpm test` tetap hijau; commit per putaran: `docs: revisi copy EN (putaran N)`.
- [ ] **Step 3: Akhir.** Reviewer menulis ringkasan putusan (frasa terpilih untuk hero, contact, headline PDF, subject mailto) di commit message terakhir sebagai catatan.

### Task 3: Implementasi — fondasi i18n (satu subagent implementasi; melanjutkan ke Task 4)

**Files:**
- Create: `src/lib/i18n.ts`, `src/lib/ui-copy.ts`, `tests/i18n.test.ts`, `scripts/fix-html-lang.mjs`
- Modify: `src/lib/content.ts`, `src/lib/links.ts`, `src/lib/redirects.ts`, `src/lib/components/{Seo,Redirect}.svelte`, `src/app.html`, `static/{sitemap.xml,404.html}`, `package.json`, `.github/workflows/deploy.yml` (baris playwright install saja), `tests/{content,redirects}.test.ts`

**Interfaces (Produces):**

```ts
// src/lib/content.ts
export type Lang = 'id' | 'en';
export const content: Record<Lang, Content>; // en dari ./content.en
export function getContent(lang: Lang): Content;

// src/lib/i18n.ts
import type { Lang } from './content';
export function langFromRouteId(routeId: string): Lang; // '/id' dan '/id/...' → 'id'; selain itu → 'en'
export function swapLangPath(path: string): string; // '/'↔'/id'; '/cv'↔'/id/cv'; '/id/<xy>'→'/<xy>'; '/<xy>'→'/id/<xy>'
export function langHref(href: string, lang: Lang): string; // '/cv#peran-pena' + 'id' → '/id/cv#peran-pena'

// src/lib/ui-copy.ts
export interface UICopy { /* bagian: topBar, themeToggle, mobileMenu, floatingBar, print, redirectPage, mailto, seo, pages, notFound */ }
export const uiCopy: Record<Lang, UICopy>; // id = string asli verbatim; en = enChrome
export function mailtoFreelanceHref(lang: Lang): string; // 'mailto:hello@zydhan.com?subject=' + encodeURIComponent
export function mailtoBrokenHref(lang: Lang): string;
```

- [ ] **Step 1: Tulis failing test `tests/i18n.test.ts`**

Kasus yang diuji:
- `langFromRouteId`: `'/'`→`'en'`, `'/cv'`→`'en'`, `'/id'`→`'id'`, `'/id/cv'`→`'id'`, `'/id/projects/[slug]'`→`'id'`, `'/ideas'`→`'en'` (jangan tersesat karena awalan `'/id'` mentah — rute semacam `'/ideas'` harus tetap `'en'`).
- `swapLangPath`: `'/'`→`'/id'`, `'/id'`→`'/'`, `'/cv'`→`'/id/cv'`, `'/id/cv'`→`'/cv'`; path tak dikenal: dari EN tambahkan prefix `/id`, dari ID jatuhkan prefix `/id`.
- `langHref`: `('/cv#peran-pena', 'id')`→`'/id/cv#peran-pena'`; `('/cv#peran-pena', 'en')`→`'/cv#peran-pena'`; anchor tidak hilang.

- [ ] **Step 2: Run** `pnpm test -- --run tests/i18n.test.ts` → FAIL (module tidak ada).

- [ ] **Step 3: Implement `src/lib/i18n.ts`** — `langFromRouteId` memakai regex `^/id(?:/|$)`; `swapLangPath` memakai regex sama; `langHref` split pada `#` pertama, swap path, lalu menyambung anchor kembali.

- [ ] **Step 4: Run** `pnpm test -- --run tests/i18n.test.ts` → PASS.

- [ ] **Step 5: Buat `src/lib/ui-copy.ts`** sesuai kontrak; **id = string asli repo VERBATIM** (jangan menulis ulang), **en = enChrome**. Hapus `links.mailtoFreelance`/`links.mailtoBroken`; tambahkan fungsi mailto di ui-copy; grep `mailtoFreelance|mailtoBroken` dan update semua pemakai (TopBar, FloatingBar, dst.).

- [ ] **Step 6: content.ts menerima `en` + parity test di `tests/content.test.ts`:**

- `content.ts`: `export type Lang = 'id' | 'en'`; isi `content.en` dari `./content.en` (import `enContent`).
- struktur: `Object.keys(getContent('en')).join()` sama dengan id; `roles[].id` identik dan urutan sama; `featuredProjects[].href` dan `writings[].href` identik.
- klaim EN: regex `/US\$60[.,]000/` muncul di `summary`, roles snpmb, `pdf`; `1 million+` di stats atau hero; `JSON.stringify(en)` tidak memuat `tech lead`; `experienceNote` memuat `2021`.
- `pdfBullets.length <= bullets.length` untuk semua role EN.
- Run `pnpm test` → PASS.

- [ ] **Step 7: SEO & file statis:**

- `src/app.html`: `<html lang="en">`.
- `scripts/fix-html-lang.mjs`: iterasi rekursif `build/**/*.html`; file di bawah `build/id/` → set `lang="id"`, sisanya → `lang="en"`; idempotent; log jumlah file terubah. Ubah `package.json`: `"build": "vite build && node scripts/fix-html-lang.mjs"`.
- `static/404.html`: ganti teks ke EN dari `enChrome.notFound`; `lang="en"`; script tema inline, font, ikon tetap.
- `static/sitemap.xml`: 4 URL (`/`, `/cv`, `/id`, `/id/cv`) + `xhtml:link rel="alternate"` hreflang padanannya (URL absolut `https://zydhan.com/...`).
- `Seo.svelte`: Props baru `lang: Lang`; selalu render:
  ```html
  <link rel="alternate" hreflang="en" href={`${links.domain}${swapLangPath(path) untuk en}`} />
  <link rel="alternate" hreflang="id" href={`${links.domain}${swapLangPath(path) untuk id}`} />
  <link rel="alternate" hreflang="x-default" href={URL EN} />
  <meta property="og:locale" content={lang === 'id' ? 'id_ID' : 'en_US'} />
  ```
  hreflang en mengarah ke versi EN dari halaman yang sama (bila `path` sudah EN, tetap `path`), hreflang id ke versi ID — hitung dua URL dengan `swapLangPath`. Gunakan satu helper kecil `alternatesFor(path) -> {en, id}` di `Seo.svelte` agar tidak dobel-putar. `imageAlt` default per bahasa dari `uiCopy[lang].seo.imageAlt`; `path` prop tetap path murni untuk canonical.
- `.github/workflows/deploy.yml`: `playwright install --with-deps chromium` → `playwright install --with-deps --only-shell chromium` (cek flag `--only-shell` dari docs Playwright versi terpasang; satu baris saja).

- [ ] **Step 8: Rute redirect & komponen Redirect:**

- `src/lib/redirects.ts`: `projectRedirectTarget(slug, lang: Lang = 'en')` — default target sama seperti hari ini; varian `id`: `snpmb-utbk-snbt-2023` → `/id/cv#peran-snpmb`; `optika-id` → `/id/cv`.
- `tests/redirects.test.ts`: kasus EN default (tetap) + kasus `'id'`.
- `Redirect.svelte` membaca `langFromRouteId(page.route.id)`, memilih target dan `uiCopy[lang].redirectPage`; `hrefFor` meng-`resolve()` target (tipe rute `'/' | '/cv' | '/id' | '/id/cv'`).

- [ ] **Step 9: Build & verifikasi statis:**

Run: `pnpm build && grep -o 'lang="[a-z]*"' build/index.html build/id/index.html build/cv/index.html build/id/cv/index.html build/404.html && grep -c 'hreflang' build/index.html`
Expected: file di `build/id/**` → `lang="id"`, lainnya `lang="en"`, `build/index.html` memuat ≥ 3 `hreflang`. `pnpm check && pnpm lint` hijau.
Commit: `feat: fondasi i18n (lang helper, ui-copy, merge EN, hreflang, postbuild lang, redirect ID, sitemap, 404 EN)`

### Task 4: Implementasi — halaman bersama, chrome, toggle UI (subagent implementasi, putaran kedua)

**Files:**
- Create: `src/lib/pages/HomePage.svelte`, `src/lib/pages/CVPage.svelte`, `src/routes/id/cv/+page.svelte`, `tests/i18n.spec.ts`
- Modify: `src/routes/+page.svelte`, `src/routes/cv/+page.svelte`, `src/routes/id/+page.svelte`, `src/routes/id/projects/+page.svelte`, `src/routes/id/projects/[slug]/+page.{svelte,ts}`, `src/routes/projects/+page.svelte`, `src/routes/projects/[slug]/+page.{svelte,ts}`, `src/lib/components/{TopBar,ThemeToggle,MobileMenu,FloatingBar,PrintCV,ContactBlock,Footer}.svelte`, `tests/{smoke.spec.ts,theme.test.ts}` bila selector lama berubah

**Interfaces (Consumes):** semua helper Task 3: `langFromRouteId`, `swapLangPath`, `langHref`, `uiCopy`, `mailto*Href`, `getContent(lang)`, Seo `lang` prop. Komponen halaman menerima `{ lang: Lang }`.

- [ ] **Step 1: Komponen halaman bersama**

- Pindah isi `src/routes/+page.svelte` → `src/lib/pages/HomePage.svelte` dengan `let { lang }: { lang: Lang } = $props()`; `getContent('id')` → `getContent(lang)`; copy Seo dari `uiCopy[lang].seo`; href internal (featured project, dsb.) semua lewat `langHref(href, lang)` lalu `resolve()`.
- Padanan CV: isi `src/routes/cv/+page.svelte` → `src/lib/pages/CVPage.svelte`; label section, state overlay (`ui.cvActive`), tombol `Unduh PDF` → `uiCopy[lang].pages.downloadPdf`; overlay 5 anchor tetap.
- Pembungkus tipis rute: `src/routes/+page.svelte` → `<HomePage lang="en" />`; `src/routes/cv/+page.svelte` → `<CVPage lang="en" />`; `src/routes/id/+page.svelte` hapus isi Redirect → `<HomePage lang="id" />`; baru `src/routes/id/cv/+page.svelte` → `<CVPage lang="id" />`; stub proyek tetap Redirect (targetnya sudah diperbaiki Task 3).
- `resolve()` dipanggil dengan hasil `langHref(...)` (mis. `/id/cv`) — memastikan base-path preview tetap benar.

- [ ] **Step 2: Chrome bahasa-aware** — TopBar, ThemeToggle (aria-label), MobileMenu, FloatingBar, PrintCV, ContactBlock, Footer membaca `uiCopy[langFromRouteId(page.route.id)]`; link internal lewat `langHref` + `resolve()`; tidak ada string literal lama yang tersisa.

- [ ] **Step 3: Toggle bahasa UI** (acuan visual: `docs/design/artboards/2026-11-09-topbar-language-toggle.png` dan `2026-11-09-mobile-menu-language-toggle.png`)

- **TopBar** `.actions`: tombol pill 44px bergaya sama dengan ThemeToggle (latar `--chip`, border `--line`, radius 999px, hover `--chiphover`, scale 0.96 saat ditekan), posisinya SEBELAH KIRI ThemeToggle. Label = bahasa tujuan: `EN` saat di halaman ID, `ID` saat di halaman EN; `href = resolve(swapLangPath(path dari route aktif))`; `aria-label` dari `uiCopy[lang].topBar.switchLangAria` (`Switch to English` / `Beralih ke Bahasa Indonesia`). Tanpa ikon, teks saja.
- **MobileMenu**: baris baru **"Bahasa"** DI ATAS baris "Tema": heading dan segmented control dua opsi (`Indonesia` | `English`) dengan markup, classes, dan ukuran identik dengan segmented Tema yang ada. Opsi aktif = bahasa halaman (`langFromRouteId(page.route.id)`); klik opsi → navigasi padanan bahasanya dan tutup menu (pola `close()` seperti link nav yang ada).
- Aksesibilitas: target sentuh 44px, label jelas, tanpa `aria-current`.

- [ ] **Step 4: e2e baru `tests/i18n.spec.ts` + update `tests/smoke.spec.ts` bila selector lama tergantung teks yang berubah**

Pertama: `pnpm exec playwright install chromium-headless-shell`.

Skenario wajib:
1. Desktop 1280×800: `/id` → klik tombol `[aria-label="Switch to English"]` → URL `/` (gunakan `waitForURL`); `/` → klik `ID` → `/id`; `/cv` → klik `ID` → `/id/cv`; `/id/cv` → klik `EN` → `/cv`.
2. Mobile 390×844: `/` → buka menu hamburger → segmented "English" aktif; klik "Indonesia" → `/id`; `/id` → segmented "Bahasa" tampil DI ATAS baris "Tema"; klik "English" → `/`.
3. `document.documentElement.lang` = `en` di `/` dan `/cv`; `id` di `/id` dan `/id/cv`; head memuat 3 `link[hreflang]` di `/`.
4. Anti-lupa-terjemah: `page.content()` di `/` dan `/cv` TIDAK match `/Hubungi saya|Unduh|Keahlian|Aksi cepat|Buka menu|Ganti tema|Ringkasan/`; di `/id` dan `/id/cv` TIDAK match `/Contact me|Download PDF|Quick actions|Open menu|Toggle theme|Professional Summary/`.
5. `/id` klik featured project "UTBK-SNBT dan SSO SNPMB" → URL `/id/cv#peran-snpmb` dan elemen `#peran-snpmb` tampil.
6. `/id/cv` tombol `Unduh PDF` tetap memicu `window.print` (pola sama seperti uji yang sudah ada bila ada).
7. Stub `/id/projects/snpmb-utbk-snbt-2023` meng-redirect ke `/id/cv#peran-snpmb` (cek via fetch HTML build atau `page.goto` + `expect(page).toHaveURL`).

- [ ] **Step 5: Jalankan seluruh suite**

Run: `pnpm check && pnpm lint && pnpm test && pnpm test:e2e`
Expected: hijau semua (e2e baru + lama).
Commit: `feat: halaman bersama dwibahasa + toggle EN/ID (top bar & mobile menu) + e2e i18n`

### Task 5: Review implementasi (subagent reviewer berbeda dari implementer; berulang)

- [ ] **Step 1: Reviewer menerima diff `main...english-version`.** Fokus: poin Review Focus di atas; string hardcoded tersisa; semua href baru lewat `resolve()`; prerender tetap `handleHttpError: 'fail'` tanpa galat; coverage e2e lengkap sesuai daftar; copy sesuai hasil Task 2; tidak ada `href="/..."` literal yang bypass helper.
- [ ] **Step 2: Loop perbaikan** — reviewer menulis temuan, implementer memperbaiki, sampai semua temuan selesai.
- [ ] **Step 3: Verifikasi akhir release:**

Run: `pnpm check && pnpm lint && pnpm test && pnpm test:e2e` → hijau.
Run: `pnpm build && grep -c 'hreflang' build/index.html build/id/index.html` → ≥ 3 di kedua file; `grep -o 'lang="[a-z]*"'` di folder `build/id/**` → `id`, di luar itu → `en`.

### Task 6: Verifikasi visual & QA (lead + implementer; Playwright + chromium-headless-shell)

- [ ] **Step 1:** Pastikan `pnpm exec playwright install chromium-headless-shell` (dari Task 4); jalankan `pnpm build && pnpm preview --port 4173 --strictPort` di background.
- [ ] **Step 2: Screenshot matriks** lewat Playwright API: halaman {`/`, `/id`, `/cv`, `/id/cv`} × viewport {390, 1280, 1920} × tema {light, dark}. Periksa: top bar desktop menampilkan pill EN/ID + theme toggle + tombol contact tertata rapi (sesuai mockup); mobile menu terbuka dengan segmented Bahasa di atas Tema. Simpan di luar commit (mis. `/tmp/opencode/shots/2026-11-09/`).
- [ ] **Step 3: Bandingkan dengan mockup** `docs/design/artboards/2026-11-09-*.png` satu per satu — pill, segmented, urutan baris, warna. Axe e2e (sudah dipakai di smoke test) wajib hijau (`pnpm test:e2e`).
- [ ] **Step 4: Polish bila menyimpang** (padding pill, gap, min-height segmented; TIDAK mengubah token desain global) → rebuild → screenshot ulang → e2e ulang. Ulang sampai layak dikatakan bagus (mandat pemilik: "pokoknya harus bagus").
- [ ] **Step 5:** Commit bila ada polish: `chore: polish toggle bahasa (visual)`

### Task 7: Deploy (subagent deploy)

- [ ] **Step 1: Gate final di branch:** `pnpm check && pnpm lint && pnpm test && pnpm test:e2e` hijau; `git status` bersih.
- [ ] **Step 2:** `git checkout main && git merge --no-ff english-version && git push origin main`.
- [ ] **Step 3: Pantau workflow:** `gh run list --workflow=deploy.yml` lalu `gh run watch <id>` sampai selesai (deploy GitHub Pages ke domain `zydhan.com`). CI gagal → perbaiki minimal, ulang Step 1–3.
- [ ] **Step 4: Cek live:**

```bash
curl -s https://zydhan.com/      | grep -o '<html[^>]*lang="[a-z]*"'   # en
curl -s https://zydhan.com/id    | grep -o '<html[^>]*lang="[a-z]*"'   # id
curl -s https://zydhan.com/cv    | grep -c 'hreflang='                 # 3
curl -sI https://zydhan.com/id/cv | head -n 1                          # 200
```

Expected: en / id / 3 hreflang / status 200. Gagal → `git revert` merge commit, perbaikan di branch, ulang dari Step 1.

- [ ] **Step 5: Lapor** ringkasan hasil ke pemilik: rentang commit, run ID workflow, hasil cek live.

## Catatan eksekusi

- Satu subagent implementasi menjalankan Task 3 + 4 berurutan; reviewer Task 5 harus subagent BERBEDA (konteks segar).
- Skrip `scripts/generate-{icons,og}.mjs` dan kartu og tidak diubah (netral bahasa).
- Tidak menyentuh workflows lain selain baris playwright di `deploy.yml`.
- Gaya kode: ikut file sekitar (tab, single quotes, runes `$state`/`$derived`); tanpa Tailwind; styling scoped per komponen; repo tidak memakai formatter — jangan menambah.
