import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const files = new Map([
  ['/', ['index.html', 'text/html']],
  ['/index.html', ['index.html', 'text/html']],
  ['/styles.css', ['styles.css', 'text/css']],
  ['/src/app.js', ['src/app.js', 'text/javascript']],
  ['/src/calculate.js', ['src/calculate.js', 'text/javascript']],
]);
createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = files.get(pathname);
  if (!file || !['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(404).end('Not found');
    return;
  }
  try {
    const body = await readFile(new URL(file[0], import.meta.url));
    response.writeHead(200, { 'Content-Type': `${file[1]}; charset=utf-8` });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500).end('Unable to load file');
  }
}).listen(4173, '127.0.0.1', () => console.log('Pocket is running at http://127.0.0.1:4173'));
