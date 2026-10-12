import type { OutcomeItem } from '../../models/outcomes/outcomes.model';

export const OUTCOMES_EYEBROW = 'Resultados reales';

export const OUTCOMES_TITLE = 'Lo que saldrás haciendo';

export const OUTCOMES_INTRO =
  'No terminas con apuntes: terminas con productos que puedes enseñar en tu portfolio.';

export const OUTCOMES_ITEMS: readonly OutcomeItem[] = [
  {
    id: 1,
    code: '01',
    title: 'Tu primera web profesional',
    text: 'Una web de negocio publicada, adaptable a móvil y lista para mostrar.',
    // videoSrc: '/assets/outcomes/web.mp4',
  },
  {
    id: 2,
    code: '02',
    title: 'Tu propio Google Maps',
    text: 'Un mapa urbano interactivo con lugares, filtros y favoritos.',
    // videoSrc: '/assets/outcomes/maps.mp4',
  },
  {
    id: 3,
    code: '03',
    title: 'Tu propio Idealista',
    text: 'Un portal inmobiliario con búsqueda, fichas, mapa y anuncios.',
    // videoSrc: '/assets/outcomes/real-estate.mp4',
  },
  {
    id: 4,
    code: '04',
    title: 'Plataforma de reservas',
    text: 'Clientes reservan online y el negocio gestiona su agenda.',
    // videoSrc: '/assets/outcomes/bookings.mp4',
  },
  {
    id: 5,
    code: '05',
    title: 'Productos con inteligencia artificial',
    text: 'Generador de webs, chatbot y asistente de estudio con PDFs.',
    // videoSrc: '/assets/outcomes/ai.mp4',
  },
  {
    id: 6,
    code: '06',
    title: 'Voz, automatización y gestión',
    text: 'Recepcionista virtual, flujos con n8n y un programa empresarial con IA.',
    // videoSrc: '/assets/outcomes/automation.mp4',
  },
] as const;
