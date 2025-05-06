// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Catalyst Docs',
			customCss: [
				'./src/styles/custom.css',
			  ],
			social: [
				{icon: 'github', label: 'GitHub', href: 'https://github.com/voovai/voovdocs'},
			],
			sidebar: [
				{
					label: 'Docs',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
