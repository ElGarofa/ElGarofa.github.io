<?php
require __DIR__ . '/auth.php';

$error = '';
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pdo = db();
    $st = $pdo->prepare('SELECT COUNT(*) FROM intentos WHERE ip = ? AND momento > (NOW() - INTERVAL 10 MINUTE)');
    $st->execute([$ip]);

    if ((int)$st->fetchColumn() >= 8) {
        $error = 'Demasiados intentos fallidos. Esperá 10 minutos.';
    } else {
        $st = $pdo->prepare('SELECT * FROM admins WHERE usuario = ?');
        $st->execute([trim($_POST['usuario'] ?? '')]);
        $adm = $st->fetch();

        if ($adm && password_verify($_POST['password'] ?? '', $adm['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_id'] = $adm['id'];
            header('Location: index.php');
            exit;
        }
        $pdo->prepare('INSERT INTO intentos (ip, momento) VALUES (?, NOW())')->execute([$ip]);
        $error = 'Usuario o contraseña incorrectos.';
    }
}
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Administrador</title>
<link rel="stylesheet" href="../assets/style.css">
<link rel="manifest" href="../manifest.webmanifest">
<meta name="theme-color" content="#2457d6">
<link rel="apple-touch-icon" href="../assets/icons/apple-touch-icon.png">
</head>
<body>
<main class="card">
  <h1>Acceso administrador</h1>
  <?php if ($error): ?><p class="aviso error"><?= h($error) ?></p><?php endif; ?>
  <form method="post">
    <label>Usuario <input name="usuario" required></label>
    <label>Contraseña <input type="password" name="password" required></label>
    <button class="btn">Entrar</button>
  </form>
  <p class="pie"><a href="../index.php">Volver al fichaje</a></p>
</main>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('../sw.js');}</script>
</body>
</html>
