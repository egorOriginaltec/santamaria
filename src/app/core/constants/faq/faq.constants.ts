import type { FaqItem } from '../../models/faq/faq.model';

export const FAQ_EYEBROW = 'Dudas';

export const FAQ_TITLE = 'Preguntas frecuentes';

export const FAQ_INTRO =
  'Seis respuestas, las que suelen decidir. Si falta alguna, escríbenos.';

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 1,
    question: '¿Necesita conocimientos previos?',
    answer:
      'Casi ninguno pide haber programado antes. Se elige por edad e interés: Scratch (8–12), Apps (10–14), Arduino (11–15), Unity o Python (12–16), Web, IA o Python avanzado (14–18). Python avanzado sí pide bases (variables, if, bucles, funciones y listas). Hace falta soltura con el ordenador. En Arduino hace falta el kit. Si hay duda, escríbenos.',
  },
  {
    id: 2,
    question: '¿Qué ordenador necesita?',
    answer:
      'Un portátil o un sobremesa (Windows, Mac o Linux), con teclado, cámara, micrófono y conexión estable. El móvil no sirve para programar. Scratch y apps van con un portátil normal; Unity se defiende mejor con 8 GB de RAM. En Arduino hace falta el kit (placa, protoboard y sensores) además del PC. Los programas se indican al apuntarse: no hace falta un equipo de gaming.',
  },
  {
    id: 3,
    question: '¿Qué ocurre si falta a una clase?',
    answer:
      'La clase es en directo y no se recupera en privado ni se descuenta. Al volver, el profesor retoma lo justo para que pueda seguir con el grupo. No grabamos las sesiones.',
  },
  {
    id: 4,
    question: '¿Se paga durante las vacaciones?',
    answer:
      'En vacaciones escolares (puentes, Semana Santa, etc.) se hace clase igual: el colegio para, nosotros no. Solo se pausa en Navidad y al cerrar el curso en junio. La cuota es mensual de diciembre a junio; julio y agosto no se cobran.',
  },
  {
    id: 5,
    question: '¿Cómo se realiza el pago y cómo puedo darme de baja?',
    answer:
      'La cuota es de 59 € al mes por curso, o 99 €/mes si combina dos (ahorras 19 €). Vale para hermanos o para el mismo alumno en dos cursos. Pago por transferencia o tarjeta. No hay permanencia. Para no cobrar el mes siguiente, basta un aviso por email o WhatsApp antes del día 20.',
  },
  {
    id: 6,
    question: '¿Cuándo comienzan los cursos?',
    answer:
      'El curso 2026–2027 empieza el 1 de diciembre y termina en junio. Una clase a la semana, de lunes a viernes según el grupo. Sábado y domingo, fiesta.',
  },
] as const;
