<?php
// ---- Configuración: editá estos valores con los datos de tu hosting/XAMPP ----
const DB_HOST = 'localhost';
const DB_NAME = 'asistencia';
const DB_USER = 'root';
const DB_PASS = '';

date_default_timezone_set('America/Argentina/Buenos_Aires');

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
        $pdo->exec("SET time_zone = '-03:00'");
    }
    return $pdo;
}

function h(?string $s): string {
    return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
}
