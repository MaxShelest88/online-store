import { $host, $authHost } from '.';
// чтобы сохранять инфу о пользователе что бы потом на странице эту инфу отрисовывавать
// для этого нужно распарсить токен, который возвращается в респонсе
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};
export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};
// проверяем токен. Если не валидный - разлогиниваемся
export const check = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
  } else {
    throw Error('не авторизован');
  }
};
