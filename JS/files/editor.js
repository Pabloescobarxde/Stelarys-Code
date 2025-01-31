let fileToSave = null; 


function loadFileContent(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        let language = 'javascript';

        switch (fileExtension) {
            case 'js': language = 'javascript'; break;
            case 'py': language = 'python'; break;
            case 'java': language = 'java'; break;
            case 'html': language = 'html'; break;
            case 'css': language = 'css'; break;
            case 'json': language = 'json'; break;
            case 'ts': language = 'typescript'; break;
            default: language = 'plaintext'; break;
        }

        // crea una nueva pestaña para el archivo
        if (!openFiles.includes(file.name)) {
            openFiles.push(file.name);
            const tabContainer = document.getElementById('tabs-container');
            const tab = document.createElement('div');
            tab.classList.add('tab');
            tab.textContent = file.name;
            const closeButton = document.createElement('span');
            closeButton.classList.add('tab-close');
            closeButton.textContent = '×';
            closeButton.onclick = function() {
                closeTab(file.name);
            };
            tab.appendChild(closeButton);
            tab.onclick = function() {
                switchTab(file.name, e.target.result, language);
            };
            tabContainer.appendChild(tab);
        }

        // le damos lenguaje a cada archivo
        editor.getModel().setLanguage(language);
        editor.setValue(e.target.result);
        fileToSave = file; 
    };
    reader.readAsText(file);
}


function switchTab(fileName, content, language) {
    editor.getModel().setLanguage(language);
    editor.setValue(content);
    

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent === fileName) {
            tab.classList.add('active');
        }
    });
}


function closeTab(fileName) {
    const tabContainer = document.getElementById('tabs-container');
    const tab = Array.from(tabContainer.children).find(t => t.textContent.startsWith(fileName));
    
    if (tab) {
        tabContainer.removeChild(tab);
        openFiles = openFiles.filter(file => file !== fileName);
    }

    const tabs = document.querySelectorAll('.tab');
    if (tabs.length > 0) {
        const firstTab = tabs[0];
        firstTab.classList.add('active');
        loadFileContent({name: firstTab.textContent, content: firstTab.textContent}); 
    }
}


function saveFile() {
    if (fileToSave) {
        const blob = new Blob([editor.getValue()], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileToSave.name;
        link.click(); 
    }
}


let saveTimeout;
editor.onDidChangeModelContent(() => {
    
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveFile, 1000);  // es un test:)
});
