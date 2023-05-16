// для генерации имени
import * as uuid from 'uuid';
// для указания поути размещения файла
import * as path from 'path';
import { Device, DeviceInfo } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import { fileURLToPath } from 'url';

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
      const { name, price, brandId, typeId, info } = req.body;
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
}

export default new DeviceController();
