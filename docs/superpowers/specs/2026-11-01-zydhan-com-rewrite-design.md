# zydhan.com rewrite: spec desain

Tanggal: 2026-11-01. Kartu: zydhanlinnar11/zydhan.com#270. Gate Design disetujui pemilik; dokumen ini adalah Gate Spec.

## Maksud

Situs portofolio lama (Next.js di Vercel) sudah usang: masih menulis "2 tahun pengalaman", berhenti di DPTSI ITS, dan tidak memuat SEVIMA PENA maupun angka dampak. Pemilik juga tidak mau melanjutkan Next.js dan Vercel (alasan etis pemilik, bukan untuk diperdebatkan). Situs ditulis ulang dari nol.

Tujuan situs: pengunjung (rekruter dan sesama engineer) masuk mendalam ke portofolio, terutama CV, lalu menghubungi pemilik untuk proyek freelance (jenis proyek apa pun) lewat email atau LinkedIn.

## Tujuan, bukan-tujuan, anti-tujuan

Tujuan:
- Home ringkas yang langsung menyampaikan siapa pemilik dan bukti kerjanya; halaman CV yang bisa dibaca mendalam di desktop dan ponsel.
- Ajakan menghubungi selalu terjangkau (tombol "Hubungi saya" di bar atas desktop, bar bawah melayang di mobile, blok kontak di akhir halaman).
- Satu sumber data konten untuk Home, CV, dan PDF, supaya angka tidak berbeda antarhalaman.

