import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 25 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 75 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  // Login
  const loginRes = http.post(
    'http://localhost/api/auth/login/',
    JSON.stringify({
      username: 'admin',
      password: 'admin123',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(loginRes, {
    'login OK': (r) => r.status === 200,
  });

  const token = loginRes.json('access');

  // Consultar clientes autenticado
  const clientesRes = http.get(
    'http://localhost/api/clientes/',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  check(clientesRes, {
    'clientes OK': (r) => r.status === 200,
  });
}