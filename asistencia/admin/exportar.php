<?php
require __DIR__ . '/auth.php';
requiere_admin();

$desde = $_GET['desde'] ?? date('Y-m-01');
$hasta = $_GET['hasta'] ?? date('Y-m-d');
$emp = (int)($_GET['emp'] ?? 0);

$sql = "SELECT e.apellido, e.nombre, e.dni, r.entrada, r.salida,
               TIMESTAMPDIFF(MINUTE, r.entrada, r.salida) AS minutos
        FROM registros r JOIN empleados e ON e.id = r.empleado_id
        WHERE DATE(r.entrada) BETWEEN ? AND ?";
$params = [$desde, $hasta];
if ($emp > 0) { $sql .= ' AND e.id = ?'; $params[] = $emp; }
$sql .= ' ORDER BY r.entrada';

$st = db()->prepare($sql);
$st->execute($params);

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="asistencia_' . $desde . '_' . $hasta . '.csv"');

$out = fopen('php://output', 'w');
fwrite($out, "\xEF\xBB\xBF"); // BOM para que Excel respete los acentos
fputcsv($out, ['Apellido', 'Nombre', 'DNI', 'Entrada', 'Salida', 'Minutos'], ';');
while ($f = $st->fetch()) {
    fputcsv($out, [$f['apellido'], $f['nombre'], $f['dni'], $f['entrada'], $f['salida'], $f['minutos']], ';');
}
fclose($out);
