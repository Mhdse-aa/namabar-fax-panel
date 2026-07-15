import { Buffer } from 'node:buffer';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  const { path = [] } = req.query;

  const queryString = req.url.includes('?')
    ? req.url.slice(req.url.indexOf('?'))
    : '';

  const targetUrl = `https://api.namabar.com/panel/${path.join('/')}${queryString}`;

  try {
    const headers = {
      Authorization: req.headers.authorization || '',
      'x-api-key': req.headers['x-api-key'] || '',
    };

    if (req.headers['content-type']) {
      headers['content-type'] = req.headers['content-type'];
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    const contentType = response.headers.get('content-type') || 'application/json';
    const buffer = await response.arrayBuffer();

    res.status(response.status);
    res.setHeader('Content-Type', contentType);
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({
      message: 'Proxy request failed',
      error: error.message,
    });
  }
}
