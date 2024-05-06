import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-import-css';

export default {
    input: './src/my-element.ts',
    output: {
        file: 'dist/chat-element.bundle.js',
        format: 'iife',
        name: 'MyCustomElement',
    },
    plugins: [nodeResolve(), commonjs(), typescript(), terser(), json(), css()],
};
