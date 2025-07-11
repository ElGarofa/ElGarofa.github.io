<?php
$host = "localhost";
$usuario = "root";
$contrasena = "";
$bd = "tienda";

$conn = new mysqli($host, $usuario, $contrasena, $bd);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
