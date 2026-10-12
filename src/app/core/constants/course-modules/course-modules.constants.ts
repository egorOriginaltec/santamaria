import type {
  CourseModule,
  ProjectSummary,
} from '../../models/course-module/course-module.model';

export const COURSE_MODULES: readonly CourseModule[] = [
  {
    id: 1,
    title: 'Tu primera web profesional — online y lista para enseñar',
    weeks: '1',
    daysRange: '1–5',
    hours: '20 h',
    projectsCount: 1,
    learning:
      'Aprenderás a crear webs profesionales desde cero, pasando por HTML, CSS, Tailwind, diseño responsive y publicación con Git y GitHub.',
    objective:
      'Crear y publicar una web profesional para un negocio real o ficticio, como una peluquería, un restaurante o una agencia.',
    projectStartNote:
      'Cuándo empieza el proyecto: día 3. Los días 1 y 2 se utilizan para aprender los fundamentos y hacer ejercicios cortos. Desde el día 3 se construye la web definitiva y se sigue trabajando sobre ella hasta publicarla el día 5.',
    technologies: ['HTML', 'CSS', 'Tailwind CSS', 'Git', 'GitHub'],
    projects: [
      {
        name: 'Web profesional',
        summary:
          'Web para un negocio con secciones, diseño responsive y publicación online.',
        startDay: 3,
        developmentDays: '3–5',
        hours: '12 h',
      },
    ],
    deliverable:
      'Una web con presentación, servicios, llamada a la acción y formulario de contacto, publicada y lista para enseñar.',
    classes: [
      {
        day: 1,
        classNumber: 1,
        title: 'Aprender los fundamentos de HTML',
        contents: [
          'Qué es una web y cómo funciona el navegador',
          'Estructura de archivos y etiquetas HTML',
          'Títulos, párrafos, imágenes, enlaces y secciones',
          'Primeros ejercicios cortos creando fragmentos de una web',
        ],
        result:
          'Una página de práctica sencilla, todavía sin empezar el proyecto definitivo.',
      },
      {
        day: 2,
        classNumber: 2,
        title: 'Aprender CSS y diseño responsive',
        contents: [
          'Colores, tipografías, márgenes y espaciado',
          'Flexbox, rejillas y organización visual',
          'Introducción a Tailwind CSS',
          'Ejercicios de diseño de botones, tarjetas y columnas',
        ],
        result:
          'Pequeños componentes visuales que se utilizarán en la web definitiva.',
      },
      {
        day: 3,
        classNumber: 3,
        title: 'Construir la estructura de la web profesional',
        isProjectStart: true,
        contents: [
          'Elegir el negocio y definir sus secciones',
          'Crear cabecera, presentación, servicios y contacto',
          'Aplicar los primeros estilos y organizar los archivos',
          'Empezar a adaptar la estructura a móvil',
        ],
        result:
          'Primera versión real de la web, con sus secciones principales.',
      },
      {
        day: 4,
        classNumber: 4,
        title: 'Completar el diseño y las interacciones',
        contents: [
          'Terminar el diseño de las secciones',
          'Mejorar la versión móvil',
          'Añadir enlaces, botones y formulario visual',
          'Revisar imágenes, espaciados y errores',
        ],
        result:
          'Web completa a nivel visual, preparada para su revisión final.',
      },
      {
        day: 5,
        classNumber: 5,
        title: 'Publicar y presentar la web',
        contents: [
          'Introducción a Git y GitHub',
          'Subir el código y guardar los cambios',
          'Publicar la web',
          'Comprobar enlaces, versión móvil y funcionamiento',
        ],
        result: 'Primera web publicada y disponible para enseñar.',
      },
    ],
  },
  {
    id: 2,
    title: 'Tu propio Google Maps — explora la ciudad',
    weeks: '2–3',
    daysRange: '6–15',
    hours: '40 h',
    projectsCount: 1,
    learning:
      'Aprenderás a programar con JavaScript y a construir tu propio mapa de ciudad: listados, filtros, favoritos y un mapa interactivo con Leaflet.',
    objective:
      'Una guía interactiva de una ciudad, con mapa, marcadores, lugares de interés, filtros y favoritos.',
    projectStartNote:
      'Cuándo empieza el proyecto: día 7. El día 6 se aprende JavaScript con ejercicios pequeños. El día 7 se empieza a construir el mapa urbano y, desde ese momento, los conceptos nuevos se incorporan a la misma aplicación.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Leaflet', 'OpenStreetMap'],
    projects: [
      {
        name: 'Mapa urbano interactivo',
        summary:
          'Guía de ciudad con mapa, filtros, fichas y favoritos.',
        startDay: 7,
        developmentDays: '7–15',
        hours: '36 h',
      },
    ],
    deliverable:
      'Aplicación publicada con mapa navegable, buscador, categorías, fichas de lugares y favoritos persistentes.',
    classes: [
      {
        day: 6,
        classNumber: 1,
        title: 'Aprender JavaScript',
        contents: [
          'Variables, funciones, condiciones, arrays y objetos',
          'Ejercicios breves para representar lugares con nombre, categoría, descripción y coordenadas',
        ],
        result: 'Base de JavaScript y datos de práctica.',
      },
      {
        day: 7,
        classNumber: 2,
        title: 'Crear el mapa urbano',
        isProjectStart: true,
        contents: [
          'Preparar el diseño, la estructura de archivos y la lista inicial de lugares',
          'Aprender a generar tarjetas con JavaScript y a mostrar datos dinámicamente',
        ],
        result: 'Primera versión del listado de lugares de la ciudad.',
      },
      {
        day: 8,
        classNumber: 3,
        title: 'Programar el buscador',
        contents: [
          'Aprender eventos, DOM y filtrado de arrays',
          'Añadir búsqueda por nombre y filtros por tipo de lugar',
        ],
        result:
          'Buscador y categorías funcionando sobre los datos de la aplicación.',
      },
      {
        day: 9,
        classNumber: 4,
        title: 'Incorporar el mapa',
        contents: [
          'Aprender qué son las coordenadas geográficas',
          'Utilizar Leaflet y OpenStreetMap',
          'Mostrar el mapa de una zona y añadir marcadores',
        ],
        result: 'Mapa navegable con los primeros lugares señalados.',
      },
      {
        day: 10,
        classNumber: 5,
        title: 'Conectar el mapa y las tarjetas',
        contents: [
          'Al pulsar una tarjeta, centrar el mapa en el lugar correspondiente',
          'Al pulsar un marcador, mostrar información del lugar',
        ],
        result: 'Mapa y listado interactivos conectados entre sí.',
      },
      {
        day: 11,
        classNumber: 6,
        title: 'Crear fichas detalladas',
        contents: [
          'Añadir descripción, imagen, categoría y otros datos a cada lugar',
          'Mejorar cómo se abre y se muestra la información',
        ],
        result: 'Ficha individual para cada ubicación.',
      },
      {
        day: 12,
        classNumber: 7,
        title: 'Añadir favoritos',
        contents: [
          'Aprender localStorage',
          'Guardar lugares seleccionados y recuperarlos al volver a abrir la web',
        ],
        result: 'Favoritos persistentes en el navegador.',
      },
      {
        day: 13,
        classNumber: 8,
        title: 'Cargar datos y gestionar errores',
        contents: [
          'Aprender fetch, JSON, async/await y respuestas de una API',
          'Conectar el listado a una fuente de datos preparada',
        ],
        result:
          'Carga de datos separada de la interfaz, con estados de carga y error.',
      },
      {
        day: 14,
        classNumber: 9,
        title: 'Mejorar y probar la aplicación',
        contents: [
          'Corregir errores y revisar filtros combinados',
          'Probar favoritos y adaptar la interfaz a móviles',
        ],
        result:
          'Aplicación revisada con sus funciones principales funcionando.',
      },
      {
        day: 15,
        classNumber: 10,
        title: 'Publicar el mapa urbano',
        contents: [
          'Preparar la versión final y publicar la aplicación',
          'Documentar el proyecto y realizar una demostración',
        ],
        result: 'Segunda aplicación publicada en el portfolio.',
      },
    ],
  },
  {
    id: 3,
    title: 'Tu propio Idealista — portal de viviendas',
    weeks: '4–5',
    daysRange: '16–25',
    hours: '40 h',
    projectsCount: 1,
    learning:
      'Aprenderás Angular y TypeScript para crear tu propio Idealista: un portal de viviendas con búsqueda, filtros, fichas y mapa.',
    objective:
      'Un portal inspirado en Idealista, con anuncios, buscador, filtros, mapa y fichas de viviendas.',
    projectStartNote:
      'Cuándo empieza el proyecto: día 18. Los días 16 y 17 se dedican a aprender Angular y TypeScript mediante ejercicios. El día 18 comienza el portal definitivo y se amplía durante el resto del bloque.',
    technologies: ['Angular', 'TypeScript', 'Componentes', 'Servicios', 'Rutas'],
    projects: [
      {
        name: 'Portal inmobiliario',
        summary:
          'Portal inmobiliario con búsqueda, filtros, mapa y favoritos.',
        startDay: 18,
        developmentDays: '18–25',
        hours: '32 h',
      },
    ],
    deliverable:
      'Portal inmobiliario publicado con anuncios, buscador, fichas, mapa y favoritos.',
    classes: [
      {
        day: 16,
        classNumber: 1,
        title: 'Introducción a Angular',
        contents: [
          'Aprender componentes, plantillas y estructura del proyecto',
          'Fundamentos de TypeScript',
          'Crear componentes de práctica y comprender cómo se representa la información',
        ],
        result:
          'Ejercicios básicos en Angular, sin empezar aún el portal definitivo.',
      },
      {
        day: 17,
        classNumber: 2,
        title: 'Componentes y servicios',
        contents: [
          'Dividir una interfaz en piezas reutilizables',
          'Definir tipos de datos y compartir información entre componentes',
        ],
        result: 'Una pequeña práctica con tarjetas y datos tipados.',
      },
      {
        day: 18,
        classNumber: 3,
        title: 'Crear el portal inmobiliario',
        isProjectStart: true,
        contents: [
          'Diseñar la cabecera, la página de búsqueda y las tarjetas de propiedades',
          'Definir los datos de las viviendas y mostrarlos dinámicamente',
        ],
        result:
          'Primera versión visual del portal con anuncios de ejemplo.',
      },
      {
        day: 19,
        classNumber: 4,
        title: 'Programar los filtros inmobiliarios',
        contents: [
          'Implementar filtros por precio, zona, habitaciones y tipo de operación',
          'Aprender a combinar varios criterios',
        ],
        result:
          'Buscador que actualiza los resultados según las preferencias.',
      },
      {
        day: 20,
        classNumber: 5,
        title: 'Crear las fichas de las viviendas',
        contents: [
          'Añadir rutas, navegación y páginas individuales',
          'Mostrar precio, superficie, imágenes y descripción',
        ],
        result: 'Cada vivienda tiene una página de detalle.',
      },
      {
        day: 21,
        classNumber: 6,
        title: 'Completar el buscador',
        contents: [
          'Añadir validaciones y valores por defecto',
          'Mostrar mensajes cuando no hay resultados',
        ],
        result: 'Filtros más cómodos y coherentes.',
      },
      {
        day: 22,
        classNumber: 7,
        title: 'Incorporar el mapa',
        contents: [
          'Integrar Leaflet y situar las propiedades mediante coordenadas',
          'Conectar marcadores y resultados',
        ],
        result:
          'Mapa con viviendas localizadas y relacionadas con los anuncios.',
      },
      {
        day: 23,
        classNumber: 8,
        title: 'Guardar viviendas favoritas',
        contents: [
          'Permitir marcar propiedades',
          'Consultar la lista de guardados y eliminar favoritos',
        ],
        result: 'Selección de viviendas conservada en el navegador.',
      },
      {
        day: 24,
        classNumber: 9,
        title: 'Pruebas y diseño responsive',
        contents: [
          'Probar búsqueda, filtros, fichas, mapa y favoritos',
          'Corregir errores y mejorar la interfaz móvil',
        ],
        result: 'Portal funcional con los flujos principales revisados.',
      },
      {
        day: 25,
        classNumber: 10,
        title: 'Publicar el portal inmobiliario',
        contents: [
          'Preparar la versión de producción',
          'Publicar la aplicación y documentar el proyecto',
        ],
        result: 'Portal inmobiliario publicado con datos de demostración.',
      },
    ],
  },
  {
    id: 4,
    title: 'El sistema que mueve un negocio — clientes y reservas',
    weeks: '6–8',
    daysRange: '26–40',
    hours: '60 h',
    projectsCount: 1,
    learning:
      'Aprenderás backend con PHP, Laravel y MySQL: APIs, bases de datos, autenticación y un sistema de clientes y reservas.',
    objective:
      'El sistema que guarda y organiza los clientes, servicios, horarios y citas de un negocio. Este será el backend que se conectará a la plataforma de reservas en el siguiente bloque.',
    projectStartNote:
      'Cuándo empieza el proyecto: día 28. El día 26 se aprende PHP; el día 27 se hacen ejercicios con Laravel. El día 28 se empieza a programar el sistema de gestión, que se irá ampliando durante las tres semanas.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Laravel Sanctum'],
    projects: [
      {
        name: 'Sistema de gestión de clientes y reservas',
        summary:
          'Backend de reservas listo para conectar con la plataforma de reservas.',
        startDay: 28,
        developmentDays: '28–40',
        hours: '52 h',
      },
    ],
    deliverable:
      'API de gestión con clientes, servicios, horarios, reservas, login y permisos, lista para conectar con la plataforma de reservas.',
    classes: [
      {
        day: 26,
        classNumber: 1,
        title: 'Aprender PHP',
        contents: [
          'Variables, arrays, funciones y condiciones',
          'Ejercicios para representar clientes, servicios y citas',
        ],
        result: 'Fundamentos de programación en PHP.',
      },
      {
        day: 27,
        classNumber: 2,
        title: 'Aprender Laravel',
        contents: [
          'Crear un proyecto, definir rutas, controladores y respuestas JSON',
          'Practicar cómo recibir una petición y devolver información',
        ],
        result: 'Una API de práctica que responde a peticiones HTTP.',
      },
      {
        day: 28,
        classNumber: 3,
        title: 'Crear el sistema de gestión',
        isProjectStart: true,
        contents: [
          'Definir la estructura del proyecto',
          'Diseñar las tablas de clientes, servicios y reservas',
          'Preparar la conexión a MySQL',
        ],
        result: 'Proyecto iniciado y diseño inicial de la base de datos.',
      },
      {
        day: 29,
        classNumber: 4,
        title: 'Crear las tablas y relaciones',
        contents: [
          'Utilizar migraciones, modelos y relaciones de Laravel',
          'Introducir datos de prueba para empezar a trabajar',
        ],
        result: 'Base de datos creada y conectada al proyecto.',
      },
      {
        day: 30,
        classNumber: 5,
        title: 'Gestionar los servicios',
        contents: [
          'Crear endpoints para añadir, consultar, modificar y eliminar servicios',
          'Aplicar validaciones básicas',
        ],
        result: 'Catálogo de servicios gestionado desde el backend.',
      },
      {
        day: 31,
        classNumber: 6,
        title: 'Gestionar clientes',
        contents: [
          'Crear fichas de clientes, búsquedas y edición de datos',
          'Aplicar validaciones',
        ],
        result: 'Gestión de clientes conectada a MySQL.',
      },
      {
        day: 32,
        classNumber: 7,
        title: 'Organizar la API',
        contents: [
          'Diseñar rutas REST y respuestas JSON',
          'Definir códigos HTTP y una estructura consistente de endpoints',
        ],
        result:
          'API organizada para que una aplicación web pueda utilizarla.',
      },
      {
        day: 33,
        classNumber: 8,
        title: 'Calcular la disponibilidad',
        contents: [
          'Programar horarios de apertura y duración de los servicios',
          'Calcular franjas disponibles',
        ],
        result:
          'El sistema puede determinar qué horas se ofrecen para reservar.',
      },
      {
        day: 34,
        classNumber: 9,
        title: 'Crear reservas',
        contents: [
          'Recibir solicitudes y comprobar los datos',
          'Asociar cliente y servicio y guardar las citas',
        ],
        result: 'Reservas creadas mediante la API.',
      },
      {
        day: 35,
        classNumber: 10,
        title: 'Evitar reservas duplicadas',
        contents: [
          'Comprobar conflictos de horario',
          'Utilizar transacciones cuando corresponda y probar solicitudes simultáneas',
        ],
        result:
          'Las reservas duplicadas se rechazan en los casos cubiertos por las reglas y pruebas.',
      },
      {
        day: 36,
        classNumber: 11,
        title: 'Añadir autenticación',
        contents: [
          'Configurar usuarios e inicio de sesión',
          'Usar Laravel Sanctum para proteger endpoints privados',
        ],
        result: 'Operaciones protegidas que requieren autenticación.',
      },
      {
        day: 37,
        classNumber: 12,
        title: 'Configurar permisos',
        contents: [
          'Distinguir entre cliente y propietario del negocio',
          'Restringir el acceso a los datos y las acciones según el rol',
        ],
        result: 'Cada usuario puede acceder a las operaciones autorizadas.',
      },
      {
        day: 38,
        classNumber: 13,
        title: 'Modificar y cancelar reservas',
        contents: [
          'Gestionar los estados de una cita y las cancelaciones',
          'Aplicar las reglas para cambiar una reserva',
        ],
        result:
          'Reservas que pueden actualizarse siguiendo las reglas definidas.',
      },
      {
        day: 39,
        classNumber: 14,
        title: 'Probar el backend',
        contents: [
          'Comprobar datos incorrectos, permisos y horas ocupadas',
          'Revisar errores y respuestas de los endpoints',
        ],
        result: 'Principales errores corregidos y pruebas básicas preparadas.',
      },
      {
        day: 40,
        classNumber: 15,
        title: 'Preparar la conexión con la plataforma de reservas',
        contents: [
          'Documentar los endpoints y preparar datos de prueba',
          'Revisar cómo se conectará Angular a la API',
        ],
        result:
          'Sistema de gestión preparado para utilizarse desde una web.',
      },
    ],
  },
  {
    id: 5,
    title: 'Tu plataforma de reservas online',
    weeks: '9–10',
    daysRange: '41–50',
    hours: '40 h',
    projectsCount: 1,
    learning:
      'Aprenderás a conectar Angular con Laravel para crear tu plataforma de reservas: reservas online, área de cliente y panel del negocio.',
    objective:
      'Una web donde los clientes pueden consultar servicios, elegir una hora y reservar. El negocio tendrá un panel para gestionar sus citas.',
    projectStartNote:
      'Cuándo empieza el proyecto: día 41. Se reutiliza el backend que ya se ha construido. El proyecto comienza directamente conectando la web a la API; no hay que volver a empezar desde cero.',
    technologies: ['Angular', 'TypeScript', 'Laravel', 'MySQL', 'HTTP'],
    projects: [
      {
        name: 'Plataforma de reservas',
        summary:
          'MVP de reservas con área de cliente y panel del negocio.',
        startDay: 41,
        developmentDays: '41–50',
        hours: '40 h',
      },
    ],
    deliverable:
      'Plataforma de reservas full stack: el cliente reserva online y el negocio gestiona la agenda desde su panel.',
    classes: [
      {
        day: 41,
        classNumber: 1,
        title: 'Preparar la plataforma y conectar la API',
        isProjectStart: true,
        contents: [
          'Crear la estructura Angular',
          'Configurar la comunicación HTTP',
          'Realizar la primera petición al backend existente',
        ],
        result: 'Web y servidor conectados.',
      },
      {
        day: 42,
        classNumber: 2,
        title: 'Mostrar servicios del negocio',
        contents: [
          'Recuperar los servicios desde Laravel',
          'Presentarlos en tarjetas con precio, duración y descripción',
        ],
        result: 'Catálogo web alimentado por la base de datos.',
      },
      {
        day: 43,
        classNumber: 3,
        title: 'Construir el formulario de reserva',
        contents: [
          'Permitir seleccionar un servicio',
          'Introducir los datos necesarios para solicitar una cita',
        ],
        result: 'Formulario conectado al proceso de reserva.',
      },
      {
        day: 44,
        classNumber: 4,
        title: 'Mostrar las horas disponibles',
        contents: [
          'Consultar la API según el servicio y la fecha elegida',
          'Mostrar las franjas disponibles',
        ],
        result: 'Calendario de reservas conectado al backend.',
      },
      {
        day: 45,
        classNumber: 5,
        title: 'Confirmar una reserva',
        contents: [
          'Enviar la solicitud y mostrar confirmación',
          'Gestionar errores si la hora deja de estar disponible',
        ],
        result: 'Primer flujo completo de reserva desde la web.',
      },
      {
        day: 46,
        classNumber: 6,
        title: 'Crear el inicio de sesión',
        contents: [
          'Preparar el formulario de acceso',
          'Gestionar la autenticación compatible con el backend',
        ],
        result: 'Acceso a la zona privada para los usuarios autorizados.',
      },
      {
        day: 47,
        classNumber: 7,
        title: 'Crear «Mis reservas»',
        contents: [
          'Mostrar las próximas citas del cliente',
          'Ofrecer acciones permitidas, como cancelar una reserva',
        ],
        result: 'Área privada del cliente conectada a sus datos.',
      },
      {
        day: 48,
        classNumber: 8,
        title: 'Construir el panel del negocio',
        contents: [
          'Crear una vista para consultar las reservas',
          'Revisar clientes y gestionar las citas',
        ],
        result:
          'Panel de administración funcional con las operaciones principales.',
      },
      {
        day: 49,
        classNumber: 9,
        title: 'Probar el flujo completo',
        contents: [
          'Comprobar la reserva del cliente y su aparición en el panel',
          'Verificar cancelaciones y permisos',
        ],
        result:
          'Flujos principales probados y errores prioritarios corregidos.',
      },
      {
        day: 50,
        classNumber: 10,
        title: 'Preparar y presentar la plataforma',
        contents: [
          'Revisar el diseño y documentar el proyecto',
          'Preparar una demostración del cliente y del panel del negocio',
        ],
        result:
          'MVP de reservas demostrable y base para seguir desarrollando un producto comercial.',
      },
    ],
  },
  {
    id: 6,
    title: 'Tres productos con inteligencia artificial',
    weeks: '11–13',
    daysRange: '51–65',
    hours: '60 h',
    projectsCount: 3,
    learning:
      'Aprenderás a integrar inteligencia artificial en apps reales: un generador de webs, un chatbot y un asistente de estudio con PDFs.',
    objective:
      'Se construyen tres proyectos distintos, cada uno con su propio objetivo y demostración. No se dedican las 60 horas a una única aplicación.',
    projectStartNote:
      'Tres arranques de proyecto: el generador de webs el día 52, el chatbot el día 57 y el asistente de estudio el día 62. Cada producto tiene 20 horas y su propia demostración.',
    technologies: ['Angular', 'Laravel', 'MySQL', 'APIs de IA'],
    projects: [
      {
        name: 'Generador de webs con IA',
        summary:
          'El usuario describe un negocio y la aplicación genera el contenido de una web.',
        startDay: 52,
        developmentDays: '52–55',
        hours: '16 h',
      },
      {
        name: 'Chatbot inteligente',
        summary:
          'Chat que responde con una API de IA y guarda conversaciones en base de datos.',
        startDay: 57,
        developmentDays: '57–60',
        hours: '16 h',
      },
      {
        name: 'Asistente de estudio',
        summary:
          'Extrae texto de PDFs y genera resúmenes, tarjetas y cuestionarios.',
        startDay: 62,
        developmentDays: '62–65',
        hours: '16 h',
      },
    ],
    deliverable:
      'Tres prototipos demostrables: generador de webs, chatbot con historial y herramienta de estudio con PDFs.',
    classes: [
      {
        day: 51,
        classNumber: 1,
        title: 'Aprender a conectar una IA',
        contents: [
          'Comprender APIs de IA, peticiones, respuestas, costes y límites',
          'Protección de claves y primera llamada desde Laravel',
        ],
        result: 'Integración básica con un modelo de IA.',
      },
      {
        day: 52,
        classNumber: 2,
        title: 'Crear el generador de webs con IA',
        isProjectStart: true,
        contents: [
          'Diseñar el formulario para describir el negocio',
          'Preparar la respuesta estructurada que debe generar la IA',
        ],
        result:
          'Primera generación de textos y secciones de una web a partir de una descripción.',
      },
      {
        day: 53,
        classNumber: 3,
        title: 'Mostrar la web generada',
        contents: [
          'Validar la respuesta y convertirla en componentes visuales controlados',
          'Cabecera, servicios, presentación y contacto',
        ],
        result:
          'Vista previa de la web creada con contenido generado por IA.',
      },
      {
        day: 54,
        classNumber: 4,
        title: 'Guardar y editar proyectos',
        contents: [
          'Guardar la web en MySQL y recuperar proyectos',
          'Permitir regenerar o modificar partes del contenido',
        ],
        result: 'Proyectos persistentes que se pueden volver a abrir y editar.',
      },
      {
        day: 55,
        classNumber: 5,
        title: 'Completar y probar el generador',
        contents: [
          'Probar diferentes negocios y corregir respuestas mal formadas',
          'Gestionar errores y preparar la demostración',
        ],
        result: 'Primer prototipo de IA terminado.',
      },
      {
        day: 56,
        classNumber: 6,
        title: 'Preparar la interfaz conversacional',
        contents: [
          'Diseñar la pantalla de chat, los mensajes y el campo de entrada',
          'Preparar los estados de carga',
        ],
        result:
          'Interfaz visual del chatbot preparada para conectarse a la IA.',
      },
      {
        day: 57,
        classNumber: 7,
        title: 'Conectar el chat con la IA',
        isProjectStart: true,
        contents: [
          'Crear el endpoint en Laravel',
          'Enviar preguntas al modelo y mostrar las respuestas en Angular',
        ],
        result:
          'Chatbot que recibe preguntas y devuelve respuestas reales de la API de IA.',
      },
      {
        day: 58,
        classNumber: 8,
        title: 'Guardar las conversaciones',
        contents: [
          'Crear las tablas para conversaciones y mensajes',
          'Guardar el historial y recuperar chats anteriores',
        ],
        result: 'Las conversaciones quedan almacenadas en la base de datos.',
      },
      {
        day: 59,
        classNumber: 9,
        title: 'Añadir contexto y controles',
        contents: [
          'Enviar el contexto pertinente al modelo y limitar peticiones',
          'Comprobar que los usuarios no puedan consultar conversaciones ajenas',
        ],
        result: 'Chat con contexto y controles básicos de acceso y uso.',
      },
      {
        day: 60,
        classNumber: 10,
        title: 'Probar y presentar el chatbot',
        contents: [
          'Probar conversaciones, fallos de conexión y respuestas inesperadas',
          'Corregir los errores prioritarios y documentar el proyecto',
        ],
        result: 'Segundo prototipo de IA terminado.',
      },
      {
        day: 61,
        classNumber: 11,
        title: 'Preparar la subida de documentos',
        contents: [
          'Crear la interfaz para subir PDFs',
          'Aprender validación de archivos, límites de tamaño y almacenamiento seguro',
        ],
        result: 'Formulario de carga de documentos preparado.',
      },
      {
        day: 62,
        classNumber: 12,
        title: 'Extraer el texto de los PDFs',
        isProjectStart: true,
        contents: [
          'Procesar documentos con texto seleccionable',
          'Extraer su contenido y prepararlo para enviarlo a la IA',
        ],
        result:
          'La aplicación puede leer el contenido textual de un PDF de prueba.',
      },
      {
        day: 63,
        classNumber: 13,
        title: 'Generar resúmenes y tarjetas de estudio',
        contents: [
          'Enviar el texto al modelo',
          'Pedir resultados estructurados que puedan mostrarse en la interfaz',
        ],
        result: 'Generación de resúmenes y tarjetas de pregunta-respuesta.',
      },
      {
        day: 64,
        classNumber: 14,
        title: 'Crear cuestionarios y guardar resultados',
        contents: [
          'Generar preguntas tipo test y comprobar su estructura',
          'Guardar los materiales y permitir responder al cuestionario',
        ],
        result: 'Un flujo de estudio básico a partir de un documento.',
      },
      {
        day: 65,
        classNumber: 15,
        title: 'Completar el asistente de estudio',
        contents: [
          'Probar documentos y corregir errores',
          'Revisar resultados frente al texto original y preparar una demostración',
        ],
        result: 'Tercer prototipo de IA terminado.',
      },
    ],
  },
  {
    id: 7,
    title: 'Recepcionista virtual por voz',
    weeks: '14',
    daysRange: '66–70',
    hours: '20 h',
    projectsCount: 1,
    learning:
      'Aprenderás a crear una recepcionista virtual con voz, conectarla a horarios y automatizar citas con n8n.',
    objective:
      'Una recepcionista virtual capaz de responder llamadas de prueba, contestar preguntas frecuentes y registrar solicitudes de cita mediante un flujo automatizado.',
    projectStartNote:
      'Cuándo empieza el proyecto: día 66. No hay una semana previa de teoría independiente: desde el primer día se configura el caso de uso y se trabaja sobre el mismo prototipo.',
    technologies: ['Proveedor de voz con IA', 'APIs', 'Webhooks', 'n8n'],
    projects: [
      {
        name: 'Recepcionista virtual',
        summary:
          'Recepcionista de voz conectada a horarios y automatización con n8n.',
        startDay: 66,
        developmentDays: '66–70',
        hours: '20 h',
      },
    ],
    note: 'Es un prototipo educativo. El proveedor de voz puede generar costes adicionales.',
    deliverable:
      'Demostración de recepcionista virtual: atiende una llamada de prueba, consulta horarios y dispara una automatización.',
    classes: [
      {
        day: 66,
        classNumber: 1,
        title: 'Diseñar y configurar la recepcionista',
        isProjectStart: true,
        contents: [
          'Elegir un negocio de ejemplo y definir preguntas frecuentes, horarios y reglas',
          'Determinar cuándo derivar una consulta a una persona',
          'Configurar el proveedor de voz',
        ],
        result: 'Agente de voz preparado para realizar las primeras pruebas.',
      },
      {
        day: 67,
        classNumber: 2,
        title: 'Conseguir que atienda una llamada de prueba',
        contents: [
          'Configurar el diálogo y probar preguntas y respuestas',
          'Ajustar el comportamiento cuando el agente no dispone de información',
        ],
        result: 'Primera llamada de demostración funcional.',
      },
      {
        day: 68,
        classNumber: 3,
        title: 'Conectar el agente con datos de horarios',
        contents: [
          'Crear un endpoint de prueba',
          'Permitir que el agente consulte la disponibilidad y envíe una solicitud de cita',
        ],
        result:
          'Conversación conectada a datos proporcionados por el backend.',
      },
      {
        day: 69,
        classNumber: 4,
        title: 'Automatizar el proceso con n8n',
        contents: [
          'Crear un flujo que reciba la solicitud y valide los datos',
          'Enviar una notificación para que una persona revise la cita',
        ],
        result: 'La llamada puede desencadenar una automatización.',
      },
      {
        day: 70,
        classNumber: 5,
        title: 'Probar y presentar la recepcionista virtual',
        contents: [
          'Simular llamadas, probar errores y comprobar la notificación',
          'Documentar las limitaciones',
        ],
        result:
          'Demostración de voz y automatización lista para presentar.',
      },
    ],
  },
  {
    id: 8,
    title: 'Gestión empresarial con IA y automatizaciones',
    weeks: '15–16',
    daysRange: '71–80',
    hours: '40 h',
    projectsCount: 1,
    learning:
      'Aprenderás a construir tu programa de gestión empresarial: gestión empresarial, asistente con IA y automatización de pedidos por correo.',
    objective:
      'Un programa de gestión para una empresa que permite administrar clientes, pedidos y tareas, consultar datos escribiendo preguntas y automatizar la recepción de pedidos por correo.',
    projectStartNote:
      'Cuándo empieza el proyecto: día 71. El proyecto se construye desde el primer día de las dos últimas semanas. No se reserva la última sesión para intentar crear todo el programa: se desarrolla por capas y se integra progresivamente.',
    technologies: ['Angular', 'Laravel', 'MySQL', 'APIs de IA', 'n8n'],
    projects: [
      {
        name: 'Gestión empresarial inteligente',
        summary:
          'Gestión empresarial con asistente inteligente y automatización de correos.',
        startDay: 71,
        developmentDays: '71–80',
        hours: '40 h',
      },
    ],
    deliverable:
      'Programa de gestión con panel, consultas en lenguaje natural y automatización de pedidos por correo, presentado y documentado.',
    classes: [
      {
        day: 71,
        classNumber: 1,
        title: 'Diseñar y comenzar el software empresarial',
        isProjectStart: true,
        contents: [
          'Elegir un caso concreto, por ejemplo un pequeño distribuidor',
          'Definir funciones principales, pantallas, tablas y datos',
        ],
        result:
          'Proyecto iniciado con estructura de Angular y Laravel y diseño de la base de datos.',
      },
      {
        day: 72,
        classNumber: 2,
        title: 'Construir la base de datos y las funciones del backend',
        contents: [
          'Crear las tablas de clientes, pedidos y tareas',
          'Implementar los primeros endpoints para consultar y modificar información',
        ],
        result:
          'Base de datos y operaciones iniciales del sistema funcionando.',
      },
      {
        day: 73,
        classNumber: 3,
        title: 'Crear el panel de gestión',
        contents: [
          'Construir con Angular las pantallas de clientes, pedidos y estados',
          'Conectar las tablas y formularios con la API',
        ],
        result: 'Interfaz funcional conectada a datos persistentes.',
      },
      {
        day: 74,
        classNumber: 4,
        title: 'Completar las operaciones principales',
        contents: [
          'Añadir búsquedas, formularios, validaciones y gestión de tareas',
          'Revisar permisos y comprobar que las modificaciones se guardan',
        ],
        result:
          'Versión funcional del programa de gestión en su alcance inicial.',
      },
      {
        day: 75,
        classNumber: 5,
        title: 'Integrar y probar el sistema base',
        contents: [
          'Probar los flujos de clientes, pedidos y tareas',
          'Corregir errores prioritarios y preparar el sistema para incorporar la IA',
        ],
        result:
          'Programa de gestión básico operativo antes de añadir las funciones inteligentes.',
      },
      {
        day: 76,
        classNumber: 6,
        title: 'Crear el asistente que consulta los datos',
        contents: [
          'Conectar una API de IA y definir las funciones autorizadas',
          'Empezar con consultas como «¿Qué pedidos están pendientes?»',
        ],
        result:
          'Primera consulta en lenguaje natural conectada al backend.',
      },
      {
        day: 77,
        classNumber: 7,
        title: 'Validar respuestas y proteger las operaciones',
        contents: [
          'Comprobar parámetros, permisos y resultados',
          'Evitar que el modelo ejecute consultas arbitrarias o acciones no permitidas',
        ],
        result:
          'Asistente capaz de responder con datos del sistema dentro del alcance configurado.',
      },
      {
        day: 78,
        classNumber: 8,
        title: 'Crear la automatización de correos con n8n',
        contents: [
          'Configurar un flujo con correos de prueba',
          'Extraer datos de un pedido con IA, validar la información y preparar una propuesta de registro',
        ],
        result:
          'Correo transformado en datos estructurados que pueden revisarse.',
      },
      {
        day: 79,
        classNumber: 9,
        title: 'Conectar la automatización al programa',
        contents: [
          'Enviar los datos validados al backend y mostrar la propuesta de pedido',
          'Requerir aprobación humana antes de guardar información importante',
          'Probar el flujo completo',
        ],
        result:
          'Automatización integrada con un punto de revisión antes de confirmar el pedido.',
      },
      {
        day: 80,
        classNumber: 10,
        title: 'Revisar y presentar el proyecto final',
        contents: [
          'Corregir errores prioritarios y comprobar los permisos',
          'Documentar la aplicación y preparar una demostración: gestionar un pedido, consultarlo con el asistente y procesar un correo de ejemplo',
        ],
        result: 'Proyecto integrador presentado y documentado.',
      },
    ],
  },
];

export const PROJECTS_SUMMARY: readonly ProjectSummary[] = [
  {
    phase: 'Bloques 1–3 · Web, mapas y portal',
    count: 3,
    items: 'Web profesional, mapa urbano y portal inmobiliario.',
  },
  {
    phase: 'Bloques 4–5 · Backend y reservas',
    count: 2,
    items: 'Sistema de gestión y plataforma de reservas.',
  },
  {
    phase: 'Bloque 6 · Tres productos de IA',
    count: 3,
    items: 'Generador de webs, chatbot y asistente de estudio.',
  },
  {
    phase: 'Bloques 7–8 · Voz, automatización y gestión',
    count: 2,
    items: 'Recepcionista virtual y gestión empresarial inteligente.',
  },
];
