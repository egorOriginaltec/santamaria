import { APP_EMAIL } from '../app/app.constants';

export const CAREERS_PATH = '/trabaja-con-nosotros';

export const CAREERS_EYEBROW = 'Carreras';

export const CAREERS_TITLE = 'Trabaja con nosotros';

export const CAREERS_INTRO =
  'Buscamos personas con ganas de enseñar, crear y cuidar la experiencia de familias y alumnos. Envía tu candidatura y te contactamos si encaja.';

export const CAREERS_EMAIL = APP_EMAIL;

export const CAREERS_SUCCESS =
  'Hemos recibido tu candidatura. Revisaremos tu perfil y te contactaremos si hay una oportunidad adecuada.';

export const CAREERS_HIGHLIGHTS = [
  'Clases online en directo con grupos reducidos',
  'Equipo pequeño, cercano y con foco en calidad',
  'Proceso sencillo: CV + breve presentación',
] as const;

export const CAREERS_POSITIONS = [
  { value: 'Profesor/a', label: 'Profesor/a' },
  { value: 'Desarrollador/a', label: 'Desarrollador/a' },
  { value: 'Soporte técnico', label: 'Soporte técnico' },
  { value: 'Marketing / Contenido', label: 'Marketing / Contenido' },
  { value: 'Otro', label: 'Otro' },
] as const;

export const CAREERS_CV_ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const CAREERS_ATTACHMENT_ACCEPT =
  '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/webp';

export const CAREERS_MAX_FILE_BYTES = 5 * 1024 * 1024;
export const CAREERS_MAX_ATTACHMENTS = 3;
