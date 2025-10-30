import dotenv from 'dotenv';

dotenv.config();

export const HOST = '0.0.0.0';

if (!process.env.PORT)
  console.log('[BACKEND] PORT not specified, defaulting to 3000');
export const PORT = Number(process.env.PORT) || 3000;

if (!process.env.FRONTEND_URL)
  console.log('[BACKEND] FRONTEND_URL not specified, defaulting to localhost:5173');
export const FRONTEND_URL = process.env.FRONTEND_URL as string || 'http://localhost:5173';


