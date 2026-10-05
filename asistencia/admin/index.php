<?php
require __DIR__ . '/auth.php';
requiere_admin();

// Eliminar un registro
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['accion'] ?? '') === 'borrar') {
    csrf_check();
    db()->prepare('DELETE FROM registros WHERE id = ?')->execute([(int)($_POST['id'] ?? 0)]);
    header('Location: ' . $_SERVER['REQUEST_URI']);
    exit;
}

$desde = $_GET['desde'] ?? date('Y-m-01');
$hasta = $_GET['hasta'] ?? date('Y-m-d');
$emp = (int)($_GET['emp'] ?? 0);

$sql = "SELECT r.id, r.entrada, r.salida, e.nombre, e.apellido, e.dni,
               TIMESTAMPDIFF(MINUTE, r.entrada, r.salida) AS minutos
        FROM registros r JOIN empleados e ON e.id = r.empleado_id
        WHERE DATE(r.entrada) BETWEEN ? AND ?";
$params = [$desde, $hasta];
if ($emp > 0) { $sql .= ' AND e.id = ?'; $params[] = $emp; }
$sql .= ' ORDER BY r.entrada DESC LIMIT 1000';

$st = db()->prepare($sql);
$st->execute($params);
$filas = $st->fetchAll();

$empleados = db()->query('SELECT id, nombre, apellido FROM empleados ORDER BY apellido, nombre')->fetchAll();
$presentes = db()->query("SELECT e.nombre, e.apellido, r.entrada FROM registros r JOIN empleados e ON e.id = r.empleado_id WHERE r.salida IS NULL ORDER BY r.entrada")->fetchAll();

$total = 0;
foreach ($filas as $f) { $total += (int)$f['minutos']; }
function hm(int $min): string { return sprintf('%dh %02dm', intdiv($min, 60), $min % 60); }
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Panel</title>
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
  <h2>Presentes ahora (<?= count($presentes) ?>)</h2>
  <?php if (!$presentes): ?><p>Nadie fichó entrada sin salida.</p><?php endif; ?>
  <ul>
    <?php foreach ($presentes as $p): ?>
      <li><?= h($p['apellido'] . ', ' . $p['nombre']) ?> — desde <?= h(date('H:i', strtotime($p['entrada']))) ?></li>
    <?php endforeach; ?>
  </ul>
</section>

<section class="panel">
  <h2>Registros</h2>
  <form method="get" class="filtros">
    <label>Desde <input type="date" name="desde" value="<?= h($desde) ?>"></label>
    <label>Hasta <input type="date" name="hasta" value="<?= h($hasta) ?>"></label>
    <label>Empleado
      <select name="emp">
        <option value="0">Todos</option>
        <?php foreach ($empleados as $e): ?>
          <option value="<?= (int)$e['id'] ?>" <?= $emp === (int)$e['id'] ? 'selected' : '' ?>>
            <?= h($e['apellido'] . ', ' . $e['nombre']) ?>
          </option>
        <?php endforeach; ?>
      </select>
    </label>
    <button class="btn">Filtrar</button>
    <a class="btn gris" href="exportar.php?<?= h(http_build_query(['desde' => $desde, 'hasta' => $hasta, 'emp' => $emp])) ?>">Exportar CSV</a>
  </form>

  <div class="tabla-wrap">
  <table>
    <thead><tr><th>Empleado</th><th>DNI</th><th>Entrada</th><th>Salida</th><th>Horas</th><th></th></tr></thead>
    <tbody>
    <?php foreach ($filas as $f): ?>
      <tr>
        <td><?= h($f['apellido'] . ', ' . $f['nombre']) ?></td>
        <td><?= h($f['dni']) ?></td>
        <td><?= h(date('d/m/Y H:i', strtotime($f['entrada']))) ?></td>
        <td><?= $f['salida'] ? h(date('d/m/Y H:i', strtotime($f['salida']))) : '<em>en curso</em>' ?></td>
        <td><?= $f['salida'] ? h(hm((int)$f['minutos'])) : '—' ?></td>
        <td>
          <form method="post" onsubmit="return confirm('¿Eliminar este registro?')">
            <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
            <input type="hidden" name="accion" value="borrar">
            <input type="hidden" name="id" value="<?= (int)$f['id'] ?>">
            <button class="link-rojo">Eliminar</button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
    <?php if (!$filas): ?><tr><td colspan="6">Sin registros en el período.</td></tr><?php endif; ?>
    </tbody>
  </table>
  </div>
  <p><strong>Total del período:</strong> <?= h(hm($total)) ?></p>
</section>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('../sw.js');}</script>
</body>
</html>
