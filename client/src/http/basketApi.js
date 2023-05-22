import { $host, $authHost } from '.';

export const addDeviceToBasket = async (id, userId) => {
  const { data } = await $authHost.post('api/device/' + id, { id, userId });
  return data;
};

export const fetchBasketDevices = async (userId) => {
  const { data } = await $authHost.get('api/basket/' + userId);
  return data;
};
