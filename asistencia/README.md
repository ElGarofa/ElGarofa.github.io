# Control de asistencia

Sistema web en PHP + MySQL para registrar entrada y salida de empleados, con panel de administrador.

## Instalación (XAMPP o hosting)

1. Creá una base de datos vacía llamada `asistencia` (por ejemplo desde phpMyAdmin, cotejamiento `utf8mb4_general_ci`).
2. Copiá esta carpeta al servidor (en XAMPP: `htdocs/asistencia`).
3. Editá `config.php` con los datos de conexión (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`).
4. Abrí `http://localhost/asistencia/setup.php`: crea las tablas y el primer administrador.
5. **Borrá `setup.php`** del servidor.

## Uso

- `index.php`: pantalla de fichaje. El empleado ingresa DNI + PIN y toca Entrada o Salida (ideal en una tablet fija).
- `admin/login.php`: panel del administrador.
  - Registros filtrables por fecha y empleado, horas trabajadas, quién está presente ahora, eliminar registros y exportar a CSV (abre en Excel).
  - Empleados: alta, cambio de PIN, activar/desactivar (no se borran para conservar el historial).

## PWA (instalable en celular / tablet)

- Incluye `manifest.webmanifest`, `sw.js`, `offline.html` e íconos en `assets/icons/`.
- Requiere HTTPS. Abrí el sitio una vez con internet y elegí "Instalar app" / "Agregar a pantalla de inicio".
- Los fichajes y el panel siempre consultan el servidor (necesitan la base de datos); sin conexión se muestra una pantalla de aviso, no se registra nada.

## Base de datos en el hosting

Todo lo necesario (requisitos, pasos, SQL completo, consultas útiles y backups) está en `INSTRUCCIONES_BASE_DE_DATOS.txt`.

## Seguridad incluida

- PIN y contraseñas guardados con hash (`password_hash`), consultas con PDO preparadas, protección CSRF en el panel.
- Bloqueo de 10 minutos tras 8 intentos fallidos por IP.
- Recomendado en producción: usar HTTPS y, si es posible, limitar `index.php` a la red del local.

## Estructura de la base de datos

`empleados`, `registros` (entrada/salida por empleado), `admins`, `intentos`. Ver `schema.sql`.
