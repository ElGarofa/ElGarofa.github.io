<?php
include "conectar.php";

$sql = "SELECT * FROM productos";
$resultado = $conn->query($sql);

$productos = [];

while ($fila = $resultado->fetch_assoc()) {
    $productos[] = $fila;
}

echo json_encode($productos);
?>
