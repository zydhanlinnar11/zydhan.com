import type { Lang } from './content';
import { enChrome } from './content.en';
import { links } from './links';

/**
 * UI copies that live outside the Content object (aria labels, dialogs, SEO,
 * 404, mailto subjects, ...). The `id` entries are the original repo strings;
 * the `en` entries mirror `enChrome` from ./content.en.
 */
export interface UICopy {
	topBar: {
		contact: string;
		logoAria: string;
		navAria: string;
		openMenuAria: string;
		switchLangAria: string;
	};
	themeToggle: { aria: string };
	mobileMenu: {
		dialogAria: string;
		closeLabel: string;
		closeAria: string;
		logoAria: string;
		langHeading: string;
		indonesia: string;
		english: string;
		themeHeading: string;
		themeAria: string;
		light: string;
		dark: string;
		navAria: string;
	};
	floatingBar: {
		quickAria: string;
		downloadPdf: string;
		contact: string;
		viewCv: string;
		navigation: string;
		fillCv: string;
		closeAria: string;
		closeLabel: string;
		overlayAria: string;
	};
	print: {
		summaryHeading: string;
		experienceHeading: string;
		projectsHeading: string;
		locationLine: string;
	};
	redirectPage: { to: string; manual: string };
	mailto: { freelanceSubject: string; brokenSubject: string };
	seo: {
		homeTitle: string;
		homeDescription: string;
		cvTitle: string;
		cvDescription: string;
		imageAlt: string;
	};
	pages: { downloadPdf: string; workWithMe: string; impactAria: string };
	notFound: {
		title: string;
		description: string;
		heading: string;
		body: string;
		backLink: string;
		logoAria: string;
		contact: string;
		navAria: string;
		reportLink: string;
	};
}

export const uiCopy: Record<Lang, UICopy> = {
	id: {
		topBar: {
			contact: 'Hubungi saya',
			logoAria: 'Zydhan, ke Home',
			navAria: 'Utama',
			openMenuAria: 'Buka menu',
			switchLangAria: 'Beralih ke Bahasa Indonesia'
		},
		themeToggle: { aria: 'Ganti tema' },
		mobileMenu: {
			dialogAria: 'Menu',
			closeLabel: 'Tutup',
			closeAria: 'Tutup menu',
			logoAria: 'Zydhan, ke Home',
			langHeading: 'Bahasa',
			indonesia: 'Indonesia',
			english: 'English',
			themeHeading: 'Tema',
			themeAria: 'Tema',
			light: 'Terang',
			dark: 'Gelap',
			navAria: 'Menu utama'
		},
		floatingBar: {
			quickAria: 'Aksi cepat',
			downloadPdf: 'Unduh PDF',
			contact: 'Hubungi',
			viewCv: 'Lihat CV',
			navigation: 'Navigasi',
			fillCv: 'Isi CV',
			closeAria: 'Tutup',
			closeLabel: 'Tutup',
			overlayAria: 'Navigasi'
		},
		print: {
			summaryHeading: 'Ringkasan Profesional',
			experienceHeading: 'Pengalaman Kerja',
			projectsHeading: 'Proyek & Tulisan',
			locationLine: 'Surabaya, Indonesia'
		},
		redirectPage: {
			to: 'Memindahkan ke',
			manual: 'Jika tidak dialihkan secara otomatis, klik tautannya.'
		},
		mailto: {
			freelanceSubject: 'Proyek freelance',
			brokenSubject: 'Tautan rusak di zydhan.com'
		},
		seo: {
			homeTitle: 'Zydhan Linnar Putra, backend engineer di Surabaya',
			homeDescription: 'Memimpin tim developer dan mendampingi klien sampai sistemnya dipakai.',
			cvTitle: 'CV — Zydhan Linnar Putra',
			cvDescription:
				'Software engineer dengan fokus back-end (Go, PHP, Node.js) dan arsitektur modern (DDD, CQRS, Hexagonal).',
			imageAlt: 'Kartu profil Zydhan Linnar Putra dengan latar gradien dan tulisan backend engineer di Surabaya.'
		},
		pages: {
			downloadPdf: 'Unduh PDF',
			workWithMe: 'Ajak kerja sama',
			impactAria: 'Dampak'
		},
		notFound: {
			title: 'Halaman tidak ditemukan',
			description: 'Halaman ini tidak ada. Alamatnya mungkin salah ketik, atau halamannya sudah dipindah.',
			heading: 'Halaman ini tidak ada',
			body: 'Alamatnya mungkin salah ketik, atau halamannya sudah dipindah. Dari sini kamu bisa lanjut ke bagian lain.',
			backLink: 'Kembali ke Home',
			logoAria: 'Zydhan, ke Home',
			contact: 'Hubungi saya',
			navAria: 'Halaman yang tersedia',
			reportLink: 'Laporkan tautan rusak'
		}
	},
	en: enChrome
};

export function mailtoFreelanceHref(lang: Lang): string {
	return `mailto:${links.email}?subject=${encodeURIComponent(uiCopy[lang].mailto.freelanceSubject)}`;
}

export function mailtoBrokenHref(lang: Lang): string {
	return `mailto:${links.email}?subject=${encodeURIComponent(uiCopy[lang].mailto.brokenSubject)}`;
}
