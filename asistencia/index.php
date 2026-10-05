<?php
require __DIR__ . '/config.php';

$mensaje = '';
$tipo = '';
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dni = preg_replace('/\D/', '', $_POST['dni'] ?? '');
    $pin = $_POST['pin'] ?? '';
    $accion = $_POST['accion'] ?? '';

    $pdo = db();
    $pdo->prepare('DELETE FROM intentos WHERE momento < (NOW() - INTERVAL 1 DAY)')->execute();
    $st = $pdo->prepare('SELECT COUNT(*) FROM intentos WHERE ip = ? AND momento > (NOW() - INTERVAL 10 MINUTE)');
    $st->execute([$ip]);

    if ((int)$st->fetchColumn() >= 8) {
        $mensaje = 'Demasiados intentos fallidos. Esperá 10 minutos.';
        $tipo = 'error';
    } else {
        $st = $pdo->prepare('SELECT * FROM empleados WHERE dni = ? AND activo = 1');
        $st->execute([$dni]);
        $emp = $st->fetch();

        if (!$emp || !password_verify($pin, $emp['pin_hash'])) {
            $pdo->prepare('INSERT INTO intentos (ip, momento) VALUES (?, NOW())')->execute([$ip]);
            $mensaje = 'DNI o PIN incorrecto.';
            $tipo = 'error';
        } else {
            $st = $pdo->prepare('SELECT id FROM registros WHERE empleado_id = ? AND salida IS NULL ORDER BY entrada DESC LIMIT 1');
            $st->execute([$emp['id']]);
            $abierto = $st->fetch();
            $nombre = $emp['nombre'] . ' ' . $emp['apellido'];
            $hora = date('H:i');

            if ($accion === 'entrada') {
                if ($abierto) {
                    $mensaje = "$nombre, ya tenés una entrada registrada sin salida.";
                    $tipo = 'error';
                } else {
                    $pdo->prepare('INSERT INTO registros (empleado_id, entrada) VALUES (?, NOW())')->execute([$emp['id']]);
                    $mensaje = "Entrada registrada: $nombre a las $hora.";
                    $tipo = 'ok';
                }
            } elseif ($accion === 'salida') {
                if (!$abierto) {
                    $mensaje = "$nombre, no tenés una entrada abierta para cerrar.";
                    $tipo = 'error';
                } else {
                    $pdo->prepare('UPDATE registros SET salida = NOW() WHERE id = ?')->execute([$abierto['id']]);
                    $mensaje = "Salida registrada: $nombre a las $hora.";
                    $tipo = 'ok';
                }
            }
        }
    }
}
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fichaje</title>
<link rel="stylesheet" href="assets/style.css">
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#2457d6">
<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">
</head>
<body>
<main class="card">
  <h1>Control de asistencia</h1>
  <p class="reloj" id="reloj"></p>

  <?php if ($mensaje): ?>
    <p class="aviso <?= h($tipo) ?>"><?= h($mensaje) ?></p>
  <?php endif; ?>

  <form method="post" autocomplete="off">
    <label>DNI
      <input name="dni" inputmode="numeric" pattern="[0-9]*" required>
    </label>
    <label>PIN
      <input type="password" name="pin" inputmode="numeric" required>
    </label>
    <div class="fila">
      <button class="btn verde" name="accion" value="entrada">Entrada</button>
      <button class="btn rojo" name="accion" value="salida">Salida</button>
    </div>
  </form>

  <p class="pie"><a href="admin/login.php">Acceso administrador</a></p>
</main>
<script>
function tick(){document.getElementById('reloj').textContent=new Date().toLocaleString('es-AR',{dateStyle:'full',timeStyle:'medium'});}
tick();setInterval(tick,1000);
<?php if ($mensaje): ?>
setTimeout(function(){location.href=location.pathname;},6000);
<?php endif; ?>
</script>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js');}</script>
</body>
</html>
