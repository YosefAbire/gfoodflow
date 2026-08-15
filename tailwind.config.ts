import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          bg: '#09281C',
          activeBg: '#144A35',
          text: '#A3B1AA',
          textActive: '#FFFFFF',
        },
        primaryGreen: '#155D3B',
        accentBrown: '#7C4A21',
        accentPeach: '#F7A361',
      },
    },
  },
  plugins: [],
};

export default config;
