// cierra la consola
function closeConsole() {
    const consoleDiv = document.getElementById('console');
    consoleDiv.style.display = 'none'; // ocultar/cerrar consola por completo
}

function runCode() {
    if (!fileToSave) {
        alert("No hay archivo abierto para ejecutar.");
        return;
    }

    const fileExtension = fileToSave.name.split('.').pop().toLowerCase();
    const code = editor.getValue();

    // aca nos aseguramos de que la consola este visible
    const consoleDiv = document.getElementById('console');
    consoleDiv.style.display = 'block'; // Muestra la consola
    consoleDiv.innerHTML = ''; // limpia la consola para nuevos resultados

    switch (fileExtension) {
        case 'py':
            runPythonCode(code);
            break;
        case 'js':
            runJavaScriptCode(code);
            break;
        case 'html':
            runHTMLCode(code);
            break;
        case 'java':
            runJavaCode(code);
            break;
        case 'cpp':
            runCppCode(code);
            break;
        case 'ts':
            runTypeScriptCode(code);
            break;
        default:
            appendToConsole(`No se puede ejecutar este tipo de archivo: ${fileExtension}`);
    }
}

function runPythonCode(code) {
    try {
        let pythonScript = document.createElement('script');
        pythonScript.type = 'text/python';
        pythonScript.innerHTML = `
            from browser import document

            def print(*args):
                message = ' '.join(map(str, args))
                append_to_console(message)

            def append_to_console(message):
                consoleDiv = document['console']
                newMessage = document.createElement('div')
                newMessage.text = message
                consoleDiv.appendChild(newMessage)
                consoleDiv.scrollTop = consoleDiv.scrollHeight

            ${code}
        `;
        document.body.appendChild(pythonScript);
        brython();
    } catch (error) {
        appendToConsole(`Error en el código Python: ${error.message}`);
    }
}

function runJavaScriptCode(code) {
    try {
        eval(code);
    } catch (error) {
        appendToConsole(`Error en el código JavaScript: ${error.message}`);
    }
}

function runHTMLCode(code) {
    const newWindow = window.open();
    newWindow.document.write(code);
    newWindow.document.close();
}

function runJavaCode(code) {
    appendToConsole('El código Java necesita un backend para ejecutarse.');
}

function runCppCode(code) {
    appendToConsole('El código C++ necesita un backend para ejecutarse.');
}

function runTypeScriptCode(code) {
    const ts = window.TypeScript;
    const jsCode = ts.transpile(code);
    runJavaScriptCode(jsCode);
}

function appendToConsole(message) {
    const consoleDiv = document.getElementById('console');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    consoleDiv.appendChild(newMessage);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

// una prebeta de console.js/Se estara metiendo nuevas compatibilidades durante tiempo/Att: Pablo