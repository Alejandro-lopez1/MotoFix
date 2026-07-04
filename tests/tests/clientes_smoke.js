import http from 'k6/http';

export default function () {
    const res = http.get('http://192.168.100.5/api/clientes/');

    console.log(`Status: ${res.status}`);
    console.log(res.body);
}