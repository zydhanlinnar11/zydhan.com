# zydhan.com versi bahasa Inggris: spec desain

Tanggal: 2026-11-09. Lanjutan dari `2026-11-01-zydhan-com-rewrite-design.md`; keputusan jangka panjang di spec itu kini dieksekusi.

## Maksud

Situs saat ini hanya berbahasa Indonesia. Tujuan fitur ini: pengunjung internasional (rekruter, sesama engineer) bisa membaca seluruh situs dalam bahasa Inggris, dengan SEO dan OpenGraph yang benar per bahasa, dan tombol pengalih bahasa yang menonaktifkan diri hanya bila tidak ada versi lain untuk halaman itu (tidak ada tombol mati).

## Keputusan pemilik (2026-11-09)

- **Struktur URL: EN di `/`, ID pindah ke `/id/...`** — mengeksekusi keputusan terekam di spec 2026-11-01 ("bahasa bawaan situs adalah Inggris — saat EN dibuat, EN memakai `/` dan Indonesia pindah ke `/id`").
- Toggle bahasa di top bar (desktop) dan di MobileMenu (mobile), sesuai mockup yang diberikan pemilik (tersimpan: `docs/design/artboards/2026-11-09-topbar-language-toggle.png` dan `2026-11-09-mobile-menu-language-toggle.png` — acuan visual resmi).
- Deploy: setelah implementasi dan review lolos, push langsung ke `main` → workflow deploy GitHub Pages jalan.
- **Kualitas tanpa sign-off pribadi:** pemilik memberi kebebasan menjalankan feedback loop bahasa dan UI ("pokoknya harus bagus"), memakai Playwright + `chromium-headless-shell` (ringan) untuk verifikasi visual/interaksi sebelum deploy. Pipeline subagent: penerjemah → reviewer terjemahan → implementasi → reviewer implementasi → verifikasi visual → deploy.

## Pendekatan

Dua opsi dipertimbangkan untuk mekanisme pindah bahasa:

1. **Rute URL terpisah per bahasa (dipilih).** SEO dan OpenGraph per bahasa: Google mengindeks kedua versi, `hreflang` alternates, `html lang` benar, meta dan OG per bahasa. Share link selalu konsisten. Biaya: struktur rute dilipatgandakan, tapi halaman jadi komponen bersama sehingga duplikasi tinggal pembungkus tipis.
2. Toggle client-side ala tema (localStorage). Lebih murah, tapi hanya satu versi di URL — SEO bahasa Inggris lemah. Ditolak karena alasan utama fitur ini justru SEO/OG.

## Struktur rute setelah perubahan

Halaman sungguhan saat ini: `/` (Home, 560 baris) dan `/cv` (568 baris). Rute `/projects*` dan `/id*` semuanya pengalihan statis (meta refresh + canonical) — perilaku itu tidak berubah, hanya targetnya ditinjau.

| Rute | Isi |
|------|-----|
| `/` | Home bahasa **EN** |
| `/cv` | CV bahasa **EN** |
| `/id`, `/id/cv` | Home dan CV bahasa **ID** (halaman sungguhan, menggantikan stub redirect `/id/+page.svelte` dan `/id` → `/` lama) |
| `/projects`, `/projects/<slug>` | stub redirect → `/cv` (target dan anchor: sama dengan spec lama) |
| `/id/projects`, `/id/projects/<slug>` | stub redirect → `/id/cv` (padanan ID dari target lama; anchor `peran-snpmb` untuk `snpmb-utbk-snbt-2023`, `optika-id` tanpa anchor) |
| `404.html` | tetap |

ID anchor CV (`ringkasan`, `pengalaman`, `keahlian`, `pendidikan`, `tulisan`, `peran-pena`, dst.) **tidak dilokalkan** — sama di kedua bahasa, supaya `/cv#peran-pena` dan `/id/cv#peran-pena` keduanya valid dan featured projects bisa tetap satu slug anchor.

## Arsitektur kode

- `src/lib/content.ts`: `type Lang = 'id' | 'en'`; `Record<Lang, Content>` diisi `en` selain `id` yang sudah ada. Snip ID anchor, slug, `href`, dan angka tidak diterjemahkan; teks ya.
- Komponen halaman bersama: isi `src/routes/+page.svelte` dan `src/routes/cv/+page.svelte` dipindah ke `src/lib/pages/HomePage.svelte` dan `src/lib/pages/CVPage.svelte` (atau pola padanan yang konsisten dengan repo), menerima `lang: Lang`. Rute `/`, `/cv`, `/id`, `/id/cv` jadi pembungkus tipis.
- Semua string hardcoded non-`content.ts` dilokalkan lewat satu sumber UI-copy per bahasa (mis. `uiCopy` di `content.ts` atau modul kecil sendiri): TopBar ("Hubungi saya", "Buka menu", aria logo/nav), ThemeToggle aria, MobileMenu ("Tema", "Terang", "Gelap", "Bahasa", "Tutup menu"), FloatingBar ("Unduh PDF", "Hubungi", "Lihat CV", "Navigasi", "Isi CV", "Aksi cepat"), PrintCV (judul bagian PDF), subject mailto di `links.ts` (`Proyek%20freelance`, subject berbahasa per `lang`), serta SEO title/description per halaman (kini di prop `Seo`).
- `src/app.html` `<html lang="id">` → `lang="en"` (mayoritas halaman kini EN), dan setiap halaman meng-override `<html lang>`-nya lewat `%sveltekit.head%` atau atribut di layout per rute; hasil prerender: EN `lang="en"`, ID `lang="id"`.
- Helper kecil untuk URL padanan (`/` ↔ `/id`, `/cv` ↔ `/id/cv`) dipakai toggle top bar, MobileMenu, dan `hreflang`.

