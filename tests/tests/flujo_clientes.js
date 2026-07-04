import http from 'k6/http';

export const options = {
  vus: 50,
  duration: '1m',
};

export function setup() {
  const res = http.post('http://localhost/api/auth/login/', JSON.stringify({
    username: 'admin',
    password: 'admin123'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  return {
    token: res.json('access')
  };
}

export default function (data) {
  http.get('http://localhost/api/clientes/', {
    headers: {
      Authorization: `Bearer ${data.token}`
    }
  });
}