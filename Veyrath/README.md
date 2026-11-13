# VEYRATH — Web oficial v3, versión 0.8.3

Sitio estático de VEYRATH. Muestra la versión 0.8.3 del juego (Windows, Linux, macOS y Android), sus dos años de desarrollo, los 500 dinosaurios registrados en los datos, los 30.000 NPC del mundo social y la próxima meta: sumar un montón de líneas de diálogo.

## Cómo probar

1. Descargá o cloná la carpeta completa, conservando todas las subcarpetas.
2. Abrí `index.html` con Chrome, Edge o Firefox actualizado. Si el visor 3D no funciona así, serví la carpeta con un servidor local, por ejemplo `python -m http.server`, y entrá a `http://localhost:8000/Veyrath/`.
3. En **Bestiario**, buscá una especie, abrí su ficha y elegí «Explorar en 3D». Arrastrá para girar y usá la rueda del mouse para acercar.
4. El sitio no usa librerías de CDN: funciona sin conexión una vez descargado.

## Lo que incluye el sitio

- Portada con años de desarrollo y versión vigente.
- **Veyrath en cifras**: 500 dinosaurios en los datos, 30.000 NPC, 10 civilizaciones, 80 ciudades y pueblos, 18 temas por habitante y 183 modelos 3D, con el recorrido del desarrollo.
- **Gentes y vínculos**: el mundo social de 30.000 habitantes, sus 18 temas de conversación y la tarjeta de la **próxima meta** (líneas de diálogo nuevas, todavía no incluidas en el juego).
- Atlas con zoom, sistemas, roadmap con filtros (metas, jugable hoy, en desarrollo, experimental, más adelante), bestiario 3D, galería, descargas, guía y controles, bitácora, preguntas frecuentes y enlaces a Discord e Itch.io.

## Dónde actualizar

- `data/site-content.js`:
  - `version`: se copia sola al encabezado, la portada, las descargas y el pie;
  - `developmentStart` (`AAAA-MM`): la web calcula los años de desarrollo;
  - `roadmap`, `news` (bitácora), `gallery` y enlaces.
- `data/bestiary.js` — fichas y grupos de las 183 criaturas.
- `assets/models/` — vistas 3D optimizadas para navegador (no son FBX ni modelos originales de desarrollo).
- `assets/thumbs/` — 183 miniaturas de los modelos reales.
- `assets/images/` — capturas, mapa ilustrado y las dos capturas de la interfaz social (`12_registro_gentes.webp`, `13_conversacion.webp`).
- `css/` y `js/` — diseño e interacciones. `v3.css` y `v3.js` agregan las cifras, la sección de gentes, la meta y los contadores.

## Importante

- Los 500 dinosaurios corresponden a los datos del juego e incluyen pterosaurios y reptiles marinos; sus modelos se suman por etapas.
- Los 30.000 NPC existen como registros persistentes; en pantalla aparecen los que están cerca del jugador.
- Mientras se acomodan las actualizaciones, algunos archivos de Itch.io pueden tener otra numeración: la versión vigente es la 0.8.3.
- El mapa es una recreación artística aceptada por el creador, no una cartografía exacta del juego. Sus marcadores tienen nombres provisionales.
- El visor usa WebGL. Si tu equipo lo tiene deshabilitado, el catálogo, las miniaturas y el resto de la web siguen funcionando.
- Los archivos de modelos están en una carpeta pública para que el navegador pueda leerlos. Revisá las licencias antes de publicarlos, especialmente si hay recursos de terceros.
- La web no incluye servidor, panel privado, base de datos, comentarios ni subida de builds. La descarga del juego se gestiona desde https://elgarofa.itch.io/veyrath.

## Recursos del sitio

- Discord oficial: https://discord.gg/x9DaFD35H
- Itch.io: https://elgarofa.itch.io/veyrath
