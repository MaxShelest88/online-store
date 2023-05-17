// Middleware, проверящий авторизован ли пользователь

import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  // если метод опшнс то пропускаем
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; //Bearer slkdjfsldkfj - получаем токен по индексу 1
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    //   Декодируем токен
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //   к запросу добавляем поле user с данными, которые вытащили из токена
    //   и во всех функциях этот юзер будет доступен
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Не авторизован' });
  }
}
