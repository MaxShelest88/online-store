import { Type } from '../models/models.js';

class TypeController {
  async getAll(req, res) {}
  async create(req, res) {
    const { name } = req.body
    const type = await Type.create({ name })
    return res.json(type)
  
  }
}

export default new TypeController();
