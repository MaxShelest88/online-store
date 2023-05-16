import { Brand } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class BrandController {
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }
}

export default new BrandController();
