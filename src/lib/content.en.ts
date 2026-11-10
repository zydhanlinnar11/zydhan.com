// English copy draft. Approved draft consumed by ./content.ts (exported as
// `content.en`); keep this file as the single source of the English copy.
// Field order mirrors `content.id` in ./content.ts to keep the two easy to diff.
import { links } from './links';
import type { Content } from './content';

export const enContent: Content = {
	hero: {
		title: 'I lead engineering teams and stay with clients until the system is actually in use.',
		body: 'Zydhan Linnar Putra, backend engineer in Surabaya. I lead 20 developers at ITS and supported the SEVIMA PENA go-live on-site with the client.',
		ctaPrimary: 'View full CV',
		ctaSecondary: 'Work with me'
	},
	freelance: {
		title: 'Open to freelance projects',
		body: 'Any project is worth talking about. What I take on most often: backends and APIs, modernizing legacy systems, and architecture for high load.',
		bodyShort: 'Any project is worth talking about. Most often: backends and APIs, legacy modernization, high-load architecture.'
	},
	stats: [
		{
			value: '1 million+',
			label: 'users of the UTBK-SNBT registration system',
			labelShort: 'UTBK-SNBT users',
			accent: true
		},
		{
			value: '~US$60k',
			label: 'saved per year from SNPMB SSO optimization, about Rp1 billion at 2024 rates',
			labelShort: 'saved per year, about Rp1 billion (2024 rates)'
		},
		{
			value: '140+',
			label: 'apps stayed compatible through the SSO migration to Azure AD',
			labelShort: 'apps stayed compatible'
		},
		{
			value: '15+',
			label: 'interns mentored in DDD and Clean Architecture',
			labelShort: 'interns mentored'
		}
	],
	featuredProjects: [
		{
			date: '2026, leading architecture',
			dateShort: '2026',
			title: 'SEVIMA PENA',
			description:
				'K-12 platform taken from zero to launch, integrated with CBT, SSO, FinanceCloud, and Edufin.',
			descriptionShort: 'K-12 platform taken from zero to launch.',
			chips: ['Go', 'React'],
			href: '/cv#peran-pena'
		},
		{
			date: '2022 – present, full-stack',
			dateShort: '2022 – present',
			title: 'UTBK-SNBT and SNPMB SSO',
			description:
				'National selection registration for 1 million+ users, plus an SSO that saves about Rp1 billion per year.',
			descriptionShort: 'National registration for 1 million+ users.',
			chips: ['Go', 'Firestore', 'Cloud Run'],
			href: '/cv#peran-snpmb'
		},
		{
			date: '2023 – 2025, architect',
			dateShort: '2023 – 2025',
			title: 'ITS Student Enrollment System',
			description:
				'Replacing a 17-year-old PHP 5 system with Go, PostgreSQL, Next.js, and Kafka.',
			descriptionShort: 'Replaced a 17-year-old PHP 5 system.',
			chips: ['Go', 'PostgreSQL', 'Kafka'],
			href: '/cv#peran-dptsi'
		},
		{
			date: '2023 – 2025, initiator',
			dateShort: '2023 – 2025',
			title: 'myITS Portal Mobile',
			description:
				'Cross-platform app for students, staff, and lecturers, targeting 30,000+ users.',
			descriptionShort: 'Cross-platform app, targeting 30,000+ users.',
			chips: ['Expo', 'React Native'],
			href: '/cv#peran-dptsi'
		}
	],
	roles: [
		{
			id: 'peran-pena',
			title: 'Software Engineer at SEVIMA PENA',
			org: 'SEVIMA (PT Sentra Vidya Utama)',
			location: 'Surabaya, on-site',
			period: 'Jan 2026 – present',
			current: true,
			summary: 'Leading the architecture and engineering team for a K-12 product',
			bullets: [
				'Lead the core architecture (Go and React) and engineering team for the K-12 product, from initial setup through launch for ~3,500 students and teachers.',
				'Code review, collaboration with the PM and client, and infrastructure communication with OpSec (databases, monitoring, servers). Introduced an agentic coding workflow to raise team throughput.',
				'Integrated with CBT and SSO in 2 weeks; provided on-site support during go-live for ~2,000 initial users.',
				'Integrated the Sentra Finansial Teknologi platforms (FinanceCloud and Edufin) for financial management and payment aggregation.',
				'Operate tracing, logging, and performance monitoring with Sentry.'
			],
			pdfBullets: [
				'Lead the core architecture (Go, React) and engineering team for the K-12 product, from initial setup through launch for ~3,500 students and teachers.',
				'Integrated CBT and SSO in 2 weeks and provided on-site support at go-live for ~2,000 initial users; coordinated with the PM, client, and OpSec on infrastructure.',
				'Integrated the FinanceCloud and Edufin platforms for financial management and payment aggregation; operate tracing, logging, and monitoring with Sentry.'
			],
			chips: ['Go', 'React', 'SSO', 'Sentry']
		},
		{
			id: 'peran-sevima',
			title: 'Full-stack Developer at SEVIMA',
			org: 'SEVIMA (PT Sentra Vidya Utama)',
			location: '',
			period: 'Sep 2025 – Jan 2026',
			bullets: [
				'Led asynchronous data migration on siAkadCloud (a PHP monolith) using RabbitMQ.',
				'Rebuilt the assessment-flow UI/UX in Edlink (Laravel and Nuxt 2) while keeping API compatibility for mobile apps and the PWA.',
				'Wrote Edlink setup documentation to speed up onboarding.'
			],
			pdfBullets: [
				'Led asynchronous data migration on siAkadCloud (a PHP monolith) using RabbitMQ.',
				'Rebuilt the assessment-flow UI/UX in Edlink (Laravel, Nuxt 2) while keeping API compatibility for mobile apps and the PWA; wrote setup documentation to speed up onboarding.'
			],
			chips: ['Laravel', 'Nuxt', 'RabbitMQ']
		},
		{
			id: 'peran-dptsi',
			title: 'Full-stack Developer at DPTSI ITS',
			org: 'Direktorat Pengembangan Teknologi dan Sistem Informasi',
			pdfOrg: 'DPTSI ITS',
			location: '',
			period: 'Sep 2023 – Aug 2025',
			summary: 'Student enrollment system, SSO proxy, myITS Portal Mobile',
			bullets: [
				'Built the Student Enrollment System (Go, PostgreSQL, Next.js, Kafka), replacing a 17-year-old PHP 5 system.',
				'Built an SSO proxy for Microsoft Entra ID OIDC with MFA support, keeping 140+ applications compatible.',
				'Mentored 15+ interns in DDD and Clean Architecture, led 20 developers, and built an internal Laravel-style Go framework (18 modules).',
				'Initiated the myITS Portal Mobile app (Expo React Native) for 30,000+ users.'
			],
			pdfBullets: [
				'Built the Student Enrollment System (Go, PostgreSQL, Next.js, Kafka), replacing a 17-year-old PHP 5 system.',
				'Built an SSO proxy for Microsoft Entra ID OIDC with MFA support, keeping 140+ applications compatible.',
				'Led 20 developers, mentored 15+ interns in DDD and Clean Architecture, and built an internal Laravel-style Go framework (18 modules).',
				'Initiated the myITS Portal Mobile app (Expo React Native) for 30,000+ users.'
			],
			chips: ['Go', 'Next.js', 'Kafka', 'OIDC', 'React Native']
		},
		{
			id: 'peran-snpmb',
			title: 'Full-stack Engineer at SNPMB',
			org: 'BPPP Kemdiktisaintek, part-time alongside other roles',
			pdfOrg: 'SNPMB BPPP Kemdiktisaintek',
			location: '',
			period: '2022 – present',
			current: true,
			summary: 'National UTBK-SNBT and SSO, part-time in parallel',
			bullets: [
				'Optimized the PHP-based SSO with Cloud Run, saving about US$60,000 per year (about Rp1 billion at 2024 rates).',
				'Designed the UTBK-SNBT registration system (Go, Next.js, Firestore, Google Cloud Storage) used by 1 million+ users.',
				'Coordinated with 10+ developers on data integration and built CI/CD with Cloud Build.',
				'Operate tracing, logging, and performance monitoring for the SSO and UTBK-SNBT with OpenTelemetry.'
			],
			pdfBullets: [
				'Optimized the PHP-based SSO with Cloud Run (serverless), saving about US$60,000 per year (about Rp1 billion at 2024 rates).',
				'Designed the UTBK-SNBT registration system (Go, Next.js, Firestore, Cloud Storage) for 1 million+ users; built CI/CD with Cloud Build.',
				'Coordinated with 10+ developers on data integration; operate tracing and monitoring with OpenTelemetry.'
			],
			chips: ['Go', 'Firestore', 'Cloud Run', 'OpenTelemetry']
		},
		{
			id: 'peran-intern',
			title: 'Web Developer Intern at DPTSI ITS',
			org: '',
			location: '',
			period: 'Aug 2021 – Jun 2023',
			summary: 'Laravel and PHP; micro-frontend research as a thesis',
			bullets: [],
			chips: []
		}
	],
	skills: [
		{ name: 'Backend', items: ['Go', 'PHP / Laravel', 'Node.js', 'Python', 'OIDC / OAuth2'] },
		{ name: 'Frontend', items: ['React', 'Next.js', 'Vue / Nuxt', 'React Native'] },
		{ name: 'Architecture', items: ['DDD', 'CQRS', 'Hexagonal', 'Modular monolith'] },
		{
			name: 'Data, cloud, and observability',
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
		detail: 'B.Sc. in Informatics Engineering, Surabaya',
		period: 'Aug 2019 – Sep 2023'
	},
	writings: [
		{
			title: 'Simple and Easy REST API Implementation with Laravel',
			meta: 'Dev.to',
			href: links.devto,
			cta: 'Read on Dev.to',
			onCv: true
		},
		{
			title: 'Better way to debug Go code in Visual Studio Code',
			meta: 'LinkedIn · 4,432 views',
			href: links.linkedinDebug,
			cta: 'Read on LinkedIn',
			onCv: false
		}
	],
	summary:
		'Software engineer focused on back-end development (Go, PHP, Node.js) and modern architecture (DDD, CQRS, Hexagonal). Leads modernization of legacy systems to Go and Next.js, plus performance optimization that saves about US$60,000 per year (about Rp1 billion at 2024 rates). Used to mentoring junior developers, collaborating across teams, and operating tracing, logging, and performance monitoring — Sentry at SEVIMA PENA, OpenTelemetry at SNPMB SSO and UTBK-SNBT.',
	pdf: {
		headline:
			'Backend-Focused Full-Stack Developer | 5+ Years of Experience | Architect, Systems Modernization & Mentor',
		summary:
			'Software engineer focused on back-end development (Go/PHP/Node.js) and modern architecture (DDD, CQRS, Hexagonal). Experienced in leading modernization of legacy systems to Go and Next.js, and in performance optimization that saves about US$60,000 per year. Used to mentoring junior developers, collaborating across teams, and operating tracing, logging, and performance monitoring (Sentry, OpenTelemetry).',
		projects: [
			{ text: 'Personal portfolio site: https://zydhan.com', href: links.domain },
			{
				text: 'Article on Dev.to: "Simple and Easy REST API Implementation with Laravel"',
				href: links.devto
			}
		]
	},
	tagline:
		'Software Engineer at SEVIMA PENA, leading the core architecture and engineering team. Previously led 20 developers at DPTSI ITS and mentored 15+ interns.',
	experienceNote: 'Professional experience since August 2021 (5+ years)',
	name: 'Zydhan Linnar Putra',
	contact: {
		title: 'Have a system to build or overhaul?',
		body:
			'Tell me what you want to build, when it needs to be done, and the constraints. I reply by email or LinkedIn.',
		bodyShort: 'Tell me what you want to build and when it needs to be done. Replies by email or LinkedIn.',
		ctaEmail: 'Send email',
		ctaLinkedIn: 'Reach me on LinkedIn'
	},
	footer: {
		copyright: '© 2026 Zydhan Linnar Putra',
		github: 'GitHub',
		linkedin: 'LinkedIn'
	},
	sectionTitles: {
		recentRoles: 'Three most recent roles',
		allRoles: 'See all roles on the CV',
		featured: 'Featured projects',
		writings: 'Writing',
		summary: 'Summary',
		experience: 'Experience',
		skills: 'Skills',
		education: 'Education'
	}
};

// UI chrome outside the Content object (aria labels, dialogs, SEO, 404, etc.).
// Key structure is the contract for later tasks — do not rename keys.
export const enChrome = {
	topBar: {
		contact: 'Contact me',
		logoAria: 'Zydhan, go to Home',
		navAria: 'Main navigation',
		openMenuAria: 'Open menu',
		switchLangAria: 'Switch to English'
	},
	themeToggle: {
		aria: 'Toggle theme'
	},
	mobileMenu: {
		dialogAria: 'Menu',
		closeLabel: 'Close',
		closeAria: 'Close menu',
		logoAria: 'Zydhan, go to Home',
		langHeading: 'Language',
		indonesia: 'Indonesia',
		english: 'English',
		themeHeading: 'Theme',
		themeAria: 'Theme',
		light: 'Light',
		dark: 'Dark',
		navAria: 'Main menu'
	},
	floatingBar: {
		quickAria: 'Quick actions',
		downloadPdf: 'Download PDF',
		contact: 'Contact',
		viewCv: 'View CV',
		navigation: 'Navigation',
		fillCv: 'CV contents',
		pageSections: 'Page sections',
		contactSection: 'Contact',
		closeAria: 'Close',
		closeLabel: 'Close',
		overlayAria: 'Navigation'
	},
	print: {
		summaryHeading: 'Professional Summary',
		experienceHeading: 'Work Experience',
		projectsHeading: 'Projects & Writing',
		locationLine: 'Surabaya, Indonesia'
	},
	redirectPage: {
		to: 'Redirecting to',
		manual: 'If you are not redirected automatically, click the link.'
	},
	mailto: {
		freelanceSubject: 'Freelance project',
		brokenSubject: 'Broken link on zydhan.com'
	},
	seo: {
		homeTitle: 'Zydhan Linnar Putra, backend engineer in Surabaya',
		homeDescription: 'Leading engineering teams and staying with clients until the system is actually in use.',
		cvTitle: 'CV — Zydhan Linnar Putra',
		cvDescription: 'Software engineer focused on back-end development (Go, PHP, Node.js) and modern architecture (DDD, CQRS, Hexagonal).',
		imageAlt: 'Profile card of Zydhan Linnar Putra on a gradient background with the text "backend engineer in Surabaya".'
	},
	pages: {
		downloadPdf: 'Download PDF',
		workWithMe: 'Work with me',
		impactAria: 'Impact'
	},
	notFound: {
		title: 'Page not found',
		description: "This page doesn't exist. The address may have a typo, or the page may have moved.",
		heading: "This page doesn't exist",
		body: 'The address may have a typo, or the page has moved. From here you can head to another part of the site.',
		backLink: 'Back to home',
		logoAria: 'Zydhan, go to Home',
		contact: 'Contact me',
		navAria: 'Available pages',
		reportLink: 'Report a broken link'
	}
} as const;
