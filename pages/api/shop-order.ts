import { NextApiRequest, NextApiResponse } from 'next';
import { API_DOMAIN, API_TOKEN } from '@/shared/config/environment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const order = req.body;
    const data = await fetch(`${API_DOMAIN}/api/shop-orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: order,
    });
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}
