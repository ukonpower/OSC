import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { FileWriter } from './plugins/FileWriter';
import { HotGetRemover } from './plugins/HotGetRemover';
import { OREngineFileSystemPlugin } from './plugins/OREngineFileSystem';
import { ResourceManager } from './plugins/ResourceManager';
import { ShaderComponentRegistry } from './plugins/ShaderComponentRegistry';
import { ShaderLoader } from "./plugins/ShaderLoader";


const basePath = process.env.BASE_PATH ?? "";

// https://vitejs.dev/config/
export default defineConfig( {
	root: 'src',
	publicDir: 'assets',
	base: basePath,
	server: {
		port: 3000,
		host: "0.0.0.0",
		watch: {
			ignored: [ "**/data/**/**.json" ],
		},
		hmr: {
			overlay: false,
		},
	},
	build: {
		outDir: '../dist/',
		rollupOptions: {
			input: './src/index.html'
		}
	},
	resolve: {
		alias: {
			"glpower": path.join( __dirname, "packages/glpower/src" ),
			"maxpower": path.join( __dirname, "packages/maxpower" ),
			"orengine": path.join( __dirname, "packages/orengine" ),
			"~": path.join( __dirname, "src" ),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
	plugins: [
		HotGetRemover(),
		FileWriter(),
		react(),
		OREngineFileSystemPlugin(),
		ShaderLoader( {
			skipMinifier: process.env.SKIP_SHADER_MINIFIER === 'true',
		} ),
		ResourceManager(),
		ShaderComponentRegistry(),
	],
	define: {
		BASE_PATH: `"${basePath}"`,
		IS_EDITOR: 'true',
	}
} );
