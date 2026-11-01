export type Theme = 'light' | 'dark';

export function resolveTheme(stored: string | null, systemDark: boolean): Theme {
	if (stored === 'light' || stored === 'dark') return stored;
	return systemDark ? 'dark' : 'light';
}

export function setTheme(theme: Theme): Theme {
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem('theme', theme);
	} catch {
		/* ignore unavailable storage */
	}
	return theme;
}

export function toggleTheme(): Theme {
	const current = document.documentElement.dataset.theme;
	return setTheme(current === 'dark' ? 'light' : 'dark');
}
