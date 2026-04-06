<?php
include "db.php";

if($_POST){

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$role = $_POST['role'];

$conn->query("INSERT INTO users (username,password,role)
VALUES ('$username','$password','$role')");

echo "Cuenta creada <a href='login.php'>Login</a>";
}
?>

<form method="POST" class="login-box">

<h2>Registro</h2>

<input name="username" placeholder="Usuario" required>
<input type="password" name="password" placeholder="Contraseña" required>

<select name="role">
<option value="jugador">Jugador</option>
<option value="organizador">Organizador</option>
</select>

<button>Crear cuenta</button>

</form>