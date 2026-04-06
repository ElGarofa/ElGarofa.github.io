<?php
include "db.php";

$res = $conn->query("SELECT COUNT(*) as total FROM players");
$data = $res->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style.css">
<title>Estadísticas</title>
</head>

<body>

<h1 class="title">📊 ESTADÍSTICAS</h1>

<div class="card-ui text-center">

<h2>Total de participantes</h2>

<div class="big-number">
<?php echo $data['total']; ?>
</div>

</div>

</body>
</html>