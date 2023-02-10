type Methods = 'GET' | 'POST' | 'PUT';

export function request(endpoint: string, payload: any, method: Methods = 'GET') {
  return fetch(`http://localhost:4000${endpoint}`, {
    method: method,
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
    },
  });
}
