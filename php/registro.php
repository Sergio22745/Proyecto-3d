```php
<?php

require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nombre = trim($_POST["nombre"] ?? "");
    $correo = trim($_POST["correo"] ?? "");
    $contrasena = $_POST["contrasena"] ?? "";
    $programa = trim($_POST["programa"] ?? "");

    if ($nombre === "" || $correo === "" || $contrasena === "" || $programa === "") {
        die("Todos los campos son obligatorios.");
    }

    $contrasena_segura = password_hash($contrasena, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (nombre, correo, contrasena, programa)
            VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Error al preparar el registro: " . $conn->error);
    }

    $stmt->bind_param("ssss", $nombre, $correo, $contrasena_segura, $programa);

    if ($stmt->execute()) {
        echo "Estudiante registrado correctamente.";
    } else {
        echo "Error al registrar el estudiante: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}

?>
```
