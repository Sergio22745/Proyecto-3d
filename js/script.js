// ==========================================
// USUARIO ACTUAL
// ==========================================

var usuarioActual = null;


// ==========================================
// LOADER
// ==========================================

window.onload = function() {

    setTimeout(function() {

        document.getElementById("loader").style.display = "none";
        document.getElementById("contenido").style.display = "block";

    }, 1500);

};


// ==========================================
// MOSTRAR OPCIONES DE REGISTRO
// ==========================================

function mostrarRegistro() {

    document.getElementById("login").style.display = "none";
    document.getElementById("tipoRegistro").style.display = "block";

}


// ==========================================
// MOSTRAR FORMULARIO DE ESTUDIANTE
// ==========================================

function mostrarFormulario() {

    document.getElementById("tipoRegistro").style.display = "none";
    document.getElementById("formulario").style.display = "block";

}


// ==========================================
// REGISTRAR ESTUDIANTE
// ==========================================

function registrarEstudiante() {

    var nombre = document.querySelector('input[name="nombre"]').value.trim();
    var correo = document.querySelector('input[name="correo"]').value.trim();
    var contrasena = document.querySelector('input[name="contrasena"]').value;
    var programa = document.querySelector('input[name="programa"]').value.trim();


    if (
        nombre === "" ||
        correo === "" ||
        contrasena === "" ||
        programa === ""
    ) {

        alert("Por favor completa todos los campos.");
        return;

    }


    var datos = new URLSearchParams();

    datos.append("nombre", nombre);
    datos.append("correo", correo);
    datos.append("contrasena", contrasena);
    datos.append("programa", programa);


    fetch("php/registro.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },

        body: datos.toString()

    })

    .then(function(respuesta) {

        return respuesta.text();

    })

    .then(function(resultado) {

        alert(resultado);


        if (resultado.includes("correctamente")) {

            document.getElementById("formulario").style.display = "none";
            document.getElementById("login").style.display = "block";


            document.querySelector('input[name="nombre"]').value = "";
            document.querySelector('input[name="correo"]').value = "";
            document.querySelector('input[name="contrasena"]').value = "";
            document.querySelector('input[name="programa"]').value = "";

        }

    })

    .catch(function(error) {

        console.error("Error:", error);

        alert("Ocurrió un error al registrar el estudiante.");

    });

}


// ==========================================
// INICIAR SESIÓN
// ==========================================

function iniciarSesion() {

    var correo = document.getElementById("loginCorreo").value.trim();
    var contrasena = document.getElementById("loginContrasena").value;


    if (correo === "" || contrasena === "") {

        alert("Por favor completa el correo y la contraseña.");

        return;

    }


    var datos = new URLSearchParams();

    datos.append("correo", correo);
    datos.append("contrasena", contrasena);


    fetch("php/login.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },

        body: datos.toString()

    })

    .then(function(respuesta) {

        return respuesta.json();

    })

    .then(function(resultado) {


        if (resultado.estado === "exito") {

            usuarioActual = resultado;

            mostrarPanelEstudiante(resultado);

        } else {

            alert(resultado.mensaje);

        }

    })

    .catch(function(error) {

        console.error("Error:", error);

        alert("Ocurrió un error al iniciar sesión.");

    });

}


// ==========================================
// MOSTRAR PANEL DEL ESTUDIANTE
// ==========================================

function mostrarPanelEstudiante(usuario) {

    document.getElementById("contenido").innerHTML =

        '<div class="panel-estudiante">' +

            '<div class="panel-header">' +

                '<div>' +

                    '<h1>Universidad de Cundinamarca</h1>' +

                    '<p>Plataforma de Inducción y Orientación</p>' +

                '</div>' +

                '<button onclick="cerrarSesion()" class="btn-salir">' +
                    'Cerrar sesión' +
                '</button>' +

            '</div>' +


            '<div class="bienvenida">' +

                '<h2>Bienvenido, ' + usuario.nombre + ' 🎓</h2>' +

                '<p>' +
                    'Explora la plataforma y conoce todo lo que la Universidad de Cundinamarca tiene para ti.' +
                '</p>' +

            '</div>' +


            '<div class="menu-panel">' +


                '<div class="menu-card" onclick="mostrarPerfil(usuarioActual)">' +

                    '<div class="menu-icono">👤</div>' +

                    '<h3>Mi perfil</h3>' +

                    '<p>' +
                        'Consulta tu información personal y académica.' +
                    '</p>' +

                '</div>' +


                '<div class="menu-card" onclick="mostrarNavegacion3D()">' +

                    '<div class="menu-icono">🗺️</div>' +

                    '<h3>Navegación 3D</h3>' +

                    '<p>' +
                        'Explora virtualmente el campus y sus diferentes espacios.' +
                    '</p>' +

                '</div>' +


                '<div class="menu-card" onclick="mostrarInformacionU()">' +

                    '<div class="menu-icono">🏫</div>' +

                    '<h3>Información de la U</h3>' +

                    '<p>' +
                        'Conoce la información presentada durante la inducción.' +
                    '</p>' +

                '</div>' +


            '</div>' +

        '</div>';

}


// ==========================================
// MOSTRAR MI PERFIL
// ==========================================

