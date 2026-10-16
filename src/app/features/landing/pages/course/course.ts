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
    'Ordenar instrucciones: secuencia, evento, bucle y condición',
    'Mover un personaje, cambiar disfraz y reaccionar al teclado',
    'Montar un juego corto con un objetivo y un marcador',
    'Probarlo, arreglar lo que falla y enseñarlo',
  ] as const;

  readonly scratchLearningAreas = [
    {
      number: '01',
      title: 'Pensamiento computacional',
      text: 'Descomponer un problema pequeño y ordenar los bloques de uno en uno.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Programación por bloques',
      text: 'Eventos, movimiento, bucles, condiciones y un marcador sencillo.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Un juego con reglas',
      text: 'Un objetivo claro, ganar o perder, y un personaje controlado por el alumno.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto propio',
      text: 'Terminar un juego corto, probarlo y presentarlo a la clase.',
      tone: 'green',
    },
  ] as const;

  readonly scratchCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Mover y animar',
      text: 'Noventa minutos dan para un concepto y practicarlo. Primero el escenario, el personaje y que se mueva.',
      topics: [
        'Objetos, disfraces y escenario',
        'Mover, girar y cambiar de aspecto',
        'Eventos: clic y teclas',
        'Una animación corta que se entiende',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Que el juego responda',
      text: 'Añadimos bucles, condiciones y teclado para que el proyecto reaccione.',
      topics: [
        'Repetir acciones con bucles',
        'Si toca, si tecla, si llega al borde',
        'Controlar un personaje',
        'Un marcador de puntos sencillo',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Un juego con inicio y final',
      text: 'Montamos un solo juego corto —laberinto, recoger objetos o evitar obstáculos— y lo dejamos jugable.',
      topics: [
        'Objetivo: ganar y perder',
        'Un obstáculo o un segundo objeto',
        'Probarlo y arreglar lo que no funciona',
        'Pantalla de inicio o de final',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Cerrar el juego',
      text: 'Junio no da para un juego nuevo: pulimos el de mayo y lo presentamos.',
      topics: [
        'Dejar el juego jugable de principio a fin',
        'Presentarlo a la clase',
      ],
    },
  ] as const;

  readonly unitySkills = [
    'Moverse por el editor de Unity y montar una escena 2D',
    'Escribir scripts cortos de C# para mover, chocar y contar puntos',
    'Dejar un nivel jugable con un objetivo claro',
    'Probar, pulir y enseñar una versión que se puede jugar',
  ] as const;

  readonly unityLearningAreas = [
    {
      number: '01',
      title: 'Entorno Unity 2D',
      text: 'Escena, objetos, componentes y un escenario que se entiende.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'C# justo el necesario',
      text: 'Scripts cortos: mover, detectar un choque y sumar puntos.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Un nivel jugable',
      text: 'Un reto, un obstáculo y un final. No una campaña de varios mundos.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Versión para enseñar',
      text: 'Probar, corregir lo que rompe y exportar una build jugable.',
      tone: 'green',
    },
  ] as const;

  readonly unityCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'El editor y una escena 2D',
      text: '90 minutos dan para un tema y practicarlo. Unity 2D, sin 3D ni sistemas avanzados.',
      topics: [
        'Proyecto 2D e interfaz del editor',
        'Objetos, sprites y componentes',
        'Colocar el escenario y la cámara',
        'Colliders y física sencilla',
        'Una escena en la que ya se puede “jugar” un poco',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Mover, chocar y contar',
      text: 'C# solo para lo que el juego necesita: teclado, colisión y puntuación.',
      topics: [
        'Qué es un script y dónde se engancha',
        'Mover el personaje con teclado',
        'Recoger o chocar con un objeto',
        'Mostrar los puntos en pantalla',
        'Leer el error y corregirlo',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Un nivel de principio a fin',
      text: 'Un solo nivel con inicio, reto y final. Sin partículas, sin varios mundos.',
      topics: [
        'Diseñar un reto que se acaba en unos minutos',
        'Un obstáculo o un enemigo muy simple',
        'Sonido al recoger o al chocar',
        'Una pantalla de inicio básica',
        'Dejar el juego jugable entero',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Cerrar y enseñar',
      text: 'Junio son dos o tres clases: pulir, exportar y presentar. No se empieza un juego nuevo.',
      topics: [
        'Probar con compañeros y corregir lo que rompe',
        'Exportar una versión para enseñar',
        'Presentación del juego',
      ],
    },
  ] as const;

  readonly mobileSkills = [
    'Diseñar 2 o 3 pantallas claras y pasar de una a otra',
    'Programar clics, condiciones y un dato que se recuerda',
    'Hacer una app con un uso concreto, no un catálogo de sensores',
    'Probarla en un Android y, si el grupo llega, instalarla',
  ] as const;

  readonly mobileLearningAreas = [
    {
      number: '01',
      title: 'Pantallas',
      text: 'Botones, textos, imágenes y navegación entre 2 o 3 pantallas.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Lógica con bloques',
      text: 'Eventos, variables, condiciones y una lista o un contador.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Una app con sentido',
      text: 'Quiz, lista, ficha o marcador. Cámara y GPS se dejan fuera.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Probar en el móvil',
      text: 'Ensayo en un Android, arreglar lo confuso y generar el APK si hay tiempo.',
      tone: 'green',
    },
  ] as const;

  readonly mobileCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Pantallas que responden',
      text: 'Se aprende haciendo una mini app, no recorriendo todos los componentes.',
      topics: [
        'Qué es una app y el entorno de diseño',
        'Una pantalla: botones, textos e imágenes',
        'Ir de una pantalla a otra',
        'Responder a un clic',
        'Mini app: bienvenida + una acción',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Que recuerde algo',
      text: 'Variables, decisiones y guardar un dato. Sin procedimientos ni bases de datos.',
      topics: [
        'Variables y un contador',
        'Si… entonces',
        'Una lista corta o un quiz de 3 preguntas',
        'Guardar un nombre o una puntuación',
        'Que el usuario no se pierda',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Su app, de 2 o 3 pantallas',
      text: 'El proyecto empieza aquí, no en junio. Un flujo claro y un uso concreto.',
      topics: [
        'Para quién es y qué problema resuelve',
        'Boceto de 2 o 3 pantallas',
        'Montar el flujo entero',
        'Probarlo en un Android',
        'Arreglar lo que no se entiende',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Cerrar e instalar',
      text: 'Junio cierra la app de mayo. Si el grupo llega, se genera el APK.',
      topics: [
        'Últimas pruebas en el móvil',
        'Generar e instalar el APK',
        'Presentar la app',
      ],
    },
  ] as const;

  readonly arduinoSkills = [
    'Montar circuitos básicos con LEDs, resistencias y pulsadores',
    'Programar la placa y leer sensores (luz, temperatura, distancia)',
    'Automatizar un invento con servo, alarma o barrera',
    'Diseñar, probar y presentar un proyecto final propio',
  ] as const;

  readonly arduinoLearningAreas = [
    {
      number: '01',
      title: 'Electrónica básica',
      text: 'Placa, protoboard, LEDs, resistencias y primeros circuitos seguros.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Programación interactiva',
      text: 'Condicionales, bucles, botones, zumbador y patrones de luces.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Sensores y movimiento',
      text: 'Luz, temperatura, distancia y un servo para automatizar.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Inventos propios',
      text: 'Un sistema completo que combina sensores, actuadores y código.',
      tone: 'green',
    },
  ] as const;

  readonly arduinoCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre',
      title: 'Fundamentos y primeros circuitos',
      text: 'Conocer la placa, instalar el entorno y encender los primeros LEDs con seguridad.',
      topics: [
        'Qué es Arduino y cómo se conecta al PC',
        'Protoboard, resistencias y LEDs',
        'Salidas digitales y un semáforo',
        'Pulsadores como entrada',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Enero',
      title: 'Programación interactiva',
      text: 'Condicionales, bucles y un juego de reacción con luces y sonido.',
      topics: [
        'If, bucles y tiempos',
        'Botones, zumbador y patrones de luces',
        'Un juego de reacción medible',
        'Depurar cuando el circuito no responde',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Febrero',
      title: 'Sensores y mediciones',
      text: 'Leer el entorno: luz, temperatura y el monitor serie.',
      topics: [
        'Valores analógicos y potenciómetro',
        'Fotoresistencia (LDR)',
        'Sensor de temperatura',
        'Mostrar resultados por el monitor serie',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Marzo – abril',
      title: 'Automatización y movimiento',
      text: 'Distancia, servo, alarmas y pequeñas máquinas automáticas.',
      topics: [
        'Sensor ultrasónico HC-SR04',
        'Servomotor SG90',
        'Alarmas y barreras automáticas',
        'Un invento que reacciona solo',
      ],
    },
    {
      phase: 'Bloque 5',
      period: 'Abril – mayo',
      title: 'Proyectos combinados',
      text: 'Integrar sensores, actuadores y código en un sistema completo.',
      topics: [
        'Elegir el invento y el flujo',
        'Montar el circuito completo',
        'Programar la lógica del sistema',
        'Probar y corregir fallos',
      ],
    },
    {
      phase: 'Bloque 6',
      period: 'Mayo – junio',
      title: 'Proyecto final',
      text: 'Cada alumno diseña, construye, prueba y presenta su propio invento.',
      topics: [
        'Diseño final del invento',
        'Construcción y pruebas',
        'Ajustes y presentación al grupo',
      ],
    },
  ] as const;

  readonly robloxSkills = [
    'Montar un mundo jugable en Roblox Studio',
    'Programar mecánicas con Luau: monedas, checkpoints y puntuación',
    'Diseñar niveles y reglas claras para otros jugadores',
    'Publicar una experiencia propia para compartir',
  ] as const;

  readonly robloxLearningAreas = [
    {
      number: '01',
      title: 'Roblox Studio',
      text: 'Editor, partes, spawn y un primer mundo que se puede recorrer.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Luau básico',
      text: 'Scripts cortos: tocar, sumar puntos y guardar un progreso simple.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Mecánicas de juego',
      text: 'Monedas, checkpoints, puntuación y un reto por nivel.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Publicar y enseñar',
      text: 'Probar con compañeros, pulir y dejar la experiencia lista para compartir.',
      tone: 'green',
    },
  ] as const;

  readonly robloxCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'El primer mundo',
      text: 'Conocer Studio y dejar un mapa pequeño recorrible.',
      topics: [
        'Instalar Studio y moverse por el editor',
        'Partes, spawn y un camino básico',
        'Obstáculos simples',
        'Probar el juego en Studio',
        'Guardar y organizar el proyecto',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Luau que se nota',
      text: 'Scripts cortos ligados a lo que el jugador hace.',
      topics: [
        'Un script al tocar una parte',
        'Sumar monedas o puntos',
        'Un checkpoint que recuerda el progreso',
        'Mensajes en pantalla',
        'Corregir errores típicos de Luau',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Su juego con mecánicas',
      text: 'Niveles, recompensas y reglas propias.',
      topics: [
        'Diseñar 2 o 3 tramos o niveles',
        'Monedas, puntuación y un objetivo claro',
        'Una mecánica personalizada del alumno',
        'Equilibrar dificultad',
        'Probar con compañeros',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Publicar y presentar',
      text: 'Cerrar, publicar y enseñar el juego.',
      topics: [
        'Pulir bugs que rompen la partida',
        'Publicar la experiencia',
        'Presentación al grupo',
      ],
    },
  ] as const;

  readonly pythonAdvancedSkills = [
    'Organizar un proyecto Python con clases y módulos claros',
    'Consumir una API y guardar datos con persistencia básica',
    'Automatizar tareas útiles sin depender de IA',
    'Entregar una aplicación funcional propia',
  ] as const;

  readonly pythonAdvancedLearningAreas = [
    {
      number: '01',
      title: 'Proyectos reales',
      text: 'Estructura de carpetas, clases y código que se puede mantener.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'APIs y datos',
      text: 'Pedir datos a un servicio externo y entender la respuesta.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Persistencia',
      text: 'Guardar información en archivo o base de datos sencilla.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'App final',
      text: 'Una herramienta útil: no un notebook suelto ni un curso de IA.',
      tone: 'green',
    },
  ] as const;

  readonly pythonAdvancedCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Ordenar el código',
      text: 'De scripts sueltos a un proyecto con clases y funciones claras.',
      topics: [
        'Repaso rápido de bases (if, bucles, funciones, listas)',
        'Clases y objetos con un ejemplo pequeño',
        'Módulos y estructura de proyecto',
        'Errores y pruebas mínimas',
        'Elegir la idea del proyecto final',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'APIs y servicios',
      text: 'Conectar Python con el exterior sin complicar de más.',
      topics: [
        'Peticiones HTTP y JSON',
        'Una API pública o de práctica',
        'Manejar fallos de red',
        'Guardar resultados',
        'Integrar la API en el proyecto',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Datos y automatización',
      text: 'Persistencia y herramientas útiles del día a día.',
      topics: [
        'Archivos o SQLite según el proyecto',
        'CRUD básico',
        'Una automatización concreta (archivos, datos, informes)',
        'Buenas prácticas sin overengineering',
        'Cerrar el núcleo de la app',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Entregar la app',
      text: 'Pulir, documentar en corto y presentar.',
      topics: [
        'Pulir bugs y casos límite',
        'README corto de uso',
        'Presentación de la aplicación',
      ],
    },
  ] as const;

  readonly pythonSkills = [
    'Escribir programas cortos con variables, print e input',
    'Tomar decisiones y repetir con if, for y while',
    'Usar funciones y listas para no repetir código',
    'Cerrar un programa propio: quiz, calculadora o juego de texto',
  ] as const;

  readonly pythonLearningAreas = [
    {
      number: '01',
      title: 'Hablar Python',
      text: 'Editor, primer programa, variables y pedir datos al usuario.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Lógica',
      text: 'If, bucles y funciones pequeñas. Sin teoría de ámbito.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Listas y un programa más largo',
      text: 'Guardar varios datos y recorrerlos. Archivos y módulos se dejan fuera.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Proyecto por consola',
      text: 'Un quiz, una agenda simple o un juego de texto que se puede enseñar.',
      tone: 'green',
    },
  ] as const;

  readonly pythonCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'El primer programa',
      text: '90 minutos: un concepto, un ejercicio, que funcione. Sin prisas con tipos ni validación fina.',
      topics: [
        'Editor y primer print',
        'Variables y operaciones',
        'input: preguntar al usuario',
        'Leer el error rojo y corregirlo',
        'Un programa corto que calcula o saluda',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Decidir y repetir',
      text: 'If, bucles y una función. El menú por consola llega al final del bloque.',
      topics: [
        'if, elif y else',
        'for y while, con un ejemplo cada uno',
        'Una función que recibe un dato',
        'Un menú de 3 opciones',
        'Depurar con prints, no con un depurador',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Listas y el proyecto',
      text: 'El proyecto empieza aquí: quiz, agenda o juego de texto. Sin archivos ni librerías extra.',
      topics: [
        'Listas: guardar, recorrer, buscar',
        'Elegir el programa y recortar el alcance',
        'Montarlo a trozos, función a función',
        'Probar casos raros (vacío, mal escrito)',
        'Dejar una versión que se puede ejecutar entera',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Cerrar el programa',
      text: 'Junio pulimos el de mayo. No se abre un segundo proyecto.',
      topics: [
        'Arreglar lo que aún falla',
        'Un comentario breve de qué hace',
        'Demostración en clase',
      ],
    },
  ] as const;

  readonly aiSkills = [
    'Pedir a un modelo una tarea clara y comprobar si la respuesta vale',
    'Ver un JSON y entender que dos programas se hablan con datos',
    'Montar en n8n un flujo corto: entra un texto, sale un resultado',
    'Conectar un nodo de IA y dejar el flujo documentado y supervisado',
  ] as const;

  readonly aiLearningAreas = [
    {
      number: '01',
      title: 'Usar IA con criterio',
      text: 'Qué puede un modelo, cómo se pide y cómo se verifica.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Cómo se conectan programas',
      text: 'Una petición, un JSON y una clave que no se comparte. Sin curso de HTTP.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'n8n en la práctica',
      text: 'Un flujo de 3 o 4 nodos, una condición y un nodo de IA.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Una automatización útil',
      text: 'Resumir, clasificar o avisar. Con el profesor mirando las claves.',
      tone: 'green',
    },
  ] as const;

  readonly aiCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Usar la IA, no creérsela',
      text: 'Antes de APIs y n8n: entender el modelo, pedir bien y comprobar.',
      topics: [
        'Qué es un modelo y qué no hace',
        'Prompt: tarea, contexto y formato',
        'Cuando inventa: cómo se pilla',
        'Privacidad: datos que no se pegan',
        'Un trabajo asistido: esquema o resumen',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Datos que viajan',
      text: 'La idea de API, vista en un ejemplo. No un temario de GET, POST y cabeceras.',
      topics: [
        'Dos programas que se hablan',
        'JSON: una caja de datos con nombre',
        'Una petición de ejemplo, en directo',
        'La clave se guarda, no se enseña',
        'Probar una herramienta conectada',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Un flujo en n8n',
      text: 'El proyecto es un flujo de 3 o 4 nodos. Sin webhooks ni cron si no hacen falta.',
      topics: [
        'Nodos, cables y un disparo manual',
        'Entra un texto, se transforma, sale otro',
        'Una condición: si pasa X, entonces Y',
        'Un nodo de IA en el medio',
        'Un uso concreto: resumir, clasificar o avisar',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Dejarlo estable',
      text: 'Junio no abre un segundo flujo: se prueba, se explica y se deja supervisado.',
      topics: [
        'Probar casos raros y frenar si falla',
        'Escribir en dos frases qué hace y qué no',
        'Demostración del flujo',
      ],
    },
  ] as const;

  readonly webSkills = [
    'Montar una página con HTML claro: títulos, textos, enlaces e imágenes',
    'Dar estilo con CSS y alinear secciones con Flexbox',
    'Hacer que se lea bien en el móvil',
    'Usar Tailwind como atajo al final y publicar una landing',
  ] as const;

  readonly webLearningAreas = [
    {
      number: '01',
      title: 'HTML',
      text: 'Estructura, textos, enlaces e imágenes. Una o dos páginas, no un site.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'CSS y Flexbox',
      text: 'Color, tipo, espaciado y una cabecera con secciones. Grid se deja fuera.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Móvil y Tailwind',
      text: 'Que no se rompa en el teléfono, y Tailwind para ir más rápido sobre lo ya hecho.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Publicar',
      text: 'Una landing en Internet, lista para enseñar. No un portfolio de diez páginas.',
      tone: 'green',
    },
  ] as const;

  readonly webCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'HTML que se entiende',
      text: 'Escribimos el contenido a mano. Sin constructores y sin CSS todavía.',
      topics: [
        'Qué hay detrás de una URL',
        'Etiquetas y una página en blanco',
        'Títulos, párrafos, listas y enlaces',
        'Imágenes y rutas que no se rompen',
        '1 o 2 páginas enlazadas entre sí',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'CSS para que se vea bien',
      text: 'Una landing con aspecto cuidado. Flexbox sí; Grid y teoría de cascada, no.',
      topics: [
        'Color, fuente y espaciado',
        'Caja: margen, borde y padding',
        'Flexbox en cabecera y secciones',
        'Un botón y una tarjeta',
        'La misma página, ya con cara',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Móvil y primeros Tailwind',
      text: 'No es un curso de Tailwind: es la misma web, que se lea en el móvil, y atajos al final.',
      topics: [
        'Que se lea en el teléfono',
        'Ajustar lo que se rompe',
        'Tailwind: utilidades sobre lo ya hecho',
        'Hover en botones y enlaces',
        'Dejar la landing cerrada en local',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Publicar y enseñar',
      text: 'Junio publica la landing de mayo. No se diseña un site nuevo.',
      topics: [
        'Revisar enlaces e imágenes',
        'Subirla y comprobar el enlace',
        'Presentar la web',
      ],
    },
  ] as const;

  readonly pageContent = computed(() => {
    if (this.slug() === 'paginas-web') {
      return {
        category: 'HTML · CSS · Tailwind',
        heading: 'Desarrollo Web',
        accent: 'desde Cero',
        schedule: this.course()?.schedule ?? 'Viernes · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'Tu primera web, diseñada y programada por ti',
        introText:
          'En 90 minutos semanales se construye una landing: HTML a mano, CSS con Flexbox, que se lea en el móvil y Tailwind como atajo al final.',
        introNote:
          'No hay constructores ni un site de diez páginas. Cada alumno escribe el código y publica una página que puede enseñar.',
        skills: this.webSkills,
        areas: this.webLearningAreas,
        areasText:
          'HTML, CSS y un primer contacto con Tailwind. Lo justo para una landing publicada, no un temario de front-end.',
        curriculum: this.webCurriculum,
        curriculumText:
          'Una clase de 90 minutos a la semana. Junio se usa para publicar y presentar, no para empezar una web nueva.',
        curriculumBadge: '24 clases · 90 min · Una landing publicada',
        ctaTitle: 'Empieza a construir para la web',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de desarrollo web.',
      } as const;
    }

    if (this.slug() === 'inteligencia-artificial') {
      return {
        category: 'IA · APIs · n8n',
        heading: 'Inteligencia Artificial',
        accent: 'y Automatización',
        schedule: this.course()?.schedule ?? 'Miércoles · 19:00–20:30',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'De utilizar la IA a conectarla con herramientas reales',
        introText:
          'Primero se usa un modelo con criterio. Después se ve cómo viajan los datos y se monta en n8n un flujo corto con un nodo de IA.',
        introNote:
          'No es un curso de HTTP ni de n8n a fondo. Un flujo de 3 o 4 nodos, con el profesor vigilando las claves.',
        skills: this.aiSkills,
        areas: this.aiLearningAreas,
        areasText:
          'De pedir bien a un modelo a dejar un flujo en n8n que hace una tarea concreta.',
        curriculum: this.aiCurriculum,
        curriculumText:
          'Una clase de 90 minutos a la semana. El flujo se monta en abril–mayo y en junio se deja estable.',
        curriculumBadge: '24 clases · 90 min · Un flujo con IA',
        ctaTitle: 'Aprende a conectar ideas, datos e inteligencia artificial',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de IA y automatización.',
      } as const;
    }

    if (this.slug() === 'python') {
      return {
        category: 'Código real · Python',
        heading: 'Programación',
        accent: 'con Python',
        schedule: this.course()?.schedule ?? 'Lunes · 19:00–20:30',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'El paso de los bloques al código real',
        introText:
          'Python se aprende escribiendo programas cortos: variables, if, bucles, funciones y listas. El proyecto es un quiz, una agenda o un juego de texto.',
        introNote:
          'Sin archivos, sin módulos extra y sin un segundo proyecto en junio. Se programa en directo desde el primer día.',
        skills: this.pythonSkills,
        areas: this.pythonLearningAreas,
        areasText:
          'Lo que cabe en 90 minutos semanales: sintaxis, lógica, listas y un programa por consola.',
        curriculum: this.pythonCurriculum,
        curriculumText:
          'Una clase de 90 minutos a la semana. El programa se empieza en abril–mayo y en junio se demuestra.',
        curriculumBadge: '24 clases · 90 min · Un programa propio',
        ctaTitle: 'Empieza a escribir código de verdad',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de Python.',
      } as const;
    }

    if (this.slug() === 'python-avanzado') {
      return {
        category: 'Python · proyectos reales',
        heading: 'Python avanzado:',
        accent: 'crea proyectos reales',
        schedule: this.course()?.schedule ?? 'Jueves · 19:00–20:30',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'El siguiente paso cuando ya sabes programar',
        introText:
          'Para quien ya maneja variables, if, bucles, funciones y listas. Se trabaja OOP, APIs, persistencia y automatizaciones, cerrando con una aplicación funcional.',
        introNote:
          'No es un curso de IA (eso va en el grupo de IA y automatización). Requisito de entrada: bases de Python. Si hay duda, escríbenos y te orientamos.',
        skills: this.pythonAdvancedSkills,
        areas: this.pythonAdvancedLearningAreas,
        areasText:
          'Proyectos ordenados, APIs, datos y una app útil — continuidad tras Python inicial.',
        curriculum: this.pythonAdvancedCurriculum,
        curriculumText:
          'Una clase de 90 minutos a la semana. El núcleo de la app se monta en primavera; junio es entregar y presentar.',
        curriculumBadge: '24 clases · 90 min · App funcional',
        ctaTitle: 'Sigue con Python de verdad',
        ctaText:
          'Escríbenos y te explicamos plazas, requisito de entrada y cómo apuntarse a Python avanzado.',
      } as const;
    }

    if (this.slug() === 'roblox') {
      return {
        category: 'Roblox Studio · Luau',
        heading: 'Crea tus propios',
        accent: 'videojuegos con Roblox Studio',
        schedule: this.course()?.schedule ?? 'Martes · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'Un juego propio que se puede compartir',
        introText:
          'En Roblox Studio crean un juego con niveles, monedas, checkpoints, puntuación y mecánicas personalizadas. El resultado lo entienden al momento: su mundo, jugable y publicable.',
        introNote:
          'No hace falta haber tocado Studio antes. Se aprende Luau con scripts cortos ligados al juego, no un temario de motor a fondo.',
        skills: this.robloxSkills,
        areas: this.robloxLearningAreas,
        areasText:
          'Studio, Luau, mecánicas de juego y una experiencia publicada.',
        curriculum: this.robloxCurriculum,
        curriculumText:
          'Una clase de 90 minutos a la semana. El juego se monta en primavera; junio es publicar y presentar.',
        curriculumBadge: '24 clases · 90 min · Experiencia publicada',
        ctaTitle: 'Que cree su propio juego en Roblox Studio',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de Roblox Studio.',
      } as const;
    }

    if (this.slug() === 'aplicaciones-moviles') {
      return {
        category: 'Apps Android',
        heading: 'Crea tus propias',
        accent: 'aplicaciones móviles',
        schedule: this.course()?.schedule ?? 'Jueves · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'De una idea a una app de 2 o 3 pantallas',
        introText:
          'Se diseña, se programa con bloques y se prueba en un Android. El objetivo es una app pequeña con un uso claro, no cámara ni GPS.',
        introNote:
          'El proyecto son 2 o 3 pantallas. Si el grupo llega, se instala el APK. No se copia una app ni se recorre todo el catálogo de componentes.',
        skills: this.mobileSkills,
        areas: this.mobileLearningAreas,
        areasText:
          'Pantallas, lógica con bloques y una app pequeña que se prueba en el móvil.',
        curriculum: this.mobileCurriculum,
        curriculumText:
          'Una clase de 90 minutos a la semana. La app se monta en abril–mayo; junio es probar, instalar y presentar.',
        curriculumBadge: '24 clases · 90 min · App de 2–3 pantallas',
        ctaTitle: 'Su primera app puede empezar hoy',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de aplicaciones móviles.',
      } as const;
    }

    if (this.slug() === 'robotica-arduino') {
      return {
        category: 'Arduino UNO',
        heading: 'Robótica y Programación',
        accent: 'con Arduino',
        schedule: this.course()?.schedule ?? 'Miércoles · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'Inventos, sensores y automatización desde casa',
        introText:
          'Construye tus propios inventos, programa sensores y crea sistemas automáticos. Aprende electrónica y programación con proyectos prácticos en directo.',
        introNote:
          'No prometemos solo robots móviles: el curso cubre inventos, sensores y automatización. Cada familia usa el mismo kit (placa compatible UNO, protoboard y sensores). Lista de materiales al apuntarse.',
        skills: this.arduinoSkills,
        areas: this.arduinoLearningAreas,
        areasText:
          'Circuitos, programación, sensores y un invento final que se puede enseñar.',
        curriculum: this.arduinoCurriculum,
        curriculumText:
          '24 clases de 90 minutos de diciembre a junio. El invento final se cierra en mayo–junio.',
        curriculumBadge: '24 clases · 90 min · Invento final',
        ctaTitle: 'Empieza a construir y programar',
        ctaText:
          'Escríbenos y te explicamos plazas, horario, kit de materiales y cómo apuntarse al grupo de Arduino.',
      } as const;
    }

    if (this.slug() === 'videojuegos') {
      return {
        category: 'Unity y C#',
        heading: 'Desarrollo de Videojuegos',
        accent: 'con Unity',
        schedule: this.course()?.schedule ?? 'Martes · 19:00–20:30',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'Un videojuego 2D que se puede jugar',
        introText:
          'Unity 2D, scripts cortos de C# y un solo nivel: mover, chocar y contar puntos. Cabe en 90 minutos semanales.',
        introNote:
          'No hay 3D, ni varios mundos, ni un motor a fondo. Cada alumno trabaja su nivel con el profesor en directo.',
        skills: this.unitySkills,
        areas: this.unityLearningAreas,
        areasText:
          'Editor 2D, C# justo el necesario y un nivel jugable para enseñar.',
        curriculum: this.unityCurriculum,
        curriculumText:
          'Una clase de 90 minutos a la semana. El nivel se cierra en mayo; junio es probar, exportar y presentar.',
        curriculumBadge: '24 clases · 90 min · Un nivel jugable',
        ctaTitle: 'Convierte sus ideas en un videojuego',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de videojuegos con Unity.',
      } as const;
    }

    if (this.slug() === 'scratch') {
      return {
        category: 'Programación visual',
        heading: 'Programación con',
        accent: 'Scratch',
        schedule: this.course()?.schedule ?? 'Lunes · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'De jugar a crear sus propios videojuegos',
        introText:
          'En 90 minutos semanales cabe un concepto y practicarlo: mover, repetir, decidir y un juego corto con marcador.',
        introNote:
          'No hay varios niveles ni un segundo juego en junio. El profesor programa con el grupo y cada alumno termina el suyo.',
        skills: this.scratchSkills,
        areas: this.scratchLearningAreas,
        areasText:
          'Bloques, un personaje controlado y un juego corto que se puede enseñar.',
        curriculum: this.scratchCurriculum,
        curriculumText:
          'Una clase de 90 minutos a la semana. El juego se monta en abril–mayo; junio es dejarlo jugable y presentarlo.',
        curriculumBadge: '24 clases · 90 min · Un juego corto',
        ctaTitle: 'Su primera creación empieza aquí',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de Scratch.',
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
