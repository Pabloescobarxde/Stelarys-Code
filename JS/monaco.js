// editor.js

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });
let editor;

require(['vs/editor/editor.main'], function () {
    monaco.editor.defineTheme('custom-vscode-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', background: '#1E1E1E' },
            { token: 'comment', foreground: '#6A9955' },
            { token: 'keyword', foreground: '#C678DD' },
            { token: 'variable', foreground: '#DCDCDC' },
            { token: 'string', foreground: '#98C379' },
            { token: 'number', foreground: '#D19A66' },
        ],
        colors: {
            'editor.background': '#1E1E1E',
            'editor.foreground': '#DCDCDC',
            'editorCursor.foreground': '#FFCC00',
            'editor.lineHighlightBackground': '#2A2A2A',
            'editor.selectionBackground': '#4E4E4E',
            'editorIndentGuide.background': '#3C3C3C',
            'editorLineNumber.foreground': '#6A6A6A'
        }
    });

    const welcomeMessage = `
        // Bienvenido a Stelarys Code 
        // Soporta de todo HTML, CSS, PYTHON, JAVA Y MAS!
        // Desarrollado por el programador Pablo
        // esto es una pre-beta no aseguro nada! Ademas lo hice por pasa tiempo y en 1 dia:)
        // Si hay soporte en nuestro discord discord.gg/astralix
    `;

    editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        value: welcomeMessage, 
        language: 'javascript',
        theme: 'custom-vscode-dark',
        automaticLayout: true
    });

    editor.onDidChangeCursorPosition(function(e) {
        const cursor = e.position;
        document.getElementById('cursor-position').textContent = `Línea: ${cursor.lineNumber}, Columna: ${cursor.column}`;
    });
});
