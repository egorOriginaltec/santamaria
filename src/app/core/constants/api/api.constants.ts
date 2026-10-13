/**
 * Empty = same-origin via Angular proxy (proxy.conf.json → artisan serve).
 * Avoids cross-origin cookie / CSRF 419 issues with Sanctum.
 */
export const API_BASE_URL = '';
export const SWAGGER_DOCS_URL = '/api/documentation';
