<?php
include "conectar.php";

$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$productos = $_POST['productos'] ?? '';
$total = $_POST['total'] ?? 0;

if ($nombre && $email && $productos) {
  $stmt = $conn->prepare("INSERT INTO pedidos (nombre_cliente, email_cliente, productos, total) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("sssd", $nombre, $email, $productos, $total);
  $stmt->execute();

  echo "<h2>✅ ¡Gracias por tu compra, $nombre!</h2>";
  echo "<p>Revisá tu correo: $email</p>";
  echo "<a href='generar_pdf.php?nombre=".urlencode($nombre)."&email=$email&productos=".urlencode($productos)."&total=$total' target='_blank'>📄 Descargar recibo (PDF)</a>";

} else {
  echo "<p>❌ Faltan datos. Intentá nuevamente.</p>";
}
?>
