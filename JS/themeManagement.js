// themeManagement.js

function toggleTheme() {
    const currentTheme = monaco.editor.getTheme();
    if (currentTheme === 'vs') {
        monaco.editor.setTheme('vs-dark');
    } else {
        monaco.editor.setTheme('vs');
    }
}
