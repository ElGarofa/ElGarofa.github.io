<?php
require __DIR__ . '/auth.php';
requiere_admin();

$msg = '';
$err = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $accion = $_POST['accion'] ?? '';
    $pdo = db();

    try {
        if ($accion === 'crear') {
            $dni = preg_replace('/\D/', '', $_POST['dni'] ?? '');
            $pin = $_POST['pin'] ?? '';
            $nombre = trim($_POST['nombre'] ?? '');
            $apellido = trim($_POST['apellido'] ?? '');
            if ($nombre === '' || $apellido === '' || strlen($dni) < 6 || !preg_match('/^\d{4,8}$/', $pin)) {
                $err = 'Completá nombre, apellido, DNI válido y un PIN numérico de 4 a 8 dígitos.';
            } else {
                $pdo->prepare('INSERT INTO empleados (nombre, apellido, dni, pin_hash) VALUES (?, ?, ?, ?)')
                    ->execute([$nombre, $apellido, $dni, password_hash($pin, PASSWORD_DEFAULT)]);
                $msg = 'Empleado creado.';
            }
        } elseif ($accion === 'estado') {
            $pdo->prepare('UPDATE empleados SET activo = 1 - activo WHERE id = ?')->execute([(int)$_POST['id']]);
        } elseif ($accion === 'pin') {
            $pin = $_POST['pin'] ?? '';
            if (!preg_match('/^\d{4,8}$/', $pin)) {
                $err = 'El PIN debe ser numérico, de 4 a 8 dígitos.';
            } else {
                $pdo->prepare('UPDATE empleados SET pin_hash = ? WHERE id = ?')
                    ->execute([password_hash($pin, PASSWORD_DEFAULT), (int)$_POST['id']]);
                $msg = 'PIN actualizado.';
            }
        }
    } catch (PDOException $e) {
        $err = ($e->getCode() === '23000') ? 'Ya existe un empleado con ese DNI.' : 'Error al guardar.';
    }
}

$lista = db()->query('SELECT * FROM empleados ORDER BY activo DESC, apellido, nombre')->fetchAll();
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Empleados</title>
<link rel="stylesheet" href="../assets/style.css">
<link rel="manifest" href="../manifest.webmanifest">
<meta name="theme-color" content="#2457d6">
<link rel="apple-touch-icon" href="../assets/icons/apple-touch-icon.png">
</head>
<body class="ancho">
<nav class="nav">
  <strong>Asistencia</strong>
  <a href="index.php">Registros</a>
  <a href="empleados.php">Empleados</a>
  <a href="logout.php">Salir</a>
</nav>

<section class="panel">
  <h2>Nuevo empleado</h2>
  <?php if ($msg): ?><p class="aviso ok"><?= h($msg) ?></p><?php endif; ?>
  <?php if ($err): ?><p class="aviso error"><?= h($err) ?></p><?php endif; ?>
  <form method="post" class="filtros" autocomplete="off">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <input type="hidden" name="accion" value="crear">
    <label>Nombre <input name="nombre" required></label>
    <label>Apellido <input name="apellido" required></label>
    <label>DNI <input name="dni" inputmode="numeric" required></label>
    <label>PIN (4-8 dígitos) <input name="pin" inputmode="numeric" required></label>
    <button class="btn">Agregar</button>
  </form>
</section>

<section class="panel">
  <h2>Empleados</h2>
  <div class="tabla-wrap">
  <table>
    <thead><tr><th>Nombre</th><th>DNI</th><th>Estado</th><th>Cambiar PIN</th><th></th></tr></thead>
    <tbody>
    <?php foreach ($lista as $e): ?>
      <tr>
        <td><?= h($e['apellido'] . ', ' . $e['nombre']) ?></td>
        <td><?= h($e['dni']) ?></td>
        <td><?= $e['activo'] ? 'Activo' : 'Inactivo' ?></td>
        <td>
          <form method="post" class="inline">
            <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
            <input type="hidden" name="accion" value="pin">
            <input type="hidden" name="id" value="<?= (int)$e['id'] ?>">
            <input name="pin" inputmode="numeric" placeholder="Nuevo PIN" size="8" required>
            <button class="btn gris">Guardar</button>
          </form>
        </td>
        <td>
          <form method="post">
            <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
            <input type="hidden" name="accion" value="estado">
            <input type="hidden" name="id" value="<?= (int)$e['id'] ?>">
            <button class="link-rojo"><?= $e['activo'] ? 'Desactivar' : 'Activar' ?></button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
  </div>
</section>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('../sw.js');}</script>
</body>
</html>
