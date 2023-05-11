import ApiError from "../error/ApiError.js";


class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  async check(req, res, next) {
    //   получаем параметры строки запроса через req.query
	  const { id } = req.query;
	  if (!id) {
		  return next(ApiError.badRequest('не задан ID'))
	  }
	  res.json(id)
  }
}

export default new UserController();
