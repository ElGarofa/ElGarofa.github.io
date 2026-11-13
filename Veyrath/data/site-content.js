/*
  DATOS EDITABLES DE VEYRATH
  Modificá las entradas de este archivo para actualizar la web.
  - version: se muestra en el encabezado, la portada, las descargas y el pie.
  - developmentStart: año-mes en que empezó el desarrollo; la web calcula los años.
  Estados del roadmap: "meta", "incluido", "desarrollo", "experimental", "planeado".
  "incluido" = jugable en la versión actual; "meta" y "planeado" son objetivos, no promesas.
*/
window.VEYRATH_DATA = {
  version: "0.8.3",
  developmentStart: "2024-11",
  subtitle: "Versión en desarrollo para Windows, Linux, macOS y Android",
  links: {
    itch: "https://elgarofa.itch.io/veyrath",
    discord: "https://discord.gg/x9DaFD35H"
  },
  roadmap: [
    { name: "Un montón de líneas de diálogo", category: "Diálogos", status: "meta", detail: "Sumar muchísimas líneas de diálogo escritas para las 30.000 personas del mundo. Hoy sus charlas combinan episodios escritos con los datos de cada habitante." },
    { name: "Mundo social: 30.000 NPC", category: "Sociedades", status: "incluido", detail: "Habitantes persistentes con nombre, edad, oficio, hogar, familia y amistades; 18 temas de conversación, confianza, regalos y promesas." },
    { name: "10 civilizaciones con territorio", category: "Sociedades", status: "incluido", detail: "3 ciudades y 5 pueblos por civilización, mercaderes con trueques y aranceles según la reputación, encargos, guerras, paces y líderes." },
    { name: "Cuevas bajo el mapa", category: "Mundo", status: "incluido", detail: "18 cuevas grandes con nombre, salas con cristales que dan luz, vetas, restos de expediciones y una ciudad subterránea." },
    { name: "Exploración y mundo", category: "Mundo", status: "incluido", detail: "Regiones naturales, ríos, lagos, minerales, ruinas, tormentas con rayos y atlas de exploración." },
    { name: "Domesticación y monturas", category: "Fauna", status: "incluido", detail: "Habituación, alimentación, desmayo, narcóticos, boleadoras y monturas por especie. Niveles salvajes 20–150 y ficha de cada criatura con su modelo 3D." },
    { name: "Linaje y cría de animales", category: "Progresión", status: "incluido", detail: "Modo Crónica con herederos; crianza con camadas de 1 a 3 crías, herencia de estadísticas y mutaciones." },
    { name: "Supervivencia exigente", category: "Supervivencia", status: "incluido", detail: "Sed, alimentación, clima, heridas, infecciones, fracturas y deterioro de comida." },
    { name: "Combate por zonas", category: "Combate", status: "incluido", detail: "Vida según la especie, zonas de impacto (cabeza, cuerpo, patas y cola) y puntos débiles en los acorazados." },
    { name: "Construcción e ingeniería", category: "Construcción", status: "incluido", detail: "Fogatas, refugios, reparaciones y piezas de ingeniería, como puentes, muelles y torres de vigía." },
    { name: "Oficios, agricultura y forja", category: "Progresión", status: "incluido", detail: "Fabricación con calidad, carpintería, herrería, siembra, riego y cosecha." },
    { name: "500 dinosaurios en los datos", category: "Fauna", status: "desarrollo", detail: "Las 500 especies ya están registradas en los datos del juego; sus modelos 3D se van sumando por etapas." },
    { name: "Animaciones y patas en pendientes", category: "Fauna", status: "desarrollo", detail: "Animaciones nuevas de dinosaurios y apoyo de las patas sobre el terreno inclinado." },
    { name: "Misiones y nueva interfaz", category: "Jugabilidad", status: "desarrollo", detail: "Misiones del prólogo, misiones que nacen del mundo y renovación del HUD y de los íconos." },
    { name: "Conexión mediante Epic Online Services", category: "Multijugador", status: "desarrollo", detail: "El código ya está en las versiones de PC; falta configurar el producto de Epic para habilitarlo." },
    { name: "Linux, macOS y Android", category: "Plataformas", status: "experimental", detail: "Descargas con controles táctiles en Android. Todavía sin probar en equipos reales y, por ahora, sin el mundo social de la versión de Windows." },
    { name: "Multijugador por red local", category: "Multijugador", status: "experimental", detail: "Enlace local de prueba (misma red): jugadores, construcciones, cofres, recursos, chat y fauna; los NPC todavía tienen limitaciones de sincronización." },
    { name: "Mejoras de rendimiento", category: "Calidad", status: "planeado", detail: "Niveles de detalle para los dinosaurios, optimización de los NPC y revisión de la sincronización multijugador." },
    { name: "Economía, profesiones y gobiernos", category: "Sociedades", status: "planeado", detail: "Unas 100 profesiones, economía con monedas y contratos, y gobiernos jugables." },
    { name: "Servidores y modos online", category: "Multijugador", status: "planeado", detail: "Servidores dedicados y oficiales, con modalidades PvE y PvP." }
  ],
  news: [
    { tag: "DOS AÑOS", version: "0.8.3", title: "Dos años de Veyrath", text: "El desarrollo empezó hace dos años y hoy el juego está en la versión 0.8.3. Estamos acomodando las actualizaciones, así que algunas descargas pueden mostrar otra numeración por un tiempo.", image: "assets/images/05_gigantes.webp" },
    { tag: "MUNDO SOCIAL", version: "0.8.3", title: "30.000 habitantes con historia", text: "Cada NPC tiene nombre, edad, oficio, hogar, familia y amistades. Se puede conversar sobre 18 temas, ganar su confianza, hacer regalos y cumplir promesas.", image: "assets/images/12_registro_gentes.webp" },
    { tag: "PRÓXIMA META", when: "SIN FECHA", footer: "META A LOGRAR", title: "Un montón de diálogos nuevos", text: "Lo que sigue es sumar muchísimas líneas de diálogo escritas para que las charlas de los 30.000 habitantes suenen distintas. Todavía no está en el juego.", image: "assets/images/13_conversacion.webp" },
    { tag: "CIVILIZACIONES", version: "0.8.3", title: "Ciudades, pueblos y cuevas", text: "Cada civilización tiene 3 ciudades y 5 pueblos con mercaderes y encargos. Bajo el mapa hay cuevas con cristales y una ciudad subterránea.", image: "assets/images/11_noche.webp" },
    { tag: "CRIATURAS", version: "0.8.3", title: "500 dinosaurios en los datos", text: "La base de datos del juego ya registra 500 especies, de terópodos a saurópodos. Sus modelos 3D se van sumando por etapas.", image: "assets/images/09_ceratopsios.webp" },
    { tag: "PLATAFORMAS", version: "0.6.1", title: "Linux, macOS y Android", text: "Desde la 0.6.1 hay descargas para Windows, Linux, macOS y Android, con controles táctiles en celulares. Las versiones nuevas todavía no se probaron en equipos reales: cada reporte ayuda.", image: "assets/images/01_costa.webp" }
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
