<?php
session_start();
include "db.php";

if(!isset($_SESSION['user'])){
header("Location: login.php");
exit;
}

$res = $conn->query("SELECT * FROM players");
?>

<h1>Participantes</h1>

<?php while($p=$res->fetch_assoc()): ?>

<div class="card-ui">
<img src="data:image/png;base64,<?php echo $p['foto']; ?>" width="50">
<b><?php echo $p['nombre']; ?></b>
<br>
Rango: <?php echo $p['rango']; ?>
</div>

<?php endwhile; ?>