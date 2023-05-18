import { $host, $authHost } from '.';

export const registration = async (email, password) => {
  const resp = await $host.post('api/auth/registration', { email, password });
};
