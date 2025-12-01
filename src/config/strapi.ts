export const STRAPI_URL = 'https://worthy-fireworks-32871ed61d.strapiapp.com';
export const STRAPI_API_URL = `${STRAPI_URL}/api`;

export const STRAPI_ENDPOINTS = {
  athletes: '/athletes',
  products: '/products',
  posts: '/posts',
  causes: '/causes',
  events: '/events',
  trainings: '/trainings',
} as const;
