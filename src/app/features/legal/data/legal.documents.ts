import { CONTACT_FORM_EMAIL, LEGAL_NAV } from '@core/index';
import type { LegalDocument, LegalSlug } from './legal.types';

export { LEGAL_NAV };

const EMAIL = CONTACT_FORM_EMAIL;
const UPDATED = '14 de octubre de 2026';

export const LEGAL_DOCUMENTS: Record<LegalSlug, LegalDocument> = {
  terminos: {
    slug: 'terminos',
    path: '/legal/terminos',
    kicker: 'Legal',
    title: 'Términos de uso',
    marker: 'Términos de uso',
    updatedOn: UPDATED,
    intro:
      'Estas condiciones regulan el uso de la web y de los servicios de Santamaria Club (extraescolares online de programación). Al navegar o contratar, aceptas este documento.',
    sections: [
      {
        id: 'quien',
        title: '1. Quiénes somos',
        paragraphs: [
          'Santamaria Club ofrece clases online en directo de programación e informática para jóvenes, con grupos reducidos y seguimiento docente.',
          `Para cualquier duda legal o contractual puedes escribir a ${EMAIL}.`,
        ],
      },
      {
        id: 'servicio',
        title: '2. Servicio',
        paragraphs: [
          'Las clases se imparten online y en directo según el horario publicado. El contenido, la edad recomendada y el precio de cada curso aparecen en la ficha correspondiente.',
          'La primera clase de prueba puede ofrecerse de forma gratuita según disponibilidad de plaza. No implica obligación de continuar.',
        ],
        bullets: [
          'Una sesión semanal por grupo, salvo indicación distinta.',
          'Máximo orientativo de 10 alumnos por grupo.',
          'Sábados, domingos y vacaciones escolares sin clase, según calendario.',
        ],
      },
      {
        id: 'cuenta',
        title: '3. Cuenta de acceso',
        paragraphs: [
          'Si te facilitamos acceso al campus (calendario, materiales o ejercicios), las credenciales son personales e intransferibles.',
          'Debes mantener la confidencialidad de tu contraseña y avisarnos si detectas un uso no autorizado.',
        ],
      },
      {
        id: 'pagos',
        title: '4. Pagos y baja',
        paragraphs: [
          'La cuota es mensual y se indica en euros en la web o en la confirmación de plaza. El pago se realiza por los medios que indiquemos (transferencia, tarjeta u otros).',
          'No hay permanencia. Para no cobrar el mes siguiente, basta un aviso por email o WhatsApp antes del día 20 del mes en curso, salvo que se acuerde otra fecha por escrito.',
        ],
      },
      {
        id: 'asistencia',
        title: '5. Asistencia y materiales',
        paragraphs: [
          'Las clases son en directo y, con carácter general, no se recuperan de forma individual ni se descuentan por ausencia.',
          'Los materiales y ejercicios del campus son para uso del alumno matriculado. Queda prohibida su redistribución comercial o pública sin autorización.',
        ],
      },
      {
        id: 'conducta',
        title: '6. Uso aceptable',
        paragraphs: [
          'Nos reservamos el derecho a limitar o cancelar el acceso ante conductas que impidan el buen desarrollo de la clase, vulneren la privacidad de otros alumnos o hagan un uso abusivo de la plataforma.',
        ],
      },
      {
        id: 'propiedad',
        title: '7. Propiedad intelectual',
        paragraphs: [
          'La marca, el diseño de la web, los textos, vídeos y materiales didácticos son titularidad de Santamaria Club o de sus licenciantes. No puedes copiarlos ni explotarlos fuera del uso educativo autorizado.',
        ],
      },
      {
        id: 'responsabilidad',
        title: '8. Limitación de responsabilidad',
        paragraphs: [
          'Hacemos esfuerzos razonables para mantener la web y las clases operativas. No podemos garantizar disponibilidad ininterrumpida ante cortes de red, incidencias de terceros (Meet, hosting, etc.) o causas de fuerza mayor.',
          'El alumno necesita un ordenador adecuado, cámara, micrófono y conexión estable; el móvil no es un entorno válido para programar en nuestros cursos.',
        ],
      },
      {
        id: 'cambios',
        title: '9. Cambios',
        paragraphs: [
          'Podemos actualizar estos términos para reflejar mejoras del servicio o requisitos legales. La fecha de actualización aparecerá al inicio de esta página. El uso continuado tras un cambio relevante implica su aceptación, salvo que la ley exija un consentimiento específico.',
        ],
      },
      {
        id: 'ley',
        title: '10. Ley aplicable',
        paragraphs: [
          'Este documento se interpreta conforme a la legislación española. Para reclamaciones de consumo, puedes acudir a los mecanismos de resolución de litigios previstos en España y en la Unión Europea.',
          `Contacto: ${EMAIL}.`,
        ],
      },
    ],
  },

  privacidad: {
    slug: 'privacidad',
    path: '/legal/privacidad',
    kicker: 'Legal',
    title: 'Política de privacidad',
    marker: 'Privacidad',
    updatedOn: UPDATED,
    intro:
      'Explicamos qué datos personales tratamos, para qué, durante cuánto tiempo y qué derechos tienes. Cumplimos el RGPD (UE) 2016/679 y la LOPDGDD española.',
    sections: [
      {
        id: 'responsable',
        title: '1. Responsable del tratamiento',
        paragraphs: [
          `Responsable: Santamaria Club. Contacto de privacidad: ${EMAIL}.`,
          'Si en el futuro designamos un delegado de protección de datos (DPD), sus datos de contacto se publicarán en esta misma página.',
        ],
      },
      {
        id: 'datos',
        title: '2. Datos que podemos tratar',
        paragraphs: [
          'Según cómo uses la web o el servicio, podemos tratar:',
        ],
        bullets: [
          'Identificación y contacto: nombre, email, teléfono (si lo facilitas).',
          'Mensajes del formulario de contacto o de admisión.',
          'Datos de facturación y pago necesarios para la matrícula.',
          'Datos de cuenta del campus (email de acceso, progreso en ejercicios).',
          'Datos técnicos básicos del dispositivo o navegación (IP, fecha, páginas vistas) cuando activen analíticas o cookies no esenciales.',
        ],
      },
      {
        id: 'finalidades',
        title: '3. Finalidades y bases legales',
        paragraphs: [
          'Tratamos los datos para las siguientes finalidades:',
        ],
        bullets: [
          'Responder consultas y gestionar la primera clase (interés legítimo / medidas precontractuales).',
          'Formalizar y prestar el servicio educativo contratado (ejecución de contrato).',
          'Gestionar el acceso al campus y el seguimiento académico (ejecución de contrato).',
          'Cumplir obligaciones legales (p. ej. facturación).',
          'Mejorar la web con estadísticas agregadas (consentimiento, cuando se activen cookies/analítica).',
        ],
      },
      {
        id: 'menores',
        title: '4. Menores',
        paragraphs: [
          'Nuestros cursos están pensados para jóvenes. Cuando el alumno es menor de edad, la contratación y la comunicación principal se realizan con el padre, madre o tutor legal.',
          'Pedimos que no se envíen datos de menores en formularios públicos más allá de lo necesario para valorar el curso adecuado.',
        ],
      },
      {
        id: 'conservacion',
        title: '5. Conservación',
        paragraphs: [
          'Conservamos los datos solo el tiempo necesario para cada finalidad: consultas (plazo razonable tras responder), relación contractual (mientras dure y los plazos legales posteriores), y datos analíticos según la configuración de cookies y proveedores.',
        ],
      },
      {
        id: 'encargados',
        title: '6. Destinatarios y encargados',
        paragraphs: [
          'Podemos apoyarnos en proveedores que tratan datos por cuenta nuestra (hosting, email, videollamada, pasarela de pago o, cuando se activen, herramientas de analítica y medición).',
          'Si algún proveedor está fuera del Espacio Económico Europeo, aplicaremos las garantías adecuadas (p. ej. cláusulas contractuales tipo) cuando proceda.',
        ],
      },
      {
        id: 'derechos',
        title: '7. Tus derechos',
        paragraphs: [
          `Puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${EMAIL}, aportando información que permita identificarte.`,
          'También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es) si consideras que no hemos atendido correctamente tu solicitud.',
        ],
      },
      {
        id: 'seguridad',
        title: '8. Seguridad',
        paragraphs: [
          'Aplicamos medidas técnicas y organizativas razonables (HTTPS, control de acceso al campus, minimización de datos). Ningún sistema es 100 % invulnerable; si detectas un incidente, avísanos cuanto antes.',
        ],
      },
      {
        id: 'mas',
        title: '9. Más información',
        paragraphs: [
          'El uso de cookies y tecnologías similares se detalla en la Política de cookies. Los términos del servicio están en Términos de uso.',
        ],
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    path: '/legal/cookies',
    kicker: 'Legal',
    title: 'Política de cookies',
    marker: 'Cookies',
    updatedOn: UPDATED,
    intro:
      'Esta política explica qué son las cookies, cuáles puede usar esta web y cómo puedes gestionarlas. Está preparada para cuando activemos herramientas como Google Analytics, Google Search Console o etiquetas de medición.',
    sections: [
      {
        id: 'que-son',
        title: '1. ¿Qué son las cookies?',
        paragraphs: [
          'Las cookies son pequeños archivos que el sitio o terceros guardan en tu dispositivo. También usamos tecnologías similares (almacenamiento local, píxeles o etiquetas) cuando aportan la misma función.',
        ],
      },
      {
        id: 'tipos',
        title: '2. Tipos que podemos utilizar',
        paragraphs: [
          'Según su finalidad:',
        ],
        bullets: [
          'Necesarias / técnicas: permiten navegar, mantener la sesión o recordar preferencias esenciales de seguridad. No requieren consentimiento.',
          'Preferencias: recuerdan opciones no esenciales (p. ej. idioma de interfaz si se implementa).',
          'Analíticas: miden visitas y uso agregado de la web (p. ej. Google Analytics, cuando se active).',
          'Marketing / etiquetas: miden campañas o conversiones (solo si se implementan y con consentimiento).',
        ],
      },
      {
        id: 'estado',
        title: '3. Estado actual del sitio',
        paragraphs: [
          'En este momento la web prioriza el funcionamiento básico. Cuando activemos Google Analytics, Search Console (verificación) u otras etiquetas, actualizaremos esta página con el listado concreto de cookies, su duración y el proveedor.',
          'Hasta entonces, es posible que existan cookies técnicas propias de la sesión o de seguridad del servidor.',
        ],
      },
      {
        id: 'consentimiento',
        title: '4. Consentimiento',
        paragraphs: [
          'Las cookies no necesarias solo se instalarán tras tu consentimiento, salvo excepciones legales. Podrás aceptarlos, rechazarlos o configurarlos desde el banner o panel de cookies cuando esté publicado.',
          'Puedes retirar el consentimiento cuando quieras sin que afecte a la licitud del tratamiento previo.',
        ],
      },
      {
        id: 'gestion',
        title: '5. Cómo gestionarlas en el navegador',
        paragraphs: [
          'Además del panel del sitio (cuando exista), puedes bloquear o borrar cookies desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge, etc.).',
          'Si bloqueas todas las cookies, algunas funciones de la web o del campus podrían dejar de funcionar correctamente.',
        ],
      },
      {
        id: 'terceros',
        title: '6. Terceros previstos',
        paragraphs: [
          'Proveedores que podrían intervenir en el futuro, según lo que instalemos:',
        ],
        bullets: [
          'Google Analytics: estadísticas de uso.',
          'Google Search Console / etiquetas de verificación: medición y SEO técnico (a menudo sin cookies de seguimiento invasivas, pero lo documentaremos).',
          'Google Tag Manager u otras etiquetas: carga controlada de scripts de medición.',
        ],
      },
      {
        id: 'mas-info',
        title: '7. Más información',
        paragraphs: [
          `Para ejercer derechos sobre datos personales, consulta la Política de privacidad o escribe a ${EMAIL}.`,
          'Actualizaremos esta política cuando cambie el stack de medición. La fecha de la última revisión aparece al inicio de la página.',
        ],
      },
    ],
  },
};

export function legalDocument(slug: string | null | undefined): LegalDocument | null {
  if (slug === 'terminos' || slug === 'privacidad' || slug === 'cookies') {
    return LEGAL_DOCUMENTS[slug];
  }
  return null;
}
