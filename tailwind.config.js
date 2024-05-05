import { tailwindTransform } from 'postcss-lit';

export const content = {
    files: ['src/**/*.{ts,css,js,html}'],
    transform: {
        ts: tailwindTransform,
    },
};
export const theme = {
    container: {
        center: true,
    },
    extend: {},
};
export const plugins = [];
