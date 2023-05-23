// для генерации имени
import * as uuid from 'uuid';
// для указания поути размещения файла
import * as path from 'path';
import { Device, DeviceInfo, BasketDevice, Basket, Rating } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import { fileURLToPath } from 'url';
import { log } from 'console';
import sequelize from '../db.js';

//  изза того, что модули используются, __dirname не доступен глобально, и необходимо делать такой финт
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeviceController {
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    //   отступ
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      //  findAll возращает айтемы
      //   findAndCountAll - возращает айтемы и их количество
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset });
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    return res.json(device);
  }
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;

      //   генерируем название файла
      let fileName = uuid.v4() + '.jpg';
      //   пепемешаем полученный файл
      //   resolve адаптирует указанный путь к операционной системе
      // __dirname - путь до текущей папки с контроллерами
      //  две точки - выходим на директорию выше
      //   'static' - переходим в папку static
      //   fileName - под каким именем переместится файл
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      //   создаем дивайс
      const device = await Device.create({ name, price, brandId, typeId, info, img: fileName });
      if (info) {
        //  через форм дату передается значение в стороковом виде, поэтому
        //  здесь нужно предобразовать в объект
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }
      return res.json(device);
    } catch (error) {
      //  если какая-то ошибка
      next(ApiError.badRequest(error.message));
    }
  }
  async createBasketDevice(req, res, next) {
    const { id, userId } = req.body;
    const userBasket = await Basket.findOne({ where: { userId } });
    const deviceBasket = await BasketDevice.create({ deviceId: id, basketId: userBasket.id });
    return res.json(deviceBasket);
  }

  async rate(req, res, next) {
    const { userId, deviceId, rate } = req.body;
    const userRaiting = await Rating.findOne({ where: { userId } });
    if (userRaiting) {
      const updateRating = await Rating.update({ rate: rate }, { where: { id: deviceId } });
    }
    const deviceRate = await Rating.create({ userId, deviceId, rate });
    const ratingAvg = await Rating.findOne({
      attributes: [sequelize.fn('AVG', sequelize.col('rate'))],
      raw: true,
    });

    const updatedDevice = await Device.update(
      {
        rating: Math.floor(Number(ratingAvg.avg)),
      },
      { where: { id: deviceId } },
    );
    return res.json(updatedDevice);
  }
}

export default new DeviceController();
