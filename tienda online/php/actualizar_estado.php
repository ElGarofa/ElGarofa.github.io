<?php
session_start();
if (!isset($_SESSION['admin'])) {
  header("Location: login.php");
  exit;
}
include "conectar.php";
$id = $_POST['id'] ?? null;
if ($id) {
  $stmt = $conn->prepare("UPDATE pedidos SET estado = 'Procesado' WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
}
header("Location: admin.php");
