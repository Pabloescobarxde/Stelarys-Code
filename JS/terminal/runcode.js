document.addEventListener("DOMContentLoaded", function() {
    function runCode() {
        const code = editor.getValue(); 
        const fileExtension = fileToSave ? fileToSave.name.split('.').pop().toLowerCase() : ''; 

        try {
            if (fileExtension === 'js') {
                
                eval(code);
            } else if (fileExtension === 'py') {
                
                runPython(code);
            } else {
                alert("Solo se puede ejecutar código JavaScript o Python por ahora.");
            }
        } catch (error) {
            console.error("Error al ejecutar el código:", error);
            alert("Hubo un error al ejecutar el código. Revisa la consola.");
        }
    }

    
    function runPython(code) {
        const outputElement = document.getElementById('output');
        
       
        if (outputElement) {
            outputElement.textContent = '';
        } else {
            console.error("No se encontró el div 'output'.");
            return;
        }

        
        Sk.configure({
            output: function(text) {
               
                outputElement.textContent += text;  
            },
            read: function(x) {
                
                throw "File access is not supported!";
            }
        });

        // Ejecutar el código Python
        Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, code);
        }).then(function() {
            console.log("Cidigo Python ejecutado exitosamente.");
        }).catch(function(err) {
            console.error("Error al ejecutar el código Python:", err);
            if (outputElement) {
                outputElement.textContent = "Error al ejecutar el código Python: " + err;
            }
        });
    }
});
