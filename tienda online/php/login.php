<?php
session_start();
$usuario = $_POST['usuario'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';

if ($usuario === 'admin' && $contrasena === '1234') {
  $_SESSION['admin'] = true;
  header("Location: admin.php");
} else {
  echo "<form method='POST'>
    <input name='usuario' placeholder='Usuario'>
    <input name='contrasena' type='password' placeholder='Contraseña'>
    <button>Ingresar</button>
  </form>";
}
?>
