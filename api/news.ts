// api/news.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured.' });
  }

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao buscar notícias', error);
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
}
