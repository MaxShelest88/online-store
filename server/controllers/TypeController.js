import { Type } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class TypeController {
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
  async create(req, res, next) {
    const { name } = req.body;
    const existingType = await Type.findOne({ where: { name } });
    if (existingType) {
      return next(ApiError.badRequest('Такой тип уже существует'));
    }
    const type = await Type.create({ name });
    return res.json(type);
  }
}

export default new TypeController();
