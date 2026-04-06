<?php
session_start();
include "db.php";

if($_POST){

$username = $_POST['username'];
$password = $_POST['password'];

$res = $conn->query("SELECT * FROM users WHERE username='$username'");
$user = $res->fetch_assoc();

if($user && password_verify($password,$user['password'])){
$_SESSION['user']=$user;
header("Location: index.php");
}else{
$error = "Datos incorrectos";
}
}
?>

<form method="POST" class="login-box">
<h2>Login</h2>

<input name="username" placeholder="Usuario" required>
<input type="password" name="password" placeholder="Contraseña" required>

<button>Entrar</button>

<?php if(isset($error)) echo "<p>$error</p>"; ?>

<a href="register.php">Registrarse</a>
</form>