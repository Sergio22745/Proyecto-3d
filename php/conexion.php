<?php

$servidor = "127.0.0.1";
$usuario = "root";
$contrasena = "1077112324";
$baseDatos = "sistema_udec";

$conn = new mysqli(
    $servidor,
    $usuario,
    $contrasena,
    $baseDatos
);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");



?>