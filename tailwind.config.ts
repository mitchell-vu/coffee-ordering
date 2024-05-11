import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              '50': '#fff9ed',
              '100': '#fff2d5',
              '200': '#fee0aa',
              '300': '#fec973',
              '400': '#fca73b',
              '500': '#fa8c16',
              '600': '#eb700b',
              '700': '#c3550b',
              '800': '#9b4311',
              '900': '#7c3812',
              DEFAULT: '#fa8c16',
            },
          },
        },
      },
    }),
  ],
};
export default config;
