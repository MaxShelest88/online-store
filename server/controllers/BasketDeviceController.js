import { BasketDevice, Basket, Device } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class BasketDeviceController {
  async getAll(req, res, next) {
    const { id } = req.params;
    const userBasket = await Basket.findOne({ where: { userId: id } });
    if (userBasket) {
      const devices = await Device.findAll({
        include: { model: BasketDevice, where: { basketId: userBasket.id } },
      });
      return res.json(devices);
    } else {
      return next(ApiError.badRequest('Пользователь не найден'));
    }
  }
}

export default new BasketDeviceController();
