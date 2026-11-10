// La dirección pública del sitio, para armar links completos: los que leen Google,
// las redes al compartir y el sitemap. En Vercel sale del dominio de producción
// (www.emistudio.com.ar); en la compu, localhost.

const dominio = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const URL_SITIO = dominio ? `https://${dominio}` : 'http://localhost:3000';

export const NOMBRE_ESTUDIO = 'Emi Studio';
