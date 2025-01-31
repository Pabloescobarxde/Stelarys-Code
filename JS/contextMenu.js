// contextMenu.js

function showContextMenu(e, fileItem, file) {
    const contextMenu = document.createElement('div');
    contextMenu.classList.add('context-menu');
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.top = `${e.pageY}px`;

    // Opción de Renombrar
    const renameOption = document.createElement('div');
    renameOption.classList.add('context-menu-item');
    renameOption.innerHTML = `<i class="fas fa-edit"></i> Renombrar`;
    renameOption.addEventListener('click', function() {
        const newName = prompt('Nuevo nombre para el archivo:', file.name);
        if (newName) {
            fileItem.textContent = newName;
            file.name = newName; 
        }
        contextMenu.remove();
    });

    // Opcion de Borrar
    const deleteOption = document.createElement('div');
    deleteOption.classList.add('context-menu-item');
    deleteOption.innerHTML = `<i class="fas fa-trash"></i> Borrar`;
    deleteOption.addEventListener('click', function() {
        if (confirm(`¿Estás seguro de que quieres eliminar ${file.name}?`)) {
            fileItem.remove(); 
        }
        contextMenu.remove();
    });

    // Opcion de Copiar
    const copyOption = document.createElement('div');
    copyOption.classList.add('context-menu-item');
    copyOption.innerHTML = `<i class="fas fa-copy"></i> Copiar`;
    copyOption.addEventListener('click', function() {
        // copia el archivo 
        console.log(`Archivo ${file.name} copiado.`);
        contextMenu.remove();
    });

    // Opcion de Pegar
    const pasteOption = document.createElement('div');
    pasteOption.classList.add('context-menu-item');
    pasteOption.innerHTML = `<i class="fas fa-paste"></i> Pegar`;
    pasteOption.addEventListener('click', function() {
        // Pegar el archivo de alguna forma
        console.log(`Archivo ${file.name} pegado.`);
        contextMenu.remove();
    });

    // Opcion para ver la informacion del archivo
    const infoOption = document.createElement('div');
    infoOption.classList.add('context-menu-item');
    infoOption.innerHTML = `<i class="fas fa-info-circle"></i> Ver información`;
    infoOption.addEventListener('click', function() {
        alert(`Información del archivo:\nNombre: ${file.name}\nTamaño: ${file.size} bytes`);
        contextMenu.remove();
    });

    contextMenu.appendChild(renameOption);
    contextMenu.appendChild(deleteOption);
    contextMenu.appendChild(copyOption);
    contextMenu.appendChild(pasteOption);
    contextMenu.appendChild(infoOption);

    document.body.appendChild(contextMenu);

    document.addEventListener('click', function() {
        contextMenu.remove();
    }, { once: true });
}
