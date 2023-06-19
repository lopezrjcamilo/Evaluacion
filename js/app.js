$(document).ready(function() {
    
    $('#listar').on('click', function() {
        let curso = $('#curso').val();
        if (curso === '') {
            listarTodosLosEstudiantes();
        } else {
            listarEstudiantesPorCategoria(curso);
        }
    });
        //todos los estudiantes
        function listarTodosLosEstudiantes() {
            let tabla = document.querySelector('#tabla');
            tabla.innerHTML = '<tr><th>Cod</th><th>Nombre</th><th>Apellido</th><th>Curso</th><th>Nota1</th><th>Nota2</th><th>Nota3</th><th>Promedio</th></tr>';
            $.ajax({
                url: "http://localhost:8080/listarTodosLosEstudiantes",
                type: "GET",
                dataType: "JSON",
                success: function(respuesta) {
                    console.log(respuesta);
                    for (let i = 0; i < respuesta.length; i++) {
                        tabla.innerHTML += '<tr><td>' + respuesta[i].cod +
                            '</td><td>' + respuesta[i].nombre +
                            '</td><td>' + respuesta[i].apellido +
                            '</td><td>' + respuesta[i].curso +
                            '</td><td>' + respuesta[i].nota1 +
                            '</td><td>' + respuesta[i].nota2 +
                            '</td><td>' + respuesta[i].nota3 +
                            '</td><td>' + respuesta[i].promedio +
                            '</td></tr>';
                    }
                }
            });
        }
    
        //estudiantes por categoría
        function listarEstudiantesPorCategoria(curso) {
            let tabla = document.querySelector('#tabla');
            tabla.innerHTML = '<tr><th>Cod</th><th>Nombre</th><th>Apellido</th><th>Curso</th><th>Nota1</th><th>Nota2</th><th>Nota3</th><th>Promedio</th></tr>';
            $.ajax({
                url: "http://localhost:8080/listarPersonasPorCategoria/" + curso,
                type: "GET",
                dataType: "JSON",
                success: function(respuesta) {
                    console.log(respuesta);
                    for (let i = 0; i < respuesta.length; i++) {
                        tabla.innerHTML += '<tr><td>' + respuesta[i].cod +
                            '</td><td>' + respuesta[i].nombre +
                            '</td><td>' + respuesta[i].apellido +
                            '</td><td>' + respuesta[i].curso +
                            '</td><td>' + respuesta[i].nota1 +
                            '</td><td>' + respuesta[i].nota2 +
                            '</td><td>' + respuesta[i].nota3 +
                            '</td><td>' + respuesta[i].promedio +
                            '</td></tr>';
                    }
                }
            });
        }


    // Insertar
    $('#botonEnviar').on('click', function() {
        var curso = $('#curso').val();
        let datos = {
            nombre: $('#nombre').val(),
            apellido: $('#apellido').val(),
            curso: curso,
            nota1: parseFloat($('#notaUno').val()),
            nota2: parseFloat($('#notaDos').val()),
            nota3: parseFloat($('#notaTres').val()),
        };
        let datosEnvio = JSON.stringify(datos);
        $.ajax({
            url: "http://localhost:8080/insertarPersonaPorCategoria/" + curso,
            type: "POST",
            data: datosEnvio,
            contentType: "application/json",
            dataType: "json",
            success: function(respuesta) {
                console.log(respuesta);
            }
        });
    });

    //estudiantes aprobados
    $('#listar-aprobados').on('click', function() {
        listarEstudiantesAprobados();
    });

    function listarEstudiantesAprobados() {
        let tabla = document.querySelector('#tabla');
        tabla.innerHTML = '';
        $.ajax({
            url: "http://localhost:8080/listarEstudiantesAprobados",
            type: "GET",
            dataType: "JSON",
            success: function(respuesta) {
                console.log(respuesta);
                tabla.innerHTML = '<tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Curso</th><th>Nota 1</th><th>Nota 2</th><th>Nota 3</th><th>Promedio</th></tr>';
                for (let i = 0; i < respuesta.length; i++) {
                    tabla.innerHTML += '<tr><td>' + respuesta[i].cod +
                        '</td><td>' + respuesta[i].nombre +
                        '</td><td>' + respuesta[i].apellido +
                        '</td><td>' + respuesta[i].curso +
                        '</td><td>' + respuesta[i].nota1 +
                        '</td><td>' + respuesta[i].nota2 +
                        '</td><td>' + respuesta[i].nota3 +
                        '</td><td>' + respuesta[i].promedio +
                        '</td></tr>';
                }
            }
        });
    }
});
