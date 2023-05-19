
import ApiError from '../error/ApiError.js';
// экспортирует функцию , которая принимает параметрами ошибку, запрос, ответ, и функцию next,

// которая передает управлению следующему в цепочке мидлваре
export default function errorHandler(err, req, res, next) {
  // если класс ошибки apierror
  if (err instanceof ApiError) {
    // возращаем ответ со статускодом, кот будем получать из ошибки и сообщением, кот в эту ошибку поместили
    return res.status(err.status).json({ message: err.message });
  }
  // если не является инстансом apierror, то получаем непредвиденную ошибку
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
