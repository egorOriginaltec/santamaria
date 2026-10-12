import type { FaqItem } from '../../models/faq/faq.model';

export const FAQ_EYEBROW = 'Dudas frecuentes';

export const FAQ_TITLE = 'Preguntas que suelen hacer';

export const FAQ_INTRO =
  'Respuestas claras antes de decidir. Si necesitas más detalle, escríbenos.';

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 1,
    question: '¿Necesito saber programar antes de empezar?',
    answer:
      'No. El programa está pensado para empezar desde cero. Los primeros días construyes fundamentos y, desde el día 3, ya trabajas en tu primer proyecto real.',
  },
  {
    id: 2,
    question: '¿Cuál es el horario y la duración?',
    answer:
      'Son 16 semanas y 320 horas. Puedes elegir turno de mañana (09–13) o de tarde (16–20), con 10 plazas en cada uno.',
  },
  {
    id: 3,
    question: '¿Qué saldré sabiendo hacer?',
    answer:
      'Publicarás una web profesional, un mapa interactivo, un portal inmobiliario, una plataforma de reservas, apps con IA, una recepcionista virtual y un programa de gestión empresarial.',
  },
  {
    id: 4,
    question: '¿Cuándo empieza y cómo se paga?',
    answer:
      'El inicio es el 1 de diciembre. Puedes pagar en 4 cuotas de 375 € (1.500 €) o en un pago único de 1.350 € y ahorrar 150 €.',
  },
  {
    id: 5,
    question: '¿Las clases son en vivo?',
    answer:
      'Sí. Son sesiones prácticas en vivo, con feedback directo y un ritmo semanal claro. La prioridad es terminar versiones funcionales de cada proyecto.',
  },
] as const;
