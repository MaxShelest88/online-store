// Собственный класс ошибок
// расширяем базовый класс Error и создавем собственные типы ошибок
class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  // статические функции - это функции, кот можно вызывать без создания объекта
  // можем обращаться на прямую к классу и вызывать ту или иную функцию
  static badRequest(message) {
    // возвращаем новый объект apierror
    //   если return заменить на thow, то ошибка будет отображаться на сервере и приложение крашится
    return new ApiError(404, message);
  }
  static internal(message) {
    return new ApiError(500, message);
  }
  static forbidden(message) {
    return new ApiError(403, message);
  }
}

export default ApiError;
