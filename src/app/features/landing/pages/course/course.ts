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

  readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly course = computed(() => courseBySlug(this.slug()));

  readonly digitalSkills = [
    'Moverse con soltura por el escritorio, las ventanas, las carpetas y los archivos',
    'Buscar en Internet y elegir una fuente adecuada a su edad',
    'Crear un documento y una presentación claros',
    'Usar correo, nube e IA con ayuda y con cuidado',
  ] as const;

  readonly learningAreas = [
    {
      number: '01',
      title: 'Dominio del ordenador',
      text: 'Ratón, teclado, ventanas, carpetas y guardar un trabajo sin perderlo.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Internet con criterio',
      text: 'Búsquedas sencillas, fuentes fiables y privacidad básica.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Crear y comunicar',
      text: 'Un documento y una presentación para explicar una idea.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Nube e IA con ayuda',
      text: 'Archivos en la nube, un correo sencillo y un primer uso responsable de la IA.',
      tone: 'green',
    },
  ] as const;

  readonly curriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'El ordenador, sin prisa',
      text: 'En una hora semanal, primero dominamos lo básico: ver, abrir, guardar y no perder nada.',
      topics: [
        'Escritorio, ventanas y programas',
        'Ratón, teclado y atajos que sí se usan',
        'Carpetas, archivos y guardar un trabajo',
        'Navegar por una web sin perderse',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Crear un trabajo digital',
      text: 'Pasamos de copiar a hacer: un texto claro y unas diapositivas que se entienden.',
      topics: [
        'Un documento en Google Docs',
        'Títulos, listas e imágenes',
        'Una presentación en Google Slides',
        'Contar una idea en cuatro diapositivas',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Internet, nube e IA',
      text: 'Aprendemos a buscar, guardar en la nube y probar una IA con el profesor al lado.',
      topics: [
        'Buscar y elegir una fuente fiable',
        'Correo y archivos en la nube, paso a paso',
        'Qué no se comparte nunca',
        'Probar una IA con una consigna clara',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Trabajo final',
      text: 'Junio son dos o tres clases: cerramos el documento o la presentación y lo enseñamos.',
      topics: [
        'Terminar el trabajo con lo ya aprendido',
        'Presentarlo a la clase',
      ],
    },
  ] as const;

  readonly scratchSkills = [
    'Pensar como programadores: secuencia, eventos, bucles y condiciones',
    'Crear juegos con reglas, puntuación, niveles y pantallas de victoria',
    'Diseñar aventuras, escape rooms y concursos interactivos',
    'Probar con compañeros, depurar y presentar un proyecto propio',
  ] as const;

  readonly scratchLearningAreas = [
    {
      number: '01',
      title: 'Divertido de verdad',
      text: 'Retos contrarreloj, creatividad y competiciones sanas: vienen a crear y a jugar, no a memorizar teoría.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Aprendizaje real',
      text: 'Entienden la lógica de programación sin quedarse en copiar bloques: cada mecánica se explica y se practica.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Matrícula abierta',
      text: 'Cada mes tiene un proyecto independiente y un punto de entrada claro para alumnos nuevos.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto final',
      text: 'En junio cada uno elige su juego, lo termina y lo presenta en el Santamaria Game Fest.',
      tone: 'green',
    },
  ] as const;

  readonly scratchRhythm = [
    {
      minutes: '10 min',
      title: 'Reto sorpresa',
      text: 'Una misión o juego rápido para despertar la curiosidad.',
    },
    {
      minutes: '15 min',
      title: 'Descubrir una mecánica',
      text: 'Una idea nueva con una demostración corta y visual.',
    },
    {
      minutes: '45 min',
      title: 'Construir y experimentar',
      text: 'Crear el juego, probarlo, equivocarse y añadir mejoras.',
    },
    {
      minutes: '20 min',
      title: 'Jugar y enseñar',
      text: 'Probar las creaciones, compartirlas y plantear un reto extra.',
    },
  ] as const;

  readonly scratchOutcomes = {
    title: '¿Qué aprenderás?',
    text: 'Al acabar las 30 sesiones, habrán creado muchos juegos y aprendido lógica de programación de verdad.',
    points: [
      'Pensar como programadores: secuencia, eventos, bucles y condiciones.',
      'Crear juegos con reglas, puntuación, niveles y pantallas de victoria o derrota.',
      'Diseñar aventuras, escape rooms, concursos y mecánicas propias.',
      'Usar variables, mensajes entre sprites y listas para que el juego recuerde datos.',
      'Probar con compañeros, encontrar errores y mejorar el proyecto.',
      'Presentar un videojuego propio en el Santamaria Game Fest.',
    ],
  } as const;

  readonly scratchCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre 2026',
      title: '¡Mi primer videojuego!',
      text: 'Objetivo: perder el miedo a programar y terminar el mes con una creación propia. Ideal para empezar desde cero.',
      sessions: [
        {
          date: '07/12',
          label: 'Clase 1',
          title: '¡Dale vida a un personaje!',
          text: 'Explorar Scratch, elegir personajes y escenarios, moverlos y hacer que hablen. Primer reto: una animación divertida con un personaje que aparece y sorprende.',
          learns: 'Escenario, sprites, eventos y bloques básicos',
        },
        {
          date: '14/12',
          label: 'Clase 2',
          title: 'El personaje que obedece',
          text: 'Programar movimientos con las flechas del teclado. Reto: una carrera entre personajes y diseñar una meta.',
          learns: 'Eventos de teclado, movimiento y coordenadas sencillas',
        },
        {
          date: '21/12',
          label: 'Clase 3',
          title: '¡Crea una historia loca!',
          text: 'Un astronauta aterriza en una isla de dinosaurios. Cada alumno crea su historia con diálogos, cambios de escenario, disfraces y sonidos.',
          learns: 'Apariencia, sonido, secuencias y mensajes entre personajes',
        },
        {
          date: '28/12',
          label: 'Clase 4',
          title: 'Mini videojuego: ¡escapa del laberinto!',
          text: 'Diseñar un laberinto, controlar un personaje y llegar a la meta. Quien termine puede añadir trampas o una pantalla de victoria.',
          learns: 'Movimiento continuo, detección de paredes y condiciones básicas',
        },
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Enero 2027',
      title: 'Juegos de habilidad',
      text: 'Objetivo: crear juegos con reglas, dificultad y puntuación. Un alumno nuevo puede empezar con movimiento y personalizar su juego.',
      sessions: [
        {
          date: '04/01',
          label: 'Clase 5',
          title: 'Atrapa los objetos',
          text: 'Una cesta que atrapa frutas y esquiva bombas. Cada alumno decide qué da puntos y qué hace perder.',
          learns: 'Detección de contacto, condiciones y puntuación sencilla',
        },
        {
          date: '11/01',
          label: 'Clase 6',
          title: '¡Que cada partida sea diferente!',
          text: 'Objetos que caen a velocidades distintas y aparecen en posiciones aleatorias.',
          learns: 'Números aleatorios, variables y bucles',
        },
        {
          date: '18/01',
          label: 'Clase 7',
          title: 'El modo difícil',
          text: 'Vidas, cuenta atrás y niveles de dificultad. Reto: que el juego termine al quedarse sin vidas.',
          learns: 'Variables, comparaciones y lógica de fin de partida',
        },
        {
          date: '25/01',
          label: 'Clase 8',
          title: 'Arcade Day: torneo de videojuegos',
          text: 'Terminar, decorar y probar los juegos de los compañeros. Cada uno explica sus reglas y mejora su puntuación.',
          learns: 'Pruebas, depuración y diseño de experiencia de juego',
        },
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Febrero 2027',
      title: 'Plataformas y aventuras',
      text: 'Objetivo: un juego de plataformas con saltos, obstáculos y monedas. Una aventura con identidad propia, no un ejercicio de copiar bloques.',
      sessions: [
        {
          date: '01/02',
          label: 'Clase 9',
          title: 'Diseña tu mundo de plataformas',
          text: 'Héroe, escenario, plataformas y meta. Probar cómo se mueve el personaje por el mundo.',
          learns: 'Coordenadas, gravedad simulada y movimiento',
        },
        {
          date: '08/02',
          label: 'Clase 10',
          title: '¡Salta sin caer al vacío!',
          text: 'Programar saltos, plataformas y detección del suelo. Reto extra: una plataforma peligrosa.',
          learns: 'Condiciones, velocidad y detección de colisiones',
        },
        {
          date: '15/02',
          label: 'Clase 11',
          title: 'Monedas, enemigos y poderes',
          text: 'Objetos coleccionables, enemigos móviles y contador de monedas. Cada alumno inventa un poder especial.',
          learns: 'Variables, bucles y comunicación entre sprites',
        },
        {
          date: '22/02',
          label: 'Clase 12',
          title: 'Boss final y demo del juego',
          text: 'Enemigo final, pantallas de victoria y derrota. Sesión de pruebas por parejas.',
          learns: 'Estados del juego, mensajes y depuración',
        },
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Marzo 2027',
      title: 'Misterios, decisiones y escape rooms',
      text: 'Objetivo: una aventura donde el jugador piensa y decide. Escape room con pistas, preguntas y finales alternativos.',
      sessions: [
        {
          date: '01/03',
          label: 'Clase 13',
          title: 'El misterio de la habitación secreta',
          text: 'Diseñar una habitación con objetos ocultos, personajes y una historia. Decidir qué debe descubrir el jugador.',
          learns: 'Diseño de niveles, eventos y secuencias',
        },
        {
          date: '08/03',
          label: 'Clase 14',
          title: 'Pistas y acertijos',
          text: 'Un código secreto, una pregunta o un objeto que solo se activa al tocarlo.',
          learns: 'Operadores, condiciones y respuestas del usuario',
        },
        {
          date: '15/03',
          label: 'Clase 15',
          title: 'Decisiones que cambian la historia',
          text: 'Dos caminos distintos según las elecciones del jugador y varios finales posibles.',
          learns: 'Variables de estado, condicionales y mensajes',
        },
        {
          date: '22/03',
          label: 'Clase 16',
          title: 'Escape room: reto entre compañeros',
          text: 'Jugar a las habitaciones de los demás, observar dónde se atascan y mejorar las pistas.',
          learns: 'Pruebas de usuario, depuración y diseño de retos',
        },
        {
          date: '29/03',
          label: 'Clase 17',
          title: 'Desafío sorpresa: minijuego en 60 minutos',
          text: 'Temática revelada al empezar. Crear una versión jugable y enseñar el resultado. (Clase aunque sea festivo local/autonómico.)',
          learns: 'Planificar, reutilizar conceptos y construir con autonomía',
        },
      ],
    },
    {
      phase: 'Bloque 5',
      period: 'Abril 2027',
      title: 'Crea tu propio juego de preguntas',
      text: 'Objetivo: un concurso interactivo con preguntas, puntuación y rondas. Proyecto independiente, perfecto para quien entre en abril.',
      sessions: [
        {
          date: '05/04',
          label: 'Clase 18',
          title: 'Diseña un concurso',
          text: 'Presentador, pantalla inicial, botones de respuesta y temática: animales, fútbol, videojuegos o ciencia.',
          learns: 'Interfaz, eventos y respuestas del jugador',
        },
        {
          date: '12/04',
          label: 'Clase 19',
          title: 'Preguntas que funcionan de verdad',
          text: 'Respuestas correctas e incorrectas, sumar puntos y mensajes distintos.',
          learns: 'Condicionales, operadores y variables',
        },
        {
          date: '19/04',
          label: 'Clase 20',
          title: 'Rondas, cronómetro y récords',
          text: 'Límite de tiempo, varias preguntas y pantalla final con la puntuación.',
          learns: 'Bucles, temporizadores y control de estados',
        },
        {
          date: '26/04',
          label: 'Clase 21',
          title: '¡Concurso en directo!',
          text: 'Presentar los juegos y competir respondiendo a las preguntas de los compañeros.',
          learns: 'Probar, corregir errores y presentar un proyecto',
        },
      ],
    },
    {
      phase: 'Bloque 6',
      period: 'Mayo 2027',
      title: 'Efectos especiales y juegos más avanzados',
      text: 'Objetivo: mecánicas nuevas y un arcade espacial con enemigos, efectos y niveles.',
      sessions: [
        {
          date: '03/05',
          label: 'Clase 22',
          title: '¡Defiende la galaxia!',
          text: 'Nave, enemigos y fondo espacial. Programar movimiento y disparos.',
          learns: 'Movimiento, eventos y coordinación entre sprites',
        },
        {
          date: '10/05',
          label: 'Clase 23',
          title: 'Enemigos infinitos',
          text: 'Generar enemigos con clones y hacerlos desaparecer al recibir un disparo.',
          learns: 'Clonación, bucles y detección de colisiones',
        },
        {
          date: '17/05',
          label: 'Clase 24',
          title: 'Poderes, explosiones y niveles',
          text: 'Escudo, mejora especial, sonidos y efectos. Los más avanzados añaden oleadas.',
          learns: 'Variables, efectos, mensajes y dificultad progresiva',
        },
        {
          date: '24/05',
          label: 'Clase 25',
          title: 'Arcade espacial: versión final',
          text: 'Terminar, corregir fallos y jugar a las versiones de los compañeros. Reto: un jefe final.',
          learns: 'Depuración, equilibrio y mejora de proyectos',
        },
        {
          date: '31/05',
          label: 'Clase 26',
          title: 'Laboratorio de ideas locas',
          text: 'Elegir entre juego de reflejos, mascota virtual o simulador divertido y construir una primera versión.',
          learns: 'Creatividad, planificación y reutilización de código',
        },
      ],
    },
    {
      phase: 'Bloque 7',
      period: 'Junio 2027',
      title: 'El gran proyecto final',
      text: 'Objetivo: irse con un juego propio del que se sienten orgullosos. Cada uno elige su idea según nivel e intereses.',
      sessions: [
        {
          date: '07/06',
          label: 'Clase 27',
          title: 'Elige tu videojuego',
          text: 'Ideas posibles, dibujar pantallas, decidir reglas y crear una primera versión jugable.',
          learns: 'Diseño de juegos, planificación y descomposición de problemas',
        },
        {
          date: '14/06',
          label: 'Clase 28',
          title: 'Construye las mecánicas principales',
          text: 'Programar movimiento, reglas e interacción central. Ayuda personalizada según el nivel.',
          learns: 'Aplicar conceptos con autonomía y resolver problemas',
        },
        {
          date: '21/06',
          label: 'Clase 29',
          title: 'Pulir, probar y sorprender',
          text: 'Música, animaciones, pantallas, puntos o niveles. Probar con compañeros y corregir.',
          learns: 'Depuración, diseño y pruebas de usuario',
        },
        {
          date: '28/06',
          label: 'Clase 30',
          title: '¡Santamaria Game Fest!',
          text: 'Presentar el juego, probar los de los compañeros y premios simbólicos: más divertido, más creativo y mejor sorpresa.',
          learns: 'Comunicación, confianza y valoración del trabajo propio',
        },
      ],
    },
  ] as const;

  readonly unitySkills = [
    'Crear videojuegos en 2D con Unity desde cero',
    'Programar con C#: variables, condiciones, eventos y funciones',
    'Controlar personajes, saltos, enemigos, objetos y colisiones',
    'Planificar, probar y presentar un videojuego propio',
  ] as const;

  readonly unityLearningAreas = [
    {
      number: '01',
      title: 'Unity 2D desde cero',
      text: 'Editor, personaje, salto, plataformas y un primer nivel jugable.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'C# del juego',
      text: 'Monedas, puntuación, enemigos, vidas, menús y metas.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Más mecánicas',
      text: 'Cronómetro, potenciadores, segundo nivel, esquivar y disparar.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Acabado y fest',
      text: 'Animaciones, sonido, efectos, récord y proyecto final propio.',
      tone: 'green',
    },
  ] as const;

  readonly unityOutcomes = {
    title: '¿Qué aprenderás?',
    text: 'Al finalizar las 30 sesiones, habrán creado varios juegos 2D y un proyecto final propio.',
    points: [
      'Crear videojuegos en 2D con Unity desde cero.',
      'Programar con C# utilizando variables, condiciones, eventos y funciones sencillas.',
      'Controlar personajes, saltos, enemigos, objetos y colisiones.',
      'Diseñar menús, puntuaciones, vidas, temporizadores y niveles.',
      'Incorporar animaciones, sonido y efectos visuales.',
      'Planificar, probar y presentar un videojuego propio.',
    ],
  } as const;

  readonly unityCurriculum = [
    {
      phase: 'Diciembre',
      period: 'Diciembre 2026',
      title: 'Primeros pasos con Unity',
      text: 'Objetivo: conocer el editor y construir un primer nivel de plataformas.',
      sessions: [
        {
          date: '01/12',
          label: 'Clase 1',
          title: "Mi primer videojuego 2D",
          text: "Tu primera escena de videojuego, con un personaje, un suelo y varios objetos.",
          learns: "Qué es Unity, cómo funciona su editor, cómo colocar objetos en una escena y cómo ejecutar el juego para probarlo",
        }
,
        {
          date: '15/12',
          label: 'Clase 2',
          title: "Controla a tu personaje",
          text: "Un personaje que se mueve a izquierda y derecha con las teclas del teclado.",
          learns: "Cómo conectar un script de C# a un objeto, leer el movimiento del teclado y cambiar la posición del personaje mediante código",
        }
,
        {
          date: '22/12',
          label: 'Clase 3',
          title: "Saltos y gravedad",
          text: "Un personaje que salta y vuelve a caer al suelo de forma natural.",
          learns: "Cómo funciona la gravedad en un videojuego, cómo detectar cuándo el personaje está en el suelo y cómo programar un salto",
        }
,
        {
          date: '29/12',
          label: 'Clase 4',
          title: "Construye un nivel de plataformas",
          text: "Un escenario con plataformas a distintas alturas, zonas seguras y obstáculos.",
          learns: "Cómo organizar una escena, reutilizar elementos y configurar colisiones para que el personaje pueda caminar y saltar sobre las plataformas",
        }
,
      ],
    },
    {
      phase: 'Enero',
      period: 'Enero 2027',
      title: 'Monedas, enemigos y objetivos',
      text: 'Objetivo: añadir recompensas, peligros y un sistema de vidas.',
      sessions: [
        {
          date: '05/01',
          label: 'Clase 5',
          title: "Recoge monedas",
          text: "Monedas que desaparecen cuando el personaje las recoge.",
          learns: "Qué son las colisiones entre objetos, cómo detectar que el jugador ha tocado una moneda y cómo ejecutar una acción cuando sucede algo",
        }
,
        {
          date: '12/01',
          label: 'Clase 6',
          title: "Tu primer contador de puntos",
          text: "Un contador en pantalla que aumenta cada vez que recoges una moneda.",
          learns: "Qué son las variables, cómo guardar una puntuación en memoria y cómo actualizar los textos de la interfaz desde C#",
        }
,
        {
          date: '19/01',
          label: 'Clase 7',
          title: "Añade un enemigo",
          text: "Un enemigo que se desplaza de un lado a otro patrullando una plataforma.",
          learns: "Cómo programar el movimiento de un enemigo, cambiar su dirección y utilizar condiciones para controlar su comportamiento",
        }
,
        {
          date: '26/01',
          label: 'Clase 8',
          title: "Vidas y derrotas",
          text: "Un sistema en el que tocar a un enemigo hace perder una vida y puede reiniciar el nivel.",
          learns: "Cómo modificar variables, comprobar cuántas vidas quedan y ejecutar acciones diferentes según el resultado",
        }
,
      ],
    },
    {
      phase: 'Febrero',
      period: 'Febrero 2027',
      title: 'Un juego con principio y final',
      text: 'Objetivo: cerrar un plataformas completo con menú e interfaz.',
      sessions: [
        {
          date: '02/02',
          label: 'Clase 9',
          title: "Llega a la meta",
          text: "Una meta que termina el nivel cuando el personaje la alcanza y muestra un mensaje de victoria.",
          learns: "Cómo detectar que se ha cumplido un objetivo y cómo cambiar el estado del juego de jugando a victoria",
        }
,
        {
          date: '09/02',
          label: 'Clase 10',
          title: "Tu primer plataformas completo",
          text: "Un nivel que combine movimiento, saltos, monedas, enemigos y una meta.",
          learns: "Cómo unir sistemas creados por separado, probarlos en conjunto y corregir errores básicos",
        }
,
        {
          date: '16/02',
          label: 'Clase 11',
          title: "Crea el menú principal",
          text: "Una pantalla inicial con un botón para comenzar la partida.",
          learns: "Cómo añadir botones e interfaces, detectar cuándo el jugador pulsa uno y cambiar entre pantallas o escenas",
        }
,
        {
          date: '23/02',
          label: 'Clase 12',
          title: "Vidas e interfaz de juego",
          text: "Una interfaz con vidas, puntuación y mensajes para el jugador.",
          learns: "Cómo mostrar información útil durante la partida y mantenerla sincronizada con lo que ocurre en el juego",
        }
,
      ],
    },
    {
      phase: 'Marzo',
      period: 'Marzo 2027',
      title: 'Nuevas mecánicas de juego',
      text: 'Objetivo: cronómetro, potenciadores, segundo nivel y un juego de esquivar.',
      sessions: [
        {
          date: '02/03',
          label: 'Clase 13',
          title: "Corre contra el tiempo",
          text: "Un nivel en el que hay que llegar a la meta antes de que el cronómetro llegue a cero.",
          learns: "Cómo medir el tiempo en Unity, actualizar un contador y comprobar si se ha agotado el tiempo disponible",
        }
,
        {
          date: '09/03',
          label: 'Clase 14',
          title: "Potenciadores especiales",
          text: "Un objeto que, al recogerlo, hace que el personaje corra más rápido durante unos segundos.",
          learns: "Cómo cambiar temporalmente una característica del personaje y devolverla a su valor original",
        }
,
        {
          date: '16/03',
          label: 'Clase 15',
          title: "Diseña un segundo nivel",
          text: "Una segunda fase con un escenario diferente y nuevos obstáculos.",
          learns: "Cómo organizar varias escenas, pasar de un nivel a otro y aumentar la dificultad progresivamente",
        }
,
        {
          date: '23/03',
          label: 'Clase 16',
          title: "Esquiva los obstáculos",
          text: "Un juego 2D en el que el jugador debe esquivar objetos peligrosos.",
          learns: "Cómo controlar un personaje en otra perspectiva, detectar colisiones y decidir qué ocurre cuando toca un obstáculo",
        }
,
        {
          date: '30/03',
          label: 'Clase 17',
          title: "Sobrevive cada vez más tiempo",
          text: "Una versión más difícil del juego anterior, en la que aparecen obstáculos con mayor frecuencia.",
          learns: "Cómo generar objetos durante la partida, controlar la frecuencia de aparición y ajustar la dificultad",
        }
,
      ],
    },
    {
      phase: 'Abril',
      period: 'Abril 2027',
      title: 'Otros tipos de videojuegos 2D',
      text: 'Objetivo: explorar otros géneros: recoger objetos, nave espacial y animaciones.',
      sessions: [
        {
          date: '06/04',
          label: 'Clase 18',
          title: "Un juego de recoger objetos",
          text: "Un pequeño juego en el que hay que recoger objetos por el escenario antes de que termine el tiempo.",
          learns: "Cómo combinar movimiento, coleccionables, puntuación y temporizador en un juego con un objetivo claro",
        }
,
        {
          date: '13/04',
          label: 'Clase 19',
          title: "Tu primera nave espacial",
          text: "Una nave que se mueve por la pantalla y dispara proyectiles.",
          learns: "Cómo crear objetos desde código, controlar disparos y gestionar la aparición de proyectiles durante una partida",
        }
,
        {
          date: '20/04',
          label: 'Clase 20',
          title: "Destruye enemigos",
          text: "Enemigos que aparecen en pantalla y desaparecen cuando reciben un disparo.",
          learns: "Cómo detectar impactos, destruir objetos, sumar puntos y crear una condición de derrota o victoria",
        }
,
        {
          date: '27/04',
          label: 'Clase 21',
          title: "Dale vida a tu personaje",
          text: "Animaciones para que el personaje parezca caminar, saltar o quedarse quieto.",
          learns: "Qué son los sprites y las animaciones 2D, cómo organizar sus imágenes y cómo cambiar de animación según la acción",
        }
,
      ],
    },
    {
      phase: 'Mayo',
      period: 'Mayo 2027',
      title: 'Sonido, efectos y acabado profesional',
      text: 'Objetivo: pulir la experiencia con audio, partículas, récords y pruebas de jugador.',
      sessions: [
        {
          date: '04/05',
          label: 'Clase 22',
          title: "Sonidos y música",
          text: "Un juego con música de fondo y sonidos al saltar, recoger monedas o perder.",
          learns: "Cómo importar archivos de audio y reproducirlos cuando suceden eventos concretos",
        }
,
        {
          date: '11/05',
          label: 'Clase 23',
          title: "Efectos visuales",
          text: "Pequeñas explosiones, destellos o efectos al recoger objetos y destruir enemigos.",
          learns: "Cómo utilizar sistemas de partículas sencillos para hacer que las acciones del juego resulten más satisfactorias",
        }
,
        {
          date: '18/05',
          label: 'Clase 24',
          title: "Guarda tu récord",
          text: "Un sistema que conserva la mejor puntuación incluso después de cerrar y volver a abrir el juego.",
          learns: "Cómo guardar y recuperar datos sencillos en el dispositivo con las herramientas básicas de Unity",
        }
,
        {
          date: '25/05',
          label: 'Clase 25',
          title: "Mejora la experiencia de juego",
          text: "Una versión más cuidada de uno de los juegos anteriores, con controles y pantallas mejor organizados.",
          learns: "Probar el juego como un jugador, identificar problemas y mejorar la interfaz, el ritmo y la dificultad",
        }
,
      ],
    },
    {
      phase: 'Junio',
      period: 'Junio 2027',
      title: 'Proyecto final',
      text: 'Objetivo: diseñar, construir y presentar un videojuego propio.',
      sessions: [
        {
          date: '01/06',
          label: 'Clase 26',
          title: "Diseña tu propio videojuego",
          text: "El plan de un juego original: su objetivo, personaje, enemigos y reglas principales.",
          learns: "Dividir una idea en tareas pequeñas y decidir qué funcionalidades son necesarias para construir una primera versión jugable",
        }
,
        {
          date: '08/06',
          label: 'Clase 27',
          title: "Construye el escenario",
          text: "El nivel principal de tu proyecto final, con sus plataformas, objetos y elementos visuales.",
          learns: "Organizar la escena y preparar los elementos para programar las mecánicas",
        }
,
        {
          date: '15/06',
          label: 'Clase 28',
          title: "Programa las mecánicas",
          text: "Las funciones principales del juego, como movimiento, recogida de objetos, enemigos o puntuación.",
          learns: "Utilizar los conceptos de C# trabajados durante el curso y conectarlos para conseguir un juego funcional",
        }
,
        {
          date: '22/06',
          label: 'Clase 29',
          title: "Prueba y mejora tu juego",
          text: "La versión final jugable, corrigiendo errores y añadiendo los últimos detalles.",
          learns: "Detectar fallos, probar diferentes situaciones y priorizar mejoras sin añadir funciones innecesarias",
        }
,
        {
          date: '29/06',
          label: 'Clase 30',
          title: "Santamaria Game Fest",
          text: "Presentarás tu propio videojuego al resto del grupo.",
          learns: "Explicar cómo funciona tu juego, enseñar las mecánicas que has programado y recibir comentarios de otros jugadores",
        }
,
      ],
    },
  ] as const;

  readonly mobileSkills = [
    'Diseñar pantallas con botones, sonidos, navegación y un uso claro',
    'Programar lógica con bloques: condiciones, variables, listas y estados',
    'Guardar datos en el móvil (TinyDB) y conectar Firebase o una API',
    'Terminar y presentar una app propia que puedan enseñar en casa',
  ] as const;

  readonly mobileLearningAreas = [
    {
      number: '01',
      title: 'Apps que se notan',
      text: 'No es “aprender Kodular”: es crear juegos, mascotas, organizadores y apps conectadas a Internet.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Lógica y datos',
      text: 'Eventos, variables, TinyDB, Firebase y peticiones a APIs con JSON.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Matrícula abierta',
      text: 'Cada mes es un proyecto independiente: quien entra en abril puede empezar con la Pokédex.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto final',
      text: 'En junio eligen su app, la construyen y la presentan en el Santamaria App Fest.',
      tone: 'green',
    },
  ] as const;

  readonly mobileRhythm = [
    {
      minutes: '10 min',
      title: 'Enganche',
      text: 'Demo, reto o concurso rápido para abrir la clase con energía.',
    },
    {
      minutes: '10 min',
      title: 'Idea nueva',
      text: 'Una mecánica o componente con una demostración corta.',
    },
    {
      minutes: '45 min',
      title: 'Construir',
      text: 'Montar la app, probarla, equivocarse y mejorar.',
    },
    {
      minutes: '15+10 min',
      title: 'Probar y reto',
      text: 'Depurar, jugar por parejas y un reto extra según el nivel.',
    },
  ] as const;

  readonly mobileOutcomes = {
    title: '¿Qué aprenderás?',
    text: 'Al acabar el curso, los alumnos habrán construido varios proyectos y aprendido a crear aplicaciones reales.',
    points: [
      'Diseñar pantallas con botones, imágenes, textos y formularios.',
      'Crear juegos con preguntas, puntuación, reglas y diferentes pantallas.',
      'Programar acciones que cambian según lo que hace el usuario.',
      'Guardar información en el móvil para recuperarla más adelante.',
      'Conectar una aplicación a una base de datos online con Firebase.',
      'Consultar una API de Internet y mostrar sus datos en pantalla.',
      'Crear herramientas prácticas, como agendas, listas de tareas y aplicaciones de notas.',
      'Diseñar, probar, corregir y presentar una aplicación propia.',
    ],
  } as const;

  readonly mobileCurriculum = [
    {
      phase: 'Diciembre',
      period: 'Diciembre 2026',
      title: 'Primeras aplicaciones',
      text: 'Objetivo del mes: descubrir cómo se construye una app y conseguir que los elementos de la pantalla respondan a lo que hace el usuario.',
      sessions: [
        {
          date: '01/12',
          label: 'Clase 1',
          title: 'Mi primera aplicación',
          text: 'Una app con una pantalla que tenga varios botones de colores. Al pulsar cada botón, aparecerá un mensaje diferente, como «¡Hola!», «¡Eres un crack!» o «¡A jugar!». También podrán cambiar el título, los colores y el tamaño de los textos para hacerla a su gusto.',
          learns: 'Cómo crear una pantalla para una aplicación móvil · Cómo añadir botones, textos e imágenes · Cómo decidir qué ocurre cuando alguien pulsa un botón · Cómo probar la app en un móvil o emulador',
          result: 'Una primera aplicación funcional que pueden personalizar y enseñar a su familia.',
        },
        {
          date: '15/12',
          label: 'Clase 2',
          title: 'La máquina de sonidos',
          text: 'Una app que funcione como una caja de sonidos. Tendrá botones con dibujos de animales, instrumentos o efectos de videojuegos. Al tocar el botón del perro, por ejemplo, sonará un ladrido; al tocar el de la explosión, se reproducirá un efecto de sonido.',
          learns: 'Cómo añadir archivos de sonido a una aplicación · Cómo hacer que cada botón reproduzca un sonido concreto · Cómo utilizar imágenes para que los botones sean fáciles de reconocer · Cómo evitar que los sonidos se mezclen de forma molesta',
          result: 'Una mesa de sonidos que cada alumno podrá llenar con sus efectos favoritos.',
        },
        {
          date: '22/12',
          label: 'Clase 3',
          title: 'Crea tu propio concurso',
          text: 'Un juego de preguntas con varias respuestas posibles. Por ejemplo, «¿Cuál es el planeta más grande?». Si el jugador pulsa la respuesta correcta, aparece una felicitación; si falla, la app le explica que debe volver a intentarlo.',
          learns: 'Cómo preparar preguntas y respuestas · Cómo comprobar si una respuesta es correcta o incorrecta · Cómo mostrar mensajes diferentes según lo que elija el jugador · Cómo crear reglas sencillas para que la app tome decisiones',
          result: 'Un pequeño concurso que pueden jugar entre ellos.',
        },
        {
          date: '29/12',
          label: 'Clase 4',
          title: 'Convierte tu juego en una app completa',
          text: 'Mejorarán el concurso anterior añadiendo una pantalla inicial con el nombre del juego, un botón para empezar, una pantalla con las preguntas y otra al terminar que muestre el resultado. También podrán jugar de nuevo sin tener que cerrar la aplicación.',
          learns: 'Cómo pasar de una pantalla a otra · Cómo organizar una aplicación en distintas partes · Cómo crear botones para empezar y reiniciar una partida · Cómo probar la aplicación desde el principio hasta el final',
          result: 'Su primer juego móvil completo, con inicio, partida y final.',
        },
      ],
    },
    {
      phase: 'Enero',
      period: 'Enero 2027',
      title: 'Crea un concurso de preguntas de verdad',
      text: 'Objetivo del mes: aprender a guardar puntos, elegir preguntas y construir un juego que funcione como un concurso real.',
      sessions: [
        {
          date: '05/01',
          label: 'Clase 5',
          title: 'Diseña tu concurso',
          text: 'Cada alumno creará un concurso sobre el tema que prefiera: fútbol, animales, videojuegos, películas o ciencia. La pantalla mostrará una pregunta y varias respuestas que el jugador podrá pulsar.',
          learns: 'Cómo organizar las preguntas para que sean fáciles de leer · Cómo colocar varias respuestas en la pantalla · Cómo mostrar cuál es la respuesta correcta · Cómo diseñar una interfaz atractiva para su juego',
          result: 'El diseño de un concurso personalizado, preparado para añadirle puntuación y nuevas funciones.',
        },
        {
          date: '12/01',
          label: 'Clase 6',
          title: 'Consigue puntos y supera tu récord',
          text: 'El concurso ahora tendrá un marcador. Cada respuesta correcta sumará puntos y la pantalla irá mostrando la puntuación actual. Al terminar, aparecerá el resultado de la partida.',
          learns: 'Cómo guardar un número mientras se juega · Cómo sumar puntos cuando el jugador acierta · Cómo mostrar la puntuación actualizada en pantalla · Cómo poner el marcador a cero al comenzar una nueva partida',
          result: 'Un juego en el que las respuestas tienen consecuencias y se puede intentar mejorar la puntuación.',
        },
        {
          date: '19/01',
          label: 'Clase 7',
          title: 'Preguntas que cambian en cada partida',
          text: 'En vez de repetir siempre la misma pregunta, el juego elegirá preguntas de una colección. Así, al volver a jugar, podrán aparecer preguntas diferentes y el concurso será menos predecible.',
          learns: 'Cómo guardar varias preguntas en una lista · Cómo escoger una pregunta de esa lista · Cómo mostrar sus respuestas correspondientes · Cómo evitar que una pregunta se repita cuando no debería',
          result: 'Un concurso con variedad, que se puede jugar varias veces sin que sea exactamente igual.',
        },
        {
          date: '26/01',
          label: 'Clase 8',
          title: 'Torneo de concursos',
          text: 'Terminarán su concurso con varias preguntas seguidas, puntuación final, mensajes para ganadores y perdedores y un botón para volver a jugar. Después, los alumnos intercambiarán sus aplicaciones para probar las de sus compañeros.',
          learns: 'Cómo unir preguntas, respuestas y puntuación en un único juego · Cómo mostrar una pantalla final según el resultado · Cómo encontrar y corregir errores · Cómo comprobar si otra persona entiende cómo jugar sin ayuda',
          result: 'Un concurso terminado y listo para organizar un pequeño torneo en clase.',
        },
      ],
    },
    {
      phase: 'Febrero',
      period: 'Febrero 2027',
      title: 'Crea tu propia mascota virtual',
      text: 'Objetivo del mes: crear un personaje que reaccione a las acciones del jugador, tenga necesidades, pueda comprar objetos y recuerde su progreso.',
      sessions: [
        {
          date: '02/02',
          label: 'Clase 9',
          title: 'Adopta una mascota virtual',
          text: 'Una app con una mascota, como un gato, un perro, un dragón o un monstruo inventado. Habrá botones para darle de comer, jugar con ella y saludarla. La mascota reaccionará mostrando mensajes diferentes.',
          learns: 'Cómo mostrar imágenes y personajes en pantalla · Cómo hacer que los botones provoquen acciones distintas · Cómo cambiar los mensajes según la acción realizada · Cómo diseñar una pantalla de juego con un personaje protagonista',
          result: 'Una mascota virtual con la que ya se puede interactuar.',
        },
        {
          date: '09/02',
          label: 'Clase 10',
          title: 'Cuida de tu mascota',
          text: 'La mascota tendrá tres indicadores: hambre, energía y felicidad. Cuando el jugador le dé de comer, tendrá menos hambre; cuando juegue con ella, aumentará su felicidad, pero puede cansarse. La pantalla reflejará esos cambios.',
          learns: 'Cómo representar el estado de un personaje con números · Cómo aumentar o reducir esos números al pulsar botones · Cómo mostrar barras, corazones o indicadores de estado · Cómo establecer límites para que los valores no sean absurdos',
          result: 'Una mascota que cambia según cómo la cuiden, en lugar de limitarse a mostrar mensajes.',
        },
        {
          date: '16/02',
          label: 'Clase 11',
          title: 'Monedas, tienda y accesorios',
          text: 'Añadirán monedas al juego y una pequeña tienda. Podrán conseguir monedas y gastarlas para desbloquear accesorios, como sombreros, gafas o decoraciones para su mascota. Si no tienen suficientes monedas, la compra no se permitirá.',
          learns: 'Cómo sumar y restar monedas · Cómo comprobar si tienen dinero suficiente para comprar · Cómo desbloquear elementos después de una compra · Cómo actualizar el aspecto de la mascota cuando consigue un accesorio',
          result: 'Una mascota con una economía sencilla y objetos que se pueden desbloquear jugando.',
        },
        {
          date: '23/02',
          label: 'Clase 12',
          title: 'Tu mascota recuerda quién eres',
          text: 'Harán que la aplicación recuerde el nombre de la mascota, las monedas conseguidas y los accesorios desbloqueados, incluso después de cerrar la app y volver a abrirla.',
          learns: 'Qué significa guardar información en el móvil · Cómo utilizar el almacenamiento local de Kodular, llamado TinyDB · Cómo recuperar los datos cuando la aplicación vuelve a abrirse · Cómo comprobar que el progreso no desaparece al cerrar la app',
          result: 'Una mascota virtual con progreso guardado, que se puede seguir cuidando en diferentes sesiones.',
        },
      ],
    },
    {
      phase: 'Marzo',
      period: 'Marzo 2027',
      title: 'Crea una lista de tareas que se guarda en Internet',
      text: 'Objetivo del mes: construir una herramienta útil y descubrir cómo guardar información online para que se pueda recuperar desde distintos dispositivos.',
      sessions: [
        {
          date: '02/03',
          label: 'Clase 13',
          title: 'Tu propia lista de tareas',
          text: 'Una app para apuntar cosas que tienen que hacer, como estudiar, preparar la mochila o practicar un videojuego. Escribirán una tarea en una caja de texto, pulsarán «Añadir» y la verán aparecer en su lista.',
          learns: 'Cómo recoger texto que escribe el usuario · Cómo añadir nuevas tareas a una lista · Cómo mostrar varias tareas en una pantalla · Cómo limpiar el campo de escritura después de añadir una tarea',
          result: 'Una lista de tareas que ya permite añadir actividades desde el móvil.',
        },
        {
          date: '09/03',
          label: 'Clase 14',
          title: 'Guarda tus tareas para otro día',
          text: 'Mejorarán la lista para poder marcar las tareas completadas y conservar las tareas pendientes cuando cierren la aplicación. Al volver a abrirla, la lista aparecerá como la dejaron.',
          learns: 'Cómo marcar una tarea como terminada · Cómo guardar una lista en el propio móvil · Cómo recuperar la lista cuando se abre de nuevo la app · Cómo actualizar los datos cuando se añade o completa una tarea',
          result: 'Una agenda sencilla que recuerda las tareas sin tener que escribirlas de nuevo cada día.',
        },
        {
          date: '16/03',
          label: 'Clase 15',
          title: 'Guarda los datos en la nube',
          text: 'Conectarán su lista de tareas a una base de datos online con Firebase. En vez de guardar todo únicamente en el teléfono, la app podrá enviar tareas a Internet y volver a leerlas desde allí.',
          learns: 'Qué diferencia hay entre guardar algo en el móvil y guardarlo online · Qué es Firebase y para qué sirve una base de datos en la nube · Cómo enviar una tarea a Firebase · Cómo recuperar y mostrar las tareas guardadas',
          result: 'Una lista conectada a una base de datos online. La conexión y los permisos estarán preparados de antemano para que puedan centrarse en construir la app.',
        },
        {
          date: '23/03',
          label: 'Clase 16',
          title: 'Consulta las mismas tareas desde dos dispositivos',
          text: 'Probarán la lista desde dos móviles o sesiones de prueba. Añadirán una tarea desde uno y comprobarán si aparece en el otro al leer los mismos datos de Firebase.',
          learns: 'Cómo una aplicación obtiene información de un servidor · Cómo compartir datos entre dos dispositivos de prueba · Cómo actualizar la pantalla cuando cambian los datos · Por qué hay que identificar y separar los datos de cada usuario',
          result: 'Una demostración de sincronización online. Para mantenerlo seguro, se utilizarán cuentas y datos de prueba; no se compartirán las tareas personales de los alumnos.',
        },
        {
          date: '30/03',
          label: 'Clase 17',
          title: 'Mejora tu gestor de tareas',
          text: 'Añadirán categorías como «Estudios», «Casa» y «Tiempo libre», además de prioridades como «Urgente» o «Puede esperar». También podrán filtrar la lista para ver solo las tareas pendientes o las de una categoría.',
          learns: 'Cómo guardar más información para cada tarea · Cómo organizar tareas mediante categorías y prioridades · Cómo mostrar solo los elementos que cumplen una condición · Cómo combinar la interfaz, el almacenamiento y la lógica de la app',
          result: 'Un gestor de tareas más completo, útil para organizar el día a día.',
        },
      ],
    },
    {
      phase: 'Abril',
      period: 'Abril 2027',
      title: 'Crea tu propia Pokédex conectada a Internet',
      text: 'Objetivo del mes: descubrir cómo una aplicación puede consultar información real de Internet y mostrarla dentro de su propia pantalla.',
      sessions: [
        {
          date: '06/04',
          label: 'Clase 18',
          title: 'Diseña tu enciclopedia de criaturas',
          text: 'Una aplicación inspirada en una Pokédex. Tendrá una caja para escribir el nombre de una criatura y una zona donde mostrar su imagen, su nombre y sus características. Primero crearán la pantalla con datos de ejemplo para entender cómo se organizará.',
          learns: 'Cómo crear una pantalla para buscar información · Cómo recoger lo que escribe el usuario · Cómo organizar los datos en una ficha con imagen y texto · Cómo diseñar una aplicación que permita consultar muchos elementos',
          result: 'Una enciclopedia visual preparada para conectarse a datos reales.',
        },
        {
          date: '13/04',
          label: 'Clase 19',
          title: 'Busca criaturas en Internet',
          text: 'Conectarán la aplicación con una API pública de Pokémon. Cuando escriban un nombre y pulsen «Buscar», la app enviará una petición a Internet y recibirá información sobre ese Pokémon.',
          learns: 'Qué es una API: un servicio que permite a una aplicación pedir información a otra · Cómo utilizar el componente Web de Kodular para hacer una petición a Internet · Qué ocurre cuando la aplicación envía una búsqueda y recibe una respuesta · Cómo detectar si el nombre buscado no existe o no se ha podido obtener la información',
          result: 'Una búsqueda real desde el móvil, sin tener que escribir previamente todos los Pokémon dentro de la aplicación.',
        },
        {
          date: '20/04',
          label: 'Clase 20',
          title: 'Muestra la ficha completa',
          text: 'Harán que la app muestre la imagen del Pokémon encontrado, su nombre, su tipo y algunas estadísticas, como su altura o sus características de combate.',
          learns: 'Cómo interpretar los datos que devuelve una API · Qué es JSON: una forma habitual de organizar información para que las aplicaciones puedan leerla · Cómo extraer campos concretos de una respuesta · Cómo mostrar la información recibida en los elementos de la pantalla',
          result: 'Una ficha informativa que se rellena automáticamente con datos reales de Internet.',
        },
        {
          date: '27/04',
          label: 'Clase 21',
          title: 'Crea tu colección de favoritos',
          text: 'Añadirán un botón para guardar los Pokémon favoritos. Después podrán abrir una sección de favoritos para consultar su colección sin tener que buscarlos otra vez.',
          learns: 'Cómo guardar los elementos que elige el usuario · Cómo utilizar TinyDB para conservar los favoritos en el móvil · Cómo mostrar una colección de elementos guardados · Cómo combinar información de Internet con datos almacenados localmente',
          result: 'Una Pokédex con búsqueda real y colección personal de favoritos.',
        },
      ],
    },
    {
      phase: 'Mayo',
      period: 'Mayo 2027',
      title: 'Crea herramientas que puedas utilizar en tu día a día',
      text: 'Objetivo del mes: aprender a diseñar aplicaciones prácticas, gestionar información y construir herramientas personales que no sean solo juegos.',
      sessions: [
        {
          date: '04/05',
          label: 'Clase 22',
          title: 'Diseña tu centro de control personal',
          text: 'Una aplicación con una pantalla principal desde la que podrán entrar en tres apartados: tareas, notas y objetivos personales. Cada apartado tendrá su propio botón y pantalla.',
          learns: 'Cómo organizar una app que tiene varias funciones · Cómo crear un menú principal · Cómo conectar las diferentes pantallas · Cómo mantener un diseño coherente en toda la aplicación',
          result: 'La estructura de una aplicación personal que irán completando durante el mes.',
        },
        {
          date: '11/05',
          label: 'Clase 23',
          title: 'Crea tu propia app de notas',
          text: 'Un apartado donde escribir notas, guardarlas, abrirlas para leerlas, modificarlas y eliminarlas cuando ya no las necesiten.',
          learns: 'Cómo crear formularios para introducir información · Cómo guardar y mostrar varias notas · Cómo editar una nota existente sin crear otra diferente · Cómo borrar elementos y actualizar la pantalla',
          result: 'Una aplicación de notas que permite gestionar la información de principio a fin.',
        },
        {
          date: '18/05',
          label: 'Clase 24',
          title: 'Supera un reto de siete días',
          text: 'Una pantalla donde definirán un objetivo, como leer, dibujar, estudiar o practicar un deporte. Cada día podrán marcar si lo han cumplido y ver cuánto han avanzado.',
          learns: 'Cómo representar los días de una semana · Cómo guardar qué objetivos se han completado · Cómo calcular el porcentaje de progreso · Cómo conservar los resultados para consultarlos más adelante',
          result: 'Un seguimiento de hábitos con casillas, progreso y resultados personales.',
        },
        {
          date: '25/05',
          label: 'Clase 25',
          title: 'Haz que tu aplicación parezca profesional',
          text: 'Mejorarán el centro de control personal que comenzaron a diseñar. Revisarán los colores, los iconos, el tamaño de los botones, la organización de las pantallas y los mensajes que aparecen cuando no hay datos.',
          learns: 'Cómo crear una interfaz clara y fácil de utilizar · Cómo mantener los mismos estilos en las diferentes pantallas · Cómo detectar errores de navegación y de funcionamiento · Cómo probar una app pensando en alguien que nunca la ha utilizado',
          result: 'Una aplicación personal más ordenada, cómoda y lista para enseñar.',
        },
      ],
    },
    {
      phase: 'Junio',
      period: 'Junio 2027',
      title: 'Crea tu propia aplicación final',
      text: 'Objetivo del mes: utilizar lo aprendido para desarrollar una aplicación elegida por cada alumno, desde la idea inicial hasta la presentación final.',
      sessions: [
        {
          date: '01/06',
          label: 'Clase 26',
          title: 'Inventa una app que te gustaría tener',
          text: 'Cada alumno elegirá una idea propia. Puede ser un juego, una agenda, una enciclopedia, una mascota virtual o una app para organizar alguna actividad. Dibujarán cómo serán sus pantallas y decidirán qué podrá hacer el usuario.',
          learns: 'Cómo convertir una idea en un proyecto concreto · Cómo decidir qué funciones son realmente necesarias · Cómo dibujar las pantallas antes de empezar a programar · Cómo dividir el proyecto en pequeñas tareas para avanzar paso a paso',
          result: 'Un proyecto personal planificado, con sus pantallas y funciones principales definidas.',
        },
        {
          date: '08/06',
          label: 'Clase 27',
          title: 'Construye las funciones principales',
          text: 'Empezarán a desarrollar su propia app en Kodular. Si han elegido una agenda, podrán añadir tareas; si han elegido un juego, podrán jugar una primera partida; si han elegido una enciclopedia, podrán consultar sus primeras fichas.',
          learns: 'Cómo transformar un diseño en una aplicación funcional · Cómo construir las pantallas y añadir los elementos necesarios · Cómo programar las acciones principales de su proyecto · Cómo probar cada función a medida que la van creando',
          result: 'Una primera versión funcional de su aplicación, aunque todavía falten detalles por mejorar.',
        },
        {
          date: '15/06',
          label: 'Clase 28',
          title: 'Añade una función especial',
          text: 'Incorporarán una función avanzada que mejore su proyecto. Por ejemplo, guardar el progreso, conservar datos al cerrar la app, consultar información de Internet o conectar una sección a Firebase, según el tipo de aplicación que hayan elegido.',
          learns: 'Cómo elegir una función que aporte valor a su aplicación · Cómo reutilizar el almacenamiento local, las API o Firebase · Cómo conectar la nueva función con lo que ya han programado · Cómo comprobar que la nueva función no rompe las anteriores',
          result: 'Una aplicación con una función adicional adaptada a su propio proyecto. No tendrán que implementar todas las tecnologías: cada alumno trabajará con la más adecuada para su idea.',
        },
        {
          date: '22/06',
          label: 'Clase 29',
          title: 'Corrige errores y prepara tu app',
          text: 'Dedicarán la sesión a revisar su proyecto completo. Probarán los botones, comprobarán que se guarden los datos cuando corresponda, revisarán las pantallas y solucionarán los fallos que encuentren.',
          learns: 'Cómo reproducir un error para averiguar qué lo provoca · Cómo revisar paso a paso la lógica de la aplicación · Cómo mejorar textos, botones, imágenes y navegación · Cómo preparar una demostración clara para otras personas',
          result: 'Una versión final mucho más estable, pulida y lista para presentar.',
        },
        {
          date: '29/06',
          label: 'Clase 30',
          title: 'Santamaria App Fest',
          text: 'No empezarán una app nueva; prepararán y presentarán la que han desarrollado. Cada alumno explicará qué hace su aplicación, enseñará las funciones principales y permitirá que sus compañeros la prueben.',
          learns: 'Cómo explicar una creación tecnológica de forma sencilla · Cómo demostrar que una aplicación funciona · Cómo recibir comentarios y detectar posibles mejoras · Cómo reconocer todo lo que han aprendido durante el curso',
          result: 'Una presentación final de sus aplicaciones y un cierre del curso en el que todos puedan enseñar lo que han conseguido crear.',
        },
      ],
    },
  ] as const;

  readonly arduinoSkills = [
    'Montar circuitos con el kit: LEDs, botones, potenciómetros y sensores',
    'Programar la placa y leer datos en el monitor serie',
    'Usar LCD, mando IR, teclado, motores, relé y automatismos',
    'Diseñar, construir, probar y presentar un invento propio',
  ] as const;

  readonly arduinoLearningAreas = [
    {
      number: '01',
      title: 'Primeros circuitos',
      text: 'Placa UNO, protoboard, LEDs, RGB, botones y potenciómetro.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Sensores y sonido',
      text: 'Zumbadores, LDR, ultrasónico, tacto, DHT11 y monitor serie.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Pantallas y control',
      text: 'LCD, teclado, mando IR, joystick, displays y motores del kit.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto final',
      text: 'Combinan piezas del kit y presentan su invento en el Robotics Fest.',
      tone: 'green',
    },
  ] as const;

  readonly arduinoOutcomes = {
    title: '¿Qué aprenderás?',
    text: 'Trabajarás con el kit Miuzei (placa UNO, sensores, pantallas y motores) para montar, programar y presentar inventos reales en 90 minutos por sesión.',
    points: [
      'Montar circuitos en protoboard con LEDs, botones, potenciómetros y resistencias.',
      'Leer sensores del kit: luz, distancia ultrasónica, tacto, temperatura y humedad.',
      'Mostrar información en LCD y displays, y controlar con teclado, joystick o mando IR.',
      'Mover un servo, un motor DC o un stepper y usar el relé con seguridad.',
      'Depurar con el monitor serie y combinar piezas en un invento propio.',
      'Presentar tu proyecto en el Santamaria Robotics Fest.',
    ],
  } as const;

  readonly arduinoCurriculum = [
    {
      phase: 'Diciembre',
      period: 'Diciembre 2026',
      title: 'Primeros pasos con el kit',
      text: 'Conocer la placa UNO, la protoboard y controlar luces del kit Miuzei.',
      sessions: [
        {
          date: '02/12',
          label: 'Clase 1',
          title: 'Abre el kit y enciende tu primer LED',
          text: 'Identificarás la placa UNO, la protoboard, las resistencias y los cables. Montarás un LED y lo encenderás desde el IDE. Un resultado claro en 90 minutos: luz que responde al código.',
          learns: 'Arduino IDE, pines digitales, LED, resistencia y protoboard',
        },
        {
          date: '09/12',
          label: 'Clase 2',
          title: 'Luces de colores en secuencia',
          text: 'Montarás varios LED del kit y programarás una secuencia. Aprenderás a organizar salidas y tiempos sin saturar el montaje.',
          learns: 'Varias salidas digitales, delay y secuencias',
        },
        {
          date: '16/12',
          label: 'Clase 3',
          title: 'LED RGB: inventa tus colores',
          text: 'Usarás el LED RGB del kit para mezclar colores. Cambiarás valores del programa y verás el resultado al instante.',
          learns: 'LED RGB, PWM básico y personalizar patrones',
        },
        {
          date: '23/12',
          label: 'Clase 4',
          title: 'Botones que mandan',
          text: 'Conectarás un pulsador del kit para encender o apagar luces. Descubrirás cómo Arduino lee el mundo exterior.',
          learns: 'Entradas digitales, botones y condiciones sencillas',
        },
        {
          date: '30/12',
          label: 'Clase 5',
          title: 'Potenciómetro y brillo',
          text: 'Con un potenciómetro del kit variarás el brillo de un LED. Leerás valores analógicos y controlarás una salida PWM.',
          learns: 'Entrada analógica, map y PWM',
        },
      ],
    },
    {
      phase: 'Enero',
      period: 'Enero 2027',
      title: 'Sonido, luz y datos',
      text: 'Zumbadores, semáforo, sensor de luz LDR y monitor serie.',
      sessions: [
        {
          date: '06/01',
          label: 'Clase 6',
          title: 'Alarmas con zumbador',
          text: 'Probarás el zumbador activo y el pasivo del kit. Crearás una alarma sencilla activada con un botón.',
          learns: 'Zumbadores, tono y alarma con botón',
        },
        {
          date: '13/01',
          label: 'Clase 7',
          title: 'Semáforo automático',
          text: 'Combinarás LED y tiempos para un semáforo completo. Una secuencia clara que cabe en una sesión.',
          learns: 'Secuencias, estados y varios LED',
        },
        {
          date: '20/01',
          label: 'Clase 8',
          title: 'Luz nocturna con LDR',
          text: 'Usarás una fotorresistencia del kit para detectar poca luz y encender un LED automáticamente.',
          learns: 'Sensor LDR, if/else y umbrales',
        },
        {
          date: '27/01',
          label: 'Clase 9',
          title: 'El monitor serie te cuenta qué pasa',
          text: 'Leerás potenciómetro o LDR en el ordenador. Aprenderás a comprobar el circuito antes de seguir.',
          learns: 'Monitor serie, depuración y lectura de sensores',
        },
      ],
    },
    {
      phase: 'Febrero',
      period: 'Febrero 2027',
      title: 'Distancia, tacto y movimiento',
      text: 'Ultrasónico HC-SR04, sensor táctil y servomotor SG90 del kit.',
      sessions: [
        {
          date: '03/02',
          label: 'Clase 10',
          title: 'Medidor de distancia',
          text: 'Montarás el sensor ultrasónico del kit (ya con pines) y medirás distancias en el monitor serie.',
          learns: 'HC-SR04, tiempos y medir el entorno',
        },
        {
          date: '10/02',
          label: 'Clase 11',
          title: 'Sensor de aparcamiento',
          text: 'Combinarás ultrasónico, LED y zumbador para avisar cuando algo se acerca demasiado. Un proyecto completo y realista en 90 minutos.',
          learns: 'Combinar sensor, luces y sonido',
        },
        {
          date: '17/02',
          label: 'Clase 12',
          title: 'Lámpara táctil',
          text: 'Usarás el módulo táctil del kit para encender una luz o activar una alarma al tocar.',
          learns: 'Sensor táctil, entradas digitales y reacciones',
        },
        {
          date: '24/02',
          label: 'Clase 13',
          title: 'Tu primer servo',
          text: 'Moverás el servomotor SG90 del kit a distintas posiciones. Verás cómo Arduino produce movimiento preciso.',
          learns: 'Servo, biblioteca Servo y ángulos',
        },
      ],
    },
    {
      phase: 'Marzo',
      period: 'Marzo 2027',
      title: 'Automatismos y pantallas',
      text: 'Barrera automática, LCD1602 y estación de temperatura DHT11.',
      sessions: [
        {
          date: '03/03',
          label: 'Clase 14',
          title: 'Barrera automática',
          text: 'Unirás ultrasónico y servo: la barrera se abre al detectar un objeto cercano. Un automatismo clásico con piezas del kit.',
          learns: 'Combinar distancia y servo',
        },
        {
          date: '10/03',
          label: 'Clase 15',
          title: 'Tu primera pantalla LCD',
          text: 'Conectarás el LCD1602 del kit (módulo listo, sin soldar) y mostrarás mensajes. Un paso visual muy motivador.',
          learns: 'LCD1602, biblioteca LiquidCrystal y mensajes',
        },
        {
          date: '17/03',
          label: 'Clase 16',
          title: 'LCD + distancia en vivo',
          text: 'Mostrarás en la pantalla la distancia medida por el ultrasónico. Combinarás sensor y display en un solo montaje.',
          learns: 'Actualizar LCD con datos de sensor',
        },
        {
          date: '24/03',
          label: 'Clase 17',
          title: 'Estación de temperatura y humedad',
          text: 'Usarás el DHT11 del kit y mostrarás temperatura y humedad en el LCD o en el monitor serie.',
          learns: 'DHT11, lectura de ambiente y mostrar datos',
        },
        {
          date: '31/03',
          label: 'Clase 18',
          title: 'Teclado 4x4',
          text: 'Conectarás el teclado matricial del kit y leerás teclas en pantalla. Base para cerraduras y menús.',
          learns: 'Teclado 4x4, matrices y lectura de teclas',
        },
      ],
    },
    {
      phase: 'Abril',
      period: 'Abril 2027',
      title: 'Control remoto e interfaces',
      text: 'Cerradura con teclado, mando IR, joystick y display de 7 segmentos.',
      sessions: [
        {
          date: '07/04',
          label: 'Clase 19',
          title: 'Cerradura con teclado',
          text: 'Crearás una clave sencilla con el teclado 4x4: si aciertas, enciendes un LED o suena el zumbador. Ideal para practicar estados en 90 minutos.',
          learns: 'Contraseñas simples, estados y feedback',
        },
        {
          date: '14/04',
          label: 'Clase 20',
          title: 'Mando a distancia IR',
          text: 'Usarás el receptor IR y el mando del kit para encender luces o mover el servo a distancia.',
          learns: 'Receptor IR, códigos del mando y acciones remotas',
        },
        {
          date: '21/04',
          label: 'Clase 21',
          title: 'Joystick al mando',
          text: 'Leerás el joystick del kit (ejes X/Y y botón) para mover un servo o cambiar LEDs. Un control muy visual.',
          learns: 'Joystick analógico, map y control de movimiento',
        },
        {
          date: '28/04',
          label: 'Clase 22',
          title: 'Contador en display de 7 segmentos',
          text: 'Mostrarás números en el display de 7 segmentos del kit. Contarás pulsaciones o una puntuación simple.',
          learns: 'Display 7 segmentos y mostrar dígitos',
        },
      ],
    },
    {
      phase: 'Mayo',
      period: 'Mayo 2027',
      title: 'Motores, relé y diseño del invento',
      text: 'Motor DC, stepper ULN2003, relé 5V y plan del proyecto final con piezas del kit.',
      sessions: [
        {
          date: '05/05',
          label: 'Clase 23',
          title: 'Motor DC y hélice',
          text: 'Harás girar el motor DC del kit con control seguro (montaje guiado). Un resultado claro: movimiento y ventilador.',
          learns: 'Motor DC, corriente y control seguro desde un pin',
        },
        {
          date: '12/05',
          label: 'Clase 24',
          title: 'Motor paso a paso',
          text: 'Usarás el stepper y el driver ULN2003 del kit para girar con precisión. Ideal para mecanismos que necesitan pasos exactos.',
          learns: 'Stepper, ULN2003 y giros controlados',
        },
        {
          date: '19/05',
          label: 'Clase 25',
          title: 'Relé: controla un circuito',
          text: 'Aprenderás para qué sirve el módulo relé 5V del kit y cómo activarlo con seguridad en un ejemplo de baja tensión guiado.',
          learns: 'Relé, aislamiento y activar cargas con cuidado',
        },
        {
          date: '26/05',
          label: 'Clase 26',
          title: 'Diseña tu invento con el kit',
          text: 'Elegirás un proyecto final usando solo piezas del kit Miuzei: alarma, estación LCD, cerradura, brazo con servo u otro invento realista para 4 sesiones.',
          learns: 'Elegir idea, piezas necesarias y plan por pasos',
        },
      ],
    },
    {
      phase: 'Junio',
      period: 'Junio 2027',
      title: 'Proyecto final y Robotics Fest',
      text: 'Montar, programar, pulir y presentar el invento.',
      sessions: [
        {
          date: '02/06',
          label: 'Clase 27',
          title: 'Monta tu invento',
          text: 'Conectarás los componentes elegidos y comprobarás cada parte por separado antes de unir todo.',
          learns: 'Montaje por bloques y probar cada parte',
        },
        {
          date: '09/06',
          label: 'Clase 28',
          title: 'Programa las funciones principales',
          text: 'Escribirás el código del invento reutilizando lo del curso: sensores, pantallas, botones o motores según tu idea.',
          learns: 'Integrar código y reutilizar lo aprendido',
        },
        {
          date: '16/06',
          label: 'Clase 29',
          title: 'Prueba, corrige y añade un extra',
          text: 'Depurarás fallos y, si da tiempo, añadirás una mejora pequeña del kit: otro LED, sonido, LCD o mando IR.',
          learns: 'Depuración, mejoras y versión estable',
        },
        {
          date: '23/06',
          label: 'Clase 30',
          title: 'Santamaria Robotics Fest',
          text: 'Presentarás tu invento, explicarás qué piezas del kit usaste y demostrarás cómo lo has programado.',
          learns: 'Demostración, explicar el montaje y el código',
        },
      ],
    },
  ] as const;

  readonly robloxSkills = [
    'Construir mundos, escenarios, plataformas y circuitos de obstáculos',
    'Programar reglas sencillas con Luau: monedas, poderes, enemigos y metas',
    'Diseñar interfaces, tiendas, puntuación y retos multijugador',
    'Planificar y construir un videojuego propio desde cero',
  ] as const;

  readonly robloxLearningAreas = [
    {
      number: '01',
      title: 'Mundos en Studio',
      text: 'Escenarios, obstáculos, trampas y puntos de control que se pueden jugar.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Luau que se nota',
      text: 'Scripts cortos con resultados visibles: monedas, poderes, enemigos y victoria.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'UI y multijugador',
      text: 'Interfaces, tiendas, clasificaciones, carreras y desafíos por equipos.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto final',
      text: 'En junio diseñan su propio juego y lo presentan en el Santamaria Game Fest.',
      tone: 'green',
    },
  ] as const;

  readonly robloxOutcomes = {
    title: '¿Qué aprenderás?',
    text: 'Al finalizar el curso, los alumnos habrán aprendido a crear y probar videojuegos en Roblox Studio.',
    points: [
      'Construir mundos, escenarios, plataformas y circuitos de obstáculos.',
      'Crear peligros, puntos de control, monedas, poderes y enemigos.',
      'Programar reglas sencillas con Luau.',
      'Mostrar puntuaciones, crear tiendas y diseñar interfaces dentro del juego.',
      'Crear carreras y desafíos multijugador.',
      'Probar sus juegos, encontrar errores y mejorar su diseño.',
      'Planificar y construir un videojuego propio desde cero.',
    ],
  } as const;

  readonly robloxCurriculum = [
    {
      phase: 'Diciembre',
      period: 'Diciembre 2026',
      title: 'Construye tu primer mundo en Roblox',
      text: 'Objetivo: aprender a utilizar Roblox Studio, construir escenarios y crear un primer circuito de obstáculos que se pueda jugar.',
      sessions: [
        {
          date: '01/12',
          label: 'Clase 1',
          title: 'Construye tu primer mundo',
          text: 'Un pequeño escenario con suelo, plataformas, rampas, paredes y una zona de inicio. Cada alumno elegirá una temática, como una isla tropical, un mundo de lava o una ciudad futurista.',
          learns: 'Cómo funciona Roblox Studio y cómo moverse por el editor · Cómo añadir piezas y cambiar su tamaño, posición y color · Cómo girar, mover y colocar objetos con precisión · Cómo probar el mundo en modo juego y volver al editor para modificarlo',
          result: 'Su primer escenario propio, que pueden recorrer dentro de Roblox Studio.',
        },
        {
          date: '15/12',
          label: 'Clase 2',
          title: 'Crea un circuito de obstáculos',
          text: 'Un circuito con plataformas separadas, saltos, rampas y zonas donde el jugador tenga que calcular bien sus movimientos para avanzar sin caer.',
          learns: 'Cómo diseñar plataformas a diferentes alturas · Cómo ajustar distancias para que los saltos sean posibles · Cómo utilizar materiales y colores para diferenciar las zonas · Cómo probar la dificultad y corregir obstáculos imposibles',
          result: 'Un primer obby, el tipo de juego de Roblox en el que hay que superar obstáculos para llegar a la meta.',
        },
        {
          date: '22/12',
          label: 'Clase 3',
          title: 'Añade trampas y zonas peligrosas',
          text: 'Ampliarán su circuito con zonas de lava, bloques peligrosos y plataformas que el jugador debe evitar. Si toca una trampa, su personaje volverá a aparecer en el punto de inicio o en el último punto de control que haya alcanzado.',
          learns: 'Qué es una propiedad de un objeto y cómo afecta al juego · Cómo detectar cuándo el personaje toca una pieza · Cómo utilizar un pequeño script para provocar una acción · Cómo probar una mecánica varias veces y corregir sus fallos',
          result: 'Un circuito con peligros reales, no solo decoraciones.',
        },
        {
          date: '29/12',
          label: 'Clase 4',
          title: 'Crea puntos de control',
          text: 'Colocarán puntos de control a lo largo del circuito. Cuando el jugador llegue a uno, quedará registrado como su último punto alcanzado y, si falla después, podrá continuar desde allí en lugar de repetir todo el recorrido.',
          learns: 'Qué es un punto de control y por qué mejora un videojuego · Cómo detectar que un jugador ha llegado a una zona · Cómo guardar temporalmente el punto alcanzado durante la partida · Cómo comprobar que los puntos de control funcionan en el orden correcto',
          result: 'Un obby más cómodo y divertido, con progreso durante la partida.',
        },
      ],
    },
    {
      phase: 'Enero',
      period: 'Enero 2027',
      title: 'Aprende a programar tus propios videojuegos',
      text: 'Objetivo: empezar a utilizar Luau, el lenguaje de programación de Roblox, para crear reglas y comportamientos que no se consiguen solo colocando piezas.',
      sessions: [
        {
          date: '05/01',
          label: 'Clase 5',
          title: 'Tu primer script',
          text: 'Una plataforma especial que cambie de color o muestre un efecto cuando el jugador la toque. En vez de configurar cada reacción manualmente, escribirán un pequeño programa que indique qué debe ocurrir.',
          learns: 'Qué es un script y para qué sirve · Cómo abrir el editor de código de Roblox Studio · Cómo escribir instrucciones sencillas en Luau · Cómo detectar el contacto entre un jugador y un objeto',
          result: 'Su primer objeto con un comportamiento programado por ellos.',
        },
        {
          date: '12/01',
          label: 'Clase 6',
          title: 'Recoge monedas por el mapa',
          text: 'Repartirán monedas por el circuito. Cuando el jugador toque una moneda, esta desaparecerá y el juego reconocerá que ha conseguido una más.',
          learns: 'Cómo crear variables para guardar información, como el número de monedas · Cómo detectar que el personaje recoge un objeto · Cómo aumentar una cantidad cada vez que recoge una moneda · Cómo evitar que la misma moneda se cuente varias veces',
          result: 'Un escenario en el que el jugador puede recoger objetos y conseguir recompensas.',
        },
        {
          date: '19/01',
          label: 'Clase 7',
          title: 'Muestra la puntuación en pantalla',
          text: 'Añadirán un marcador que muestre cuántas monedas ha recogido cada jugador. Al recoger una moneda, el número aumentará automáticamente y será visible durante la partida.',
          learns: 'Cómo mostrar información del juego en pantalla · Cómo actualizar un marcador cuando cambia una variable · Cómo distinguir la información de cada jugador · Cómo probar que la puntuación coincide con las monedas recogidas',
          result: 'Un videojuego con un objetivo cuantificable y una puntuación visible.',
        },
        {
          date: '26/01',
          label: 'Clase 8',
          title: 'Crea una meta y una pantalla de victoria',
          text: 'Al final del circuito habrá una meta que detectará al jugador. Cuando la alcance, aparecerá un mensaje de victoria y se mostrará su puntuación final.',
          learns: 'Cómo detectar cuándo un jugador llega al final · Cómo ejecutar distintas acciones según lo que ocurra · Cómo mostrar mensajes de victoria · Cómo reiniciar la partida para volver a jugar',
          result: 'Un primer videojuego completo, con obstáculos, monedas, puntuación y una meta.',
        },
      ],
    },
    {
      phase: 'Febrero',
      period: 'Febrero 2027',
      title: 'Crea poderes, enemigos y desafíos',
      text: 'Objetivo: ampliar el videojuego con mecánicas que cambien cómo se juega, en lugar de limitarse a recorrer plataformas.',
      sessions: [
        {
          date: '02/02',
          label: 'Clase 9',
          title: 'Crea poderes especiales',
          text: 'Añadirán objetos que otorguen poderes temporales. Por ejemplo, al tocar un rayo, el personaje correrá más rápido durante unos segundos; al tocar otro objeto, podrá saltar más alto.',
          learns: 'Cómo modificar propiedades del personaje desde un script · Cómo activar un poder cuando el jugador recoge un objeto · Cómo hacer que el efecto dure un tiempo limitado · Cómo devolver el personaje a sus valores normales al terminar el poder',
          result: 'Un circuito en el que encontrar poderes ayuda a superar los obstáculos.',
        },
        {
          date: '09/02',
          label: 'Clase 10',
          title: 'Plataformas que se mueven',
          text: 'Incorporarán plataformas que se desplacen de un lado a otro o suban y bajen. El jugador tendrá que calcular el momento adecuado para saltar y continuar su recorrido.',
          learns: 'Cómo mover un objeto mediante código · Cómo definir posiciones de inicio y final · Cómo controlar la velocidad y el movimiento · Cómo comprobar que las plataformas no se muevan demasiado rápido ni resulten imposibles',
          result: 'Un obby dinámico en el que los obstáculos se mueven mientras juegan.',
        },
        {
          date: '16/02',
          label: 'Clase 11',
          title: 'Añade enemigos al mapa',
          text: 'Colocarán personajes enemigos que patrullen una zona o se desplacen entre dos puntos. Si el jugador los toca, perderá la partida o volverá al último punto de control.',
          learns: 'Cómo colocar personajes no controlados por el jugador · Cómo mover un personaje mediante un script sencillo · Cómo detectar el contacto entre el enemigo y el jugador · Cómo combinar enemigos con los puntos de control que ya conocen',
          result: 'Un circuito con enemigos que obligan al jugador a tener cuidado al avanzar.',
        },
        {
          date: '23/02',
          label: 'Clase 12',
          title: 'Crea un nivel completo',
          text: 'Unirán plataformas móviles, enemigos, monedas, poderes y puntos de control en un nuevo nivel. El objetivo será llegar a la meta recogiendo recompensas y evitando peligros.',
          learns: 'Cómo combinar varias mecánicas sin que se estorben · Cómo aumentar la dificultad de forma gradual · Cómo comprobar que el recorrido tiene sentido · Cómo detectar errores cuando dos scripts interactúan entre sí',
          result: 'Un nivel más elaborado que combina diseño de escenarios y programación.',
        },
      ],
    },
    {
      phase: 'Marzo',
      period: 'Marzo 2027',
      title: 'Diseña un juego con varias fases',
      text: 'Objetivo: aprender a crear distintos niveles, introducir retos de lógica y empezar a organizar el videojuego como un proyecto más grande.',
      sessions: [
        {
          date: '02/03',
          label: 'Clase 13',
          title: 'Crea mundos con temáticas diferentes',
          text: 'Diseñarán dos zonas distintas para su juego, por ejemplo, un bosque y una montaña helada, o una ciudad y un volcán. Cada zona tendrá sus propios colores, materiales, obstáculos y decoración.',
          learns: 'Cómo utilizar materiales, iluminación y colores para crear ambientes · Cómo organizar el escenario en zonas diferenciadas · Cómo hacer que un nivel parezca distinto sin cambiar todas las mecánicas · Cómo diseñar un recorrido que guíe al jugador hacia el siguiente objetivo',
          result: 'Un mapa con identidad visual y varias zonas reconocibles.',
        },
        {
          date: '09/03',
          label: 'Clase 14',
          title: 'Crea puertas que se desbloquean',
          text: 'Añadirán puertas que solo se abren cuando el jugador cumple una condición. Por ejemplo, recoger cinco monedas, pulsar un interruptor o encontrar una llave escondida por el mapa.',
          learns: 'Cómo utilizar condiciones para decidir qué ocurre en el juego · Cómo comprobar si el jugador cumple un requisito · Cómo abrir una puerta o desactivar un obstáculo desde un script · Cómo combinar objetos coleccionables con objetivos del nivel',
          result: 'Un juego en el que recoger objetos y explorar sirve para desbloquear nuevas zonas.',
        },
        {
          date: '16/03',
          label: 'Clase 15',
          title: 'Esconde tesoros y secretos',
          text: 'Colocarán cofres, habitaciones secretas y recompensas escondidas. El jugador podrá encontrar un objeto especial, abrir un cofre o descubrir un camino alternativo para conseguir monedas extra.',
          learns: 'Cómo diseñar zonas secretas y recompensas · Cómo detectar que un jugador interactúa con un objeto · Cómo hacer que un cofre se abra una sola vez por partida · Cómo crear exploración y descubrimientos que hagan el juego más interesante',
          result: 'Un mapa que recompensa a los jugadores que exploran y no solo siguen el camino principal.',
        },
        {
          date: '23/03',
          label: 'Clase 16',
          title: 'Añade un cronómetro y una carrera',
          text: 'Crearán un desafío en el que el jugador debe llegar a la meta antes de que termine el tiempo. La pantalla mostrará una cuenta atrás y el resultado final indicará si ha conseguido superar el reto.',
          learns: 'Cómo medir el tiempo durante una partida · Cómo mostrar un cronómetro en pantalla · Cómo comprobar si el tiempo se ha agotado o si el jugador ha ganado · Cómo registrar el resultado de una carrera',
          result: 'Un modo contrarreloj en el que podrán intentar superar su propio tiempo.',
        },
        {
          date: '30/03',
          label: 'Clase 17',
          title: 'Conecta tus niveles',
          text: 'Organizarán el juego en varias fases. Cuando el jugador complete una, llegará a una zona de salida que le permitirá pasar al siguiente nivel, donde encontrará nuevos obstáculos y retos.',
          learns: 'Cómo dividir un videojuego en niveles · Cómo detectar que se ha completado una fase · Cómo trasladar al jugador a una zona diferente · Cómo comprobar que los puntos de control y la progresión funcionan correctamente',
          result: 'Una aventura con varias fases y una progresión clara, en lugar de un único circuito.',
        },
      ],
    },
    {
      phase: 'Abril',
      period: 'Abril 2027',
      title: 'Crea interfaces, tiendas y sistemas de puntuación',
      text: 'Objetivo: aprender a construir la parte de la pantalla con la que interactúa el jugador y añadir sistemas típicos de los videojuegos de Roblox.',
      sessions: [
        {
          date: '06/04',
          label: 'Clase 18',
          title: 'Diseña la interfaz de tu videojuego',
          text: 'Una interfaz que aparezca mientras juegan, con el número de monedas, un indicador de vida y mensajes que informen de lo que está ocurriendo. Por ejemplo, podrán ver «Has conseguido una moneda» o «Te quedan dos vidas».',
          learns: 'Cómo crear textos, botones y paneles en la pantalla · Cómo colocar elementos para que no tapen el juego · Cómo actualizar los textos cuando cambian los datos de la partida · Cómo separar la interfaz del escenario 3D',
          result: 'Un juego con una interfaz que informa al jugador de su progreso.',
        },
        {
          date: '13/04',
          label: 'Clase 19',
          title: 'Crea una clasificación de jugadores',
          text: 'Un marcador que muestre los nombres de los jugadores y sus monedas o puntos durante la partida. Si varios compañeros entran en el mismo juego de prueba, podrán comparar sus resultados.',
          learns: 'Cómo guardar una puntuación para cada jugador · Cómo utilizar el sistema de estadísticas de Roblox · Cómo mostrar y actualizar las puntuaciones · Cómo comprobar que los puntos de un jugador no se mezclen con los de otro',
          result: 'Un sistema de puntuación que permite comparar resultados durante una partida multijugador.',
        },
        {
          date: '20/04',
          label: 'Clase 20',
          title: 'Crea una tienda dentro del juego',
          text: 'Una tienda que se abra mediante un botón. Los jugadores podrán gastar las monedas recogidas para comprar un objeto o desbloquear un poder, como un salto más alto o mayor velocidad.',
          learns: 'Cómo abrir y cerrar ventanas de interfaz · Cómo comprobar si un jugador tiene monedas suficientes · Cómo descontar el precio y conceder la recompensa · Cómo evitar que una compra se complete si el jugador no tiene suficiente dinero',
          result: 'Una tienda funcional dentro del juego que conecta las monedas con las recompensas.',
        },
        {
          date: '27/04',
          label: 'Clase 21',
          title: 'Añade sonidos y efectos especiales',
          text: 'Mejorarán las acciones del juego con sonidos de monedas, efectos cuando se consigue una recompensa y señales visuales al ganar o recibir daño.',
          learns: 'Cómo añadir y reproducir sonidos en los momentos adecuados · Cómo utilizar partículas y efectos visuales · Cómo dar respuesta inmediata a las acciones del jugador · Cómo evitar que los efectos sean excesivos o dificulten jugar',
          result: 'Un juego más inmersivo y satisfactorio al recoger objetos, ganar o activar poderes.',
        },
      ],
    },
    {
      phase: 'Mayo',
      period: 'Mayo 2027',
      title: 'Convierte tu juego en una experiencia multijugador',
      text: 'Objetivo: mejorar el comportamiento de los personajes, añadir retos competitivos y probar cómo funciona el juego con otros jugadores.',
      sessions: [
        {
          date: '04/05',
          label: 'Clase 22',
          title: 'Organiza una carrera entre jugadores',
          text: 'Una carrera en la que varios jugadores intentan llegar primero a la meta. Tendrá una salida, un recorrido con obstáculos y una zona final que detectará quién ha terminado.',
          learns: 'Cómo diseñar un recorrido competitivo · Cómo detectar cuándo cada jugador cruza la meta · Cómo mostrar quién ha terminado y en qué orden · Cómo probar la experiencia con varias personas',
          result: 'Un modo de carrera en el que pueden competir con sus compañeros.',
        },
        {
          date: '11/05',
          label: 'Clase 23',
          title: 'Crea un desafío por equipos',
          text: 'Diseñarán un reto en el que los jugadores se repartan en dos equipos y tengan que alcanzar un objetivo, como recoger más objetos o llegar juntos a una zona final.',
          learns: 'Cómo organizar las reglas de un desafío por equipos · Cómo asignar jugadores a diferentes grupos · Cómo contar los puntos de cada equipo · Cómo mostrar qué equipo ha ganado cuando termina la partida',
          result: 'Un modo de juego cooperativo o competitivo que aprovecha el multijugador de Roblox.',
        },
        {
          date: '18/05',
          label: 'Clase 24',
          title: 'Personaliza tu personaje',
          text: 'Un pequeño sistema para elegir entre varios accesorios, colores o apariencias disponibles dentro de su juego. Podrán abrir un menú, seleccionar una opción y comprobar cómo cambia el aspecto del personaje.',
          learns: 'Cómo crear un menú de selección · Cómo aplicar cambios visuales a un personaje · Cómo comprobar qué opción ha elegido cada jugador · Cómo separar la personalización visual de las reglas del juego',
          result: 'Un juego con opciones de personalización para que cada jugador pueda distinguir a su personaje.',
        },
        {
          date: '25/05',
          label: 'Clase 25',
          title: 'Prueba tu juego con otros jugadores',
          text: 'No empezarán un juego nuevo. Probarán sus proyectos con varios jugadores de prueba, revisarán las puntuaciones, las monedas, las tiendas y las condiciones de victoria, y solucionarán los fallos que encuentren.',
          learns: 'Cómo probar un juego con varios jugadores desde Roblox Studio · Cómo encontrar errores que no aparecen cuando juega una sola persona · Cómo comprobar que las puntuaciones y las recompensas se gestionan correctamente · Cómo mejorar las reglas cuando algo resulta injusto o demasiado fácil',
          result: 'Un juego más fiable, probado desde el punto de vista de distintos jugadores.',
        },
      ],
    },
    {
      phase: 'Junio',
      period: 'Junio 2027',
      title: 'Desarrolla tu propio videojuego',
      text: 'Objetivo: aplicar lo aprendido en un proyecto personal, tomando decisiones de diseño y programación hasta tener un juego que puedan presentar.',
      sessions: [
        {
          date: '01/06',
          label: 'Clase 26',
          title: 'Inventa tu propio videojuego',
          text: 'Cada alumno elegirá la idea de su proyecto final. Puede ser un obby, una carrera, un juego de exploración, un desafío de supervivencia sencillo o una aventura de recoger objetos. Dibujarán el mapa y decidirán qué tiene que hacer el jugador para ganar.',
          learns: 'Cómo transformar una idea en un videojuego realizable · Cómo decidir las reglas principales y el objetivo · Cómo diseñar el mapa antes de construirlo · Cómo dividir el proyecto en pequeñas tareas',
          result: 'Un plan de juego con temática, mapa inicial, objetivo y mecánicas principales.',
        },
        {
          date: '08/06',
          label: 'Clase 27',
          title: 'Construye el mundo de tu juego',
          text: 'Crearán el escenario principal del proyecto final, colocando las plataformas, los edificios, los caminos, las zonas de inicio y los elementos decorativos necesarios para que el mundo tenga sentido.',
          learns: 'Cómo construir un escenario organizado y fácil de recorrer · Cómo reutilizar piezas y elementos para trabajar más rápido · Cómo diseñar el recorrido del jugador · Cómo comprobar que el escenario se puede recorrer correctamente',
          result: 'Un mundo jugable que ya tiene la estructura principal de su videojuego.',
        },
        {
          date: '15/06',
          label: 'Clase 28',
          title: 'Programa las mecánicas principales',
          text: 'Harán que el mundo tenga reglas. Según el tipo de juego, añadirán obstáculos, monedas, enemigos, interruptores, puntos de control o una condición de victoria.',
          learns: 'Cómo convertir las reglas del proyecto en scripts · Cómo detectar acciones del jugador · Cómo utilizar variables y condiciones para controlar la partida · Cómo probar cada mecánica antes de añadir más funciones',
          result: 'Una primera versión jugable que permite completar el objetivo principal del proyecto.',
        },
        {
          date: '22/06',
          label: 'Clase 29',
          title: 'Mejora y termina tu videojuego',
          text: 'Completarán los detalles que falten en su proyecto. Podrán añadir una interfaz, efectos, sonidos, puntuación, un menú de inicio o mejoras visuales, según las necesidades del juego.',
          learns: 'Cómo decidir qué mejoras son más importantes · Cómo encontrar y corregir errores · Cómo comprobar que el juego tiene un principio, un objetivo y un final · Cómo mejorar la experiencia sin añadir funciones innecesarias',
          result: 'Una versión final mucho más completa y preparada para que otros la prueben.',
        },
        {
          date: '29/06',
          label: 'Clase 30',
          title: 'Santamaria Game Fest',
          text: 'Esta vez no empezarán un proyecto nuevo. Cada alumno presentará su videojuego, explicará las reglas y dejará que sus compañeros lo prueben. El grupo podrá votar por categorías divertidas, como el mapa más creativo, el reto más difícil o la mecánica más original.',
          learns: 'Cómo presentar un videojuego que han creado · Cómo explicar sus reglas y mecánicas · Cómo recibir comentarios de otros jugadores · Cómo identificar qué mejorarían en una futura versión',
          result: 'Un videojuego propio que pueden enseñar y seguir desarrollando después del curso.',
        },
      ],
    },
  ] as const;

  readonly pythonAdvancedSkills = [
    'Organizar proyectos con módulos, clases y buenas prácticas',
    'Usar SQLite, Tkinter, JSON, APIs y scraping con criterio',
    'Crear aplicaciones web con Flask e integrar IA cuando aporte valor',
    'Planificar, probar y presentar un proyecto software propio',
  ] as const;

  readonly pythonAdvancedLearningAreas = [
    {
      number: '01',
      title: 'Proyectos profesionales',
      text: 'Módulos, OOP, excepciones, entornos virtuales y SQLite.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Interfaces y datos',
      text: 'Tkinter, JSON, APIs, scraping, pandas y gráficos.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Web y automatización',
      text: 'Flask, formularios, usuarios, informes e integración con IA.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto final',
      text: 'Diseñan, construyen y presentan su app en el Demo Day.',
      tone: 'green',
    },
  ] as const;

  readonly pythonAdvancedRhythm = [
    {
      minutes: '90 min',
      title: 'En directo',
      text: 'Explicación, práctica guiada y resolución de dudas cada semana.',
    },
    {
      minutes: 'Proyectos',
      title: 'Acumulativos',
      text: 'Algunas aplicaciones se desarrollan en varias sesiones para construir software de verdad.',
    },
    {
      minutes: 'Stack',
      title: 'Herramientas reales',
      text: 'Python, SQLite, Tkinter, Flask, APIs y librerías de uso habitual.',
    },
    {
      minutes: 'Máx. 10',
      title: 'Grupo reducido',
      text: 'Progresión práctica: de aplicaciones organizadas a un proyecto propio.',
    },
  ] as const;

  readonly pythonAdvancedOutcomes = {
    title: '¿Qué aprenderás?',
    text: 'Al finalizar las 30 sesiones, habrás pasado de scripts sueltos a aplicaciones con datos, interfaz, web e integración con APIs.',
    points: [
      'Organizar un proyecto Python con módulos, clases y validaciones.',
      'Guardar datos con SQLite y construir interfaces con Tkinter.',
      'Consumir APIs, trabajar con JSON y analizar datos con pandas.',
      'Crear una aplicación web con Flask y un sistema básico de usuarios.',
      'Automatizar tareas, generar informes e integrar IA con seguridad.',
      'Planificar, probar y presentar un proyecto software propio.',
    ],
  } as const;

  readonly pythonAdvancedCurriculum = [
    {
      phase: 'Diciembre',
      period: 'Diciembre 2026',
      title: 'Proyectos, OOP y entorno',
      text: 'Estructura profesional, clases, errores y dependencias.',
      sessions: [
        {
          date: '03/12',
          label: 'Clase 1',
          title: 'Organiza tu primer proyecto profesional',
          text: 'Crearás la estructura de una aplicación Python separando el programa en archivos y módulos. Aprenderás a mantener el código ordenado desde el principio.',
          learns: 'Módulos, imports, estructura de carpetas y buenas prácticas',
        },
        {
          date: '10/12',
          label: 'Clase 2',
          title: 'Programación orientada a objetos',
          text: 'Crearás clases para representar elementos de una aplicación, como usuarios, productos o tareas, y definirás qué información y acciones tiene cada objeto.',
          learns: 'Clases, objetos, atributos, métodos y __init__',
        },
        {
          date: '17/12',
          label: 'Clase 3',
          title: 'Relaciones entre clases',
          text: 'Ampliarás tu aplicación con varios tipos de objetos y aprenderás a reutilizar comportamientos sin duplicar innecesariamente el código.',
          learns: 'Composición, herencia básica y responsabilidades de las clases',
        },
        {
          date: '24/12',
          label: 'Clase 4',
          title: 'Control de errores y validación',
          text: 'Mejorarás un programa para detectar entradas incorrectas, controlar situaciones inesperadas y mostrar mensajes útiles en lugar de cerrarse sin explicación.',
          learns: 'Excepciones, try, except, validaciones y errores personalizados',
        },
        {
          date: '31/12',
          label: 'Clase 5',
          title: 'Librerías y entornos de desarrollo',
          text: 'Prepararás un proyecto con sus propias dependencias y aprenderás a instalar librerías para añadir funciones sin tener que programarlo todo desde cero.',
          learns: 'pip, entornos virtuales y gestión de dependencias',
        },
      ],
    },
    {
      phase: 'Enero',
      period: 'Enero 2027',
      title: 'Bases de datos e interfaces',
      text: 'SQLite, CRUD y primeras aplicaciones con Tkinter.',
      sessions: [
        {
          date: '07/01',
          label: 'Clase 6',
          title: 'Bases de datos con SQLite',
          text: 'Crearás una base de datos para guardar información de una aplicación, añadir registros y consultar los datos cuando los necesites.',
          learns: 'Tablas, SQL básico, consultas e integración con Python',
        },
        {
          date: '14/01',
          label: 'Clase 7',
          title: 'Crea una aplicación que guarde datos',
          text: 'Desarrollarás un pequeño gestor de contactos o productos con funciones para crear, consultar, modificar y eliminar registros.',
          learns: 'Operaciones CRUD, consultas SQL y conexión entre aplicación y base de datos',
        },
        {
          date: '21/01',
          label: 'Clase 8',
          title: 'Tu primera interfaz gráfica',
          text: 'Transformarás un programa de consola en una aplicación con ventana, campos de texto y botones.',
          learns: 'Tkinter, widgets, eventos y organización de una interfaz',
        },
        {
          date: '28/01',
          label: 'Clase 9',
          title: 'Construye un gestor de tareas visual',
          text: 'Crearás una interfaz que permita añadir tareas, marcarlas como completadas y consultar su estado.',
          learns: 'Eventos, listas visuales, funciones y conexión con los datos',
        },
      ],
    },
    {
      phase: 'Febrero',
      period: 'Febrero 2027',
      title: 'APIs, datos reales y scraping',
      text: 'JSON, requests, aplicaciones con datos externos y Beautiful Soup.',
      sessions: [
        {
          date: '04/02',
          label: 'Clase 10',
          title: 'Trabajar con datos JSON',
          text: 'Aprenderás a leer y generar datos estructurados, el formato utilizado habitualmente para intercambiar información entre aplicaciones.',
          learns: 'JSON, diccionarios, listas y serialización de datos',
        },
        {
          date: '11/02',
          label: 'Clase 11',
          title: 'Conecta tu aplicación con una API',
          text: 'Consultarás un servicio público de Internet para obtener información y utilizarla dentro de tu propio programa.',
          learns: 'HTTP, peticiones con requests, respuestas y códigos de estado',
        },
        {
          date: '18/02',
          label: 'Clase 12',
          title: 'Crea una aplicación que use datos reales',
          text: 'Construirás una herramienta que consulte información de un servicio externo, la procese y presente los resultados de forma clara.',
          learns: 'Transformar datos, gestionar respuestas y tratar fallos de conexión',
        },
        {
          date: '25/02',
          label: 'Clase 13',
          title: 'Extraer información de páginas web',
          text: 'Analizarás una página preparada para practicar y extraerás elementos como títulos, enlaces o nombres de productos.',
          learns: 'HTML básico, peticiones web y Beautiful Soup, respetando las condiciones del sitio',
        },
      ],
    },
    {
      phase: 'Marzo',
      period: 'Marzo 2027',
      title: 'Análisis de datos y automatización',
      text: 'CSV, pandas, gráficos, clasificación de archivos e informes.',
      sessions: [
        {
          date: '04/03',
          label: 'Clase 14',
          title: 'Analiza datos con Python',
          text: 'Trabajarás con un archivo CSV para ordenar información, calcular resultados y encontrar patrones sencillos.',
          learns: 'CSV, pandas, filtros, columnas y estadísticas básicas',
        },
        {
          date: '11/03',
          label: 'Clase 15',
          title: 'Convierte los datos en gráficos',
          text: 'Crearás gráficos a partir de los datos de la sesión anterior y aprenderás a representar resultados de forma visual.',
          learns: 'Matplotlib, gráficos de barras y líneas, títulos y etiquetas',
        },
        {
          date: '18/03',
          label: 'Clase 16',
          title: 'Automatiza tareas repetitivas',
          text: 'Programarás una herramienta para clasificar archivos de prueba y generar informes automáticamente.',
          learns: 'pathlib, fechas, carpetas y automatización segura',
        },
        {
          date: '25/03',
          label: 'Clase 17',
          title: 'Genera informes automáticamente',
          text: 'Crearás un programa que procese datos y genere un informe listo para consultar o compartir.',
          learns: 'Plantillas de texto, fechas, formatos y automatización por pasos',
        },
      ],
    },
    {
      phase: 'Abril',
      period: 'Abril 2027',
      title: 'Aplicaciones web con Flask',
      text: 'Rutas, plantillas, formularios, base de datos y usuarios.',
      sessions: [
        {
          date: '01/04',
          label: 'Clase 18',
          title: 'Tu primera aplicación web con Flask',
          text: 'Crearás una web sencilla servida desde Python y aprenderás cómo el navegador se comunica con el servidor.',
          learns: 'Flask, rutas, peticiones y respuestas web',
        },
        {
          date: '08/04',
          label: 'Clase 19',
          title: 'Crea páginas dinámicas',
          text: 'Harás que la web muestre información variable en función de los datos que recibe el servidor.',
          learns: 'Plantillas, HTML, variables y renderizado de páginas',
        },
        {
          date: '15/04',
          label: 'Clase 20',
          title: 'Formularios y recepción de datos',
          text: 'Añadirás formularios para que los usuarios puedan introducir información y enviarla a la aplicación web.',
          learns: 'Formularios HTML, métodos GET y POST, validación de entradas',
        },
        {
          date: '22/04',
          label: 'Clase 21',
          title: 'Conecta una web a una base de datos',
          text: 'Integrarás SQLite en tu aplicación Flask para guardar registros y mostrarlos en una página.',
          learns: 'Consultas SQL, persistencia y conexión entre backend y plantilla',
        },
        {
          date: '29/04',
          label: 'Clase 22',
          title: 'Usuarios y acceso a la aplicación',
          text: 'Añadirás un sistema introductorio de usuarios para comprender cómo se separan las cuentas y se controla el acceso a determinadas funciones.',
          learns: 'Sesiones, autenticación básica y conceptos de seguridad',
        },
      ],
    },
    {
      phase: 'Mayo',
      period: 'Mayo 2027',
      title: 'IA, pruebas y proyecto final',
      text: 'APIs de IA, herramientas especializadas, pytest y diseño del proyecto.',
      sessions: [
        {
          date: '06/05',
          label: 'Clase 23',
          title: 'Integra inteligencia artificial en Python',
          text: 'Conectarás un programa con una API de IA para enviar instrucciones y procesar la respuesta dentro de tu aplicación.',
          learns: 'Llamadas a APIs, claves almacenadas de forma segura, prompts y respuestas. El uso de servicios de pago dependerá de sus condiciones y límites',
        },
        {
          date: '13/05',
          label: 'Clase 24',
          title: 'Construye una herramienta con IA',
          text: 'Crearás un pequeño asistente especializado, por ejemplo, para resumir textos, clasificar mensajes o responder preguntas sobre información proporcionada.',
          learns: 'Estructurar instrucciones, procesar resultados y gestionar errores de la API',
        },
        {
          date: '20/05',
          label: 'Clase 25',
          title: 'Prueba y depura tu código',
          text: 'Prepararás pruebas para comprobar que las funciones importantes trabajan como deben y detectarás errores antes de que lleguen al usuario.',
          learns: 'Depuración, casos de prueba y fundamentos de pytest',
        },
        {
          date: '27/05',
          label: 'Clase 26',
          title: 'Diseña tu proyecto final',
          text: 'Elegirás una idea que combine varias habilidades del curso: una aplicación web, un gestor de datos, una herramienta de automatización o una aplicación con IA.',
          learns: 'Definir requisitos, dividir funcionalidades y planificar el desarrollo',
        },
      ],
    },
    {
      phase: 'Junio',
      period: 'Junio 2027',
      title: 'Proyecto final y Demo Day',
      text: 'Desarrollar, probar y presentar tu aplicación.',
      sessions: [
        {
          date: '03/06',
          label: 'Clase 27',
          title: 'Desarrolla la primera versión',
          text: 'Empezarás a construir el proyecto con una estructura clara y una primera funcionalidad que se pueda ejecutar y probar.',
          learns: 'Integrar módulos, organizar archivos y desarrollar por iteraciones',
        },
        {
          date: '10/06',
          label: 'Clase 28',
          title: 'Añade las funciones principales',
          text: 'Incorporarás las funcionalidades centrales del proyecto y conectarás sus componentes para que trabajen juntos.',
          learns: 'Integración de datos, lógica de negocio y resolución de problemas',
        },
        {
          date: '17/06',
          label: 'Clase 29',
          title: 'Pruebas y acabado del proyecto',
          text: 'Comprobarás diferentes escenarios, corregirás errores y mejorarás la presentación, los mensajes y la documentación de tu aplicación.',
          learns: 'Pruebas, depuración, documentación y revisión de calidad',
        },
        {
          date: '24/06',
          label: 'Clase 30',
          title: 'Demo Day: presenta tu proyecto',
          text: 'Enseñarás el proyecto terminado, explicarás las decisiones que has tomado y demostrarás sus principales funcionalidades.',
          learns: 'Presentar software, explicar código y evaluar mejoras futuras',
        },
      ],
    },
  ] as const;

  readonly pythonSkills = [
    'Escribir código con Python desde cero: print, input, variables y operaciones',
    'Crear juegos y programas con condiciones, bucles, listas y funciones',
    'Usar archivos, Turtle, Pygame, automatización y datos de Internet',
    'Planificar, construir y presentar un proyecto propio',
  ] as const;

  readonly pythonLearningAreas = [
    {
      number: '01',
      title: 'Fundamentos',
      text: 'Primer programa, input, variables, condiciones y juegos clásicos.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Código organizado',
      text: 'Funciones, listas, diccionarios, archivos y herramientas útiles.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Gráficos y datos',
      text: 'Turtle, Pygame, automatización, API y un chatbot sencillo.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto final',
      text: 'Diseñan, construyen y presentan su programa en el Python Fest.',
      tone: 'green',
    },
  ] as const;

  readonly pythonRhythm = [
    {
      minutes: '90 min',
      title: 'Cada sesión',
      text: 'Explicación breve, programación guiada y tiempo para experimentar.',
    },
    {
      minutes: 'Práctica',
      title: 'Aprender haciendo',
      text: 'Cada clase tiene un resultado práctico; los proyectos grandes se construyen en varias sesiones.',
    },
    {
      minutes: 'Desde cero',
      title: 'Sin experiencia previa',
      text: 'Avanzamos paso a paso. No hace falta haber programado nunca.',
    },
    {
      minutes: 'Máx. 10',
      title: 'Grupos reducidos',
      text: 'Para resolver dudas y ayudar a cada participante. Material y ejercicios para practicar entre clases.',
    },
  ] as const;

  readonly pythonOutcomes = {
    title: '¿Qué aprenderás?',
    text: 'Empezarás desde cero, sin necesidad de haber programado nunca. Aprenderás a escribir código con Python, resolver problemas y crear proyectos cada vez más completos.',
    points: [
      'Desarrollar juegos, programas interactivos y dibujos generativos.',
      'Crear pequeñas automatizaciones y proyectos con datos de Internet.',
      'Entender cómo funciona la programación, no solo copiar código.',
      'Crear tus propias ideas y presentar un proyecto final.',
    ],
  } as const;

  readonly pythonCurriculum = [
    {
      phase: 'Diciembre',
      period: 'Diciembre 2026',
      title: 'Primeros pasos',
      text: 'Empezamos con los fundamentos: mensajes, input, variables y el primer juego.',
      sessions: [
        {
          date: '07/12',
          label: 'Clase 1',
          title: 'Tu primer programa con Python',
          text: 'Crearás tu primer programa y aprenderás a escribir instrucciones para que el ordenador las ejecute. Mostrarás mensajes en pantalla y modificarás el código para ver cómo cambia el resultado.',
          learns: 'Python, print(), instrucciones y errores básicos',
        },
        {
          date: '14/12',
          label: 'Clase 2',
          title: 'Programas que hablan contigo',
          text: 'Crearás un programa que pregunte el nombre, la edad y las preferencias del usuario, y que responda según sus respuestas.',
          learns: 'input(), variables de texto y conversión de datos',
        },
        {
          date: '21/12',
          label: 'Clase 3',
          title: 'Variables y operaciones',
          text: 'Construirás una calculadora sencilla capaz de sumar, restar, multiplicar y dividir. También harás operaciones con números introducidos por el usuario.',
          learns: 'Variables, números, operadores y cálculos',
        },
        {
          date: '28/12',
          label: 'Clase 4',
          title: 'El juego de adivinar el número',
          text: 'Programarás un juego en el que el ordenador elige un número secreto y el jugador tiene que descubrirlo con pistas.',
          learns: 'Condiciones if, elif, else y comparaciones',
        },
      ],
    },
    {
      phase: 'Enero',
      period: 'Enero 2027',
      title: 'Lógica y juegos',
      text: 'Aleatoriedad, bucles, listas y tu propio trivial.',
      sessions: [
        {
          date: '04/01',
          label: 'Clase 5',
          title: 'Piedra, papel o tijera',
          text: 'Crearás una versión jugable contra el ordenador, que elegirá sus movimientos aleatoriamente y determinará quién gana.',
          learns: 'Módulo random, condiciones y reglas de juego',
        },
        {
          date: '11/01',
          label: 'Clase 6',
          title: 'Repetir tareas automáticamente',
          text: 'Mejorarás tus juegos para que puedan jugarse varias veces sin tener que reiniciar el programa después de cada partida.',
          learns: 'Bucles while, for, contadores y cuándo detener una repetición',
        },
        {
          date: '18/01',
          label: 'Clase 7',
          title: 'Crear y gestionar listas',
          text: 'Crearás una lista de personajes, objetos o puntuaciones y programarás acciones para añadir, consultar y eliminar elementos.',
          learns: 'Listas, índices, append(), remove() y recorridos',
        },
        {
          date: '25/01',
          label: 'Clase 8',
          title: 'Tu propio juego de preguntas',
          text: 'Desarrollarás un trivial con preguntas, respuestas, puntuación y un resultado final que indique cómo lo has hecho.',
          learns: 'Listas, bucles, condiciones y control de puntuaciones',
        },
      ],
    },
    {
      phase: 'Febrero',
      period: 'Febrero 2027',
      title: 'Organizar el código y crear herramientas',
      text: 'Funciones, calculadora mejorada, dados y una aventura interactiva.',
      sessions: [
        {
          date: '01/02',
          label: 'Clase 9',
          title: 'Crear tus propias funciones',
          text: 'Reorganizarás el código de tus juegos en pequeñas funciones para que cada parte tenga una responsabilidad concreta.',
          learns: 'def, parámetros, valores de retorno y reutilización de código',
        },
        {
          date: '08/02',
          label: 'Clase 10',
          title: 'Una calculadora más completa',
          text: 'Mejorarás la calculadora para permitir elegir operaciones, repetir cálculos y controlar entradas incorrectas.',
          learns: 'Funciones, validaciones y gestión básica de errores',
        },
        {
          date: '15/02',
          label: 'Clase 11',
          title: 'Dados, azar y puntuaciones',
          text: 'Programarás un juego de dados con tiradas aleatorias, rondas y una puntuación que cambia según los resultados.',
          learns: 'Números aleatorios, funciones, bucles y estado de una partida',
        },
        {
          date: '22/02',
          label: 'Clase 12',
          title: 'Una aventura interactiva',
          text: 'Crearás una aventura en la que el jugador toma decisiones, explora caminos diferentes y puede llegar a distintos finales.',
          learns: 'Lógica condicional, funciones y diseño de historias ramificadas',
        },
      ],
    },
    {
      phase: 'Marzo',
      period: 'Marzo 2027',
      title: 'Datos y automatización',
      text: 'Diccionarios, archivos, organizador de tareas y dibujo con Turtle.',
      sessions: [
        {
          date: '01/03',
          label: 'Clase 13',
          title: 'Guardar información organizada',
          text: 'Crearás un sistema para almacenar información de personajes, inventarios o usuarios y consultar sus datos por nombre o identificador.',
          learns: 'Diccionarios, claves, valores y estructuras de datos',
        },
        {
          date: '08/03',
          label: 'Clase 14',
          title: 'Guardar datos en archivos',
          text: 'Harás que un programa pueda guardar información en un archivo y recuperarla cuando se vuelva a ejecutar.',
          learns: 'Lectura y escritura de archivos de texto y persistencia de datos básica',
        },
        {
          date: '15/03',
          label: 'Clase 15',
          title: 'Tu propio organizador de tareas',
          text: 'Construirás una aplicación de consola que permita añadir tareas, listarlas, marcarlas como completadas y conservarlas en un archivo.',
          learns: 'Combinar listas, diccionarios, funciones y archivos',
        },
        {
          date: '22/03',
          label: 'Clase 16',
          title: 'Dibujar con código',
          text: 'Utilizarás Turtle para crear dibujos geométricos, patrones y figuras de colores mediante instrucciones programadas.',
          learns: 'Coordenadas, ángulos, bucles y funciones gráficas',
        },
        {
          date: '29/03',
          label: 'Clase 17',
          title: 'Arte generativo: dibujos que nunca salen iguales',
          text: 'Crearás composiciones visuales que cambian automáticamente al ejecutar el programa, usando posiciones, tamaños y colores aleatorios.',
          learns: 'Aleatoriedad, repetición y combinación de funciones gráficas',
        },
      ],
    },
    {
      phase: 'Abril',
      period: 'Abril 2027',
      title: 'Primeros videojuegos con Pygame',
      text: 'Ventana, movimiento, monedas, puntuación y obstáculos.',
      sessions: [
        {
          date: '05/04',
          label: 'Clase 18',
          title: 'Tu primer videojuego con Pygame',
          text: 'Crearás una ventana de juego con un personaje u objeto en pantalla y aprenderás cómo funciona el ciclo principal de un videojuego.',
          learns: 'Pygame, ventanas, eventos, pantalla y bucle del juego',
        },
        {
          date: '12/04',
          label: 'Clase 19',
          title: 'Mover un personaje',
          text: 'Programarás el movimiento de un personaje con el teclado y establecerás límites para evitar que desaparezca de la pantalla.',
          learns: 'Coordenadas, velocidad, controles y actualización de pantalla',
        },
        {
          date: '19/04',
          label: 'Clase 20',
          title: 'Recoger objetos y sumar puntos',
          text: 'Añadirás objetos que el personaje pueda recoger y crearás un contador de puntuación que se actualice al tocarlos.',
          learns: 'Colisiones, rectángulos, condiciones y puntuaciones',
        },
        {
          date: '26/04',
          label: 'Clase 21',
          title: 'Esquivar obstáculos',
          text: 'Convertirás el proyecto en un juego de supervivencia: aparecerán obstáculos que habrá que esquivar para conseguir la mejor puntuación posible.',
          learns: 'Aparición de objetos, movimiento automático, colisiones y fin de partida',
        },
      ],
    },
    {
      phase: 'Mayo',
      period: 'Mayo 2027',
      title: 'Proyectos útiles y nuevas funciones',
      text: 'Trivial gráfico, automatización, API, chatbot y diseño del proyecto final.',
      sessions: [
        {
          date: '03/05',
          label: 'Clase 22',
          title: 'Un trivial con interfaz gráfica',
          text: 'Crearás un juego de preguntas que muestre textos y respuestas en una ventana gráfica, con puntuación y mensajes de resultado.',
          learns: 'Textos en pantalla, eventos del ratón y lógica de preguntas',
        },
        {
          date: '10/05',
          label: 'Clase 23',
          title: 'Automatizar una tarea del ordenador',
          text: 'Crearás un script que organice archivos de prueba por tipo o extensión dentro de carpetas, con precauciones para no modificar archivos importantes.',
          learns: 'Rutas, carpetas, módulos como pathlib y automatización básica',
        },
        {
          date: '17/05',
          label: 'Clase 24',
          title: 'Obtener información de Internet',
          text: 'Consultarás una API pública para recuperar datos y mostrar información útil en tu programa, como datos de una actividad o información de un servicio.',
          learns: 'JSON, peticiones HTTP y tratamiento de respuestas',
        },
        {
          date: '24/05',
          label: 'Clase 25',
          title: 'Crear un chatbot sencillo',
          text: 'Programarás un asistente conversacional básico que responda a determinados mensajes, recuerde algunos datos durante la conversación y utilice información organizada.',
          learns: 'Procesamiento de texto, condiciones, funciones y diccionarios. No requiere una API de IA de pago',
        },
        {
          date: '31/05',
          label: 'Clase 26',
          title: 'Diseña tu proyecto final',
          text: 'Cada alumno elegirá una idea para desarrollar: un juego, una aplicación de consola, una herramienta útil o un proyecto gráfico. Se dividirá en tareas pequeñas y realistas.',
          learns: 'Planificación, organización del código y elección de funcionalidades',
        },
      ],
    },
    {
      phase: 'Junio',
      period: 'Junio 2027',
      title: 'Proyecto final',
      text: 'Construir, mejorar y presentar tu creación en el Python Fest.',
      sessions: [
        {
          date: '07/06',
          label: 'Clase 27',
          title: 'Construye la primera versión',
          text: 'Empezarás a desarrollar tu proyecto con una versión funcional pequeña, priorizando que las funciones principales trabajen correctamente.',
          learns: 'Dividir un proyecto en partes, implementar funciones y probar resultados',
        },
        {
          date: '14/06',
          label: 'Clase 28',
          title: 'Añade las funciones principales',
          text: 'Continuarás el proyecto e incorporarás las funciones más importantes que falten, revisando que todas las partes encajen.',
          learns: 'Integrar código, depurar errores y reutilizar funciones',
        },
        {
          date: '21/06',
          label: 'Clase 29',
          title: 'Pruebas, mejoras y últimos retoques',
          text: 'Probarás el proyecto con diferentes situaciones, corregirás errores y mejorarás la presentación o la experiencia de uso.',
          learns: 'Pruebas manuales, depuración y mejora incremental',
        },
        {
          date: '28/06',
          label: 'Clase 30',
          title: 'Python Fest: presenta tu proyecto',
          text: 'Cada alumno presentará su creación, explicará qué hace y enseñará cómo funciona. Cerraremos el curso compartiendo los proyectos y lo aprendido.',
          learns: 'Explicar decisiones técnicas, demostrar un programa y valorar el proceso de desarrollo',
        },
      ],
    },
  ] as const;

  readonly aiSkills = [
    'Usar asistentes de IA con instrucciones claras y verificar resultados',
    'Crear contenido, presentaciones y prototipos con ayuda de IA',
    'Automatizar tareas con n8n, APIs y clasificación inteligente',
    'Diseñar chatbots, agentes supervisados y un proyecto final propio',
  ] as const;

  readonly aiLearningAreas = [
    {
      number: '01',
      title: 'IA con criterio',
      text: 'Modelos, instrucciones, verificación, investigación y contenido creativo.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Automatización con n8n',
      text: 'Workflows, triggers, correos, hojas de cálculo y decisiones automáticas.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Chatbots, APIs y agentes',
      text: 'Asistentes, documentos, APIs, extracción de datos y herramientas.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto final',
      text: 'Diseñan, construyen y presentan su solución en el AI Demo Day.',
      tone: 'green',
    },
  ] as const;

  readonly aiOutcomes = {
    title: '¿Qué aprenderás?',
    text: 'Aprenderás a utilizar la inteligencia artificial para crear herramientas útiles, automatizar tareas y conectar diferentes aplicaciones. No será un curso de teoría sobre IA ni consistirá únicamente en hablar con ChatGPT: desarrollarás proyectos prácticos que podrás enseñar al terminar.',
    points: [
      'Trabajar bien con asistentes de IA y crear contenido con criterio.',
      'Montar automatizaciones visuales con n8n y conectar aplicaciones.',
      'Usar APIs y crear pequeños asistentes capaces de ejecutar tareas.',
      'Presentar un proyecto propio en el AI Demo Day.',
    ],
  } as const;

  readonly aiCurriculum = [
    {
      phase: 'Diciembre',
      period: 'Diciembre 2026',
      title: 'Fundamentos y creación con IA',
      text: 'Entender la IA, dar buenas instrucciones, investigar y crear contenido visual.',
      sessions: [
        {
          date: '02/12',
          label: 'Clase 1',
          title: 'Entiende cómo funciona la IA',
          text: 'Descubrirás qué puede hacer la inteligencia artificial, cuáles son sus limitaciones y cómo utilizarla para estudiar, investigar y resolver problemas cotidianos.',
          learns: 'Modelos generativos, instrucciones, verificación de respuestas y uso responsable',
        },
        {
          date: '09/12',
          label: 'Clase 2',
          title: 'Aprende a dar instrucciones eficaces a la IA',
          text: 'Crearás instrucciones para conseguir respuestas más útiles, definir el papel del asistente y especificar el formato que necesitas.',
          learns: 'Contexto, objetivos, restricciones, ejemplos y revisión de resultados',
        },
        {
          date: '16/12',
          label: 'Clase 3',
          title: 'Investiga y aprende con ayuda de la IA',
          text: 'Investigarás un tema y prepararás un documento con información organizada, distinguiendo datos verificables de afirmaciones que necesitan comprobarse.',
          learns: 'Investigación asistida, síntesis, contraste de fuentes y detección de errores',
        },
        {
          date: '23/12',
          label: 'Clase 4',
          title: 'Genera imágenes con inteligencia artificial',
          text: 'Crearás imágenes para un personaje, un videojuego o una marca ficticia, aprendiendo a mejorar las instrucciones según el resultado que quieras conseguir.',
          learns: 'Generación visual, estilos, composición y derechos de uso básicos',
        },
        {
          date: '30/12',
          label: 'Clase 5',
          title: 'Crea contenido visual y audiovisual',
          text: 'Diseñarás una pequeña pieza creativa combinando texto e imágenes y explorarás cómo las herramientas disponibles pueden ayudar a generar o editar vídeo.',
          learns: 'Flujo creativo, consistencia visual y revisión de contenido generado',
        },
      ],
    },
    {
      phase: 'Enero',
      period: 'Enero 2027',
      title: 'Productividad y primeros prototipos',
      text: 'Presentaciones, organización, resúmenes y una pequeña aplicación con IA.',
      sessions: [
        {
          date: '06/01',
          label: 'Clase 6',
          title: 'Crea una presentación con IA',
          text: 'Transformarás un tema en una presentación estructurada, con textos breves, imágenes y un hilo conductor claro.',
          learns: 'Planificación de contenidos, diseño de diapositivas y revisión de información',
        },
        {
          date: '13/01',
          label: 'Clase 7',
          title: 'Tu asistente personal de productividad',
          text: 'Crearás un sistema que te ayude a organizar tareas, dividir objetivos grandes en pasos pequeños y preparar planes de estudio.',
          learns: 'Flujos de trabajo, plantillas e instrucciones reutilizables',
        },
        {
          date: '20/01',
          label: 'Clase 8',
          title: 'Resume documentos y extrae información',
          text: 'Trabajarás con documentos de ejemplo para generar resúmenes, extraer ideas importantes y transformar textos largos en información organizada.',
          learns: 'Extracción de información, síntesis y comprobación de resultados',
        },
        {
          date: '27/01',
          label: 'Clase 9',
          title: 'Construye una pequeña aplicación con IA',
          text: 'Utilizarás una herramienta visual o un asistente de programación para crear un prototipo que resuelva una necesidad concreta.',
          learns: 'Definición del problema, prototipado, instrucciones y pruebas básicas',
        },
      ],
    },
    {
      phase: 'Febrero',
      period: 'Febrero 2027',
      title: 'Automatización con n8n',
      text: 'Workflows, triggers, correos, hojas de cálculo y datos entre pasos.',
      sessions: [
        {
          date: '03/02',
          label: 'Clase 10',
          title: 'Descubre la automatización con n8n',
          text: 'Conocerás los flujos de automatización y crearás tu primer proceso conectando varios pasos visuales.',
          learns: 'Workflows, nodos, conexiones, disparadores y acciones',
        },
        {
          date: '10/02',
          label: 'Clase 11',
          title: 'Automatiza un proceso de principio a fin',
          text: 'Crearás un flujo que se active cuando ocurra un evento y ejecute una serie de acciones automáticamente.',
          learns: 'Triggers, nodos de acción, datos entre pasos y ejecución de flujos',
        },
        {
          date: '17/02',
          label: 'Clase 12',
          title: 'Automatiza correos y notificaciones',
          text: 'Construirás una automatización de ejemplo que detecte un mensaje de prueba, procese su información y prepare una notificación.',
          learns: 'Integraciones de correo, filtros y envío automatizado con cuentas de prueba',
        },
        {
          date: '24/02',
          label: 'Clase 13',
          title: 'Conecta hojas de cálculo y aplicaciones',
          text: 'Crearás un flujo que lea filas de datos de ejemplo, filtre registros y prepare resultados sin tener que repetir manualmente el trabajo.',
          learns: 'Integraciones, mapeo de campos, filtros y transformación de datos',
        },
      ],
    },
    {
      phase: 'Marzo',
      period: 'Marzo 2027',
      title: 'IA en flujos, chatbots y APIs',
      text: 'Decisiones automáticas, clasificación, chatbots, documentos y APIs.',
      sessions: [
        {
          date: '03/03',
          label: 'Clase 14',
          title: 'Automatizaciones que toman decisiones',
          text: 'Mejorarás el flujo para que actúe de forma diferente según los datos recibidos, por ejemplo, clasificando solicitudes por tipo.',
          learns: 'Condiciones, ramas, filtros y rutas alternativas',
        },
        {
          date: '10/03',
          label: 'Clase 15',
          title: 'Utiliza IA para clasificar información',
          text: 'Conectarás una herramienta de IA a una automatización para clasificar mensajes ficticios, como consultas, incidencias o solicitudes de información.',
          learns: 'Clasificación mediante IA, salidas estructuradas y validación de resultados',
        },
        {
          date: '17/03',
          label: 'Clase 16',
          title: 'Crea tu propio chatbot',
          text: 'Diseñarás un asistente que responda preguntas sobre un tema concreto, con instrucciones y límites definidos.',
          learns: 'Diseño conversacional, contexto, instrucciones y pruebas con distintos mensajes',
        },
        {
          date: '24/03',
          label: 'Clase 17',
          title: 'Un asistente que responde sobre documentos',
          text: 'Prepararás una pequeña colección de documentos y explorarás cómo hacer que un asistente utilice esa información para responder preguntas concretas.',
          learns: 'Bases de conocimiento, búsqueda de información y límites de las respuestas generadas',
        },
        {
          date: '31/03',
          label: 'Clase 18',
          title: 'Conecta servicios mediante APIs',
          text: 'Verás cómo dos aplicaciones intercambian datos y conectarás un servicio web con una automatización sencilla.',
          learns: 'APIs, peticiones HTTP, JSON y credenciales básicas',
        },
      ],
    },
    {
      phase: 'Abril',
      period: 'Abril 2027',
      title: 'Documentos, procesos y agentes',
      text: 'Extracción de datos, gestión de solicitudes y asistentes con herramientas.',
      sessions: [
        {
          date: '07/04',
          label: 'Clase 19',
          title: 'Extrae datos de documentos',
          text: 'Crearás un flujo de ejemplo que reciba un documento de prueba y utilice herramientas disponibles para extraer campos concretos y estructurarlos.',
          learns: 'Extracción de datos, OCR cuando esté disponible, validación y revisión humana',
        },
        {
          date: '14/04',
          label: 'Clase 20',
          title: 'Automatiza la gestión de solicitudes',
          text: 'Montarás un sistema que clasifique solicitudes de ejemplo, asigne una categoría y prepare una respuesta para su revisión.',
          learns: 'Automatización de procesos, reglas, clasificación y supervisión humana',
        },
        {
          date: '21/04',
          label: 'Clase 21',
          title: 'Descubre los agentes de IA',
          text: 'Conocerás la diferencia entre un chatbot y un agente que puede seleccionar herramientas para completar una tarea con supervisión.',
          learns: 'Herramientas, objetivos, pasos de ejecución y límites de autonomía',
        },
        {
          date: '28/04',
          label: 'Clase 22',
          title: 'Crea un asistente que utilice herramientas',
          text: 'Configurarás un asistente sencillo para consultar información de prueba y preparar acciones, exigiendo confirmación antes de realizar operaciones importantes.',
          learns: 'Llamadas a herramientas, validación de entradas y controles de seguridad',
        },
      ],
    },
    {
      phase: 'Mayo',
      period: 'Mayo 2027',
      title: 'Web, webhooks y proyecto final',
      text: 'Páginas con IA, conexiones entre apps, depuración y diseño del proyecto.',
      sessions: [
        {
          date: '05/05',
          label: 'Clase 23',
          title: 'Diseña y construye una web con ayuda de IA',
          text: 'Utilizarás asistentes de programación para crear una página sencilla, mejorar su diseño y corregir errores con instrucciones concretas.',
          learns: 'Generación de código, revisión, pruebas y límites de las herramientas automáticas',
        },
        {
          date: '12/05',
          label: 'Clase 24',
          title: 'Conecta una aplicación con una automatización',
          text: 'Harás que una acción de una aplicación de prueba active un flujo que procese los datos y devuelva un resultado.',
          learns: 'Webhooks, envío de datos y comunicación entre herramientas',
        },
        {
          date: '19/05',
          label: 'Clase 25',
          title: 'Detecta errores y mejora tus automatizaciones',
          text: 'Simularás fallos en un flujo, revisarás sus ejecuciones y mejorarás el proceso para evitar errores habituales.',
          learns: 'Registros, manejo de errores, reintentos y control de ejecuciones',
        },
        {
          date: '26/05',
          label: 'Clase 26',
          title: 'Diseña tu proyecto final',
          text: 'Elegirás un problema que puedas resolver con IA o automatización: un asistente temático, un clasificador de mensajes o un flujo que conecte varias herramientas.',
          learns: 'Definir objetivos, diseñar el flujo y dividir el trabajo en tareas pequeñas',
        },
      ],
    },
    {
      phase: 'Junio',
      period: 'Junio 2027',
      title: 'Proyecto final y AI Demo Day',
      text: 'Construir, integrar, probar y presentar tu creación.',
      sessions: [
        {
          date: '02/06',
          label: 'Clase 27',
          title: 'Construye la primera versión',
          text: 'Crearás el flujo principal del proyecto y comprobarás que la información pasa correctamente entre sus componentes.',
          learns: 'Configuración de nodos, integración y pruebas iniciales',
        },
        {
          date: '09/06',
          label: 'Clase 28',
          title: 'Integra la IA y las funciones extra',
          text: 'Añadirás las funcionalidades que hagan especial el proyecto, como clasificar información, generar respuestas o enviar notificaciones.',
          learns: 'Integrar servicios, validar resultados y controlar las acciones automáticas',
        },
        {
          date: '16/06',
          label: 'Clase 29',
          title: 'Prueba, corrige y prepara la demostración',
          text: 'Probarás distintos escenarios, corregirás errores y prepararás una explicación clara de lo que hace tu solución y de sus limitaciones.',
          learns: 'Pruebas, depuración, seguridad y documentación básica',
        },
        {
          date: '23/06',
          label: 'Clase 30',
          title: 'AI Demo Day: presenta tu creación',
          text: 'Enseñarás el proyecto final al grupo, demostrarás cómo funciona y explicarás qué problema resuelve y qué mejorarías en una versión futura.',
          learns: 'Presentar proyectos tecnológicos, justificar decisiones y evaluar resultados',
        },
      ],
    },
  ] as const;

  readonly webSkills = [
    'HTML: páginas, secciones, imágenes, enlaces y formularios',
    'CSS: colores, tipografía, cajas, Flexbox, Grid y responsive',
    'Tailwind CSS: interfaces con clases de utilidad y componentes',
    'Proyectos reales: página personal, landing y web multipágina',
  ] as const;

  readonly webLearningAreas = [
    {
      number: '01',
      title: 'HTML desde cero',
      text: 'Etiquetas, estructura, formularios y páginas que se entienden sin constructores.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'CSS y layouts',
      text: 'Colores, tipografía, cajas, Flexbox, Grid y efectos. Primero se entiende, luego se acelera.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Responsive y Tailwind',
      text: 'Adaptar a móvil y ordenador, y usar Tailwind sabiendo qué hace cada clase.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyectos reales',
      text: 'Página personal, landing de marca, web multipágina y presentación final.',
      tone: 'green',
    },
  ] as const;

  readonly webEnrollment = {
    title: '¿Qué aprenderás?',
    text: 'Al finalizar las 30 sesiones, los alumnos habrán aprendido a construir y diseñar webs estáticas de principio a fin.',
    points: [
      'HTML: construir páginas, organizar secciones, insertar imágenes, crear enlaces y formularios.',
      'CSS: controlar colores, fuentes, tamaños, márgenes, bordes, sombras y efectos visuales.',
      'Diseño de páginas: colocar elementos con Flexbox y Grid, y adaptar webs a móviles y ordenadores.',
      'Tailwind CSS: construir interfaces utilizando clases de utilidad y componentes visuales reutilizables.',
      'Proyectos reales: crear páginas personales, galerías, landing pages y webs con varias páginas.',
      'Buenas prácticas: organizar archivos, mantener un diseño coherente, revisar errores y presentar su trabajo.',
    ],
  } as const;

  readonly webCurriculum = [
    {
      phase: 'Diciembre',
      period: 'Diciembre 2026',
      title: 'Aprende HTML desde cero',
      text: 'Objetivo: entender cómo se construye una página web y aprender a escribir el código que organiza su contenido.',
      sessions: [
        {
          date: '04/12',
          label: 'Clase 1',
          title: 'Cómo funciona una página web',
          text: 'Su primera página desde cero. Escribirán un título con su nombre, un párrafo de presentación y una imagen de algo que les guste. Después abrirán el archivo en el navegador y comprobarán cómo el código se convierte en una página visible.',
          learns: 'Qué es HTML y para qué sirve · Qué son las etiquetas: instrucciones que indican si algo es un título, un párrafo o una imagen · Cómo crear un archivo .html · Cómo guardar los cambios y verlos en el navegador',
          result: 'Su primera página web escrita por ellos mismos, sin utilizar un constructor visual.',
        },
        {
          date: '11/12',
          label: 'Clase 2',
          title: 'Títulos, textos y listas',
          text: 'Una página dedicada a su videojuego, deporte, artista o afición favorita. Tendrá un título principal, varios subtítulos, párrafos explicativos y una lista de recomendaciones o datos curiosos.',
          learns: 'Cómo diferenciar un título principal de los subtítulos · Cómo escribir párrafos y destacar palabras importantes · Cómo crear listas numeradas y listas con viñetas · Cómo organizar el contenido para que se entienda fácilmente',
          result: 'Una página con contenido estructurado, mucho más completa que la primera.',
        },
        {
          date: '18/12',
          label: 'Clase 3',
          title: 'Imágenes y enlaces',
          text: 'Una pequeña guía web con imágenes, enlaces a páginas de interés y un menú sencillo que permita saltar a distintas partes del contenido. Por ejemplo, una guía de videojuegos con imágenes, descripciones y enlaces oficiales.',
          learns: 'Cómo insertar imágenes en una página · Cómo crear enlaces a otras webs · Cómo enlazar una parte de la página con otra · Cómo utilizar nombres de archivo y rutas para encontrar correctamente las imágenes',
          result: 'Una página que ya permite navegar, consultar imágenes y acceder a otros recursos.',
        },
      ],
    },
    {
      phase: 'Enero',
      period: 'Enero 2027',
      title: 'Domina la estructura de HTML y empieza con CSS',
      text: 'Objetivo: organizar una web como lo hacen los desarrolladores y empezar a controlar su apariencia con hojas de estilo.',
      sessions: [
        {
          date: '08/01',
          label: 'Clase 4',
          title: 'Organiza una web como un profesional',
          text: 'Una web con un encabezado, un menú, varias secciones de contenido y un pie de página. Por ejemplo, la página de presentación de un club ficticio de esports.',
          learns: 'Cómo dividir una web en partes bien organizadas · Para qué sirven etiquetas como header, nav, main, section y footer · Cómo mantener el código ordenado y fácil de entender · Por qué es importante utilizar cada etiqueta para el propósito adecuado',
          result: 'Una página con una estructura clara que podrán reutilizar en futuros proyectos.',
        },
        {
          date: '15/01',
          label: 'Clase 5',
          title: 'Crea formularios',
          text: 'Un formulario de registro para un torneo, un club de videojuegos o una actividad ficticia. Tendrá campos para escribir un nombre, elegir una opción, marcar casillas y pulsar un botón para enviar.',
          learns: 'Cómo crear campos para introducir información · Cómo utilizar etiquetas, botones y listas de opciones · Cómo marcar campos como obligatorios · Cómo organizar un formulario para que sea fácil de rellenar',
          result: 'Un formulario funcional visualmente, aunque todavía no enviará los datos a un servidor.',
        },
        {
          date: '22/01',
          label: 'Clase 6',
          title: 'Tu primera hoja de estilos CSS',
          text: 'Cogerán una página HTML que ya tengan y cambiarán su apariencia mediante CSS. Pondrán colores de fondo, modificarán las letras, ajustarán los tamaños y añadirán espacios para que la web resulte más agradable.',
          learns: 'Qué es CSS y cómo se conecta con HTML · Cómo seleccionar un elemento y aplicarle estilos · Cómo cambiar colores, fuentes y tamaños · Cómo separar el contenido de su apariencia visual',
          result: 'Una web cuyo diseño controlan escribiendo reglas CSS, en lugar de modificar cada elemento manualmente.',
        },
        {
          date: '29/01',
          label: 'Clase 7',
          title: 'Controla los espacios y las cajas',
          text: 'Mejorarán una página llena de elementos que están demasiado juntos. Ajustarán los márgenes, el espacio interior, los bordes y el ancho de los bloques para conseguir una distribución más limpia.',
          learns: 'Qué diferencia hay entre margen y espacio interior · Cómo funcionan los bordes y las dimensiones de un elemento · Cómo separar visualmente los distintos apartados · Cómo evitar que el texto y las imágenes queden amontonados',
          result: 'Una página ordenada y legible, con espacios controlados mediante CSS.',
        },
      ],
    },
    {
      phase: 'Febrero',
      period: 'Febrero 2027',
      title: 'Aprende a colocar elementos y crear diseños con CSS',
      text: 'Objetivo: dejar de tener elementos simplemente uno debajo de otro y aprender a distribuirlos para construir diseños modernos.',
      sessions: [
        {
          date: '05/02',
          label: 'Clase 8',
          title: 'Coloca elementos en filas y columnas',
          text: 'Una sección con varias tarjetas de videojuegos, películas o productos. En lugar de aparecer todas una debajo de otra, estarán colocadas en filas, con espacios iguales entre ellas.',
          learns: 'Cómo utilizar Flexbox para colocar elementos uno al lado del otro · Cómo centrar elementos horizontal y verticalmente · Cómo controlar los espacios entre tarjetas · Cómo alinear imágenes, títulos y botones',
          result: 'Una sección organizada que ya se parece a la de una web comercial.',
        },
        {
          date: '12/02',
          label: 'Clase 9',
          title: 'Crea cuadrículas con CSS Grid',
          text: 'Una galería con varias filas y columnas, como una colección de juegos, personajes o fotografías. Las tarjetas tendrán un tamaño coherente y estarán colocadas en una cuadrícula.',
          learns: 'Qué diferencia hay entre Flexbox y CSS Grid · Cómo decidir cuántas columnas tiene una cuadrícula · Cómo controlar el espacio entre filas y columnas · Cómo hacer que una cuadrícula se adapte cuando hay menos espacio',
          result: 'Una galería ordenada que pueden reutilizar en páginas de productos, portfolios y catálogos.',
        },
        {
          date: '19/02',
          label: 'Clase 10',
          title: 'Crea botones con efectos y animaciones',
          text: 'Una colección de botones con distintos estilos. Algunos cambiarán de color al pasar el cursor por encima, otros crecerán ligeramente o mostrarán una transición suave al interactuar con ellos.',
          learns: 'Cómo definir estilos diferentes para los botones · Qué significa el estado hover, cuando el cursor está encima de un elemento · Cómo utilizar transiciones para que los cambios sean suaves · Cómo dar señales visuales de que un elemento es interactivo',
          result: 'Botones más atractivos que hacen que la web parezca más cuidada.',
        },
        {
          date: '26/02',
          label: 'Clase 11',
          title: 'Diseña tarjetas de aspecto profesional',
          text: 'Un conjunto de tarjetas de perfil, personajes o productos con imágenes, títulos, descripciones y botones. Cada tarjeta tendrá bordes, sombras, espacios y tamaños coherentes.',
          learns: 'Cómo combinar fondo, borde, sombra y esquinas redondeadas · Cómo mantener proporciones consistentes entre tarjetas · Cómo reutilizar reglas de estilo en varios elementos · Cómo mejorar la legibilidad mediante tamaños y espacios',
          result: 'Componentes visuales que podrán utilizar en muchas webs diferentes.',
        },
      ],
    },
    {
      phase: 'Marzo',
      period: 'Marzo 2027',
      title: 'Aprende diseño adaptable y empieza con Tailwind CSS',
      text: 'Objetivo: aprender a adaptar una web a diferentes pantallas y descubrir una forma de aplicar estilos más rápida, utilizada en muchos proyectos modernos. El viernes 26 de marzo no hay clase (Viernes Santo).',
      sessions: [
        {
          date: '05/03',
          label: 'Clase 12',
          title: 'Adapta tu web a móviles y ordenadores',
          text: 'Transformarán una página que se ve bien en ordenador, pero mal en móvil. Harán que las tarjetas se distribuyan en varias columnas en una pantalla grande y se apilen en una pantalla pequeña.',
          learns: 'Por qué una web necesita adaptarse al tamaño de la pantalla · Cómo funcionan las media queries de CSS · Cómo cambiar tamaños, columnas y espacios según el dispositivo · Cómo comprobar el resultado en distintos anchos de pantalla',
          result: 'Una página responsive, es decir, adaptable a móviles, tabletas y ordenadores.',
        },
        {
          date: '12/03',
          label: 'Clase 13',
          title: 'Domina las letras y los colores',
          text: 'Rediseñarán una página para que tenga una identidad visual clara. Elegirán una combinación de colores, establecerán tamaños de títulos y textos y ajustarán la altura de línea para facilitar la lectura.',
          learns: 'Cómo elegir fuentes y combinarlas · Cómo establecer una jerarquía visual entre títulos y párrafos · Cómo utilizar colores con suficiente contraste · Cómo definir estilos reutilizables para mantener la coherencia de una web',
          result: 'Una página con un diseño más consistente, legible y agradable.',
        },
        {
          date: '19/03',
          label: 'Clase 14',
          title: 'Conoce Tailwind CSS',
          text: 'Tomarán una tarjeta que ya han diseñado con CSS tradicional y crearán otra equivalente usando Tailwind. Aplicarán clases para cambiar el color, el tamaño, el borde, la sombra y el espacio interior.',
          learns: 'Qué es Tailwind CSS y por qué se utiliza · Cómo se aplican estilos mediante clases como p-4, text-xl o rounded-lg · Cómo encontrar la clase adecuada en la documentación · Cómo comparar Tailwind con las reglas CSS que ya conocen',
          result: 'Su primera interfaz creada con Tailwind, entendiendo qué hace cada clase en vez de copiar código sin comprenderlo.',
        },
      ],
    },
    {
      phase: 'Abril',
      period: 'Abril 2027',
      title: 'Domina Tailwind CSS creando componentes',
      text: 'Objetivo: utilizar Tailwind para construir interfaces más rápidamente, sin dejar de entender el HTML y los estilos que hay detrás.',
      sessions: [
        {
          date: '02/04',
          label: 'Clase 15',
          title: 'Diseña botones y etiquetas con Tailwind',
          text: 'Una colección de botones de diferentes tipos: uno principal para una acción importante, otro secundario, uno con borde y otro para acciones menos destacadas. También crearán pequeñas etiquetas de colores para categorías como «Nuevo», «Popular» o «Gratis».',
          learns: 'Cómo combinar clases de Tailwind para conseguir un estilo concreto · Cómo cambiar colores, tamaños, bordes y espacios · Cómo crear variantes visuales de un mismo tipo de elemento · Cómo añadir efectos al pasar el cursor por encima',
          result: 'Una pequeña colección de componentes visuales que podrán reutilizar en sus proyectos.',
        },
        {
          date: '09/04',
          label: 'Clase 16',
          title: 'Crea tarjetas responsive con Tailwind',
          text: 'Una cuadrícula de tarjetas con imágenes, títulos, descripciones y botones. En ordenador se mostrarán varias tarjetas por fila y en móvil se reorganizarán automáticamente para ocupar mejor el espacio.',
          learns: 'Cómo utilizar las clases de Flexbox y Grid de Tailwind · Cómo establecer diferentes columnas según el ancho de la pantalla · Cómo aplicar márgenes, rellenos y tamaños sin escribir nuevas reglas CSS para cada elemento · Cómo reutilizar el mismo diseño en distintas tarjetas',
          result: 'Una cuadrícula adaptable que pueden utilizar en una tienda, una galería o un catálogo.',
        },
        {
          date: '16/04',
          label: 'Clase 17',
          title: 'Construye un menú de navegación moderno',
          text: 'Una barra superior con un logotipo, varios enlaces y un botón destacado. Ajustarán la distribución para que el menú se vea bien en ordenador y no ocupe demasiado espacio en móvil.',
          learns: 'Cómo alinear un logotipo, enlaces y botones · Cómo utilizar clases responsive de Tailwind · Cómo controlar los espacios entre elementos · Cómo mantener una navegación consistente en todas las páginas de una web',
          result: 'Un menú moderno listo para incorporar a un proyecto más grande.',
        },
        {
          date: '23/04',
          label: 'Clase 18',
          title: 'Monta una página completa con componentes',
          text: 'Una página sencilla que combine un menú, una sección principal, varias tarjetas y un pie de página. Utilizarán los componentes que han ido practicando en lugar de diseñar cada parte desde cero.',
          learns: 'Cómo dividir una página en secciones · Cómo reutilizar estilos y patrones visuales · Cómo mantener la misma identidad de colores y tipografías · Cómo revisar el diseño completo en móvil y ordenador',
          result: 'Una web compacta construida con Tailwind y preparada para convertirse en un proyecto más ambicioso.',
        },
        {
          date: '30/04',
          label: 'Clase 19',
          title: 'Crea tu primera web personal completa',
          text: 'Una página personal donde presentarse, mostrar sus intereses y enseñar los pequeños proyectos que han realizado. Podrán elegir un estilo claro, oscuro, minimalista o inspirado en sus aficiones.',
          learns: 'Cómo combinar HTML, CSS y Tailwind en un mismo proyecto · Cómo organizar el contenido para presentarse de forma clara · Cómo crear una sección de proyectos con tarjetas · Cómo revisar el aspecto final y corregir problemas visuales',
          result: 'Una primera web personal que podrán seguir ampliando a medida que aprendan más.',
        },
      ],
    },
    {
      phase: 'Mayo',
      period: 'Mayo 2027',
      title: 'Crea una landing page como las de empresas reales',
      text: 'Objetivo: aplicar HTML, CSS y Tailwind en un proyecto con un propósito claro: presentar una marca, una app o un producto de forma atractiva.',
      sessions: [
        {
          date: '07/05',
          label: 'Clase 20',
          title: 'Diseña la portada de una marca',
          text: 'La primera pantalla de una web para una marca ficticia, una app o un producto. Incluirá un título que explique la idea, un texto breve, un botón principal y una imagen que ayude a entender qué se ofrece.',
          learns: 'Cómo organizar la parte más importante de una landing page · Cómo combinar texto e imagen sin recargar la pantalla · Cómo crear jerarquía visual mediante tamaños y espacios · Cómo aplicar Tailwind para ajustar el diseño de forma rápida',
          result: 'Una portada con apariencia profesional para presentar una idea.',
        },
        {
          date: '14/05',
          label: 'Clase 21',
          title: 'Explica qué hace especial tu producto',
          text: 'Una sección con tres o cuatro ventajas del producto, cada una acompañada de un icono, un título y una explicación. Por ejemplo, si presentan una app para estudiar, podrán mostrar cómo ayuda a organizar tareas, preparar exámenes o controlar el progreso.',
          learns: 'Cómo distribuir información en tarjetas · Cómo alinear iconos, títulos y textos · Cómo crear secciones con varias columnas · Cómo mantener el mismo estilo visual en toda la página',
          result: 'Una sección de características que explica claramente el valor de su producto.',
        },
        {
          date: '21/05',
          label: 'Clase 22',
          title: 'Crea precios y una llamada a la acción',
          text: 'Una sección con distintos planes de precios para su producto ficticio. Cada tarjeta incluirá el precio, una lista de lo que ofrece y un botón. También añadirán una sección final para invitar al visitante a probar el producto o solicitar información.',
          learns: 'Cómo presentar y comparar varias opciones · Cómo destacar un plan sin dificultar la lectura de los demás · Cómo diseñar botones que llamen la atención · Cómo guiar al visitante hacia una acción concreta',
          result: 'Una página que no solo presenta algo, sino que está diseñada para conseguir que el visitante haga algo con esa información.',
        },
        {
          date: '28/05',
          label: 'Clase 23',
          title: 'Termina y mejora tu landing page',
          text: 'Unirán todas las secciones, añadirán navegación entre apartados y completarán el pie de página. Después revisarán el diseño y ajustarán las partes que no se vean bien en móvil o en ordenador.',
          learns: 'Cómo ordenar una página completa de principio a fin · Cómo conectar los enlaces del menú con cada sección · Cómo mantener una identidad visual consistente · Cómo comprobar que la web se ve bien en diferentes pantallas',
          result: 'Una landing page completa para una marca o producto inventado.',
        },
      ],
    },
    {
      phase: 'Junio',
      period: 'Junio 2027',
      title: 'Crea un proyecto web más completo',
      text: 'Objetivo: aprender a planificar una web, organizar varias páginas, trabajar con diseños de referencia y crear un proyecto propio que puedan enseñar.',
      sessions: [
        {
          date: '04/06',
          label: 'Clase 24',
          title: 'Aprende a planificar una web antes de programar',
          text: 'El diseño inicial de una web para un proyecto que les interese: un equipo de esports, una marca de ropa, un estudio creativo, un evento o una tienda ficticia. Dibujarán las secciones principales y elegirán los colores, las fuentes y el estilo visual antes de escribir el código.',
          learns: 'Cómo decidir qué páginas y secciones necesita una web · Cómo elegir una combinación de colores y tipografías · Cómo hacer un boceto de una página antes de programarla · Cómo dividir el trabajo en tareas pequeñas y ordenadas',
          result: 'Un diseño planificado que servirá como guía para construir su proyecto final.',
        },
        {
          date: '11/06',
          label: 'Clase 25',
          title: 'Crea una web con varias páginas',
          text: 'Empezarán a desarrollar una web que tenga distintas páginas, como «Inicio», «Sobre nosotros» y «Proyectos». Cada página tendrá su contenido, pero todas compartirán el mismo menú, los colores y el estilo general.',
          learns: 'Cómo organizar varios archivos HTML dentro de un proyecto · Cómo enlazar unas páginas con otras · Cómo compartir una misma hoja de estilos CSS · Cómo mantener la navegación y el diseño coherentes en toda la web',
          result: 'Una web con varias páginas conectadas entre sí, no solamente una única pantalla larga.',
        },
        {
          date: '18/06',
          label: 'Clase 26',
          title: 'Crea una galería de proyectos',
          text: 'Añadirán a su web una sección para mostrar proyectos, productos o trabajos. Cada elemento tendrá una imagen, un título y una descripción, y podrá enlazar a una página con más información.',
          learns: 'Cómo organizar muchos elementos mediante CSS Grid · Cómo reutilizar el mismo diseño para todas las tarjetas · Cómo combinar imágenes y textos sin desordenar la página · Cómo crear enlaces que permitan consultar cada proyecto',
          result: 'Una galería que hace que su web parezca un portfolio o catálogo real.',
        },
        {
          date: '25/06',
          label: 'Clase 27',
          title: 'Mejora la experiencia en móvil',
          text: 'Revisarán su web en pantallas grandes y pequeñas. Ajustarán el menú, el tamaño de las imágenes, las columnas, los textos y los espacios para que la página sea cómoda de utilizar en cualquier dispositivo.',
          learns: 'Cómo detectar problemas de diseño responsive · Cómo cambiar la distribución de los elementos según el ancho disponible · Cómo comprobar que los textos y botones se pueden leer y utilizar cómodamente · Cómo corregir los problemas más habituales de una web adaptable',
          result: 'Una web que se ve bien tanto en ordenador como en móvil.',
        },
      ],
    },
    {
      phase: 'Julio',
      period: 'Julio 2027',
      title: 'Proyecto final: diseña y construye tu propia web',
      text: 'Objetivo: aplicar todo lo aprendido en un proyecto elegido por cada alumno, desde el diseño inicial hasta la presentación final.',
      sessions: [
        {
          date: '02/07',
          label: 'Clase 28',
          title: 'Elige tu proyecto y empieza a construirlo',
          text: 'Cada alumno elegirá qué web quiere desarrollar. Puede ser una página para un equipo de esports, una marca de ropa, una tienda ficticia, una web de música o un portfolio personal. Prepararán la estructura HTML y empezarán a construir la primera página.',
          learns: 'Cómo convertir una idea en una web concreta · Cómo organizar los archivos y las carpetas del proyecto · Cómo construir la estructura HTML antes de aplicar los estilos · Cómo dividir una web en secciones que puedan completar paso a paso',
          result: 'Un proyecto personal iniciado, con una estructura clara y una primera página en construcción.',
        },
        {
          date: '09/07',
          label: 'Clase 29',
          title: 'Construye y da estilo a tu web',
          text: 'Continuarán el proyecto incorporando las secciones principales, las imágenes, los textos, los enlaces y el diseño visual. Utilizarán CSS y Tailwind según lo que necesite cada parte.',
          learns: 'Cómo combinar HTML, CSS y Tailwind en un mismo proyecto · Cómo reutilizar los componentes y estilos que ya conocen · Cómo ajustar la distribución, los colores, la tipografía y los espacios · Cómo detectar y corregir errores visuales o enlaces que no funcionan',
          result: 'Una web personal avanzada, con la mayor parte del contenido y del diseño terminados.',
        },
        {
          date: '16/07',
          label: 'Clase 30',
          title: 'Santamaria Web Fest',
          text: 'No empezarán una web nueva. Revisarán el proyecto final, corregirán los últimos detalles y prepararán una presentación para enseñar su trabajo al resto del grupo.',
          learns: 'Cómo revisar una web antes de darla por terminada · Cómo probar los enlaces, las imágenes y el diseño responsive · Cómo explicar las decisiones de diseño y el código que han escrito · Cómo recibir comentarios y decidir qué mejorarían en una siguiente versión',
          result: 'Cada alumno termina el curso con una web propia que puede enseñar como parte de su portfolio.',
        },
      ],
    },
  ] as const;

  readonly pageContent = computed(() => {
    if (this.slug() === 'paginas-web') {
      return {
        category: 'HTML · CSS · Tailwind · 14–18 años',
        heading: 'Desarrollo Web',
        accent: 'desde Cero',
        schedule: this.course()?.schedule ?? 'Viernes · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '30 clases · 90 min · Viernes 17:30–19:00 · Dic 2026 – Jul 2027',
        introTitle: 'Tu primera web, diseñada y programada por ti',
        introText:
          'HTML a mano, CSS de verdad (Flexbox, Grid, responsive) y después Tailwind para ir más rápido. Terminan con página personal, landing y un proyecto web propio.',
        introNote:
          'Primero se entiende CSS; Tailwind llega después, no como atajo vacío. Sin JavaScript avanzado: el foco es construir y diseñar webs estáticas que puedan enseñar.',
        skills: this.webSkills,
        areas: this.webLearningAreas,
        areasText:
          'HTML, CSS, responsive, Tailwind y proyectos reales: página personal, landing y web multipágina.',
        outcomes: this.webEnrollment,
        curriculum: this.webCurriculum,
        curriculumText:
          '30 sesiones en viernes. El 26 de marzo no hay clase (Viernes Santo). En cada clase: qué construyen, qué aprenden y el resultado.',
        curriculumBadge: '30 clases · 90 min · Plan 2026–2027',
        ctaTitle: 'Empieza a construir para la web',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de desarrollo web.',
      } as const;
    }

    if (this.slug() === 'inteligencia-artificial') {
      return {
        category: 'IA · n8n · APIs · 14–18 años',
        heading: 'Inteligencia Artificial',
        accent: 'y Automatización',
        schedule: this.course()?.schedule ?? 'Miércoles · 19:00–20:30',
        price: this.course()?.price ?? '59 €',
        summary: '30 clases · 90 min · Miércoles 19:00–20:30 · Dic 2026 – Jun 2027 · Máx. 10 alumnos',
        introTitle: '¿Qué aprenderás?',
        introText:
          'Aprenderás a utilizar la inteligencia artificial para crear herramientas útiles, automatizar tareas y conectar diferentes aplicaciones. No será un curso de teoría sobre IA ni consistirá únicamente en hablar con ChatGPT: desarrollarás proyectos prácticos que podrás enseñar al terminar.',
        introNote:
          'No necesitas experiencia previa en programación. Trabajaremos con herramientas visuales y algo de código cuando sea necesario.',
        skills: this.aiSkills,
        areas: this.aiLearningAreas,
        areasText:
          'Empezaremos con asistentes de IA y avanzaremos hacia contenido, n8n, APIs y asistentes que ejecutan tareas.',
        outcomes: this.aiOutcomes,
        curriculum: this.aiCurriculum,
        curriculumText:
          'Las clases empiezan en diciembre de 2026 y terminan en junio de 2027. Continuamos en vacaciones escolares; solo se ajustan festivos nacionales.',
        curriculumBadge: '30 clases · 90 min · Plan 2026–2027',
        ctaTitle: 'Aprende a conectar ideas, datos e inteligencia artificial',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de IA y automatización.',
      } as const;
    }

    if (this.slug() === 'python') {
      return {
        category: 'Curso 06 · Programación online en directo · 12–16 años',
        heading: 'Python desde cero: crea tus propios',
        accent: 'programas y videojuegos',
        schedule: this.course()?.schedule ?? 'Lunes · 19:00–20:30',
        price: this.course()?.price ?? '59 €',
        summary: '30 clases · 90 min · Lunes 19:00–20:30 · Dic 2026 – Jun 2027 · Máx. 10 alumnos',
        introTitle: '¿Qué aprenderás?',
        introText:
          'Empezarás desde cero, sin necesidad de haber programado nunca. Aprenderás a escribir código con Python, resolver problemas y crear proyectos cada vez más completos. Durante el curso desarrollarás juegos, programas interactivos, dibujos generativos, pequeñas automatizaciones y proyectos con datos de Internet.',
        introNote: '',
        skills: this.pythonSkills,
        areas: this.pythonLearningAreas,
        areasText:
          'El objetivo es que entiendas cómo funciona la programación y puedas crear tus propias ideas, no simplemente copiar código.',
        rhythm: this.pythonRhythm,
        outcomes: this.pythonOutcomes,
        curriculum: this.pythonCurriculum,
        curriculumText:
          'Las clases empiezan el lunes 7 de diciembre de 2026 y terminan el 28 de junio de 2027: 30 lunes consecutivos. Continúan en Navidad y Semana Santa.',
        curriculumBadge: '30 clases · 90 min · Plan 2026–2027',
        ctaTitle: 'Empieza a escribir código de verdad',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de Python.',
      } as const;
    }

    if (this.slug() === 'python-avanzado') {
      return {
        category: 'Python avanzado · 14–18 años',
        heading: 'Python avanzado:',
        accent: 'crea proyectos reales',
        schedule: this.course()?.schedule ?? 'Jueves · 19:00–20:30',
        price: this.course()?.price ?? '59 €',
        summary: '30 clases · 90 min · Jueves 19:00–20:30 · Dic 2026 – Jun 2027 · Máx. 10 alumnos',
        introTitle: 'El siguiente paso cuando ya sabes programar',
        introText:
          'Para quien ya maneja variables, if, bucles, funciones y listas. Organizarás proyectos, usarás bases de datos, interfaces, APIs, Flask e incluso IA, cerrando con un proyecto propio en el Demo Day.',
        introNote: '',
        skills: this.pythonAdvancedSkills,
        areas: this.pythonAdvancedLearningAreas,
        areasText:
          'OOP, SQLite, Tkinter, APIs, pandas, Flask, automatización e integración con IA.',
        rhythm: this.pythonAdvancedRhythm,
        outcomes: this.pythonAdvancedOutcomes,
        curriculum: this.pythonAdvancedCurriculum,
        curriculumText:
          'Del jueves 3 de diciembre de 2026 al jueves 24 de junio de 2027: 30 sesiones. No se omiten las vacaciones escolares.',
        curriculumBadge: '30 clases · 90 min · Plan 2026–2027',
        ctaTitle: 'Sigue con Python de verdad',
        ctaText:
          'Escríbenos y te explicamos plazas, requisito de entrada y cómo apuntarse a Python avanzado.',
      } as const;
    }

    if (this.slug() === 'roblox') {
      return {
        category: 'Roblox Studio · Luau · 10–14 años',
        heading: 'Crea tus propios',
        accent: 'videojuegos con Roblox Studio',
        schedule: this.course()?.schedule ?? 'Martes · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '30 clases · 90 min · Martes 17:30–19:00 · Dic 2026 – Jun 2027',
        introTitle: 'De tu primer obby a un juego propio',
        introText:
          'Cada mes un salto claro: mundo y obstáculos, Luau, poderes y enemigos, varias fases, interfaces y tiendas, multijugador y, en junio, su videojuego final.',
        introNote:
          'Luau con scripts cortos y resultados visibles. El objetivo es crear y probar en Roblox Studio; la publicación se gestiona según las reglas de Roblox y con precaución para menores.',
        skills: this.robloxSkills,
        areas: this.robloxLearningAreas,
        areasText:
          'Studio, Luau, mecánicas, UI, multijugador y un proyecto final propio.',
        outcomes: this.robloxOutcomes,
        curriculum: this.robloxCurriculum,
        curriculumText:
          '30 sesiones en martes. En cada clase: qué construyen, qué aprenden y el resultado.',
        curriculumBadge: '30 clases · 90 min · Plan 2026–2027',
        ctaTitle: 'Que cree su propio juego en Roblox Studio',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de Roblox Studio.',
      } as const;
    }

    if (this.slug() === 'aplicaciones-moviles') {
      return {
        category: 'Apps Android · Kodular · 10–14 años',
        heading: 'Crea tus propias',
        accent: 'aplicaciones móviles',
        schedule: this.course()?.schedule ?? 'Jueves · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '30 clases · 90 min · Jueves 17:30–19:00 · Dic 2026 – Jul 2027',
        introTitle: 'De la primera pantalla a una app propia',
        introText:
          'Cada mes un proyecto claro: sonidos, concurso, mascota, tareas con Firebase, Pokédex con API, asistente personal y, en junio, su app final. No vendemos “aprender Kodular”: vendemos crear aplicaciones que pueden enseñar en casa.',
        introNote: '',
        skills: this.mobileSkills,
        areas: this.mobileLearningAreas,
        areasText:
          'Pantallas, lógica, TinyDB, Firebase, APIs y un proyecto final propio.',
        rhythm: this.mobileRhythm,
        outcomes: this.mobileOutcomes,
        curriculum: this.mobileCurriculum,
        curriculumText:
          '30 sesiones. En cada clase: qué construyen, qué aprenden y el resultado esperado.',
        curriculumBadge: '30 clases · 90 min · Plan 2026–2027',
        ctaTitle: 'Que cree su primera app de verdad',
        ctaText:
          'Escríbenos y te explicamos plazas, cómo entrar a mitad de curso y cómo apuntarse al grupo de aplicaciones móviles.',
      } as const;
    }

    if (this.slug() === 'robotica-arduino') {
      return {
        category: 'Arduino UNO · 11–15 años',
        heading: 'Robótica y Programación',
        accent: 'con Arduino',
        schedule: this.course()?.schedule ?? 'Miércoles · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '30 clases · 90 min · Miércoles 17:30–19:00 · Dic 2026 – Jun 2027',
        introTitle: 'Inventos, sensores y automatización desde casa',
        introText:
          'Con el kit Miuzei (placa UNO, sensores, LCD, mando IR, teclado, motores y más) montan un invento cada semana. En junio lo presentan en el Santamaria Robotics Fest.',
        introNote:
          'Kit oficial: Miuzei Starter Kit (~169 piezas). Sin soldar.\n\nMientras llega, empiezas en Tinkercad (gratis): lo mismo en digital. Cuando llega la caja, en físico.',
        introNoteUrl: 'https://www.amazon.es/dp/B07CXKP3R3',
        skills: this.arduinoSkills,
        areas: this.arduinoLearningAreas,
        areasText:
          'Luces, sensores, LCD, control remoto, motores, relé e invento final con el kit.',
        outcomes: this.arduinoOutcomes,
        curriculum: this.arduinoCurriculum,
        curriculumText:
          '30 miércoles, del 2 de diciembre de 2026 al 23 de junio de 2027. Cada clase cabe en 90 minutos y usa piezas reales del kit Miuzei.',
        curriculumBadge: '30 clases · 90 min · Plan 2026–2027',
        ctaTitle: 'Empieza a construir y programar',
        ctaText:
          'Escríbenos y te explicamos plazas, horario, kit de materiales y cómo apuntarse al grupo de Arduino.',
      } as const;
    }

    if (this.slug() === 'videojuegos') {
      return {
        category: 'Unity · C# · 12–16 años',
        heading: 'Desarrollo de Videojuegos',
        accent: 'con Unity',
        schedule: this.course()?.schedule ?? 'Martes · 19:00–20:30',
        price: this.course()?.price ?? '59 €',
        summary: '30 clases · 90 min · Martes 19:00–20:30 · Dic 2026 – Jun 2027',
        introTitle: 'Curso desde cero para crear videojuegos 2D',
        introText:
          'Cada semana construyen una parte funcional: movimiento, monedas, enemigos, menús, otras mecánicas 2D y, en junio, su proyecto final en el Santamaria Game Fest.',
        introNote: '',
        skills: this.unitySkills,
        areas: this.unityLearningAreas,
        areasText:
          'Unity 2D, C#, mecánicas de juego, acabado y un videojuego propio.',
        outcomes: this.unityOutcomes,
        curriculum: this.unityCurriculum,
        curriculumText:
          '30 sesiones en martes. En cada clase: qué crearás y qué aprenderás.',
        curriculumBadge: '30 clases · 90 min · Plan 2026–2027',
        ctaTitle: 'Convierte sus ideas en un videojuego',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de videojuegos con Unity.',
      } as const;
    }

    if (this.slug() === 'scratch') {
      return {
        category: 'Programación visual · 8–12 años',
        heading: 'Scratch: programación',
        accent: 'desde cero',
        schedule: this.course()?.schedule ?? 'Lunes · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '30 clases · 90 min · Lunes 17:30–19:00 · Dic 2026 – Jun 2027',
        introTitle: 'Cada semana vienen a crear, jugar y superar un reto',
        introText:
          'De diciembre de 2026 a junio de 2027: 30 sesiones de 90 minutos. No es teoría: es divertido, con aprendizaje real de lógica de programación y matrícula abierta todo el año gracias a proyectos mensuales independientes.',
        introNote:
          'Todos los lunes · 17:30–19:00 · Del 7 de diciembre de 2026 al 28 de junio de 2027. También en festivos locales y autonómicos (incluido el 29/03/2027). Guía flexible: si están enganchados creando, alargamos el proyecto.',
        skills: this.scratchSkills,
        areas: this.scratchLearningAreas,
        areasText:
          'Tres pilares del curso: diversión, lógica real y entrada posible cualquier mes.',
        rhythm: this.scratchRhythm,
        outcomes: this.scratchOutcomes,
        curriculum: this.scratchCurriculum,
        curriculumText:
          'Calendario completo de 30 clases, agrupadas en siete bloques mensuales. Cada bloque cierra con un proyecto jugable y un punto de entrada para alumnos nuevos.',
        curriculumBadge: '30 clases · 90 min · Plan 2026–2027',
        ctaTitle: 'Que empiece a crear su primer videojuego',
        ctaText:
          'Escríbenos y te explicamos plazas, cómo entrar a mitad de curso y cómo apuntarse al grupo de Scratch.',
      } as const;
    }

    if (this.slug() === 'ordenador-e-internet') {
      return {
        category: 'Competencia digital',
        heading: 'Primeros Pasos',
        accent: 'Digitales',
        schedule: this.course()?.schedule ?? 'Lunes · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '60 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'Una base digital para toda la vida',
        introText:
          'Una hora semanal, a los 7–9 años: ordenador, guardar un trabajo, buscar, un documento, una presentación y usar la nube o una IA con ayuda.',
        introNote:
          'Sin mecanografía como curso, sin programación y sin un proyecto multimedia aparte. Cada clase se practica, no se explica y se pasa al siguiente tema.',
        skills: this.digitalSkills,
        areas: this.learningAreas,
        areasText:
          'Ordenador, Internet, un trabajo digital y un cierre en junio. Al ritmo de una hora.',
        curriculum: this.curriculum,
        curriculumText:
          'Una hora a la semana. Junio cierra el documento o la presentación; no se empieza programación ni un trabajo nuevo.',
        curriculumBadge: '24 clases · 60 min · Un trabajo final',
        ctaTitle: 'Prepara su futuro digital desde hoy',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de Primeros Pasos Digitales.',
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
      this.title.setTitle(`${course.title} · Santamaria Club`);
    });
  }
}
