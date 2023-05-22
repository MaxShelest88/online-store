import { BasketDevice, Basket } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class BasketDeviceController {
  async getAll(req, res) {
    const basketDevices = await BasketDevice.findAll();
    return res.json(basketDevices);
  }

//   async create(req, res) {
//     const { id } = req.params;
//     const userBasket = await Basket.findOne({ where: { userId } });
//     const basketDevice = await BasketDevice.create({ id, basketId: userBasket.id });
//     return res.json(basketDevice);
//   }

  //   async create(req, res) {
  //     const { id } = req.body;
  //     const type = await Type.create({ name });
  //     return res.json(type);
  //   }
}

export default new BasketDeviceController();
