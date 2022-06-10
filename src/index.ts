async function redirect(request: Request): Promise<Response> {
  const url = new URL(request.url);
  url.hostname = url.hostname.replace('www.', '');

  const headers = new Headers({
    location: url.toString()
  });

  return new Response('Moved Permanently', { status: 301, headers });
}

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.hostname.startsWith('www.')) {
    return await redirect(request);
  }

  return new Response('Bad Request', { status: 400 });
}

export default {
  async fetch(request: Request): Promise<Response> {
    return await handleRequest(request);
  }
};
