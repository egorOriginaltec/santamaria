export interface CoursePath {
  readonly id: string;
  readonly label: string;
  readonly ages: string;
  readonly hint: string;
  readonly slugs: readonly string[];
}

export const COURSE_PATHS: readonly CoursePath[] = [
  {
    id: 'start',
    label: 'Desde cero',
    ages: '8–12',
    hint: 'Empieza con Scratch: juegos e historias con bloques.',
    slugs: ['scratch'],
  },
  {
    id: 'create',
    label: 'Juegos y apps',
    ages: '10–16',
    hint: 'Apps, Roblox o Unity, según la edad y el interés.',
    slugs: ['aplicaciones-moviles', 'roblox', 'videojuegos'],
  },
  {
    id: 'robotics',
    label: 'Robótica',
    ages: '11–15',
    hint: 'Inventos, sensores y automatización con Arduino.',
    slugs: ['robotica-arduino'],
  },
  {
    id: 'code',
    label: 'Código e IA',
    ages: '12–18',
    hint: 'Python → Python avanzado o IA, según el nivel.',
    slugs: ['python', 'python-avanzado', 'inteligencia-artificial'],
  },
  {
    id: 'web',
    label: 'Web',
    ages: '14–18',
    hint: 'HTML, CSS y una landing publicada.',
    slugs: ['paginas-web'],
  },
];