function mostrarPerfil(usuario) {

    document.getElementById("contenido").innerHTML =

        '<div class="panel-estudiante">' +


            '<div class="panel-header">' +

                '<div>' +

                    '<h1>Mi perfil</h1>' +

                    '<p>Información del estudiante</p>' +

                '</div>' +


                '<button onclick="mostrarPanelEstudiante(usuarioActual)" class="btn-salir">' +
                    'Volver' +
                '</button>' +

            '</div>' +


            '<div class="perfil-card">' +

                '<div class="perfil-icono">👤</div>' +

                '<h2>' + usuario.nombre + '</h2>' +


                '<p>' +

                    '<strong>Correo:</strong> ' +

                    usuario.correo +

                '</p>' +


                '<p>' +

                    '<strong>Programa académico:</strong> ' +

                    usuario.programa +

                '</p>' +


                '<p>' +

                    '<strong>Tipo de usuario:</strong> ' +

                    usuario.tipo_usuario +

                '</p>' +


            '</div>' +

        '</div>';

}


// ==========================================
// NAVEGACIÓN 3D
// ==========================================

function mostrarNavegacion3D() {

    document.getElementById("contenido").innerHTML =

        '<div class="panel-estudiante">' +

            '<div class="panel-header">' +

                '<div>' +

                    '<h1>Navegación 3D</h1>' +

                    '<p>Explora el campus universitario</p>' +

                '</div>' +


                '<button onclick="mostrarPanelEstudiante(usuarioActual)" class="btn-salir">' +
                    'Volver' +
                '</button>' +

            '</div>' +


            '<div class="bienvenida">' +

                '<h2>Campus Universitario 🗺️</h2>' +

                '<p>' +

                    'Aquí estará disponible el sistema de navegación 3D para conocer las diferentes instalaciones de la Universidad de Cundinamarca.' +

                '</p>' +

            '</div>' +


            '<div class="menu-panel">' +

                '<div class="menu-card">' +

                    '<div class="menu-icono">🏫</div>' +

                    '<h3>Aulas</h3>' +

                    '<p>Ubicación de los diferentes espacios académicos.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">📚</div>' +

                    '<h3>Biblioteca</h3>' +

                    '<p>Conoce la ubicación y los servicios de la biblioteca.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">🍽️</div>' +

                    '<h3>Cafetería</h3>' +

                    '<p>Encuentra la cafetería dentro del campus.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">🎤</div>' +

                    '<h3>Auditorios</h3>' +

                    '<p>Consulta la ubicación de los auditorios.</p>' +

                '</div>' +


            '</div>' +

        '</div>';

}


// ==========================================
// INFORMACIÓN DE LA UNIVERSIDAD
// ==========================================

function mostrarInformacionU() {

    document.getElementById("contenido").innerHTML =

        '<div class="panel-estudiante">' +

            '<div class="panel-header">' +

                '<div>' +

                    '<h1>Información de la U</h1>' +

                    '<p>Información para estudiantes</p>' +

                '</div>' +


                '<button onclick="mostrarPanelEstudiante(usuarioActual)" class="btn-salir">' +
                    'Volver' +
                '</button>' +

            '</div>' +


            '<div class="bienvenida">' +

                '<h2>Conoce tu Universidad 🏫</h2>' +

                '<p>' +

                    'Consulta información importante que hace parte del proceso de inducción universitaria.' +

                '</p>' +

            '</div>' +


            '<div class="menu-panel">' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">📖</div>' +

                    '<h3>Historia</h3>' +

                    '<p>Conoce la historia de la Universidad de Cundinamarca.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">🎯</div>' +

                    '<h3>Misión y visión</h3>' +

                    '<p>Conoce la misión y visión institucional.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">⭐</div>' +

                    '<h3>Principios y valores</h3>' +

                    '<p>Conoce los principios y valores institucionales.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">🤝</div>' +

                    '<h3>Bienestar Universitario</h3>' +

                    '<p>Conoce los servicios y programas de bienestar.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">📋</div>' +

                    '<h3>Derechos y deberes</h3>' +

                    '<p>Información importante para los estudiantes.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">📚</div>' +

                    '<h3>Reglamento estudiantil</h3>' +

                    '<p>Consulta información sobre las normas universitarias.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">🏥</div>' +

                    '<h3>Servicios de salud</h3>' +

                    '<p>Conoce los servicios de atención disponibles.</p>' +

                '</div>' +


                '<div class="menu-card">' +

                    '<div class="menu-icono">⚽</div>' +

                    '<h3>Cultura y deporte</h3>' +

                    '<p>Conoce las actividades culturales y deportivas.</p>' +

                '</div>' +


            '</div>' +

        '</div>';

}


// ==========================================
// CERRAR SESIÓN
// ==========================================

function cerrarSesion() {

    fetch("php/logout.php")

    .then(function(respuesta) {

        return respuesta.text();

    })

    .then(function(resultado) {

        alert(resultado);

        usuarioActual = null;

        location.reload();

    })

    .catch(function(error) {

        console.error("Error:", error);

        alert("No se pudo cerrar la sesión.");

    });

}


// ==========================================
// VOLVER AL LOGIN
// ==========================================

function volverLogin() {

    document.getElementById("formulario").style.display = "none";

    document.getElementById("tipoRegistro").style.display = "none";

    document.getElementById("login").style.display = "block";

}


// ==========================================
// INGRESAR COMO INVITADO
// ==========================================

function ingresarInvitado() {

    document.getElementById("contenido").innerHTML =

        '<div class="card">' +

            '<h1>Bienvenido Invitado 👤</h1>' +

            '<p>Acceso limitado al sistema.</p>' +

            '<button onclick="location.reload()">' +
                'Cerrar sesión' +
            '</button>' +

        '</div>';

}


// ==========================================
// MENSAJE DE PRUEBA
// ==========================================

console.log("SCRIPT NUEVO CARGADO");