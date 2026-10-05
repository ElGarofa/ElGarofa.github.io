<?php
// Ejecutar UNA sola vez desde el navegador: crea las tablas y el primer administrador.
// Después de usarlo, BORRÁ este archivo del servidor.
require __DIR__ . '/config.php';

$msg = '';
$hecho = false;

try {
    db()->exec(file_get_contents(__DIR__ . '/schema.sql'));
    $existe = (int)db()->query('SELECT COUNT(*) FROM admins')->fetchColumn();
} catch (Throwable $e) {
    http_response_code(500);
    exit('Error de base de datos: ' . h($e->getMessage()) . '. Revisá config.php y que la base exista.');
}

if ($existe > 0) {
    $msg = 'Ya hay un administrador creado. Borrá este archivo (setup.php).';
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario'] ?? '');
    $pass = $_POST['password'] ?? '';
    if ($usuario === '' || strlen($pass) < 8) {
        $msg = 'Usuario obligatorio y contraseña de al menos 8 caracteres.';
    } else {
        $st = db()->prepare('INSERT INTO admins (usuario, password_hash) VALUES (?, ?)');
        $st->execute([$usuario, password_hash($pass, PASSWORD_DEFAULT)]);
        $msg = 'Listo. Administrador creado. Ahora borrá setup.php y entrá a /admin/login.php';
        $hecho = true;
    }
}
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Instalación</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<main class="card">
  <h1>Instalación</h1>
  <?php if ($msg): ?><p class="aviso"><?= h($msg) ?></p><?php endif; ?>
  <?php if ($existe == 0 && !$hecho): ?>
  <form method="post">
    <label>Usuario administrador
      <input name="usuario" required autocomplete="off">
    </label>
    <label>Contraseña (mínimo 8 caracteres)
      <input type="password" name="password" minlength="8" required autocomplete="new-password">
    </label>
    <button class="btn">Crear administrador</button>
  </form>
  <?php endif; ?>
</main>
</body>
</html>
