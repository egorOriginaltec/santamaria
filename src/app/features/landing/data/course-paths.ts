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
    ages: '7–12',
    hint: 'Ordenador primero, después Scratch.',
    slugs: ['ordenador-e-internet', 'scratch'],
  },
  {
    id: 'safe',
    label: 'Internet seguro',
    ages: '10–14',
    hint: 'Cuentas, engaños y buenos hábitos online.',
    slugs: ['seguridad-digital'],
  },
  {
    id: 'create',
    label: 'Juegos y apps',
    ages: '11–16',
    hint: 'Apps con bloques o Unity con C#, según el nivel.',
    slugs: ['aplicaciones-moviles', 'videojuegos'],
  },
  {
    id: 'code',
    label: 'Código e IA',
    ages: '12–17',
    hint: 'Python primero; IA cuando ya hay base de lógica.',
    slugs: ['python', 'inteligencia-artificial'],
  },
  {
    id: 'web',
    label: 'Web',
    ages: '14–18',
    hint: 'HTML, CSS y una landing publicada.',
    slugs: ['paginas-web'],
  },
];
