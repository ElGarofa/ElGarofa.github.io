# VEYRATH — Web oficial v2.1, bestiario 3D completo

Sitio estático basado en la build 0.6 de Unity, los archivos proporcionados por el desarrollador, ocho capturas y el mapa provisional ilustrado.

## Cómo probar

1. Descomprimí el ZIP por completo, conservando todas las subcarpetas.
2. Abrí `index.html` con Chrome, Edge o Firefox actualizado; si el visor no funciona, probá subir la carpeta a Netlify o usar un servidor web local.
3. En **Bestiario**, buscá cualquier especie, abrí su ficha y elegí «Explorar en 3D». Arrastrá para girar y usá la rueda del mouse para acercar.
4. Se puede navegar sin conexión una vez que está todo descomprimido (el sitio no necesita librerías CDN).

## Bestiario 3D — implementación

- **183 fichas y 183 modelos 3D** con miniaturas generadas a partir de su geometría original.
- **126 modelos con imágenes de textura extraídas del FBX** y **57 sin textura embebida**: los últimos tienen material neutro en el visor.
- Modelos convertidos desde los FBX suministrados y optimizados con índices de vértices reutilizados; cargan individualmente al abrir cada ficha para evitar descargar toda la colección al iniciar el sitio.
- Vistas 3D estáticas; no se importaron rigging, animaciones, físicas, LOD de Unity ni comportamientos de juego.
- Según la confirmación del creador, todas estas criaturas ya están incorporadas al juego. Su comportamiento o su integración en una build específica no han sido probados independientemente aquí.

## Lo que incluye el sitio

Portada, atlas visual con zoom, roadmap, bestiario, galería de ocho capturas, devlog, descargas, guía de supervivencia y controles, FAQ y enlaces a Discord y Itch.io.

## Dónde actualizar

- `data/site-content.js` — noticias, roadmap, enlaces y galería.
- `data/bestiary.js` — fichas y grupos de las 183 criaturas.
- `assets/models/` — vistas 3D optimizadas para navegador (no son FBX, no son modelos originales de desarrollo).
- `assets/thumbs/` — 183 miniaturas de los modelos reales.
- `assets/images/` — capturas y mapa ilustrado.
- `css/` y `js/` — diseño e interacciones.

## Importante

- El mapa es una recreación artística aceptada por el creador, no una cartografía exacta del juego. Sus marcadores tienen nombres provisionales.
- El visor usa WebGL. Si tu equipo lo tiene deshabilitado, el catálogo, las miniaturas y el resto de la web siguen funcionando.
- Los archivos de modelos están en una carpeta pública para que el navegador pueda leerlos. Revisá las licencias antes de publicarlos, especialmente si hay recursos de terceros.
- La web todavía no incluye servidor, panel privado, base de datos, comentarios ni subida de builds.
- La descarga del juego se gestiona desde https://elgarofa.itch.io/veyrath, no desde el archivo de esta web.

## Recursos del sitio

- Discord oficial: https://discord.gg/x9DaFD35H
- Itch.io: https://elgarofa.itch.io/veyrath