Bukan-tujuan (di luar lingkup #270):
- CV PDF 2026 (#271) dan studi kasus proyek (#272).
- Terjemahan bahasa Inggris (menyusul), formulir kontak, blog, analitik.

Anti-tujuan (dianggap gagal walau secara teknis jalan):
- Teks atau visual yang terasa seperti keluaran AI: label mono dengan titik tengah, titik status hijau, gradien pastel biru-ungu, klaim umum ("sistem yang kuat dan rapi"), kalimat penutup berupa pepatah.
- Klaim yang tidak bisa dibuktikan dari CV atau LinkedIn pemilik, atau gelar yang dinaikkan (lihat "Konten").
- Bergantung pada Next.js, Vercel, atau layanan terafiliasi mereka.

## Batasan

- Hosting: GitHub Pages, statis. Tidak ada server, tidak ada fungsi server, tidak ada formulir.
- Framework: SvelteKit (Svelte 5) dengan `adapter-static` dan prerender semua halaman. TypeScript.
- Tanpa Tailwind. CSS biasa dengan token (variabel CSS) dan gaya per komponen.
- Ark UI Svelte (headless) hanya untuk komponen yang butuh perilaku kompleks (menu/dialog navigasi, kontrol bersegmen jika perlu). Elemen sederhana memakai HTML dan CSS biasa. Ukuran bundle diukur setelah scaffold; jika berlebihan, ganti ke elemen native (`<dialog>`, `<details>`).
- Font Inter dihosting sendiri (variabel, subset latin), tanpa Google Fonts saat runtime.
- Domain: `zydhan.com` (file `CNAME`, `.nojekyll`, HTTPS dari GitHub Pages).
- Paket manajer: pnpm (sama dengan repo lama).

## Keputusan pemilik

- Strategi repo: branch `rewrite` di repo ini; situs lama tetap di `main` sampai siap, lalu `rewrite` menggantikan `main` saat cutover.
- Bahasa saat peluncuran: Indonesia saja di `/`. Tombol EN disembunyikan sampai terjemahan ada (tidak boleh ada tombol mati). Struktur data konten dikunci per bahasa supaya terjemahan bisa ditambahkan nanti. Keputusan jangka panjang (2026-11-01): bahasa bawaan situs adalah Inggris — saat EN dibuat, EN memakai `/` dan Indonesia pindah ke `/id` (struktur situs lama); pengalihan `/id` → `/` pada peluncuran ini ditinjau ulang di saat itu.
- Bagian "Proyek unggulan" dan "Tulisan" di Home dipertahankan seperti desain. Bar atas hanya Home dan CV (+ tombol Hubungi); Proyek dan Tulisan sengaja bukan tautan bar atas.
- Font: Inter, hosting sendiri.
- Arah visual: kaca selektif (bar atas, bar bawah, panel hero, panel overlay, blok kontak), latar kabut dari palet avatar pemilik; permukaan lain datar bergaris tipis. Aksen teal. Tidak ada Material Expressive.

## Sumber desain

Artboard tersimpan di repo: `docs/design/artboards/*.dc.html` (+ `canvas.json`). Itu HTML dengan gaya inline dan variabel CSS; nilai di dalamnya adalah acuan token. Tidak bisa dirender tanpa runtime artifact, tapi bisa dibaca. Versi terkelola: https://claude.ai/artifact/2j2b7Aqe94Kt4GsbSWmazD (pribadi, milik pemilik).

Layar: Home desktop 1440 (`Main`), Home lebar 1920 (`Home-wide`), Home tablet 768 (`Home-tablet`), Home mobile 390 (`Mobile`), menu mobile (`Mobile-menu`), bar melayang Home mobile (`Mobile-bar`), CV desktop (`CV`), CV mobile (`CV-mobile`), bar melayang CV (`CV-mobile-bar`, `CV-mobile-bar-menu`), 404 (`Halaman-404`), kartu Open Graph (`Open-graph`), lembar komponen tema gelap (`Komponen`), dan tata letak cetak CV (`CV-PDF`, A4 satu halaman, lihat Rute dan halaman).

## Token

Terang: latar `#EEF3F4`, teks `#12141C`, teks sekunder `#46413C`, aksen `#1F6F7A` (teks putih di atasnya 5,8:1), tint aksen `rgba(31,111,122,0.12)`, permukaan `rgba(255,255,255,0.72)`, garis `rgba(18,20,28,0.12)`, kabut `#BFDDE1`, `#D7AB8E`, `#A19E9D`, fokus `#1F6F7A`.

Gelap: latar `#12141C`, teks `#F1EEEA`, teks sekunder `#BDBAB8`, aksen `#BFDDE1` (teks `#12141C` di atasnya), tint `rgba(191,221,225,0.14)`, permukaan `rgba(255,255,255,0.045)`, garis `rgba(255,255,255,0.13)`, kabut `#2E5560`, `#7A5440`, `#46413C`, fokus `#DAEAED`.

Kaca (opasitas dan blur adalah keputusan setelah beberapa putaran umpan balik pemilik):
- Panel kaca: terang putih 58%, gelap `rgba(24,27,38,0.62)`; blur 24px, saturasi 170%; tepi 1px dan sorot dalam atas.
- Bar atas dan bawah: putih 24% (gelap 30%), blur 10px.
- Panel overlay: putih 44% (gelap 48%), blur 12px; lapisan gelap di belakang overlay 16% (gelap 30%), blur 2px.
- Fallback wajib: tanpa dukungan `backdrop-filter` dan di bawah `prefers-reduced-transparency`, semua kaca menjadi permukaan padat (`#FFFFFF` / `#1E212C`).
- Kabut: tiga lingkaran gradien radial dengan radius piksel tetap (bukan persentase kotak, karena menghasilkan oval gepeng di layar tinggi), memudar ke bawah dengan mask di hero. Acuan radius: 260 sampai 300px di ponsel, 320 sampai 360px di tablet, sekitar 420 sampai 560px di desktop.

Tipografi: Inter 400 sampai 700. Judul hero 38px (mobile), 50px (tablet), 60px (desktop), 68px (lebar), letter-spacing -0.035em, tinggi baris sekitar 1.06. Teks isi 15 sampai 17px, tinggi baris 1.6. Teks aktif atau penting 16 sampai 18px. Tanggal memakai angka tabular, bukan font mono.

Bentuk: bar atas dan bawah berbentuk pil penuh; kartu dan panel radius 18 sampai 24px; tombol pil. Target sentuh minimal 44px.

Breakpoint acuan: 390, 768, 1440, 1920. Kolom konten maksimum 1120px (Home dan CV desktop), 1280px di layar 1920.

## Rute dan halaman

- `/` Home: hero, kartu freelance, empat statistik, tiga peran terakhir, proyek unggulan, tulisan, blok kontak, footer.
- `/cv` CV: header, ringkasan, pengalaman (kartu peran), keahlian, pendidikan, tulisan, blok kontak. ID anchor tetap: `ringkasan`, `pengalaman`, `keahlian`, `pendidikan`, `tulisan`, `peran-pena`, `peran-sevima`, `peran-dptsi`, `peran-snpmb`, dan `peran-intern` untuk peran Web Developer Intern (keputusan perancang spec: artboard memuat lima peran tapi hanya empat yang punya anchor).
- PDF CV dibuat client-side: tombol "Unduh PDF" memanggil `window.print()` dengan stylesheet khusus cetak (dialog print browser, default "Simpan sebagai PDF"). Tombol aktif saat peluncuran, tidak menunggu #271, dan tidak ada berkas `/cv.pdf` statis (keputusan pemilik).
  - Tata letak cetak mengikuti artboard `CV-PDF`: A4 (794×1123px) satu halaman, satu kolom bergaya ATS, hitam di atas putih, Source Serif 4 (11,5px isi; sengaja berbeda dari Inter di situs, keputusan pemilik), selalu terang apa pun tema layar. Urutan: ringkasan, keahlian, pengalaman, proyek dan tulisan, pendidikan. Bahasa mengikuti bahasa halaman.
  - Di `@media print`, kerangka situs (bar, kabut, kaca, daftar isi) disembunyikan dan blok cetak khusus ditampilkan; blok itu disembunyikan di layar. Blok cetak dan halaman CV membaca data konten yang sama, hanya tampilannya yang berbeda.
  - Keluaran print harus tetap satu halaman A4; periksa saat membangun, termasuk saat salinan bertambah.
- `404.html` untuk GitHub Pages.
- Rute lama (`/id`, `/projects`, `/id/projects`, `/projects/<slug>`, `/id/projects/<slug>`, slug yang ada: `optika-id`, `snpmb-utbk-snbt-2023`) menjadi halaman pengalihan statis (meta refresh + canonical). Host statis tidak bisa 301. Target (keputusan perancang spec): `/id` ke `/` (peluncuran; ditinjau saat EN diadakan, lihat Keputusan pemilik); semua `/projects*` dan `/id/projects*` ke `/cv`, dengan anchor `peran-snpmb` untuk `snpmb-utbk-snbt-2023`; `optika-id` ke `/cv` tanpa anchor karena proyek itu tidak ada lagi di CV.

## Perilaku

- Bar atas: logo avatar bulat (`/_blob` di artifact = `public/logo.webp` diperkecil), tautan Home dan CV (desktop dan tablet), tombol "Hubungi saya" (`mailto:hello@zydhan.com?subject=Proyek%20freelance`), pengganti tema, tombol EN (disembunyikan saat peluncuran). Item aktif berupa pil aksen penuh dengan `aria-current="page"`.
- Mobile: bar atas hanya logo dan tombol menu, yang membuka layar menu (Home, CV, bahasa (disembunyikan), tema, bar bawah dengan Tutup).
- Bar bawah melayang (hanya di bawah 768px): tiga item ikon di atas label, pil kaca, 16px dari tepi.
  - Home: Navigasi, Hubungi, Lihat CV (aksi utama, terisi aksen). Muncul setelah tombol utama hero ("Lihat CV lengkap") keluar dari viewport, hilang saat kembali ke atas.
  - CV: Navigasi, Unduh PDF, Hubungi (aksi utama). Muncul setelah baris pil isi CV keluar dari viewport.
  - Navigasi membuka panel overlay (CV: daftar bagian, bagian aktif bertanda centang; Home: layar menu). Saat terbuka, item pertama menjadi Tutup.
  - Jarak antara bar dan panel overlay 12px; margin tepi 16px.
- CV desktop: daftar isi sticky di kiri dengan bagian aktif terisi aksen (`aria-current="location"`); CV mobile: pil isi CV yang bisa digeser.
- Tema: mengikuti sistem (`prefers-color-scheme`), bisa diganti manual, disimpan di `localStorage` dengan `try/catch`, tanpa kedip saat muat (atribut diatur sebelum render).
- Tanpa animasi masuk per bagian; gerakan hanya untuk respons aksi (membuka panel).

## Konten

Sumber kebenaran konten: LinkedIn pemilik (lebih baru) dan CV Oktober 2025; koreksi pemilik tanggal 2026-11-01 menang atas keduanya. Simpan sebagai data terstruktur satu tempat (peran, statistik, keahlian, pendidikan, tulisan, salinan hero), dipakai Home, CV, dan PDF. Tiap butir pengalaman boleh punya `short` opsional: PDF memakai `short` bila ada dan teks penuh bila tidak; halaman web selalu memakai teks penuh. Artboard `CV-PDF` sudah memakai versi ringkas itu (misalnya tiga butir SEVIMA PENA digabung menjadi tiga yang lebih padat), jadi teks ringkasnya diambil dari sana. Peran juga menyimpan daftar stack yang dipakai chip di web dan baris stack di PDF.

Aturan wajib:
- Masa kerja dihitung dari Agustus 2021 ("hampir 5 tahun").
- Jabatan resmi di SEVIMA PENA adalah Software Engineer. Dilarang memakai "tech lead" sebagai gelar; deskripsikan tanggung jawab ("memimpin arsitektur inti dan tim engineering"). Jangan menaikkan gelar di mana pun.
- SNPMB dihitung mulai 2022 (part-time, paralel). "Memimpin 20 developer di ITS" dikonfirmasi aman.
- Penghematan SSO: US$60.000 per tahun, sekitar Rp1 miliar pada kurs 2024 (dikonfirmasi pemilik; dulu dicatat belum terverifikasi).
- Observability: Sentry di SEVIMA PENA; OpenTelemetry di SNPMB SSO dan UTBK-SNBT. "Sedang mendalami Prometheus dan Grafana" dibuang.
- Tidak boleh mengarang angka, kutipan, atau detail studi kasus.
- Salinan kunci (dari desain): judul hero "Aku memimpin tim developer dan mendampingi klien sampai sistemnya dipakai."; kalimat kontak "Ada sistem yang perlu dibangun atau dirombak?" dengan badan "Tulis apa yang ingin dibangun, kapan harus selesai, dan batasannya. Aku balas lewat email atau LinkedIn."
- Tautan tulisan: artikel Dev.to "Simple and Easy REST API Implementation with Laravel" dan post LinkedIn tentang debug Go (4.432 tayangan); URL asli ada di artboard.

## Aksesibilitas

- Teks 4,5:1 atau lebih di dua tema; sudah dihitung untuk pasangan utama (terendah 4,54:1, teks sekunder gelap di atas kabut teal).
- `:focus-visible` terlihat di semua kontrol interaktif (cincin 3px, offset 3px, warna fokus token).
- Landmark, `aria-current`, label aksesibilitas pada tombol ikon dan logo.
- Menghormati `prefers-reduced-transparency` dan `prefers-reduced-motion`.
- Tidak ada elemen yang hanya bisa diklik; tombol memakai `<button>` atau `<a>`.

## SEO dan berbagi

`lang="id"`, judul dan deskripsi per halaman, tautan kanonis `https://zydhan.com`, `sitemap.xml` (`/`, `/cv`), `robots.txt` (izinkan semua). Open Graph dan Twitter Card dengan gambar 1200x630 yang diekspor sekali dari artboard `Open-graph`; `og:title` "Zydhan Linnar Putra, backend engineer di Surabaya", `og:description` "Memimpin tim developer dan mendampingi klien sampai sistemnya dipakai." Favicon dari `public/logo.webp`: ikon 32px, sentuh Apple 180px, 192px dan 512px.

## Deploy dan cutover

GitHub Actions: pasang pnpm, build, unggah artifak, `deploy-pages`. Sebelum cutover, verifikasi di URL pratinjau GitHub Pages (perlu `paths.base` lewat variabel lingkungan). Cutover dilakukan pemilik: DNS `zydhan.com` dari Vercel ke GitHub Pages, `rewrite` menggantikan `main`, HTTPS dicek.

## Bukti penyelesaian

- `pnpm build` dan `svelte-check` bersih; lint bersih.
- Lighthouse seluler untuk `/` dan `/cv`: performa, aksesibilitas, praktik terbaik, SEO masing-masing 95 atau lebih (angka ini keputusan perancang spec; boleh diusulkan ulang).
- JS terkirim untuk halaman Home (gzip) kurang dari 60 KB (keputusan perancang spec).
- Tidak ada gulir horizontal di 390, 768, 1440, 1920 (cek otomatis).
- Pemeriksaan kontras dan fokus keyboard di dua tema.
- Perbandingan visual dengan artboard di empat lebar (manual atau tangkapan layar).
- Rute lama menghasilkan halaman pengalihan; `404.html` berfungsi.

## Diserahkan ke pembangun

Struktur berkas dan komponen Svelte, pembagian CSS (global dan per komponen), pustaka ikon (inline SVG sesuai desain), strategi uji (kecil: bangun, jelajahi rute, cek gulir horizontal, aksesibilitas otomatis), mekanisme ekspor gambar Open Graph, detail Ark UI per komponen, desain stylesheet cetak untuk tombol "Unduh PDF" (`window.print()`), alat pembuat favicon.

## Terbuka — diselesaikan 2026-11-01

Semua pertanyaan terbuka versi awal sudah dijawab pemilik pada 2026-11-01:

- Kurs "sekitar Rp1 miliar": dikonfirmasi baik oleh pemilik.
- CV PDF: dibuat client-side dari halaman CV (gaya cetak + `window.print()`); tombol "Unduh PDF" aktif saat peluncuran, tidak menunggu #271. Tidak ada berkas `/cv.pdf` statis.
- #272 studi kasus: tiket terpisah, di luar lingkup #270; situs ini tidak menautkan studi kasus.
- Jadwal DNS dan cutover: diurus sendiri oleh pemilik, tidak memblokir pekerjaan di sini.
- Terjemahan bahasa Inggris: tetap menyusul (di luar lingkup). Keputusan jangka panjang: bahasa bawaan situs adalah Inggris (`/`), Indonesia pindah ke `/id`. Peluncuran tetap Indonesia di `/`.
