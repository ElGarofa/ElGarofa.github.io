<?php
include "db.php";

$nombre = $_POST['nombre'];
$rango = $_POST['rango'];

$foto = "";

if(isset($_FILES['foto'])){
$foto = base64_encode(file_get_contents($_FILES['foto']['tmp_name']));
}

$sql = "INSERT INTO players (nombre,rango,foto)
VALUES ('$nombre','$rango','$foto')";

$conn->query($sql);
?>