<?php

session_start();

require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $correo = trim($_POST["correo"] ?? "");
    $contrasena = $_POST["contrasena"] ?? "";

    // Verificar que los campos estén completos
    if ($correo === "" || $contrasena === "") {
        die("El correo y la contraseña son obligatorios.");
    }

    // Buscar estudiante por correo
    $sql = "SELECT id, nombre, correo, contrasena, programa, tipo_usuario
            FROM usuarios
            WHERE correo = ?";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Error al preparar la consulta: " . $conn->error);
    }

    $stmt->bind_param("s", $correo);

    $stmt->execute();

    $resultado = $stmt->get_result();

    $usuario = $resultado->fetch_assoc();


    // Verificar contraseña
    if ($usuario && password_verify($contrasena, $usuario["contrasena"])) {

        // Guardar datos en la sesión
        $_SESSION["usuario_id"] = $usuario["id"];
        $_SESSION["nombre"] = $usuario["nombre"];
        $_SESSION["correo"] = $usuario["correo"];
        $_SESSION["programa"] = $usuario["programa"];
        $_SESSION["tipo_usuario"] = $usuario["tipo_usuario"];

        // Enviar los datos al JavaScript
        echo json_encode([
            "estado" => "exito",
            "mensaje" => "Inicio de sesión exitoso.",
            "nombre" => $usuario["nombre"],
            "correo" => $usuario["correo"],
            "programa" => $usuario["programa"],
            "tipo_usuario" => $usuario["tipo_usuario"]
        ]);

    } else {

        echo json_encode([
            "estado" => "error",
            "mensaje" => "Correo o contraseña incorrectos."
        ]);
    }

    $stmt->close();
    $conn->close();
}

?>