import axios from 'axios';

// для обычных запросов без авторизации
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// для добавления токена в запрос
const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// добавляем токен в заголовки
const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

// добавляем интерцептор для запроса.
// будет отрабатывать перед каждым запросом и подставлять хедер с токеном
$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
