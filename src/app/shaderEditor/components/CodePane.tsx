import Editor, { OnMount } from '@monaco-editor/react';
import { useCallback, useEffect, useState } from 'react';

interface CodePaneProps {
	code: string;
	onChange: ( value: string | undefined ) => void;
}

export const CodePane = ( { code, onChange }: CodePaneProps ) => {

	// スマホ判定（768px以下）
	const [ isMobile, setIsMobile ] = useState( window.innerWidth <= 768 );

	useEffect( () => {

		const handleResize = () => {

			setIsMobile( window.innerWidth <= 768 );

		};

		window.addEventListener( 'resize', handleResize );

		return () => {

			window.removeEventListener( 'resize', handleResize );

		};

	}, [] );

	// Monaco Editorマウント時にGLSL言語定義を登録
	const handleEditorMount: OnMount = useCallback( ( editor, monaco ) => {

		// GLSL言語が未登録の場合のみ登録
		const languages = monaco.languages.getLanguages();
		const glslExists = languages.some( lang => lang.id === 'glsl' );

		if ( ! glslExists ) {

			// GLSL言語を登録
			monaco.languages.register( { id: 'glsl' } );

			// GLSLのトークン定義（シンタックスハイライト）
			monaco.languages.setMonarchTokensProvider( 'glsl', {
				keywords: [
					'attribute', 'const', 'uniform', 'varying', 'break', 'continue', 'do', 'for', 'while',
					'if', 'else', 'in', 'out', 'inout', 'float', 'int', 'void', 'bool', 'true', 'false',
					'lowp', 'mediump', 'highp', 'precision', 'invariant', 'discard', 'return', 'mat2',
					'mat3', 'mat4', 'vec2', 'vec3', 'vec4', 'ivec2', 'ivec3', 'ivec4', 'bvec2', 'bvec3',
					'bvec4', 'sampler2D', 'samplerCube', 'struct', 'layout'
				],
				typeKeywords: [
					'float', 'int', 'bool', 'vec2', 'vec3', 'vec4', 'ivec2', 'ivec3', 'ivec4',
					'bvec2', 'bvec3', 'bvec4', 'mat2', 'mat3', 'mat4', 'sampler2D', 'samplerCube'
				],
				operators: [
					'=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
					'&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
					'<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
					'%=', '<<=', '>>=', '>>>='
				],
				symbols: /[=><!~?:&|+\-*/^%]+/,
				tokenizer: {
					root: [
						[ /[a-z_$][\w$]*/, {
							cases: {
								'@typeKeywords': 'keyword.type',
								'@keywords': 'keyword',
								'@default': 'identifier'
							}
						} ],
						[ /[A-Z][\w$]*/, 'type.identifier' ],
						{ include: '@whitespace' },
						[ /[{}()[\]]/, '@brackets' ],
						[ /@symbols/, {
							cases: {
								'@operators': 'operator',
								'@default': ''
							}
						} ],
						[ /\d*\.\d+([eE][-+]?\d+)?[fF]?/, 'number.float' ],
						[ /0[xX][0-9a-fA-F]+/, 'number.hex' ],
						[ /\d+/, 'number' ],
						[ /[;,.]/, 'delimiter' ],
						[ /"([^"\\]|\\.)*$/, 'string.invalid' ],
						[ /"/, { token: 'string.quote', bracket: '@open', next: '@string' } ],
					],
					comment: [
						[ /[^/*]+/, 'comment' ],
						[ /\/\*/, 'comment', '@push' ],
						[ /\*\//, 'comment', '@pop' ],
						[ /[/*]/, 'comment' ]
					],
					string: [
						[ /[^\\"]+/, 'string' ],
						[ /\\./, 'string.escape.invalid' ],
						[ /"/, { token: 'string.quote', bracket: '@close', next: '@pop' } ]
					],
					whitespace: [
						[ /[ \t\r\n]+/, 'white' ],
						[ /\/\*/, 'comment', '@comment' ],
						[ /\/\/.*$/, 'comment' ],
						[ /#.*$/, 'preprocessor' ],
					],
				},
			} );

		}

	}, [] );

	return (
		<div className="shader-editor__pane shader-editor__pane--code">
			<Editor
				height="100%"
				defaultLanguage="glsl"
				language="glsl"
				theme="vs-dark"
				value={code}
				onChange={onChange}
				onMount={handleEditorMount}
				options={{
					minimap: { enabled: ! isMobile },
					fontSize: 14,
					lineNumbers: 'on',
					renderWhitespace: 'selection',
					tabSize: 2,
					automaticLayout: true,
					scrollBeyondLastLine: false,
					wordWrap: 'on',
				}}
			/>
		</div>
	);

};
