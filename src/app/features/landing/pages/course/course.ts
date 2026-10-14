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

  readonly pageContent = computed(() => {
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
