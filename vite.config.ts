import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { FileWriter } from './plugins/FileWriter';
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
	logLevel: 'warn',
	build: {
		outDir: '../dist/',
		rollupOptions: {
			input: './src/index.html'
		}
	},
	resolve: {
		alias: {
			"glpower": path.join( __dirname, "packages/glpower/packages/glpower/src" ),
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
		react(),
		OREngineFileSystemPlugin(),
		ShaderLoader( {
			skipMinifier: true,
		} ),
		ResourceManager(),
		ShaderComponentRegistry(),
		FileWriter(),
	],
	define: {
		BASE_PATH: `"${basePath}"`,
	}
} );
