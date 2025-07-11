<?php
session_start();
if (!isset($_SESSION['admin'])) {
  header("Location: login.php");
  exit;
}


include "conectar.php";
$pedidos = $conn->query("SELECT * FROM pedidos ORDER BY fecha DESC");
?>
<?php
$stats = $conn->query("SELECT COUNT(*) AS total_pedidos, SUM(total) AS total_ventas FROM pedidos");
$row = $stats->fetch_assoc();
echo "<p><strong>🧾 Pedidos:</strong> {$row['total_pedidos']} | <strong>💰 Ventas totales:</strong> $" . number_format($row['total_ventas'], 2) . "</p>";
?>

<h2>📦 Pedidos recibidos</h2>
<a href='logout.php'>Cerrar sesión</a>
<table border="1" cellpadding="5">
  <tr>
    <th>ID</th><th>Nombre</th><th>Email</th><th>Productos</th><th>Total</th><th>Fecha</th><th>Estado</th><th>Acción</th>
  </tr>
  <?php while($p = $pedidos->fetch_assoc()): ?>
  <tr>
    <td><?= $p['id'] ?></td>
    <td><?= $p['nombre_cliente'] ?></td>
    <td><?= $p['email_cliente'] ?></td>
    <td><?= $p['productos'] ?></td>
    <td>$<?= $p['total'] ?></td>
    <td><?= $p['fecha'] ?></td>
    <td><?= $p['estado'] ?></td>
    <td>
      <?php if ($p['estado'] != 'Procesado'): ?>
        <form method="POST" action="actualizar_estado.php">
          <input type="hidden" name="id" value="<?= $p['id'] ?>">
          <button>Procesar</button>
        </form>
      <?php else: ?>
        ✅
      <?php endif; ?>
    </td>
  </tr>
  <?php endwhile; ?>
</table>
