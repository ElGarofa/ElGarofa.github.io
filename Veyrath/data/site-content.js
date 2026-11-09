/*
  DATOS EDITABLES DE VEYRATH
  Modificá las entradas de este archivo para actualizar la web.
  Los estados reflejan la documentación de la versión 0.6.1, no una prueba técnica independiente.
  Estados permitidos: "incluido", "experimental", "planeado".
*/
window.VEYRATH_DATA = {
  version: "0.6.1",
  subtitle: "Versión de prueba para Windows, Linux, macOS y Android",
  links: {
    itch: "https://elgarofa.itch.io/veyrath",
    discord: "https://discord.gg/x9DaFD35H"
  },
  roadmap: [
    { name: "Exploración y mundo", category: "Mundo", status: "incluido", detail: "Regiones naturales, ríos, lagos, cuevas, minerales, ruinas y atlas de exploración." },
    { name: "Domesticación y monturas", category: "Fauna", status: "incluido", detail: "Habituación, alimentación, desmayo, narcóticos, boleadoras y monturas por especie. Niveles salvajes 20–150 y ficha de cada criatura con su modelo 3D." },
    { name: "Supervivencia exigente", category: "Supervivencia", status: "incluido", detail: "Sed, alimentación, clima, heridas, infecciones, fracturas y deterioro de comida." },
    { name: "Combate por zonas", category: "Combate", status: "incluido", detail: "Vida según la especie, zonas de impacto (cabeza, cuerpo, patas y cola) y puntos débiles en los acorazados." },
    { name: "Construcción e ingeniería", category: "Construcción", status: "incluido", detail: "Fogatas, refugios, reparaciones y piezas de ingeniería, como puentes y torres." },
    { name: "Oficios, agricultura y forja", category: "Progresión", status: "incluido", detail: "Fabricación, carpintería, herrería, siembra, riego y cosecha." },
    { name: "NPC y asentamientos", category: "Sociedades", status: "incluido", detail: "Campamento de náufragos, encargos, intercambio, reclutamiento y producción del asentamiento." },
    { name: "10 civilizaciones dinámicas", category: "Sociedades", status: "incluido", detail: "Noticias, relaciones diplomáticas, guerras, paces, líderes y reputación." },
    { name: "Linaje y cría de animales", category: "Progresión", status: "incluido", detail: "Modo Crónica con herederos; crianza con camadas de 1 a 3 crías, herencia de estadísticas y mutaciones." },
    { name: "Linux, macOS y Android", category: "Plataformas", status: "experimental", detail: "Versiones nuevas en la 0.6.1, con controles táctiles en Android; todavía sin probar en equipos reales." },
    { name: "Multijugador por red local", category: "Multijugador", status: "experimental", detail: "Enlace local de prueba (misma red): jugadores, construcciones, cofres, recursos, chat y fauna; los NPC todavía tienen limitaciones de sincronización." },
    { name: "Conexión mediante Epic Online Services", category: "Multijugador", status: "planeado", detail: "El código ya está en las versiones de PC; falta configurar el producto de Epic para habilitarlo." },
    { name: "Servidores y modos online", category: "Multijugador", status: "planeado", detail: "Visión a futuro: servidores oficiales/privados y modalidades PvE y PvP." },
    { name: "Mejoras de rendimiento y sincronización", category: "Calidad", status: "planeado", detail: "Optimización de los NPC y revisión de la sincronización multijugador." }
  ],
  news: [
    { tag: "NUEVA VERSIÓN", version: "0.6.1", title: "Linux, macOS y Android", text: "La 0.6.1 se puede descargar para Windows, Linux, macOS y Android, con controles táctiles en celulares. Las versiones nuevas todavía no se probaron en equipos reales: cada reporte ayuda.", image: "assets/images/01_costa.webp" },
    { tag: "GDD 1.0", version: "0.6.1", title: "Combate por zonas y crianza", text: "Días de 40 minutos, combate por zonas con puntos débiles, doma con niveles 20–150, crianza con camadas y mutaciones, calidad de fabricación y lluvia con salpicaduras.", image: "assets/images/04_depredador.webp" },
    { tag: "NOTAS DE LA BUILD", version: "0.6", title: "Un mundo con más vida", text: "La versión de prueba incluye fauna de distintos temperamentos, cría, ruinas, exploración y civilizaciones con relaciones cambiantes.", image: "assets/images/05_gigantes.webp" },
    { tag: "SISTEMAS", version: "0.6", title: "Supervivencia, oficios y refugios", text: "Agua potable, heridas, forja, agricultura, construcción e ingeniería forman parte de las pruebas sugeridas para esta build.", image: "assets/images/07_construccion.webp" },
    { tag: "EN EVALUACIÓN", version: "0.6", title: "Primeras partidas por LAN", text: "El multijugador local está disponible para probar, con limitaciones conocidas en NPC, domesticación y fauna compartida.", image: "assets/images/02_bosque.webp" }
  ],
  gallery: [
    { image: "01_costa.webp", title: "La costa", type: "mundo", description: "Agua, vegetación y horizontes abiertos." },
    { image: "02_bosque.webp", title: "Entre los árboles", type: "fauna", description: "Herbívoros en el bosque." },
    { image: "04_depredador.webp", title: "Un encuentro inesperado", type: "fauna", description: "Un depredador aparece entre la vegetación." },
    { image: "05_gigantes.webp", title: "Manada en el claro", type: "fauna", description: "Una manada cruza el paisaje." },
    { image: "07_construccion.webp", title: "Primer refugio", type: "construccion", description: "Una construcción de madera en medio del bosque." },
    { image: "09_ceratopsios.webp", title: "El ceratópsido", type: "fauna", description: "Un gran herbívoro cornudo en su entorno." },
    { image: "10_estegosaurio.webp", title: "Entre las placas", type: "fauna", description: "Una criatura de placas dorsales recorre la vegetación." },
    { image: "11_noche.webp", title: "El refugio al atardecer", type: "construccion", description: "Una cabaña bajo una luz más tenue." }
  ]
};
