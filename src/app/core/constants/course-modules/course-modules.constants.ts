import type {
  CourseModule,
  ProjectSummary,
} from '../../models/course-module/course-module.model';

export const COURSE_MODULES: readonly CourseModule[] = [
  {
    id: 1,
    title: 'Fundamentos web: HTML, CSS, Tailwind CSS y Git',
    weeks: '1',
    hours: '20 h',
    projectsCount: 1,
    objective:
      'Aprender cómo se estructura una página web, fundamentos CSS, Tailwind, Git y GitHub.',
    technologies: [
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'VS Code/Cursor',
      'Git',
      'GitHub Pages',
      'DevTools',
    ],
    projects: [
      {
        name: 'Landing Page Responsive',
        summary:
          'Página de presentación de un negocio ficticio, adaptable a móvil y escritorio y publicada en Internet.',
      },
    ],
    deliverable:
      'Landing con cabecera/nav, hero, 3+ tarjetas de servicios, CTA, footer, responsive, GitHub + README + enlace público.',
    classes: [
      {
        day: 1,
        classNumber: 1,
        title: 'Introducción a la web y HTML',
        contents: [
          'Qué es Internet y cómo funciona un navegador',
          'Diferencia entre frontend y backend',
          'Papel de HTML, CSS y JavaScript',
          'Instalación y preparación de VS Code o Cursor',
          'Estructura HTML y etiquetas básicas',
          'HTML semántico: header, nav, main, section y footer',
          'Organización de carpetas, rutas y primer contacto con Git',
        ],
        practice:
          'Crear la estructura de una landing page con cabecera, navegación, sección principal, servicios y footer.',
        result: 'Primera página HTML estructurada.',
      },
      {
        day: 2,
        classNumber: 2,
        title: 'Fundamentos de CSS',
        contents: [
          'Selectores, clases y hojas de estilo externas',
          'Colores, tipografía, unidades y modelo de caja',
          'Display, posicionamiento, Flexbox y CSS Grid',
          'Estados hover y focus',
          'Herramientas de inspección del navegador',
        ],
        practice:
          'Diseñar la cabecera, botones, tarjetas de servicios y sección principal con CSS tradicional.',
        result: 'Primera versión visual de la landing page.',
      },
      {
        day: 3,
        classNumber: 3,
        title: 'Tailwind CSS desde cero',
        contents: [
          'Qué es Tailwind CSS y por qué utilizarlo',
          'Instalación y configuración en el proyecto',
          'Utilidades de espaciado, colores, tipografía y layout',
          'Flexbox y Grid con clases utilitarias',
          'Responsive con sm:, md: y lg:',
          'Estados hover:, focus: y disabled:',
        ],
        practice:
          'Reconstruir con Tailwind la cabecera, los botones y las tarjetas de servicios.',
        result: 'Interfaz maquetada principalmente con Tailwind.',
      },
      {
        day: 4,
        classNumber: 4,
        title: 'Diseño responsive',
        contents: [
          'Enfoque mobile-first',
          'Diferencias entre móvil, tablet y escritorio',
          'Contenedores, columnas, imágenes y navegación responsive',
          'Jerarquía visual, contraste y legibilidad',
          'Accesibilidad básica y depuración visual',
          'Uso de Cursor para explicar errores y revisar cambios',
        ],
        practice:
          'Terminar la landing page y comprobarla en distintos tamaños de pantalla.',
        result: 'Landing page responsive casi terminada.',
      },
      {
        day: 5,
        classNumber: 5,
        title: 'Git, GitHub y publicación',
        contents: [
          'git status, add, commit, log y push',
          'Crear y conectar un repositorio remoto',
          'Buenas prácticas de commits y README',
          'Publicación con GitHub Pages',
          'Comprobación de rutas, imágenes y enlaces',
        ],
        practice:
          'Publicar la web y dejar el repositorio listo para el portfolio.',
        result: 'Proyecto 1 publicado y documentado.',
      },
    ],
  },
  {
    id: 2,
    title: 'JavaScript y lógica de programación',
    weeks: '2–3',
    hours: '40 h',
    projectsCount: 1,
    objective:
      'Programación JS, DOM, eventos, APIs y persistencia para interfaces dinámicas.',
    technologies: [
      'JavaScript moderno',
      'HTML',
      'CSS/Tailwind',
      'DOM',
      'fetch',
      'async/await',
      'localStorage',
      'Git',
      'Cursor',
    ],
    projects: [
      {
        name: 'Mini tienda con carrito',
        summary:
          'Tienda frontend con catálogo, búsqueda, filtros, carrito y persistencia en localStorage.',
      },
    ],
    deliverable:
      'Mini tienda frontend funcional con catálogo dinámico, filtros, carrito y localStorage. Sin pagos reales.',
    classes: [
      {
        day: 6,
        classNumber: 1,
        title: 'Variables, tipos y operadores',
        contents: [
          'Qué hace JavaScript en una página web',
          'Cómo enlazar un archivo JavaScript',
          'Variables const y let',
          'Tipos primitivos y conversiones',
          'Operadores aritméticos, comparación y lógica',
          'Consola del navegador y lectura de errores',
        ],
        practice:
          'Ejercicios para calcular precios, descuentos, subtotales y totales.',
      },
      {
        day: 7,
        classNumber: 2,
        title: 'Condiciones y toma de decisiones',
        contents: [
          'if, else if, else y switch',
          'Operadores lógicos',
          'Comparación estricta y valores truthy/falsy',
          'Descomposición de problemas en pasos',
          'Pruebas con distintos valores de entrada',
        ],
        practice:
          'Sistema de descuentos y validación de promociones para una tienda.',
      },
      {
        day: 8,
        classNumber: 3,
        title: 'Bucles y funciones',
        contents: [
          'Bucles for, while y for...of',
          'Funciones, parámetros y valores de retorno',
          'Arrow functions',
          'Alcance de variables',
          'Reutilización de lógica y depuración paso a paso',
        ],
        practice:
          'Funciones para calcular descuentos, subtotales y gastos de envío.',
      },
      {
        day: 9,
        classNumber: 4,
        title: 'Arrays y objetos',
        contents: [
          'Arrays e índices',
          'Métodos map, filter, find, reduce y sort',
          'Objetos, propiedades y arrays de objetos',
          'Destructuring básico',
          'Transformación y organización de colecciones',
        ],
        practice:
          'Crear un catálogo de productos como array de objetos y filtrar por categoría y precio.',
      },
      {
        day: 10,
        classNumber: 5,
        title: 'DOM y eventos',
        contents: [
          'Seleccionar y modificar elementos HTML',
          'Crear y eliminar elementos dinámicamente',
          'Eventos click, input y submit',
          'Actualización de la interfaz',
          'Separación entre datos, lógica y presentación',
        ],
        practice:
          'Mostrar los productos en tarjetas y añadir botones interactivos.',
      },
      {
        day: 11,
        classNumber: 6,
        title: 'Formularios y validación',
        contents: [
          'Eventos de formulario',
          'preventDefault',
          'Validación de campos obligatorios',
          'Mensajes de error y estados visuales',
          'Buenas prácticas de accesibilidad',
        ],
        practice:
          'Formulario de búsqueda y filtros con validación de datos.',
      },
      {
        day: 12,
        classNumber: 7,
        title: 'Asincronía y APIs',
        contents: [
          'Qué es una API y qué es JSON',
          'Peticiones HTTP con fetch',
          'Promesas y async/await',
          'try/catch',
          'Estados de carga, error y resultados vacíos',
          'Inspección de peticiones con DevTools',
        ],
        practice:
          'Consultar una API pública y mostrar resultados dinámicamente.',
      },
      {
        day: 13,
        classNumber: 8,
        title: 'localStorage y carrito',
        contents: [
          'Guardar datos en el navegador',
          'JSON.stringify y JSON.parse',
          'Modelo de datos de un carrito',
          'Añadir, eliminar y cambiar cantidades',
          'Recuperar el carrito al recargar la página',
        ],
        practice: 'Implementar un carrito persistente.',
      },
      {
        day: 14,
        classNumber: 9,
        title: 'Construcción de la mini tienda',
        contents: [
          'Organización del código',
          'Catálogo dinámico',
          'Búsqueda, filtros y ordenación',
          'Carrito de compra y cálculo de totales',
          'Diseño responsive y estados de interfaz',
        ],
        practice: 'Integrar todas las funcionalidades de la tienda.',
      },
      {
        day: 15,
        classNumber: 10,
        title: 'Pruebas y publicación',
        contents: [
          'Pruebas manuales de los flujos principales',
          'Depuración de errores',
          'Refactorización de funciones duplicadas',
          'Tratamiento de datos vacíos o incorrectos',
          'README, Git y publicación',
        ],
        practice: 'Cerrar el proyecto y presentarlo.',
        result: 'Proyecto 2 terminado y publicado.',
      },
    ],
  },
  {
    id: 3,
    title: 'Angular, TypeScript y APIs públicas',
    weeks: '4–5',
    hours: '40 h',
    projectsCount: 2,
    objective:
      'Angular, componentes, servicios, TypeScript y HttpClient. El Task Manager será la base del backend del bloque 4.',
    technologies: [
      'Angular',
      'TypeScript',
      'Router',
      'Servicios',
      'HttpClient',
      'Observables',
      'HTML',
      'CSS/Tailwind',
      'Git',
      'Cursor',
    ],
    projects: [
      {
        name: 'Task Manager frontend',
        summary:
          'Aplicación de tareas en Angular con CRUD y almacenamiento local.',
      },
      {
        name: 'Explorador de películas',
        summary:
          'Buscador que consume una API pública y muestra resultados y fichas de películas.',
      },
    ],
    note: 'El Task Manager todavía no tiene backend propio. Esa parte se desarrolla en el siguiente bloque.',
    deliverable:
      'P3 Task Manager frontend (CRUD, prioridades, estados, localStorage) y P4 Explorador de películas (API pública, búsqueda y detalles).',
    classes: [
      {
        day: 16,
        classNumber: 1,
        title: 'Angular y TypeScript',
        contents: [
          'Qué es Angular y cómo se estructura una aplicación',
          'Preparación de Node.js, npm y Angular CLI',
          'Creación del proyecto',
          'Variables, funciones, tipos e interfaces de TypeScript',
          'Componentes y servidor de desarrollo',
        ],
        practice: 'Crear la aplicación Angular y un componente inicial.',
      },
      {
        day: 17,
        classNumber: 2,
        title: 'Componentes y plantillas',
        contents: [
          'Componentes y separación de responsabilidades',
          'Interpolación y property binding',
          'Event binding',
          'Control de flujo y renderizado de listas',
          'Comunicación entre componentes',
        ],
        practice:
          'Crear componentes para cabecera, lista de tareas y tarjeta de tarea.',
      },
      {
        day: 18,
        classNumber: 3,
        title: 'Formularios y validación',
        contents: [
          'Formularios en Angular',
          'Eventos y binding',
          'Campos obligatorios y reglas de validación',
          'Mensajes de error',
          'Creación y edición de tareas',
        ],
        practice:
          'Formulario para crear tareas con título, descripción y prioridad.',
      },
      {
        day: 19,
        classNumber: 4,
        title: 'Servicios e inyección de dependencias',
        contents: [
          'Qué es un servicio',
          'Inyección de dependencias',
          'Interfaces TypeScript para representar tareas',
          'Separación entre interfaz y lógica de datos',
          'Persistencia con localStorage',
        ],
        practice:
          'Crear un servicio de tareas que gestione los datos y los guarde localmente.',
      },
      {
        day: 20,
        classNumber: 5,
        title: 'Task Manager frontend',
        contents: [
          'CRUD de tareas',
          'Estados pendiente, en progreso y completada',
          'Prioridades y fechas límite',
          'Filtros y estados vacíos',
          'Diseño responsive con Tailwind',
        ],
        practice:
          'Completar la primera versión del Task Manager con almacenamiento local.',
        result: 'Proyecto 3 funcional.',
      },
      {
        day: 21,
        classNumber: 6,
        title: 'Routing y navegación',
        contents: [
          'Angular Router',
          'Configuración de rutas',
          'Navegación entre páginas',
          'Parámetros de ruta y páginas de detalle',
          'Página de error para rutas inexistentes',
        ],
        practice:
          'Añadir navegación entre la lista de tareas y sus detalles.',
      },
      {
        day: 22,
        classNumber: 7,
        title: 'APIs y peticiones HTTP',
        contents: [
          'Conceptos REST y JSON',
          'Peticiones HTTP con HttpClient',
          'Servicios para consumir APIs',
          'Observables y suscripciones',
          'Estados de carga, errores de red y respuestas vacías',
        ],
        practice:
          'Consultar una API pública y mostrar sus datos en Angular.',
      },
      {
        day: 23,
        classNumber: 8,
        title: 'Explorador de películas',
        contents: [
          'Selección de una API pública compatible',
          'Búsqueda de películas',
          'Resultados mediante tarjetas e imágenes',
          'Vista de detalle',
          'Gestión de carga, errores y resultados vacíos',
        ],
        practice: 'Construir el buscador y la página de detalle.',
        result: 'Proyecto 4 funcional.',
      },
      {
        day: 24,
        classNumber: 9,
        title: 'UX, depuración y refactorización',
        contents: [
          'Mejoras visuales y responsive',
          'Revisión de tipos y componentes',
          'Corrección de errores de red y de plantillas',
          'Reutilización de componentes',
          'Uso de Cursor para explicar errores y revisar diffs',
        ],
        practice: 'Pulir ambos proyectos y corregir sus errores.',
      },
      {
        day: 25,
        classNumber: 10,
        title: 'Publicación y portfolio',
        contents: [
          'Build de producción',
          'Configuración del entorno',
          'Publicación de las aplicaciones',
          'README, capturas y descripción de funcionalidades',
          'Revisión de enlaces y presentación',
        ],
        practice: 'Documentar y publicar los proyectos cuando el servicio lo permita.',
        result: 'Proyectos 3 y 4 documentados y publicados.',
      },
    ],
  },
  {
    id: 4,
    title: 'Backend con PHP, Laravel y MySQL',
    weeks: '6–8',
    hours: '60 h',
    projectsCount: 1,
    objective:
      'PHP, Laravel, MySQL, validación, Sanctum y autorización para una API profesional de usuarios y tareas.',
    technologies: [
      'PHP',
      'Composer',
      'Laravel',
      'MySQL',
      'Eloquent',
      'Sanctum',
      'Postman',
      'PHPUnit/Pest',
      'Git',
      'Cursor',
    ],
    projects: [
      {
        name: 'Task Manager API',
        summary:
          'API REST de usuarios y tareas, probada con Postman, sin conectar Angular todavía.',
      },
    ],
    note: 'Se prueba con Postman; la conexión con Angular se hace en el bloque 5.',
    deliverable:
      'API REST con auth, CRUD, filtros, permisos, MySQL, validación, tests y documentación.',
    classes: [
      {
        day: 26,
        classNumber: 1,
        title: 'Introducción al backend',
        contents: [
          'Diferencias entre frontend y backend',
          'Peticiones HTTP y respuestas',
          'Qué es una API REST',
          'Métodos GET, POST, PUT/PATCH y DELETE',
          'JSON, códigos de estado e instalación del stack',
        ],
        practice:
          'Crear el proyecto task-manager-api y devolver una respuesta JSON desde Laravel.',
      },
      {
        day: 27,
        classNumber: 2,
        title: 'PHP moderno y programación orientada a objetos',
        contents: [
          'Variables, tipos, arrays y funciones',
          'Condiciones y bucles',
          'Clases, objetos, propiedades y métodos',
          'Encapsulación e interfaces',
          'Namespaces y Composer',
        ],
        practice:
          'Crear una clase Task de ejemplo y manipular sus propiedades y métodos.',
      },
      {
        day: 28,
        classNumber: 3,
        title: 'Rutas y controladores Laravel',
        contents: [
          'Estructura de Laravel',
          'Rutas API',
          'Controladores y responsabilidades',
          'Métodos HTTP y respuestas JSON',
          'Introducción al patrón MVC',
        ],
        practice:
          'Crear un TaskController que devuelva tareas ficticias y consulte una tarea por ID.',
      },
      {
        day: 29,
        classNumber: 4,
        title: 'SQL y diseño de bases de datos',
        contents: [
          'Bases de datos relacionales',
          'Tablas, columnas y tipos de datos',
          'Claves primarias y foráneas',
          'Consultas SELECT, INSERT, UPDATE y DELETE',
          'Relaciones entre usuarios y tareas',
        ],
        practice:
          'Diseñar las tablas iniciales users y tasks y ejecutar consultas SQL.',
      },
      {
        day: 30,
        classNumber: 5,
        title: 'Migraciones, modelos y Eloquent',
        contents: [
          'Migraciones de Laravel',
          'Modelos Eloquent',
          'Seeders y factories',
          'Consultas a MySQL',
          'Relaciones User hasMany Task y Task belongsTo User',
        ],
        practice:
          'Crear modelos y migraciones y recuperar tareas desde la base de datos.',
        result: 'Estructura inicial del backend y persistencia en MySQL.',
      },
      {
        day: 31,
        classNumber: 6,
        title: 'CRUD completo de tareas',
        contents: [
          'Listar y consultar tareas',
          'Crear, actualizar y eliminar tareas',
          'Route model binding',
          'Pruebas de endpoints con Postman',
        ],
        practice: 'Implementar y probar el CRUD completo de tareas.',
      },
      {
        day: 32,
        classNumber: 7,
        title: 'Validación y gestión de errores',
        contents: [
          'Reglas de validación y Form Requests',
          'Validación de títulos, estados, prioridades y fechas',
          'Errores en formato JSON',
          'Códigos 401, 403, 404 y 422',
          'Prevención de asignación de campos no permitidos',
        ],
        practice:
          'Probar entradas válidas e inválidas y devolver errores coherentes.',
      },
      {
        day: 33,
        classNumber: 8,
        title: 'Filtros y funcionalidades avanzadas',
        contents: [
          'Estados, prioridades y fechas límite',
          'Búsqueda por título',
          'Filtros y ordenación',
          'Paginación',
          'Parámetros de consulta',
        ],
        practice: 'Añadir búsqueda, filtros y ordenación a los endpoints.',
      },
      {
        day: 34,
        classNumber: 9,
        title: 'Registro e inicio de sesión',
        contents: [
          'Registro de usuarios',
          'Hash de contraseñas',
          'Autenticación con Laravel Sanctum',
          'Login, logout y perfil',
          'Middleware y tokens de acceso',
        ],
        practice: 'Registrar usuarios y proteger rutas con autenticación.',
      },
      {
        day: 35,
        classNumber: 10,
        title: 'Autorización y seguridad',
        contents: [
          'Diferencias entre autenticación y autorización',
          'Asociación de tareas al usuario autenticado',
          'Protección de recursos privados',
          'Policies o comprobaciones de permisos',
          'Pruebas con dos usuarios',
        ],
        practice:
          'Comprobar con Postman que cada usuario solo puede gestionar sus tareas.',
        result: 'API con CRUD, filtros, autenticación y permisos.',
      },
      {
        day: 36,
        classNumber: 11,
        title: 'Arquitectura y refactorización',
        contents: [
          'Responsabilidades de modelos y controladores',
          'Separación de lógica',
          'Reutilización de código',
          'Consistencia de las respuestas JSON',
          'Variables de entorno y código mantenible',
        ],
        practice: 'Refactorizar el backend sin alterar su funcionamiento.',
      },
      {
        day: 37,
        classNumber: 12,
        title: 'Relaciones y resúmenes',
        contents: [
          'Consultas Eloquent',
          'Relaciones entre usuarios y tareas',
          'Conteos por estado',
          'Tareas pendientes y completadas',
          'Evitar consultas innecesarias',
        ],
        practice: 'Crear endpoints de resumen de tareas por estado.',
      },
      {
        day: 38,
        classNumber: 13,
        title: 'Pruebas automatizadas',
        contents: [
          'Introducción a PHPUnit o Pest',
          'Pruebas de integración y base de datos de pruebas',
          'Pruebas de CRUD y validación',
          'Pruebas de autenticación',
          'Pruebas de autorización',
        ],
        practice:
          'Crear pruebas para los principales endpoints y el aislamiento entre usuarios.',
      },
      {
        day: 39,
        classNumber: 14,
        title: 'Documentación y preparación para Angular',
        contents: [
          'Documentación de endpoints',
          'Parámetros, respuestas y errores',
          'Colección Postman',
          'Configuración CORS para Angular',
          'Variables de entorno, secretos y README',
        ],
        practice:
          'Documentar la API para que otro desarrollador pueda consumirla.',
      },
      {
        day: 40,
        classNumber: 15,
        title: 'Revisión y presentación del backend',
        contents: [
          'Repasar registro e inicio de sesión',
          'Probar operaciones CRUD',
          'Comprobar persistencia en MySQL',
          'Verificar filtros y permisos',
          'Demostración final con Postman',
        ],
        practice: 'Corregir errores y presentar el backend.',
        result: 'Proyecto 5 terminado.',
      },
    ],
  },
  {
    id: 5,
    title: 'Full Stack: Angular + Laravel',
    weeks: '9–10',
    hours: '40 h',
    projectsCount: 2,
    objective:
      'Conectar frontend y backend, gestionar autenticación desde Angular y construir una segunda app Full Stack.',
    technologies: [
      'Angular',
      'TypeScript',
      'HttpClient',
      'Formularios',
      'Router',
      'Laravel',
      'MySQL',
      'Sanctum',
      'Git',
      'Cursor',
    ],
    projects: [
      {
        name: 'Task Manager Full Stack',
        summary:
          'Conexión del frontend Angular con la API Laravel del bloque 4.',
      },
      {
        name: 'TimeFlow',
        summary:
          'Aplicación de control horario con fichajes, historial y panel administrativo básico.',
      },
    ],
    note: 'TimeFlow es una versión educativa y acotada, no un sistema completo de RRHH.',
    deliverable:
      'P6 Task Manager conectado a Laravel/MySQL con autenticación y datos privados; P7 TimeFlow Full Stack con fichajes e historial.',
    classes: [
      {
        day: 41,
        classNumber: 1,
        title: 'Conectar Angular con Laravel',
        contents: [
          'Repasar endpoints y respuestas JSON',
          'Configurar la URL del backend',
          'CORS y comunicación entre aplicaciones',
          'HttpClient y servicios',
          'Sustituir datos locales por datos reales',
        ],
        practice:
          'Conectar el Task Manager Angular con la API Laravel.',
      },
      {
        day: 42,
        classNumber: 2,
        title: 'Servicios y operaciones HTTP',
        contents: [
          'Interfaces TypeScript para las respuestas de la API',
          'GET, POST, PUT/PATCH y DELETE',
          'Observables y gestión de respuestas',
          'Estados de carga',
          'Tratamiento de errores',
        ],
        practice:
          'Implementar las operaciones CRUD desde la interfaz Angular.',
      },
      {
        day: 43,
        classNumber: 3,
        title: 'Formularios y validación integrada',
        contents: [
          'Formularios de creación y edición',
          'Validación en cliente y servidor',
          'Mostrar errores enviados por Laravel',
          'Actualización de la lista de tareas',
          'Mensajes de éxito y error',
        ],
        practice:
          'Completar el flujo de creación, edición y eliminación.',
      },
      {
        day: 44,
        classNumber: 4,
        title: 'Autenticación Full Stack',
        contents: [
          'Registro y login desde Angular',
          'Consumo de endpoints de autenticación',
          'Gestión de sesión y tokens',
          'Interceptores HTTP cuando proceda',
          'Rutas protegidas y logout',
        ],
        practice:
          'Implementar acceso a la aplicación con usuario autenticado.',
      },
      {
        day: 45,
        classNumber: 5,
        title: 'Permisos, filtros y UX',
        contents: [
          'Cargar las tareas del usuario autenticado',
          'Filtros por estado y prioridad',
          'Mejoras responsive',
          'Estados vacíos y errores',
          'Verificación de datos privados',
        ],
        practice: 'Finalizar el Task Manager Full Stack.',
        result: 'Proyecto 6 terminado, con frontend y backend conectados.',
      },
      {
        day: 46,
        classNumber: 6,
        title: 'Diseño de TimeFlow',
        contents: [
          'Requisitos de una aplicación de control horario',
          'Modelo de empresas, usuarios y registros de tiempo',
          'Relaciones entre tablas',
          'Diseño de endpoints',
          'Reglas de entrada y salida',
        ],
        practice:
          'Preparar la estructura del proyecto y las migraciones iniciales.',
      },
      {
        day: 47,
        classNumber: 7,
        title: 'Backend de TimeFlow',
        contents: [
          'Modelos y migraciones Laravel',
          'Registro de entrada y salida',
          'Validación de fichajes',
          'Cálculo de duración',
          'Historial de registros y manejo de estados',
        ],
        practice: 'Construir los endpoints de fichaje e historial.',
      },
      {
        day: 48,
        classNumber: 8,
        title: 'Frontend de TimeFlow',
        contents: [
          'Servicios Angular',
          'Botones para iniciar y finalizar jornada',
          'Estado actual del fichaje',
          'Historial de registros',
          'Filtros por fecha y resumen de horas',
        ],
        practice:
          'Construir la interfaz para fichar y consultar registros.',
      },
      {
        day: 49,
        classNumber: 9,
        title: 'Administración y pruebas',
        contents: [
          'Roles básicos',
          'Vista por empleado',
          'Filtros por empleado y periodo',
          'Resumen de horas',
          'Validación de fichajes duplicados',
        ],
        practice:
          'Crear una vista administrativa sencilla y probar los principales flujos.',
      },
      {
        day: 50,
        classNumber: 10,
        title: 'Documentación y presentación',
        contents: [
          'Revisión de ambos proyectos',
          'Corrección de errores',
          'README y variables de entorno',
          'Documentación de endpoints',
          'Datos ficticios para la demo',
        ],
        practice: 'Documentar y presentar ambos proyectos.',
        result: 'Proyectos 6 y 7 documentados y presentables.',
      },
    ],
  },
  {
    id: 6,
    title: 'Inteligencia Artificial aplicada al desarrollo',
    weeks: '11–13',
    hours: '60 h',
    projectsCount: 3,
    objective:
      'Integrar LLMs en apps reales con Angular, Laravel y MySQL: peticiones, validación, UI y persistencia.',
    technologies: [
      'Angular',
      'TypeScript',
      'Laravel',
      'MySQL',
      'API IA',
      'JSON',
      'Validación',
      'Git',
      'Cursor',
    ],
    projects: [
      {
        name: 'AI Landing Page Generator',
        summary: 'Generador de contenido web personalizado con IA.',
      },
      {
        name: 'AI Chatbot',
        summary:
          'Chat con contexto, historial y persistencia de conversaciones.',
      },
      {
        name: 'StudyAI',
        summary:
          'Asistente que transforma documentos PDF en resúmenes, flashcards y tests.',
      },
    ],
    note: 'Las credenciales de IA permanecen en Laravel; las respuestas del modelo se validan antes de mostrarlas o guardarlas.',
    deliverable:
      'Tres apps: generador de landings, chatbot con historial y StudyAI (PDF → resúmenes/flashcards/tests).',
    classes: [
      {
        day: 51,
        classNumber: 1,
        title: 'Introducción a los modelos de lenguaje',
        contents: [
          'Qué son los modelos de lenguaje y cómo funcionan',
          'Casos de uso en aplicaciones web',
          'Limitaciones y alucinaciones',
          'Calidad y verificación de las respuestas',
          'Privacidad y datos que no deberían enviarse',
        ],
        practice:
          'Comparar diferentes prompts y evaluar precisión y utilidad.',
      },
      {
        day: 52,
        classNumber: 2,
        title: 'Prompt engineering',
        contents: [
          'Definir objetivo, contexto, restricciones y tono',
          'Crear instrucciones concretas',
          'Usar ejemplos para orientar resultados',
          'Definir el formato esperado',
          'Iterar y mejorar prompts',
        ],
        practice:
          'Diseñar prompts para generar textos comerciales adaptados a distintos negocios.',
      },
      {
        day: 53,
        classNumber: 3,
        title: 'Conectar una API de IA con Laravel',
        contents: [
          'Qué es una API de IA y cómo se consume',
          'Configuración de credenciales y variables de entorno',
          'Peticiones HTTP desde Laravel',
          'Errores, timeouts, límites y costes',
          'Por qué la clave API no debe estar en Angular',
        ],
        practice:
          'Crear un endpoint Laravel que reciba datos de un negocio y consulte un modelo de IA.',
      },
      {
        day: 54,
        classNumber: 4,
        title: 'JSON estructurado y validación',
        contents: [
          'Solicitar respuestas estructuradas',
          'Definir campos y tipos esperados',
          'Validar la respuesta antes de usarla',
          'Tratar JSON incompleto o malformado',
          'Evitar ejecutar HTML arbitrario generado por el modelo',
        ],
        practice:
          'Devolver desde Laravel una estructura con título, descripción, servicios y CTA.',
      },
      {
        day: 55,
        classNumber: 5,
        title: 'Proyecto 8 — AI Landing Page Generator',
        contents: [
          'Formulario con tipo de negocio, público, servicios y estilo',
          'Enviar la información a Laravel',
          'Generar textos y estructura mediante IA',
          'Validar el resultado',
          'Mostrar una vista previa en Angular',
        ],
        practice: 'Terminar un generador de contenido para páginas web.',
        result: 'Proyecto 8 funcional.',
      },
      {
        day: 56,
        classNumber: 6,
        title: 'Arquitectura del chatbot',
        contents: [
          'Arquitectura Angular → Laravel → API de IA',
          'Interfaz de conversación',
          'Envío y recepción de mensajes',
          'Estados de carga y errores',
          'Organización de los componentes',
        ],
        practice:
          'Crear la interfaz de chat y el endpoint Laravel que procesa los mensajes.',
      },
      {
        day: 57,
        classNumber: 7,
        title: 'Contexto e historial conversacional',
        contents: [
          'Mensajes de usuario y asistente',
          'Cómo mantener el contexto entre mensajes',
          'Límites de tokens y costes',
          'Resumen de conversaciones largas',
          'Diseño de un flujo de conversación coherente',
        ],
        practice:
          'Conseguir que el chatbot continúe una conversación con contexto relevante.',
      },
      {
        day: 58,
        classNumber: 8,
        title: 'Persistencia en MySQL',
        contents: [
          'Modelar usuarios, conversaciones y mensajes',
          'Relaciones entre tablas',
          'Guardar mensajes en orden cronológico',
          'Recuperar conversaciones anteriores',
          'Controlar el acceso a conversaciones privadas',
        ],
        practice:
          'Guardar el historial y permitir recuperar una conversación.',
      },
      {
        day: 59,
        classNumber: 9,
        title: 'Seguridad y robustez del chatbot',
        contents: [
          'Validar las entradas',
          'Limitar longitud y frecuencia de peticiones',
          'Manejar errores del proveedor',
          'Validar respuestas estructuradas',
          'Controlar costes y consumo',
        ],
        practice:
          'Añadir límites, errores controlados y validaciones.',
      },
      {
        day: 60,
        classNumber: 10,
        title: 'Finalización del AI Chatbot',
        contents: [
          'Pruebas de conversación',
          'Persistencia y recuperación del historial',
          'Mejora de la interfaz',
          'Estados vacíos y mensajes de error',
          'Revisión de seguridad, README y presentación',
        ],
        practice: 'Cerrar el chatbot y prepararlo para demo.',
        result: 'Proyecto 9 terminado.',
      },
      {
        day: 61,
        classNumber: 11,
        title: 'Carga y lectura de PDF',
        contents: [
          'Formularios de subida de archivos',
          'Validación de tipo, extensión y tamaño',
          'Almacenamiento controlado',
          'Extracción de texto de PDF seleccionable',
          'Manejo de archivos vacíos e introducción al OCR opcional',
        ],
        practice:
          'Subir un documento de prueba, extraer su contenido y mostrar una vista previa.',
      },
      {
        day: 62,
        classNumber: 12,
        title: 'Resúmenes inteligentes',
        contents: [
          'Dividir documentos largos en fragmentos',
          'Resumir secciones por separado',
          'Crear una síntesis general',
          'Mantener referencias a secciones cuando sea posible',
          'Gestionar errores y límites de longitud',
        ],
        practice:
          'Generar resúmenes por secciones a partir de un documento ficticio.',
      },
      {
        day: 63,
        classNumber: 13,
        title: 'Flashcards y cuestionarios',
        contents: [
          'Generar tarjetas de pregunta y respuesta',
          'Crear preguntas tipo test con opciones',
          'Incluir explicaciones de las respuestas',
          'Validar el formato JSON',
          'Revisar la coherencia con el texto fuente',
        ],
        practice:
          'Crear flashcards y un cuestionario a partir de los apuntes.',
      },
      {
        day: 64,
        classNumber: 14,
        title: 'Interfaz de estudio y persistencia',
        contents: [
          'Interfaz de flashcards',
          'Navegación por tarjetas',
          'Cuestionarios interactivos',
          'Cálculo de puntuación y explicaciones',
          'Guardar documentos, tarjetas y resultados en MySQL',
        ],
        practice:
          'Construir la interfaz Angular y guardar los resultados del usuario.',
      },
      {
        day: 65,
        classNumber: 15,
        title: 'Seguridad y presentación de StudyAI',
        contents: [
          'Validación de documentos y resultados',
          'Pruebas con PDF inválidos, vacíos o grandes',
          'Gestión de errores de IA',
          'Privacidad y límites de consumo',
          'Documentación y presentación de los tres proyectos',
        ],
        practice: 'Corregir los últimos errores y preparar la demostración.',
        result: 'Proyecto 10 terminado y bloque de IA completado.',
      },
    ],
  },
  {
    id: 7,
    title: 'Automatización con n8n',
    weeks: '14',
    hours: '20 h',
    projectsCount: 1,
    objective:
      'Diseñar workflows en n8n y conectarlos con una API Laravel para automatizar citas y comunicaciones.',
    technologies: [
      'n8n',
      'Webhooks',
      'JSON',
      'Laravel API',
      'MySQL',
      'WhatsApp/SMS provider',
    ],
    projects: [
      {
        name: 'ClinicFlow AI',
        summary:
          'Automatización de citas con recordatorios WhatsApp/SMS, confirmaciones y extensión opcional de llamadas con IA.',
      },
    ],
    note: 'Datos ficticios. La llamada de voz es una ampliación avanzada; la prioridad son recordatorios y confirmaciones.',
    deliverable:
      'Sistema que recibe una cita, programa y envía recordatorios, recibe confirmación y actualiza el estado en la API.',
    classes: [
      {
        day: 66,
        classNumber: 1,
        title: 'Fundamentos de n8n',
        contents: [
          'Qué es n8n y cuándo utilizarlo',
          'Workflows y nodos',
          'Triggers manuales y programados',
          'Webhooks',
          'JSON, expresiones y transformación de datos',
          'Conexión con APIs externas',
        ],
        practice:
          'Crear un workflow que reciba un evento de cita creada y transforme sus datos.',
      },
      {
        day: 67,
        classNumber: 2,
        title: 'Recordatorios por WhatsApp o SMS',
        contents: [
          'Opciones de integración y proveedores',
          'Configuración de credenciales',
          'Plantillas y requisitos de mensajería',
          'Envío de fecha, hora y datos mínimos',
          'Registro del resultado y errores de envío',
        ],
        practice:
          'Enviar un recordatorio de prueba o simularlo si no hay credenciales.',
      },
      {
        day: 68,
        classNumber: 3,
        title: 'Agenda y confirmaciones',
        contents: [
          'Fechas y zonas horarias',
          'Programación de recordatorios',
          'Verificar que la cita siga activa antes de enviar',
          'Recibir confirmaciones o solicitudes de cambio',
          'Actualizar el estado vía Laravel y evitar duplicados',
        ],
        practice:
          'Conectar n8n con una API para actualizar el estado de una cita.',
      },
      {
        day: 69,
        classNumber: 4,
        title: 'Llamadas telefónicas con IA',
        contents: [
          'Arquitectura de llamadas salientes',
          'Guion limitado para confirmar una cita',
          'Interpretación de confirmaciones o cancelaciones',
          'Derivación a una persona cuando sea necesario',
          'Errores, respuestas ambiguas, consentimiento y privacidad',
        ],
        practice:
          'Diseñar y probar una llamada en entorno compatible, o simular y documentar el flujo.',
      },
      {
        day: 70,
        classNumber: 5,
        title: 'Integración y presentación',
        contents: [
          'Conectar los nodos del workflow',
          'Probar confirmación, cancelación y errores',
          'Evitar duplicados y reintentos incorrectos',
          'Registrar resultados',
          'Documentar credenciales y configuración',
        ],
        practice: 'Presentar el sistema completo.',
        result: 'Proyecto 11, ClinicFlow AI.',
      },
    ],
  },
  {
    id: 8,
    title: 'Proyecto final Full Stack: VetFlow AI',
    weeks: '15–16',
    hours: '40 h',
    projectsCount: 1,
    objective:
      'Integrar todo el bootcamp en un MVP: propietarios, mascotas, citas, visitas, recordatorios y borradores IA.',
    technologies: [
      'Angular',
      'TypeScript',
      'Tailwind/CSS',
      'Laravel',
      'MySQL',
      'API IA',
      'n8n',
      'Git',
      'Cursor',
    ],
    projects: [
      {
        name: 'VetFlow AI',
        summary:
          'MVP de ERP veterinario con Angular, Laravel, MySQL, IA y automatización n8n.',
      },
    ],
    note: 'MVP educativo, no software clínico de producción. La IA no diagnostica ni propone tratamientos.',
    deliverable:
      'VetFlow AI con dashboard, CRUD de propietarios/mascotas/citas/visitas, recordatorios n8n y borradores IA con revisión humana.',
    classes: [
      {
        day: 71,
        classNumber: 1,
        title: 'Requisitos y arquitectura',
        contents: [
          'Definir usuarios y funcionalidades del MVP',
          'Arquitectura Angular + Laravel + MySQL',
          'Organización del repositorio',
          'Diseño de tablas y relaciones',
          'Modelo inicial: usuarios, propietarios, mascotas, citas, visitas y notificaciones',
        ],
        practice:
          'Crear el proyecto, definir migraciones iniciales y documentar la arquitectura.',
      },
      {
        day: 72,
        classNumber: 2,
        title: 'Backend, autenticación y roles',
        contents: [
          'Modelos y migraciones',
          'API REST y validación',
          'Autenticación',
          'Roles básicos de administrador y veterinario',
          'Protección de endpoints y relaciones',
        ],
        practice:
          'Implementar la autenticación y la estructura base de la API.',
      },
      {
        day: 73,
        classNumber: 3,
        title: 'Propietarios y mascotas',
        contents: [
          'CRUD de propietarios',
          'CRUD de mascotas',
          'Relación entre propietario y mascotas',
          'Formularios y validaciones',
          'Búsqueda, estados vacíos y errores',
        ],
        practice:
          'Crear la gestión de propietarios y mascotas en backend y frontend.',
      },
      {
        day: 74,
        classNumber: 4,
        title: 'Agenda de citas',
        contents: [
          'Crear, consultar y modificar citas',
          'Asignar mascota y veterinario',
          'Fecha, hora y motivo administrativo',
          'Estados de cita y validación',
          'Prevención básica de solapamientos',
        ],
        practice:
          'Construir la agenda de citas y las operaciones principales.',
      },
      {
        day: 75,
        classNumber: 5,
        title: 'Historial de visitas',
        contents: [
          'Relación entre mascota, visita, cita y veterinario',
          'Guardar notas de visita',
          'Mostrar el historial cronológico',
          'Validar datos y controlar permisos',
          'Consultar el historial desde la interfaz',
        ],
        practice: 'Crear el historial de visitas de cada mascota.',
        result:
          'Backend y frontend iniciales con propietarios, mascotas, citas e historial.',
      },
      {
        day: 76,
        classNumber: 6,
        title: 'Resúmenes asistidos por IA',
        contents: [
          'Enviar notas ficticias a un servicio de IA',
          'Generar un borrador estructurado de resumen',
          'Validar la respuesta',
          'Mostrar el borrador en Angular y permitir edición',
          'Registrar el resultado aprobado',
        ],
        practice:
          'Añadir un botón para generar un borrador de resumen de visita.',
      },
      {
        day: 77,
        classNumber: 7,
        title: 'Automatización de recordatorios con n8n',
        contents: [
          'Evento de cita y webhook',
          'Crear el workflow de n8n',
          'Conectar n8n con la API Laravel',
          'Enviar recordatorios mediante un proveedor compatible',
          'Registrar notificaciones y evitar duplicados',
        ],
        practice:
          'Automatizar el recordatorio de una cita ficticia y registrar su resultado.',
      },
      {
        day: 78,
        classNumber: 8,
        title: 'Dashboard administrativo',
        contents: [
          'Mostrar próximas citas',
          'Citas pendientes de confirmación',
          'Contador de mascotas y visitas recientes',
          'Filtros por fecha y estado',
          'Diseño responsive y navegación',
        ],
        practice:
          'Construir el panel principal usando datos reales de la API.',
      },
      {
        day: 79,
        classNumber: 9,
        title: 'Pruebas, seguridad y despliegue',
        contents: [
          'Probar CRUD y permisos',
          'Validar entradas y errores',
          'Probar fallos del proveedor de IA y de mensajería',
          'Revisar variables de entorno, secretos y webhooks',
          'Preparar una demo desplegada si el entorno lo permite',
        ],
        practice:
          'Corregir errores prioritarios y comprobar el flujo de extremo a extremo.',
      },
      {
        day: 80,
        classNumber: 10,
        title: 'Documentación y presentación final',
        contents: [
          'README de instalación',
          'Documentación de la API',
          'Documentación del workflow de n8n',
          'Preparación de datos ficticios',
          'Demostración, arquitectura, limitaciones y mejoras futuras',
        ],
        practice:
          'Presentar VetFlow AI como un producto funcional en versión MVP.',
        result: 'Proyecto final VetFlow AI entregado.',
      },
    ],
  },
];

export const PROJECTS_SUMMARY: readonly ProjectSummary[] = [
  {
    phase: 'Bloques 1–3 · Fundamentos y frontend',
    count: 4,
    items:
      'Landing Page Responsive, Mini tienda, Task Manager frontend y Explorador de películas.',
  },
  {
    phase: 'Bloques 4–5 · Backend y Full Stack',
    count: 3,
    items: 'Task Manager API, Task Manager Full Stack y TimeFlow.',
  },
  {
    phase: 'Bloque 6 · Inteligencia Artificial',
    count: 3,
    items: 'AI Landing Page Generator, AI Chatbot y StudyAI.',
  },
  {
    phase: 'Bloques 7–8 · Automatización y proyecto final',
    count: 2,
    items: 'ClinicFlow AI y VetFlow AI.',
  },
];
