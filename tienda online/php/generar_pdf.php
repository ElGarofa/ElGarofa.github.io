<?php
require("Nueva carpeta/fpdf.php");

$nombre = $_GET['nombre'] ?? 'Cliente';
$email = $_GET['email'] ?? 'correo@ejemplo.com';
$productos = $_GET['productos'] ?? 'Sin productos';
$total = $_GET['total'] ?? '0.00';

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',16);
$pdf->Cell(0,10,'Recibo de Compra',0,1,'C');

$pdf->SetFont('Arial','',12);
$pdf->Ln(10);
$pdf->Cell(0,10,"Nombre: $nombre",0,1);
$pdf->Cell(0,10,"Email: $email",0,1);
$pdf->Cell(0,10,"Productos: $productos",0,1);
$pdf->Cell(0,10,"Total: $".$total,0,1);

$pdf->Ln(10);
$pdf->Cell(0,10,"Gracias por tu compra!",0,1);

$pdf->Output();
