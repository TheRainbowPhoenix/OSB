/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			black: 'rgba(0,0,0, <alpha-value>)',
			'hotel-background': 'rgba(var(--color-background), <alpha-value>)',
			'hotel-error': 'rgba(var(--color-error), <alpha-value>)',
			'hotel-info': 'rgba(var(--color-info), <alpha-value>)',
			'hotel-primary': 'rgba(var(--color-primary), <alpha-value>)',
			'hotel-success': 'rgba(var(--color-success), <alpha-value>)',
			'hotel-tertiary': 'rgba(var(--color-tertiary), <alpha-value>)',
			'hotel-warning': 'rgba(var(--color-warning), <alpha-value>)'
		}
	},
	plugins: []
};
