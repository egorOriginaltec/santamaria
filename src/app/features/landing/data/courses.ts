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
    title: 'Seguridad digital',
    ages: '11–15 años',
    icon: '/assets/courses/lock.png?v=6',
    cover: '#e7fbf4',
    summary: 'Contraseñas, estafas y qué compartir.',
    lead: 'El móvil y las redes ya forman parte del día. Aquí se aprende a proteger la cuenta, a reconocer una estafa y a decidir qué conviene compartir y qué no.',
    tools: 'Móvil y redes',
    learns: [
      'Crear contraseñas y cuidar las cuentas',
      'Reconocer estafas y mensajes que no son lo que parecen',
      'Decidir qué se publica y qué se queda en privado',
    ],
  },
  {
    id: '05',
    slug: 'aplicaciones-moviles',
    title: 'Aplicaciones móviles',
    ages: '12–16 años',
    icon: '/assets/courses/smartphone.png?v=6',
    cover: '#f3eefe',
    summary: 'Una app del móvil hecha con bloques.',
    lead: 'Se hace una aplicación móvil encajando bloques, como en Kodular. Botones, pantallas y una función clara, hasta poder abrirla en el teléfono.',
    tools: 'Kodular',
    learns: [
      'Montar pantallas y botones con bloques',
      'Hacer que la app responda a lo que se toca',
      'Probarla en el móvil y enseñarla',
    ],
  },
  {
    id: '06',
    slug: 'python',
    title: 'Python',
    ages: '12–16 años',
    icon: '/assets/courses/python.png?v=8',
    cover: '#eef2ff',
    summary: 'El primer lenguaje que se escribe.',
    lead: 'Se dejan los bloques y se escribe. Python es el lenguaje con el que se empieza en el instituto. El curso acaba con un programa propio: un juego de texto o una herramienta pequeña.',
    tools: 'Python',
    learns: [
      'Variables, condiciones, bucles y funciones',
      'Pedir datos y que el programa responda',
      'Terminar un programa y poder explicarlo',
    ],
  },
  {
    id: '07',
    slug: 'inteligencia-artificial',
    title: 'Inteligencia artificial',
    ages: '14–18 años',
    icon: '/assets/courses/robot.png?v=5',
    cover: '#fff0f6',
    summary: 'Usar un modelo y pillar cuándo falla.',
    lead: 'No es un curso de “la IA lo hace sola”. Se aprende qué es un modelo, cómo pedirle las cosas y cómo ver cuándo se inventa la respuesta. El cierre es un proyecto: un chatbot o una serie de imágenes, explicado.',
    tools: 'Modelos de texto e imagen',
    learns: [
      'Ver qué puede hacer un modelo y qué no',
      'Escribir peticiones que sirven',
      'Entregar un proyecto y contar qué se le ha pedido',
    ],
  },
  {
    id: '08',
    slug: 'paginas-web',
    title: 'Páginas web',
    ages: '15–20 años',
    icon: '/assets/courses/globe.png?v=7',
    cover: '#fdeee8',
    summary: 'Una página web: estructura, estilo y móvil.',
    lead: 'Se hace una página web. HTML para la estructura y CSS para el aspecto, hasta dejarla bien en el móvil.',
    tools: 'HTML y CSS',
    learns: [
      'Montar la estructura de una página',
      'Dar estilo: color, tipografía y composición',
      'Dejarla lista para el móvil y poder enseñarla',
    ],
  },
];

export function courseBySlug(slug: string): LandingCourse | undefined {
  return LANDING_COURSES.find((course) => course.slug === slug);
}
