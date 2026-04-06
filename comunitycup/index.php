<?php
session_start();
if(!isset($_SESSION['user'])){
header("Location: login.php");
exit;
}

$user = $_SESSION['user'];
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Community Cup</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>

<body>

<!-- NAV -->
<nav class="navbar px-4">
<span class="logo">Community Cup</span>

<div>
<span onclick="go('inicio')">Inicio</span>
<span onclick="go('participantes')">Participantes</span>

<?php if($user['role']=="organizador"): ?>
<span onclick="go('sistema')">Sistema</span>
<span onclick="go('torneo')">Torneo</span>
<?php endif; ?>

<a href="logout.php">Salir</a>
</div>
</nav>

<!-- HERO -->
<section id="inicio" class="hero">
<div>
<h1 class="hero-title">QUIÉN SERÁ EL MEJOR</h1>
<p>Evento competitivo Pokémon</p>
</div>
</section>

<!-- PARTICIPANTES -->
<section id="participantes" class="section container">

<h2 class="title">PARTICIPANTES</h2>

<div class="card-ui row">

<?php if($user['role']=="organizador"): ?>
<div class="col-md-6">

<h5>Crear jugador</h5>

<input id="nombre" placeholder="Nombre" class="form-control mb-2">

<select id="rango" class="form-control mb-2">
<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>
</select>

<input id="foto" type="file" class="form-control mb-2">

<button class="btn-main w-100" onclick="crearJugador()">Crear</button>

<hr>
</div>
<?php endif; ?>

<div class="col-md-6">

<h5>Lista</h5>
<div id="players"></div>

<h5 class="mt-3">Perfil</h5>
<div id="perfil">Selecciona jugador</div>

</div>

</div>
</section>

<!-- SISTEMA SOLO ORGANIZADOR -->
<?php if($user['role']=="organizador"): ?>

<section id="sistema" class="section container">

<h2 class="title">SISTEMA</h2>

<div class="row">

<div class="col-md-3">
<div class="card-ui text-center">
<h5>💰 Monedas</h5>
<h2 id="coins">0</h2>
</div>
</div>

<div class="col-md-3">
<div class="card-ui text-center">
<h5>🎯 Misiones</h5>
<a href="misiones.php" class="btn-main w-100">Ver</a>
</div>
</div>

<div class="col-md-3">
<div class="card-ui text-center">
<h5>🛒 Tienda</h5>
<a href="tienda.php" class="btn-main w-100">Ver</a>
</div>
</div>

<div class="col-md-3">
<div class="card-ui text-center">
<h5>🃏 Comodines</h5>
<a href="comodines.php" class="btn-main w-100">Ver</a>
</div>
</div>

</div>

<div class="card-ui mt-4 text-center">
<h5>🏆 Logros</h5>
<a href="logros.php" class="btn-main">Ver</a>
</div>

</section>

<section id="torneo" class="section container">

<h2 class="title">TORNEO</h2>

<div class="card-ui">

<button class="btn-main mb-3" onclick="generarTorneo()">Generar torneo</button>

<div id="torneo"></div>

</div>

</section>

<?php endif; ?>

<script>
let role = "<?php echo $user['role']; ?>";
</script>

<script src="script.js"></script>

</body>
</html>