## SEO / OpenGraph

- Setiap halaman memuat `<link rel="alternate" hreflang="en" href="...">` dan `hreflang="id"` (dengan URL absolut `https://zydhan.com/...`) plus `x-default` → EN, di samping canonical per halaman.
- Meta title/description/OG (`og:title`, `og:description`, `og:url`, `og:image`) per bahasa dari konten masing-masing.
- Kartu OG: kalau `og-card.html`/`generate-og.mjs` berteks, dibuat versi teks EN; nama domain dan branding tetap.

## Toggle bahasa (sesuai mockup)

Desktop (≥768px), di `.actions` TopBar **sebelah kiri** ThemeToggle: tombol pil 44px bertuliskan bahasa tujuan — "EN" di halaman ID… (halaman ID ada di `/id`, jadi di `/id/*` tombolnya "EN" menuju padanan EN; di `/` dan `/cv` tombolnya "ID" menuju padanan ID). Gaya sama pil ThemeToggle (`--chip`, border `--line`).

Mobile: di MobileMenu, baris "**Bahasa**" dengan kontrol bersegmen "Indonesia | English" — pola, gaya, dan urutan persis baris "Tema" di bawahnya (segmented, state aktif sesuai bahasa halaman saat ini). Memilih segmen = navigasi ke URL padanan, bukan mereset ke Home.

Aksesibilitas: label/aria merinci tujuan ("Switch to English" / "Beralih ke Bahasa Indonesia"); `aria-current` tidak dipakai untuk bahasa.

## Tanpa deteksi/pengalihan otomatis

Tidak ada redirect berbasis `Accept-Language` atau geolokasi — host statis tidak mampu dan berbahaya untuk SEO; `x-default` menutupi.

## Tujuan, bukan-tujuan, anti-tujuan

Tujuan:
- Seluruh copy site berbahasa Inggris mutu native: Home, CV, PDF cetak, UI chrome, meta/OG.
- Perpindahan bahasa mempertahankan halaman (Home ↔ Home, CV ↔ CV) di kedua arah.
- `pnpm check`, lint, unit test, dan e2e hijau; tambahan cek e2e untuk toggle dan `/id/*`.

Bukan-tujuan:
- Terjemahan membuat pengalaman/klaim baru — semua angka dan klaimidentik dengan versi ID (lihat anti-tujuan spec 2026-11-01 soal integritas klaim).
- Menambah halaman baru/URL lain, blog, atau studi kasus.
- CV PDF sebagai berkas statis.

Anti-tujuan (gagal walaupun jalan):
- Bahasa campur aduk di satu halaman (teks EN di halaman ID atau sebaliknya), termasuk aria-label.
- Anchor/slug berubah sehingga link lama `/cv#peran-pena` mati.
- Terjemahan menaikkan gelar/klaim melebihi versi ID.

## Yang tersisa untuk builder

- Nama file/ekspor persis untuk halaman bersama dan helper URL padanan.
- Cara teknis meng-override `html lang` per rute dalam SvelteKit + adapter-static (harus lolos pada prerender, diverifikasi di `build/`).
- Implementasi hreflang (di component `Seo` atau layout per grup rute).
- Detail mikro terjemahan (gaya kalimat): hasil subagent penerjemah, disetujui reviewer terjemahan; reviewer berwenang mengembalikan revisi sampai mutunya nyaman. Klaim harus paritas dengan versi ID (unit test asersinya).
- **Keputusan tambahan (dari builder check):** halaman 404 ikut diterjemahkan per bahasa (anti-tujuan bahasa campur berlaku); `static/sitemap.xml` diperluas ke 4 URL dengan `xhtml:link` alternates.
- Feedback loop UI: Playwright (browser `chromium-headless-shell`, ringan) — jalankan e2e + screenshot halaman kunci di kedua bahasa/kedua tema, bandingkan dengan mockup, perbaiki sampai layak. Skenario minimal: toggle top bar desktop memindah `/` ↔ `/id` dan `/cv` ↔ `/id/cv`; segmented Bahasa di MobileMenu berperilaku sama; tidak ada teks lupa-terjemah; test hijau sebelum push ke `main`.
