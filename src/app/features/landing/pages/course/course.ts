import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { courseBySlug } from '../../data/courses';

@Component({
  selector: 'app-course',
  imports: [RouterLink],
  templateUrl: './course.html',
  styleUrl: './course.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly course = computed(() => courseBySlug(this.slug()));

  readonly digitalSkills = [
    'Utilizar con autonomía el teclado, el ratón, las carpetas y los archivos',
    'Buscar información en Internet y reconocer fuentes fiables',
    'Crear documentos y presentaciones claras, ordenadas y atractivas',
    'Usar el correo, la nube y herramientas colaborativas con seguridad',
  ] as const;

  readonly learningAreas = [
    {
      number: '01',
      title: 'Dominio del ordenador',
      text: 'Teclado, ratón, archivos, carpetas y organización del espacio digital.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Internet con criterio',
      text: 'Búsquedas eficaces, fuentes fiables, privacidad y ciberseguridad básica.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Crear y comunicar',
      text: 'Documentos, presentaciones, imágenes e ideas bien explicadas.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Tecnología para el futuro',
      text: 'Nube, trabajo colaborativo y una primera aproximación responsable a la IA.',
      tone: 'green',
    },
  ] as const;

  readonly curriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Dominar el ordenador',
      text: 'Construimos una base sólida para trabajar con autonomía.',
      topics: [
        'Componentes físicos de un ordenador',
        'Carpetas, archivos y organización digital',
        'Teclado, mecanografía y atajos esenciales',
        'Navegadores y funcionamiento de Internet',
        'Privacidad y ciberseguridad básica',
        'Búsquedas eficaces y fuentes fiables',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Crear y comunicar',
      text: 'Pasamos de consumir contenido a crear trabajos digitales.',
      topics: [
        'Google Docs: formato, estilos y tablas',
        'Redacción de documentos con estructura',
        'Google Slides: diapositivas y diseños',
        'Imágenes, gráficos y animaciones',
        'Diseño visual con Canva y Drawings',
        'Presentación oral de un proyecto',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Internet e inteligencia artificial',
      text: 'Aprendemos a movernos por el entorno digital con criterio.',
      topics: [
        'Correo electrónico y almacenamiento en la nube',
        'Colaboración y comportamiento digital',
        'Fake news y evaluación de fuentes',
        'Qué es la inteligencia artificial',
        'Uso responsable de herramientas de IA',
        'Creación de un proyecto con IA generativa',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Proyecto digital final',
      text: 'Integramos lo aprendido en un trabajo propio y completo.',
      topics: [
        'Planificación de una idea y sus objetivos',
        'Introducción a la programación por bloques',
        'Creación de un proyecto multimedia',
        'Pruebas, correcciones y mejora',
        'Preparación de la presentación final',
        'Exposición y valoración del proyecto',
      ],
    },
  ] as const;

  readonly scratchSkills = [
    'Comprender secuencias, eventos, bucles y condiciones',
    'Programar personajes, escenarios, sonidos y animaciones',
    'Diseñar reglas, niveles y sistemas de puntuación',
    'Probar, detectar errores y mejorar un proyecto propio',
  ] as const;

  readonly scratchLearningAreas = [
    {
      number: '01',
      title: 'Pensamiento computacional',
      text: 'Descomponer problemas y ordenar instrucciones de forma lógica.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Programación por bloques',
      text: 'Eventos, movimientos, bucles, condiciones, variables y mensajes.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Diseño de videojuegos',
      text: 'Personajes, niveles, objetivos, dificultad y experiencia del jugador.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Creatividad y comunicación',
      text: 'Historias interactivas, trabajo por proyectos y presentación de ideas.',
      tone: 'green',
    },
  ] as const;

  readonly scratchCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Primeros pasos en Scratch',
      text: 'Conocemos el entorno y aprendemos a construir secuencias sencillas.',
      topics: [
        'Escenario, objetos y biblioteca de recursos',
        'Bloques de movimiento y apariencia',
        'Coordenadas, direcciones y posiciones',
        'Eventos para iniciar acciones',
        'Sonidos, disfraces y animaciones',
        'Primera historia interactiva',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Lógica e interacción',
      text: 'Introducimos las estructuras que hacen que un proyecto responda.',
      topics: [
        'Bucles y repetición de acciones',
        'Condiciones y toma de decisiones',
        'Sensores, teclado y ratón',
        'Mensajes entre personajes',
        'Variables y marcadores',
        'Depuración de errores frecuentes',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Diseño de videojuegos',
      text: 'Aplicamos la programación a juegos con reglas y objetivos claros.',
      topics: [
        'Diseño de mecánicas y reglas',
        'Colisiones y respuesta del jugador',
        'Puntuación, vidas y temporizadores',
        'Niveles y aumento de dificultad',
        'Pantallas de inicio y final',
        'Pruebas con otros jugadores',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Proyecto final',
      text: 'Cada alumno diseña, programa y presenta un proyecto propio.',
      topics: [
        'Elección de la idea y planificación',
        'Diseño de personajes y escenarios',
        'Programación de la versión inicial',
        'Pruebas y corrección de errores',
        'Mejoras visuales y de jugabilidad',
        'Presentación final del proyecto',
      ],
    },
  ] as const;

  readonly unitySkills = [
    'Utilizar el editor de Unity y organizar escenas, objetos y recursos',
    'Programar movimientos e interacciones básicas con C#',
    'Diseñar niveles, reglas, objetivos y sistemas de puntuación',
    'Probar, corregir y presentar un videojuego propio',
  ] as const;

  readonly unityLearningAreas = [
    {
      number: '01',
      title: 'Entorno Unity',
      text: 'Escenas, GameObjects, componentes, prefabs y organización de recursos.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Programación con C#',
      text: 'Variables, métodos, condiciones y scripts aplicados al juego.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Diseño de videojuegos',
      text: 'Mecánicas, niveles, dificultad, objetivos y experiencia del jugador.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Producción y publicación',
      text: 'Pruebas, corrección de errores, acabado visual y versión jugable.',
      tone: 'green',
    },
  ] as const;

  readonly unityCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Fundamentos de Unity',
      text: 'Conocemos el motor y construimos las primeras escenas interactivas.',
      topics: [
        'Interfaz, vistas y navegación del editor',
        'Escenas, GameObjects y componentes',
        'Importación y organización de recursos',
        'Transformaciones y sistema de coordenadas',
        'Física, colliders y rigidbodies',
        'Primera escena jugable',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Programación de mecánicas',
      text: 'Usamos C# para controlar al jugador y definir las reglas.',
      topics: [
        'Scripts, variables y métodos en C#',
        'Entrada de teclado y movimiento',
        'Condiciones y detección de colisiones',
        'Cámara y seguimiento del jugador',
        'Puntuación, vidas y temporizadores',
        'Depuración de errores básicos',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Diseño del videojuego',
      text: 'Creamos niveles completos y una experiencia coherente.',
      topics: [
        'Diseño de objetivos y dificultad',
        'Prefabs y reutilización de objetos',
        'Enemigos, obstáculos y recompensas',
        'Interfaz de usuario y menús',
        'Sonido, partículas y feedback visual',
        'Transición entre niveles',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Proyecto final jugable',
      text: 'Terminamos, probamos y presentamos un videojuego propio.',
      topics: [
        'Documento breve de diseño',
        'Producción de la versión completa',
        'Sesiones de prueba con compañeros',
        'Corrección y equilibrio del juego',
        'Compilación de una versión jugable',
        'Presentación final del proyecto',
      ],
    },
  ] as const;

  readonly securitySkills = [
    'Proteger cuentas y dispositivos con contraseñas seguras y doble verificación',
    'Reconocer phishing, estafas, enlaces peligrosos y técnicas de manipulación',
    'Configurar la privacidad y gestionar la huella digital',
    'Actuar correctamente ante una cuenta comprometida o un incidente',
  ] as const;

  readonly securityLearningAreas = [
    {
      number: '01',
      title: 'Protección de cuentas',
      text: 'Contraseñas, gestores, doble verificación y recuperación segura.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Amenazas y estafas',
      text: 'Phishing, malware, ingeniería social y señales de alerta.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Privacidad y huella digital',
      text: 'Permisos, redes sociales, datos personales y reputación online.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Respuesta y prevención',
      text: 'Copias de seguridad, actualización y actuación ante incidentes.',
      tone: 'green',
    },
  ] as const;

  readonly securityCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Cuentas y dispositivos seguros',
      text: 'Empezamos por proteger los accesos y la información personal.',
      topics: [
        'Cómo se roba una cuenta',
        'Contraseñas fuertes y únicas',
        'Gestores de contraseñas',
        'Doble factor de autenticación',
        'Actualizaciones y bloqueo del dispositivo',
        'Recuperación segura de cuentas',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Detectar engaños digitales',
      text: 'Aprendemos a analizar mensajes y situaciones antes de actuar.',
      topics: [
        'Phishing por correo y mensajería',
        'Enlaces, archivos y códigos QR sospechosos',
        'Tiendas falsas y fraudes online',
        'Suplantación de identidad',
        'Ingeniería social y manipulación',
        'Verificación de mensajes y remitentes',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Privacidad y convivencia online',
      text: 'Gestionamos qué compartimos y cómo nos relacionamos en Internet.',
      topics: [
        'Datos personales y permisos',
        'Configuración de privacidad',
        'Huella digital y reputación',
        'Seguridad en redes sociales',
        'Ciberacoso y canales de ayuda',
        'Uso responsable de la inteligencia artificial',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Plan personal de ciberseguridad',
      text: 'Aplicamos lo aprendido en una revisión práctica y completa.',
      topics: [
        'Auditoría básica de seguridad',
        'Copias de seguridad',
        'Qué hacer ante un acceso extraño',
        'Cierre de sesiones y dispositivos',
        'Creación de un protocolo familiar',
        'Presentación del plan de protección',
      ],
    },
  ] as const;

  readonly mobileSkills = [
    'Diseñar pantallas claras y adaptar la navegación a una app móvil',
    'Programar botones, eventos, condiciones y variables con bloques',
    'Utilizar componentes del dispositivo y almacenar información',
    'Probar, corregir e instalar una aplicación propia en Android',
  ] as const;

  readonly mobileLearningAreas = [
    {
      number: '01',
      title: 'Diseño de interfaces',
      text: 'Pantallas, componentes, navegación, jerarquía visual y usabilidad.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Programación por bloques',
      text: 'Eventos, variables, condiciones, listas y procedimientos.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Funciones del móvil',
      text: 'Cámara, sensores, sonido, almacenamiento y conectividad.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Producto digital',
      text: 'Planificación, pruebas, identidad visual y versión instalable.',
      tone: 'green',
    },
  ] as const;

  readonly mobileCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Fundamentos de Kodular',
      text: 'Conocemos el entorno y construimos las primeras pantallas funcionales.',
      topics: [
        'Qué compone una aplicación móvil',
        'Diseñador, visor y panel de propiedades',
        'Botones, textos, imágenes y disposiciones',
        'Navegación entre pantallas',
        'Eventos y respuesta a pulsaciones',
        'Primera aplicación interactiva',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Lógica y datos',
      text: 'Añadimos comportamiento y guardamos información dentro de la app.',
      topics: [
        'Variables y tipos de datos',
        'Condiciones y decisiones',
        'Listas y selección de elementos',
        'Procedimientos reutilizables',
        'Almacenamiento local con TinyDB',
        'Validación de formularios',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Funciones del dispositivo',
      text: 'Integramos recursos del móvil para crear experiencias más completas.',
      topics: [
        'Cámara e imágenes',
        'Sonido y reproducción multimedia',
        'Acelerómetro y sensores',
        'Ubicación y mapas básicos',
        'Notificaciones y avisos',
        'Permisos y privacidad',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Aplicación final',
      text: 'Diseñamos, desarrollamos y presentamos una app con utilidad real.',
      topics: [
        'Definición del problema y usuario',
        'Boceto de pantallas y navegación',
        'Desarrollo de la versión funcional',
        'Pruebas en un dispositivo Android',
        'Corrección y mejora de la experiencia',
        'Generación e instalación del APK',
      ],
    },
  ] as const;

  readonly pythonSkills = [
    'Escribir programas claros utilizando variables, operadores y tipos de datos',
    'Resolver problemas con condiciones, bucles y funciones',
    'Trabajar con listas, diccionarios, archivos y módulos',
    'Planificar, depurar y presentar un proyecto propio en Python',
  ] as const;

  readonly pythonLearningAreas = [
    {
      number: '01',
      title: 'Fundamentos del lenguaje',
      text: 'Sintaxis, variables, tipos de datos, operadores y entrada de información.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Lógica de programación',
      text: 'Condiciones, bucles, funciones y resolución estructurada de problemas.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Datos y archivos',
      text: 'Listas, diccionarios, lectura, escritura y organización de información.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Desarrollo de proyectos',
      text: 'Diseño, código limpio, pruebas, depuración y documentación.',
      tone: 'green',
    },
  ] as const;

  readonly pythonCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Empezar a programar',
      text: 'Aprendemos la sintaxis de Python construyendo pequeños programas.',
      topics: [
        'Entorno de desarrollo y primer programa',
        'Variables y tipos de datos',
        'Operadores y expresiones',
        'Entrada y salida de información',
        'Conversión y validación de datos',
        'Programa de cálculo interactivo',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Control y lógica',
      text: 'Creamos programas capaces de tomar decisiones y repetir tareas.',
      topics: [
        'Condiciones if, elif y else',
        'Bucles for y while',
        'Contadores y acumuladores',
        'Funciones y parámetros',
        'Ámbito y reutilización de código',
        'Depuración paso a paso',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Estructuras de datos',
      text: 'Organizamos información y construimos programas más completos.',
      topics: [
        'Listas y operaciones habituales',
        'Tuplas y diccionarios',
        'Recorridos, búsqueda y filtrado',
        'Lectura y escritura de archivos',
        'Módulos y librerías estándar',
        'Manejo básico de errores',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Proyecto final en Python',
      text: 'Integramos lo aprendido en un juego o herramienta funcional.',
      topics: [
        'Elección y alcance del proyecto',
        'Diseño del flujo del programa',
        'Desarrollo por pequeñas funciones',
        'Pruebas y corrección de errores',
        'Documentación y mejoras',
        'Demostración final del programa',
      ],
    },
  ] as const;

  readonly aiSkills = [
    'Comprender qué puede hacer un modelo de IA y verificar sus respuestas',
    'Diseñar prompts claros y trabajar con texto, imágenes y datos',
    'Entender una API, una petición HTTP y el formato JSON desde cero',
    'Construir en n8n una automatización que conecte servicios e inteligencia artificial',
  ] as const;

  readonly aiLearningAreas = [
    {
      number: '01',
      title: 'Fundamentos de IA',
      text: 'Modelos, contexto, prompts, límites, errores y verificación.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'APIs y datos',
      text: 'Endpoints, peticiones, respuestas, JSON y credenciales seguras.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Automatización con n8n',
      text: 'Triggers, nodos, condiciones, transformación de datos y flujos.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'IA responsable',
      text: 'Privacidad, sesgos, costes, supervisión humana y documentación.',
      tone: 'green',
    },
  ] as const;

  readonly aiCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Entender la inteligencia artificial',
      text: 'Empezamos por comprender cómo funciona y cuándo conviene utilizarla.',
      topics: [
        'Qué es y qué no es la inteligencia artificial',
        'Modelos de texto e imagen',
        'Prompts: objetivo, contexto y formato',
        'Alucinaciones y verificación de respuestas',
        'Privacidad y uso responsable',
        'Primer proyecto de contenido asistido',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Introducción a las APIs',
      text: 'Aprendemos cómo se comunican las aplicaciones a través de Internet.',
      topics: [
        'Cliente, servidor y petición HTTP',
        'Qué es un endpoint',
        'Métodos GET y POST',
        'Datos estructurados en JSON',
        'Parámetros, cabeceras y respuestas',
        'Claves API y gestión segura de credenciales',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Automatización con n8n',
      text: 'Construimos flujos visuales que reciben, procesan y envían información.',
      topics: [
        'Interfaz, nodos y conexiones',
        'Triggers manuales y programados',
        'Webhooks y recepción de datos',
        'Condiciones y rutas alternativas',
        'Transformación de datos entre nodos',
        'Conexión de una API de inteligencia artificial',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Proyecto de IA y automatización',
      text: 'Integramos servicios, datos e IA en un flujo útil y documentado.',
      topics: [
        'Definición del problema y alcance',
        'Diseño visual del flujo',
        'Conexión de servicios y API',
        'Control de errores y límites',
        'Pruebas, costes y supervisión humana',
        'Demostración y documentación final',
      ],
    },
  ] as const;

  readonly webSkills = [
    'Construir páginas bien estructuradas con HTML semántico',
    'Crear diseños visuales con CSS, Flexbox y Grid',
    'Adaptar una web a móvil, tablet y escritorio',
    'Utilizar Tailwind CSS y publicar una primera web completa',
  ] as const;

  readonly webLearningAreas = [
    {
      number: '01',
      title: 'HTML semántico',
      text: 'Estructura, contenido, enlaces, imágenes, formularios y accesibilidad.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Diseño con CSS',
      text: 'Colores, tipografía, espaciado, modelo de caja, Flexbox y Grid.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Responsive y Tailwind',
      text: 'Diseño mobile first, breakpoints y composición con utilidades.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto y publicación',
      text: 'Planificación, revisión, rendimiento básico y despliegue online.',
      tone: 'green',
    },
  ] as const;

  readonly webCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Construir con HTML',
      text: 'Aprendemos a organizar el contenido de una página de forma correcta.',
      topics: [
        'Cómo funciona una página web',
        'Etiquetas, atributos y estructura base',
        'Títulos, textos, listas y enlaces',
        'Imágenes, rutas y recursos',
        'HTML semántico y accesibilidad',
        'Primera página multipágina',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Diseñar con CSS',
      text: 'Damos identidad visual y construimos composiciones profesionales.',
      topics: [
        'Selectores, cascada y especificidad',
        'Color, tipografía y fondos',
        'Modelo de caja y espaciado',
        'Flexbox para alinear elementos',
        'CSS Grid para organizar secciones',
        'Componentes visuales reutilizables',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Responsive y Tailwind CSS',
      text: 'Adaptamos el diseño a cualquier pantalla y aceleramos el desarrollo.',
      topics: [
        'Enfoque mobile first',
        'Media queries y breakpoints',
        'Imágenes y medidas fluidas',
        'Instalación y conceptos de Tailwind',
        'Utilidades de layout, color y texto',
        'Estados hover, focus y componentes',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Primera web completa',
      text: 'Diseñamos, desarrollamos y publicamos una web desde cero.',
      topics: [
        'Objetivo, público y mapa de contenidos',
        'Wireframe y sistema visual',
        'Desarrollo de las páginas',
        'Revisión responsive y accesibilidad',
        'Optimización básica de imágenes',
        'Publicación y presentación final',
      ],
    },
  ] as const;

  readonly pageContent = computed(() => {
    if (this.slug() === 'paginas-web') {
      return {
        category: 'HTML · CSS · Tailwind',
        heading: 'Desarrollo Web',
        accent: 'desde Cero',
        schedule: 'Consulta horarios',
        price: '69€',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'Tu primera web, diseñada y programada por ti',
        introText:
          'Los alumnos aprenden cómo se construye una web profesional con HTML y CSS, cómo adaptarla a cualquier pantalla y cómo trabajar más rápido con Tailwind.',
        introNote:
          'No utilizamos constructores que lo hacen todo. Cada alumno escribe el código, comprende su estructura y publica una web que puede incluir en su portfolio.',
        skills: this.webSkills,
        areas: this.webLearningAreas,
        areasText:
          'Un recorrido práctico por las tecnologías fundamentales del desarrollo front-end moderno.',
        curriculum: this.webCurriculum,
        curriculumText:
          'De diciembre a junio, el alumno pasa de una página HTML básica a una web responsive completa y publicada.',
        curriculumBadge: 'Diciembre – junio · Primera web publicada',
        ctaTitle: 'Empieza a construir para la web',
        ctaText:
          'Prueba una clase online y descubre cómo una idea se convierte en una página real mediante HTML, CSS y Tailwind.',
      } as const;
    }

    if (this.slug() === 'inteligencia-artificial') {
      return {
        category: 'IA · APIs · n8n',
        heading: 'Inteligencia Artificial',
        accent: 'y Automatización',
        schedule: 'Consulta horarios',
        price: '69€',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'De utilizar la IA a conectarla con herramientas reales',
        introText:
          'El curso comienza con los fundamentos de la inteligencia artificial y avanza hasta comprender APIs y crear automatizaciones visuales con n8n.',
        introNote:
          'No hace falta experiencia previa. Cada concepto técnico se explica desde cero y se aplica en flujos seguros, supervisados y con una utilidad concreta.',
        skills: this.aiSkills,
        areas: this.aiLearningAreas,
        areasText:
          'Un recorrido desde el uso crítico de modelos generativos hasta la conexión de servicios mediante APIs y n8n.',
        curriculum: this.aiCurriculum,
        curriculumText:
          'De diciembre a junio, el alumno pasa de usar un modelo con criterio a construir una automatización conectada a inteligencia artificial.',
        curriculumBadge: 'Diciembre – junio · Automatización final con IA',
        ctaTitle: 'Aprende a conectar ideas, datos e inteligencia artificial',
        ctaText:
          'Prueba una clase online y descubre cómo se construye una automatización útil desde sus componentes más básicos.',
      } as const;
    }

    if (this.slug() === 'python') {
      return {
        category: 'Código real · Python',
        heading: 'Programación',
        accent: 'con Python',
        schedule: 'Consulta horarios',
        price: '69€',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'El paso de los bloques al código real',
        introText:
          'Python es un lenguaje profesional con una sintaxis clara. Los alumnos aprenden a escribir programas, resolver problemas y entender cómo funciona el código.',
        introNote:
          'Programamos en directo desde la primera clase. Cada concepto se practica con ejercicios breves antes de incorporarlo a proyectos más completos.',
        skills: this.pythonSkills,
        areas: this.pythonLearningAreas,
        areasText:
          'Un recorrido progresivo por los fundamentos que necesita cualquier programador para construir software.',
        curriculum: this.pythonCurriculum,
        curriculumText:
          'De diciembre a junio, el alumno pasa de sus primeras líneas de código a un programa propio, probado y documentado.',
        curriculumBadge: 'Diciembre – junio · Proyecto final en Python',
        ctaTitle: 'Empieza a escribir código de verdad',
        ctaText:
          'Prueba una clase online y descubre cómo aprende Python creando programas que funcionan desde el primer día.',
      } as const;
    }

    if (this.slug() === 'aplicaciones-moviles') {
      return {
        category: 'Kodular · Apps Android',
        heading: 'Desarrollo de Apps Móviles',
        accent: 'con Kodular',
        schedule: 'Consulta horarios',
        price: '69€',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'De una idea a una aplicación instalada en el móvil',
        introText:
          'Kodular permite crear aplicaciones Android completas mediante bloques visuales. Los alumnos diseñan las pantallas, programan su comportamiento y prueban el resultado en un dispositivo.',
        introNote:
          'No se limitan a copiar una app. Cada alumno toma decisiones de diseño y desarrolla un proyecto propio acompañado por el profesor en directo.',
        skills: this.mobileSkills,
        areas: this.mobileLearningAreas,
        areasText:
          'Un recorrido completo por el diseño, la lógica y las funciones que necesita una aplicación móvil.',
        curriculum: this.mobileCurriculum,
        curriculumText:
          'De diciembre a junio, el alumno pasa de una pantalla sencilla a una aplicación Android funcional e instalable.',
        curriculumBadge: 'Diciembre – junio · App final instalable',
        ctaTitle: 'Su primera app puede empezar hoy',
        ctaText:
          'Prueba una clase online y descubre cómo transforma una idea en una aplicación que funciona en un móvil real.',
      } as const;
    }

    if (this.slug() === 'seguridad-digital') {
      return {
        category: 'Ciberseguridad práctica',
        heading: 'Seguridad Digital',
        accent: 'y Ciberseguridad',
        schedule: 'Consulta horarios',
        price: '69€',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'Aprender a protegerse también es competencia digital',
        introText:
          'El curso enseña a reconocer riesgos reales de Internet y a tomar decisiones seguras: proteger cuentas, detectar engaños y cuidar la privacidad.',
        introNote:
          'Trabajamos con situaciones simuladas y ejemplos adecuados a su edad. Nunca utilizamos datos personales ni realizamos prácticas ofensivas.',
        skills: this.securitySkills,
        areas: this.securityLearningAreas,
        areasText:
          'Una formación práctica para comprender los riesgos más habituales y saber cómo prevenirlos.',
        curriculum: this.securityCurriculum,
        curriculumText:
          'De diciembre a junio, el alumno construye hábitos seguros y termina con su propio plan personal de ciberseguridad.',
        curriculumBadge: 'Diciembre – junio · Plan de seguridad final',
        ctaTitle: 'Más autonomía digital, con menos riesgos',
        ctaText:
          'Prueba una clase online y descubre cómo aprende a identificar amenazas y proteger su vida digital.',
      } as const;
    }

    if (this.slug() === 'videojuegos') {
      return {
        category: 'Unity y C#',
        heading: 'Desarrollo de Videojuegos',
        accent: 'con Unity',
        schedule: 'Consulta horarios',
        price: '69€',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'Del concepto a un videojuego jugable',
        introText:
          'Los alumnos aprenden cómo se construye un videojuego de verdad: diseñan escenas, programan mecánicas con C# y convierten una idea en una experiencia interactiva.',
        introNote:
          'Trabajamos con Unity en directo y paso a paso. Cada alumno avanza sobre su propio proyecto con acompañamiento del profesor.',
        skills: this.unitySkills,
        areas: this.unityLearningAreas,
        areasText:
          'Un recorrido práctico por el motor Unity, la programación y las decisiones que dan forma a un videojuego.',
        curriculum: this.unityCurriculum,
        curriculumText:
          'De diciembre a junio, el alumno pasa de una escena básica a una versión jugable que puede compartir y presentar.',
        curriculumBadge: 'Diciembre – junio · Videojuego final incluido',
        ctaTitle: 'Convierte sus ideas en un videojuego',
        ctaText:
          'Prueba una clase online y descubre cómo aprende programación, diseño y resolución de problemas creando su propio juego.',
      } as const;
    }

    if (this.slug() === 'scratch') {
      return {
        category: 'Programación visual',
        heading: 'Programación con',
        accent: 'Scratch',
        schedule: 'Consulta horarios',
        price: '69€',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'De jugar a crear sus propios videojuegos',
        introText:
          'Scratch transforma la lógica de programación en bloques visuales. Los alumnos aprenden a pensar paso a paso mientras crean historias, animaciones y juegos.',
        introNote:
          'Cada concepto se aplica en un proyecto real. El profesor programa con el grupo en directo y acompaña a cada alumno durante el proceso.',
        skills: this.scratchSkills,
        areas: this.scratchLearningAreas,
        areasText:
          'Un recorrido práctico por la lógica, la programación y el diseño de experiencias interactivas.',
        curriculum: this.scratchCurriculum,
        curriculumText:
          'De diciembre a junio, el alumno pasa de conocer Scratch a diseñar y presentar un videojuego propio.',
        curriculumBadge: 'Diciembre – junio · Proyecto final incluido',
        ctaTitle: 'Su primera creación empieza aquí',
        ctaText:
          'Prueba una clase online y descubre cómo aprende programación mientras construye algo que puede enseñar.',
      } as const;
    }

    if (this.slug() === 'ordenador-e-internet') {
      return {
        category: 'Competencia digital',
        heading: 'Primeros Pasos',
        accent: 'Digitales',
        schedule: 'Viernes · 17:30',
        price: '69€',
        summary: '90 min por semana · Máximo 12 alumnos · Online y en directo',
        introTitle: 'Una base digital para toda la vida',
        introText:
          'No se trata solo de saber encender un ordenador. Aprenden a comprender la tecnología, organizarse y crear con ella de forma segura, crítica y autónoma.',
        introNote:
          'Cada concepto se practica en clase con retos y proyectos adecuados a su edad. El profesor acompaña al grupo online y en tiempo real.',
        skills: this.digitalSkills,
        areas: this.learningAreas,
        areasText:
          'Un recorrido progresivo desde los fundamentos hasta el uso consciente y creativo de las herramientas digitales.',
        curriculum: this.curriculum,
        curriculumText:
          'De diciembre a junio, cuatro bloques progresivos que avanzan desde los fundamentos hasta un proyecto digital final.',
        curriculumBadge: 'Diciembre – junio · 24 aprendizajes clave',
        ctaTitle: 'Prepara su futuro digital desde hoy',
        ctaText:
          'Ven a conocer una clase real. Resolveremos tus dudas y comprobaremos juntos si el grupo encaja.',
      } as const;
    }

    return undefined;
  });

  constructor() {
    effect(() => {
      const slug = this.slug();
      if (!slug) {
        return;
      }
      const course = courseBySlug(slug);
      if (!course) {
        void this.router.navigateByUrl('/#program');
        return;
      }
      this.title.setTitle(`${course.title} · Santamaria Academia`);
    });
  }
}
