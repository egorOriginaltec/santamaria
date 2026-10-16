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
    summary: '30 clases · videojuegos y lógica desde cero.',
    lead: 'De diciembre a junio: 30 clases de 90 minutos para crear juegos, retos y un proyecto final. Matrícula abierta todo el año.',
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
    summary: '30 clases · apps Android con Kodular.',
    lead: 'De diciembre a junio: 30 clases para crear apps propias — sonidos, quizzes, mascotas, Firebase, APIs y un proyecto final.',
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
    summary: 'Roblox Studio, Luau y un videojuego propio.',
    lead: 'De un primer obby a monedas, poderes, UI, multijugador y un juego final que pueden presentar.',
    tools: 'Roblox Studio · Luau',
    learns: [
      'Construir mundos, obstáculos y puntos de control',
      'Programar mecánicas con Luau y diseñar interfaces',
      'Crear retos multijugador y un proyecto final propio',
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
    summary: 'Circuitos, sensores, automatización e invento final.',
    lead:
      'De las primeras luces a sensores, motores y juegos electrónicos, hasta presentar un invento propio en el Robotics Fest.',
    tools: 'Arduino UNO',
    learns: [
      'Montar circuitos con LEDs, botones y sensores',
      'Programar condiciones, secuencias y automatismos',
      'Diseñar, depurar y presentar un invento propio',
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
    summary: 'Unity 2D, C# y un videojuego propio.',
    lead: 'Desde cero: plataformas, monedas, enemigos, menús y un proyecto final que pueden presentar.',
    tools: 'Unity y C#',
    learns: [
      'Crear juegos 2D en Unity desde cero',
      'Programar con C#: movimiento, colisiones y puntuación',
      'Diseñar menús, niveles y presentar un juego propio',
    ],
  },
  {
    id: '06',
    slug: 'python',
    title: 'Programación con Python',
    ages: '12–16 años',
    schedule: 'Lunes · 19:00–20:30',
    price: '59 €',
    icon: '/assets/courses/python.png?v=12',
    cover: '#eef2ff',
    summary: 'Python desde cero: programas y videojuegos.',
    lead: 'Desde cero: juegos, Turtle, Pygame, automatización, API y un proyecto final en el Python Fest.',
    tools: 'Python',
    learns: [
      'Escribir código desde cero con Python',
      'Crear juegos, dibujos y herramientas útiles',
      'Presentar un proyecto propio en el Python Fest',
    ],
  },
  {
    id: '07',
    slug: 'python-avanzado',
    title: 'Python avanzado: crea proyectos reales',
    ages: '14–18 años',
    schedule: 'Jueves · 19:00–20:30',
    price: '59 €',
    icon: '/assets/courses/python.png?v=12',
    cover: '#e6eefc',
    summary: 'OOP, SQLite, Flask, APIs y un proyecto propio.',
    lead: 'Siguiente paso: proyectos profesionales, bases de datos, interfaces, web con Flask, automatización e IA, hasta el Demo Day.',
    tools: 'Python · SQLite · Flask · APIs',
    learns: [
      'Organizar proyectos con OOP, módulos y SQLite',
      'Crear interfaces, consumir APIs y apps con Flask',
      'Presentar un proyecto software propio en el Demo Day',
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
    summary: 'IA práctica, n8n, APIs y un proyecto propio.',
    lead: 'De asistentes y contenido a automatizaciones con n8n, chatbots, APIs y un proyecto final en el AI Demo Day.',
    tools: 'IA generativa · n8n · APIs',
    learns: [
      'Usar IA con criterio y crear contenido útil',
      'Automatizar con n8n, APIs y clasificación inteligente',
      'Presentar un proyecto propio en el AI Demo Day',
    ],
  },
  {
    id: '09',
    slug: 'paginas-web',
    title: 'Desarrollo Web con HTML, CSS y Tailwind',
    ages: '14–18 años',
    schedule: 'Viernes · 17:30–19:00',
    price: '59 €',
    icon: '/assets/courses/globe.png?v=8',
    cover: '#fdeee8',
    summary: 'HTML, CSS, Tailwind y un proyecto web propio.',
    lead: 'Aprenden HTML y CSS de verdad, luego Tailwind, y terminan con página personal, landing y una web multipágina.',
    tools: 'HTML, CSS y Tailwind',
    learns: [
      'Montar páginas con HTML, formularios y varias secciones',
      'Diseñar con CSS, Flexbox, Grid y responsive',
      'Usar Tailwind y presentar un proyecto web propio',
    ],
  },
];

export function courseBySlug(slug: string): LandingCourse | undefined {
  return LANDING_COURSES.find((course) => course.slug === slug);
}
