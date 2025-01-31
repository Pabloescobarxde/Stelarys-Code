let openFiles = [];  // aca vemos la lista de arhivos abiertos


function openFile() {
    document.getElementById('fileInput').setAttribute('webkitdirectory', 'true');
    document.getElementById('fileInput').click();
}

// Para estrecturar las carpetas y archivos
function loadFile(event) {
    const files = event.target.files;
    if (files.length > 0) {
        const fileExplorer = document.getElementById('file-explorer');
        const fileMap = {};

        // orgranizar
        Array.from(files).forEach((file) => {
            const parts = file.webkitRelativePath.split('/');
            let currentFolder = fileMap;

            // Recorrer las carpetas 
            parts.slice(0, -1).forEach((folder) => {
                if (!currentFolder[folder]) {
                    currentFolder[folder] = {};
                }
                currentFolder = currentFolder[folder];
            });

            
            currentFolder[parts[parts.length - 1]] = file;
        });


        function createFileTree(parentElement, folder) {
            Object.keys(folder).forEach((key) => {
                const fileOrFolder = folder[key];
                const item = document.createElement('div');
                item.classList.add('file-item');

                if (fileOrFolder instanceof File) {
                    // Es un archivo
                    item.textContent = key;
                    item.onclick = function() {
                        loadFileContent(fileOrFolder);  
                    };
                    parentElement.appendChild(item);
                } else {
                    // Es una carpeta
                    item.textContent = key;
                    item.classList.add('folder');
                    const subFolderContainer = document.createElement('div');
                    subFolderContainer.style.display = 'none'; 
                    createFileTree(subFolderContainer, fileOrFolder);
                    item.appendChild(subFolderContainer);
                    item.onclick = function(e) {
                        e.stopPropagation();
                        toggleFolderVisibility(subFolderContainer);
                    };
                    parentElement.appendChild(item);
                }
            });
        }

        fileExplorer.innerHTML = '';
        createFileTree(fileExplorer, fileMap);
    }
}


function toggleFolderVisibility(folder) {
    const isVisible = folder.style.display === 'block';
    folder.style.display = isVisible ? 'none' : 'block';
}
