export interface LandingCourse {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly ages: string;
  readonly summary: string;
  readonly lead: string;
  readonly tools: string;
  readonly learns: readonly string[];
  readonly icon: string;
  readonly cover: string;
  readonly image?: string;
}

export const LANDING_COURSES: readonly LandingCourse[] = [
  {
    id: '01',
    slug: 'ordenador-e-internet',
    title: 'Primeros Pasos Digitales',
    ages: '7–9 años',
    icon: '/assets/courses/computer.png?v=4',
    cover: '#e7f3ff',
    summary: 'Ordenador, Internet y herramientas digitales.',
    lead: 'Aprenden a usar el ordenador, Internet y las herramientas digitales con seguridad, criterio y creatividad.',
    tools: 'Ordenador, Internet y nube',
    learns: [
      'Usar con autonomía el teclado, el ratón, los archivos y las carpetas',
      'Buscar información en Internet y distinguir fuentes fiables',
      'Crear documentos y presentaciones claras y ordenadas',
      'Dar los primeros pasos con la nube, el correo y la inteligencia artificial',
    ],
  },
  {
    id: '02',
    slug: 'scratch',
    title: 'Programación con Scratch',
    ages: '8–10 años',
    icon: '/assets/courses/puzzle.png?v=5',
    cover: '#fff0ea',
    summary: 'Videojuegos, historias y programación visual.',
    lead: 'Aprenden programación creando videojuegos, historias y animaciones con bloques visuales.',
    tools: 'Scratch',
    learns: [
      'Programar movimientos, eventos, bucles y condiciones',
      'Crear personajes, escenarios y animaciones',
      'Diseñar y presentar un videojuego propio',
    ],
  },
  {
    id: '03',
    slug: 'videojuegos',
    title: 'Desarrollo de Videojuegos con Unity',
    ages: '10–14 años',
    icon: '/assets/courses/unity.png?v=8',
    cover: '#fff6e8',
    summary: 'Unity, C# y un videojuego propio.',
    lead: 'Aprenden a diseñar y programar un videojuego real con Unity y fundamentos de C#.',
    tools: 'Unity y C#',
    learns: [
      'Crear escenas, personajes y niveles en Unity',
      'Programar movimientos, reglas e interacciones con C#',
      'Probar y presentar una versión jugable propia',
    ],
  },
  {
    id: '04',
    slug: 'seguridad-digital',
    title: 'Seguridad Digital y Ciberseguridad',
    ages: '11–15 años',
    icon: '/assets/courses/lock.png?v=6',
    cover: '#e7fbf4',
    summary: 'Cuentas, privacidad y amenazas online.',
    lead: 'Aprenden a proteger sus cuentas, detectar engaños y utilizar Internet con seguridad y criterio.',
    tools: 'Internet, móvil y redes',
    learns: [
      'Proteger cuentas y dispositivos',
      'Reconocer phishing, estafas y mensajes sospechosos',
      'Gestionar la privacidad y la huella digital',
    ],
  },
  {
    id: '05',
    slug: 'aplicaciones-moviles',
    title: 'Desarrollo de Apps Móviles con Kodular',
    ages: '12–16 años',
    icon: '/assets/courses/smartphone.png?v=6',
    cover: '#f3eefe',
    summary: 'Diseño, bloques y una app Android propia.',
    lead: 'Aprenden a diseñar y programar una aplicación Android funcional mediante bloques visuales.',
    tools: 'Kodular',
    learns: [
      'Diseñar pantallas y navegación',
      'Programar eventos, condiciones y datos con bloques',
      'Probar e instalar una aplicación propia',
    ],
  },
  {
    id: '06',
    slug: 'python',
    title: 'Programación con Python',
    ages: '12–16 años',
    icon: '/assets/courses/python.png?v=8',
    cover: '#eef2ff',
    summary: 'Código, lógica y un programa propio.',
    lead: 'Aprenden a escribir código real, resolver problemas y desarrollar un programa completo con Python.',
    tools: 'Python',
    learns: [
      'Variables, condiciones, bucles y funciones',
      'Listas, diccionarios, archivos y módulos',
      'Desarrollar y presentar un programa propio',
    ],
  },
  {
    id: '07',
    slug: 'inteligencia-artificial',
    title: 'Inteligencia Artificial y Automatización',
    ages: '14–18 años',
    icon: '/assets/courses/robot.png?v=5',
    cover: '#fff0f6',
    summary: 'IA, APIs y automatizaciones con n8n.',
    lead: 'Aprenden IA desde sus fundamentos y conectan modelos y servicios mediante APIs y flujos con n8n.',
    tools: 'IA generativa, APIs y n8n',
    learns: [
      'Usar modelos generativos con criterio',
      'Comprender APIs, peticiones y datos JSON',
      'Crear una automatización funcional con n8n e IA',
    ],
  },
  {
    id: '08',
    slug: 'paginas-web',
    title: 'Desarrollo Web con HTML, CSS y Tailwind',
    ages: '15–20 años',
    icon: '/assets/courses/globe.png?v=7',
    cover: '#fdeee8',
    summary: 'Código, diseño responsive y una web publicada.',
    lead: 'Aprenden HTML, CSS y Tailwind desarrollando desde cero una página web responsive y profesional.',
    tools: 'HTML, CSS y Tailwind',
    learns: [
      'Construir una estructura semántica con HTML',
      'Diseñar layouts responsive con CSS y Tailwind',
      'Publicar una primera web completa',
    ],
  },
];

export function courseBySlug(slug: string): LandingCourse | undefined {
  return LANDING_COURSES.find((course) => course.slug === slug);
}
