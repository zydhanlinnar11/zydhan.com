export type IconName =
	| 'menu'
	| 'close'
	| 'chevron-right'
	| 'arrow-right'
	| 'download'
	| 'mail'
	| 'moon'
	| 'check'
	| 'file';

export const icons: Record<IconName, string> = {
	menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
	close: '<path d="M6 6l12 12M18 6L6 18"/>',
	'chevron-right': '<path d="M9 6l6 6-6 6"/>',
	'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
	download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
	mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/>',
	moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
	check: '<path d="M5 12l5 5 9-10"/>',
	file: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>'
};
