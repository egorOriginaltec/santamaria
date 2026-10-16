export interface LandingCourse {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly ages: string;
  readonly schedule: string;
  readonly price: string;
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
    slug: 'scratch',
    title: 'Programación con Scratch',
    ages: '8–12 años',
    schedule: 'Lunes · 17:30–19:00',
    price: '59 €',
    icon: '/assets/courses/puzzle.png?v=5',
    cover: '#fff0ea',
    summary: 'Videojuegos, historias y programación visual.',
    lead: 'Aprenden programación creando videojuegos, historias y animaciones con bloques visuales.',
    tools: 'Scratch',
    learns: [
      'Mover un personaje, repetir y decidir con bloques',
      'Montar un juego corto con marcador',
      'Probarlo, arreglarlo y presentarlo',
    ],
  },
  {
    id: '02',
    slug: 'aplicaciones-moviles',
    title: 'Crea tus propias aplicaciones móviles',
    ages: '10–14 años',
    schedule: 'Jueves · 17:30–19:00',
    price: '59 €',
    icon: '/assets/courses/smartphone.png?v=6',
    cover: '#f3eefe',
    summary: 'Diseño, lógica y una app Android propia.',
    lead: 'Aprenden a diseñar 2 o 3 pantallas y a dejar una app pequeña funcionando en Android.',
    tools: 'Apps Android',
    learns: [
      'Diseñar 2 o 3 pantallas y pasar de una a otra',
      'Programar clics, condiciones y un dato guardado',
      'Probarla en un Android e instalarla si el grupo llega',
    ],
  },
  {
    id: '03',
    slug: 'roblox',
    title: 'Crea tus propios videojuegos con Roblox Studio',
    ages: '10–14 años',
    schedule: 'Martes · 17:30–19:00',
    price: '59 €',
    icon: '/assets/courses/roblox.png?v=3',
    cover: '#e8f4ff',
    summary: 'Roblox Studio, Luau y un juego propio publicable.',
    lead: 'Crean un juego propio con niveles, monedas, checkpoints, puntuación y mecánicas personalizadas, y lo pueden compartir.',
    tools: 'Roblox Studio · Luau',
    learns: [
      'Montar un mundo en Roblox Studio',
      'Programar mecánicas con Luau (monedas, checkpoints, puntuación)',
      'Publicar una experiencia jugable para enseñar',
    ],
  },
  {
    id: '04',
    slug: 'robotica-arduino',
    title: 'Robótica y Programación con Arduino',
    ages: '11–15 años',
    schedule: 'Miércoles · 17:30–19:00',
    price: '59 €',
    icon: '/assets/courses/arduino.svg',
    cover: '#e8f7f2',
    summary: 'Inventos, sensores y automatización con Arduino.',
    lead:
      'Construye tus propios inventos, programa sensores y crea sistemas automáticos desde casa. Aprende electrónica y programación mediante proyectos prácticos en directo.',
    tools: 'Arduino UNO',
    learns: [
      'Montar circuitos con LEDs, pulsadores y sensores',
      'Programar la placa y leer datos del entorno',
      'Cerrar un invento automático propio con servo o sensor',
    ],
  },
  {
    id: '05',
    slug: 'videojuegos',
    title: 'Desarrollo de Videojuegos con Unity',
    ages: '12–16 años',
    schedule: 'Martes · 19:00–20:30',
    price: '59 €',
    icon: '/assets/courses/unity.png?v=8',
    cover: '#fff6e8',
    summary: 'Unity, C# y un videojuego propio.',
    lead: 'Aprenden a montar un videojuego 2D jugable con Unity y scripts cortos de C#.',
    tools: 'Unity y C#',
    learns: [
      'Montar una escena 2D en Unity',
      'Mover, chocar y contar puntos con C# corto',
      'Dejar un nivel jugable para enseñar',
    ],
  },
  {
    id: '06',
    slug: 'python',
    title: 'Programación con Python',
    ages: '12–16 años',
    schedule: 'Lunes · 19:00–20:30',
    price: '59 €',
    icon: '/assets/courses/python.png?v=8',
    cover: '#eef2ff',
    summary: 'Código, lógica y un programa propio.',
    lead: 'Aprenden Python con programas cortos y cierran el curso con un quiz, una agenda o un juego de texto.',
    tools: 'Python',
    learns: [
      'Variables, if, bucles y funciones',
      'Listas y un programa por consola',
      'Un quiz, una agenda o un juego de texto',
    ],
  },
  {
    id: '07',
    slug: 'python-avanzado',
    title: 'Python avanzado: crea proyectos reales',
    ages: '14–18 años',
    schedule: 'Jueves · 19:00–20:30',
    price: '59 €',
    icon: '/assets/courses/python.png?v=10',
    cover: '#e6eefc',
    summary: 'OOP, APIs, datos y una app funcional.',
    lead: 'Siguiente paso tras Python inicial: organizar proyectos, APIs, bases de datos y automatizaciones, cerrando con una aplicación funcional.',
    tools: 'Python · APIs · bases de datos',
    learns: [
      'Organizar código con clases y proyectos reales',
      'Conectar APIs y guardar datos',
      'Entregar una aplicación funcional propia',
    ],
  },
  {
    id: '08',
    slug: 'inteligencia-artificial',
    title: 'Inteligencia Artificial y Automatización',
    ages: '14–18 años',
    schedule: 'Miércoles · 19:00–20:30',
    price: '59 €',
    icon: '/assets/courses/robot.png?v=5',
    cover: '#fff0f6',
    summary: 'IA, APIs y automatizaciones con n8n.',
    lead: 'Aprenden a usar IA con criterio y a montar en n8n un flujo corto conectado a un modelo.',
    tools: 'IA generativa, APIs y n8n',
    learns: [
      'Pedir a un modelo una tarea y comprobar la respuesta',
      'Ver cómo viajan los datos en un JSON',
      'Montar en n8n un flujo corto con un nodo de IA',
    ],
  },
  {
    id: '09',
    slug: 'paginas-web',
    title: 'Desarrollo Web con HTML, CSS y Tailwind',
    ages: '14–18 años',
    schedule: 'Viernes · 17:30–19:00',
    price: '59 €',
    icon: '/assets/courses/globe.png?v=7',
    cover: '#fdeee8',
    summary: 'Código, diseño responsive y una web publicada.',
    lead: 'Aprenden HTML, CSS y un primer Tailwind construyendo y publicando una landing que se lee en el móvil.',
    tools: 'HTML, CSS y Tailwind',
    learns: [
      'Montar una página con HTML a mano',
      'Dar estilo con CSS, Flexbox y un primer Tailwind',
      'Publicar una landing que se lee en el móvil',
    ],
  },
];

export function courseBySlug(slug: string): LandingCourse | undefined {
  return LANDING_COURSES.find((course) => course.slug === slug);
}
