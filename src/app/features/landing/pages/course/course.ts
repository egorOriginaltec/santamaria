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
      text: 'Una hora da para un concepto y practicarlo. Primero el escenario, el personaje y que se mueva.',
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

  readonly securitySkills = [
    'Proteger cuentas con contraseña única y doble verificación',
    'Parar antes de pulsar: phishing, enlaces y perfiles raros',
    'Ajustar privacidad en el móvil y en redes',
    'Saber qué hacer si algo huele mal, y a quién pedirlo',
  ] as const;

  readonly securityLearningAreas = [
    {
      number: '01',
      title: 'Cuentas y dispositivos',
      text: 'Contraseñas, doble factor, bloqueo del móvil y recuperar el acceso.',
      tone: 'blue',
    },
    {
      number: '02',
      title: 'Engaños reales',
      text: 'Phishing, QR, tiendas falsas y mensajes que presionan.',
      tone: 'yellow',
    },
    {
      number: '03',
      title: 'Privacidad',
      text: 'Permisos, redes, huella digital y qué no se pega a una IA.',
      tone: 'pink',
    },
    {
      number: '04',
      title: 'Hábitos que se quedan',
      text: 'Un plan corto y práctico para casa, no un manual de empresa.',
      tone: 'green',
    },
  ] as const;

  readonly securityCurriculum = [
    {
      phase: 'Bloque 1',
      period: 'Diciembre – enero',
      title: 'Cerrar las cuentas',
      text: '90 minutos dan para un hábito y practicarlo. Empezamos por no perder el acceso.',
      topics: [
        'Cómo se pierde una cuenta de verdad',
        'Contraseñas únicas y un gestor sencillo',
        'Doble factor, bien puesto',
        'Actualizar y bloquear el móvil',
        'Recuperar el acceso sin improvisar',
      ],
    },
    {
      phase: 'Bloque 2',
      period: 'Febrero – marzo',
      title: 'Antes de pulsar',
      text: 'Analizamos mensajes reales (simulados) y decidimos qué hacer.',
      topics: [
        'Phishing en correo y WhatsApp',
        'Enlaces, archivos y códigos QR',
        'Tiendas y perfiles que no son lo que parecen',
        'La prisa como truco',
        'Práctica: parar, comprobar, preguntar',
      ],
    },
    {
      phase: 'Bloque 3',
      period: 'Abril – mayo',
      title: 'Privacidad en el día a día',
      text: 'Qué se comparte, con quién y cómo se deja de compartir.',
      topics: [
        'Datos y permisos del móvil',
        'Redes: visibilidad y etiquetas',
        'Huella digital que ya existe',
        'Ciberacoso y a quién pedirlo',
        'IA: qué no se pega nunca a un chat',
      ],
    },
    {
      phase: 'Bloque 4',
      period: 'Junio',
      title: 'Su plan de cinco hábitos',
      text: 'Junio cierra: revisamos cuentas y nos llevamos un plan corto, no un protocolo familiar de seis páginas.',
      topics: [
        'Revisión guiada de sus cuentas',
        'Copia de lo importante y cierre de sesiones',
        'Presentar cinco hábitos que va a mantener',
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
      text: 'Kodular se aprende haciendo una mini app, no recorriendo todos los componentes.',
      topics: [
        'Qué es una app y el entorno de Kodular',
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

    if (this.slug() === 'aplicaciones-moviles') {
      return {
        category: 'Kodular · Apps Android',
        heading: 'Desarrollo de Apps Móviles',
        accent: 'con Kodular',
        schedule: this.course()?.schedule ?? 'Jueves · 17:30–19:00',
        price: this.course()?.price ?? '59 €',
        summary: '90 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'De una idea a una app de 2 o 3 pantallas',
        introText:
          'Con Kodular se diseña, se programa con bloques y se prueba en un Android. El objetivo es una app pequeña con un uso claro, no cámara ni GPS.',
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
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de apps móviles.',
      } as const;
    }

    if (this.slug() === 'seguridad-digital') {
      return {
        category: 'Ciberseguridad práctica',
        heading: 'Seguridad Digital',
        accent: 'y Ciberseguridad',
        schedule: this.course()?.schedule ?? 'Martes · 19:00–20:30',
        price: this.course()?.price ?? '59 €',
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
          'Una clase de 90 minutos a la semana. En junio no hay temario nuevo: se revisan cuentas y se sale con cinco hábitos.',
        curriculumBadge: '24 clases · 90 min · Cinco hábitos finales',
        ctaTitle: 'Más autonomía digital, con menos riesgos',
        ctaText:
          'Escríbenos y te explicamos plazas, horario y cómo apuntarse al grupo de seguridad digital.',
      } as const;
    }

    if (this.slug() === 'videojuegos') {
      return {
        category: 'Unity y C#',
        heading: 'Desarrollo de Videojuegos',
        accent: 'con Unity',
        schedule: this.course()?.schedule ?? 'Martes · 17:30–19:00',
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
        schedule: this.course()?.schedule ?? 'Lunes · 17:30–18:30',
        price: this.course()?.price ?? '49 €',
        summary: '60 min por semana · Máximo 10 alumnos · Online y en directo',
        introTitle: 'De jugar a crear sus propios videojuegos',
        introText:
          'En 60 minutos semanales cabe un concepto y practicarlo: mover, repetir, decidir y un juego corto con marcador.',
        introNote:
          'No hay varios niveles ni un segundo juego en junio. El profesor programa con el grupo y cada alumno termina el suyo.',
        skills: this.scratchSkills,
        areas: this.scratchLearningAreas,
        areasText:
          'Bloques, un personaje controlado y un juego corto que se puede enseñar.',
        curriculum: this.scratchCurriculum,
        curriculumText:
          'Una hora a la semana. El juego se monta en abril–mayo; junio es dejarlo jugable y presentarlo.',
        curriculumBadge: '24 clases · 60 min · Un juego corto',
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
        schedule: this.course()?.schedule ?? 'Miércoles · 17:30–18:30',
        price: this.course()?.price ?? '49 €',
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
