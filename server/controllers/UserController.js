import ApiError from '../error/ApiError.js';
import { User, Basket } from '../models/models.js';
// хеширование пароля, что бы не хранить в бд в открытом виде
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {
      id,
      email,
      role,
    },
    process.env.SECRET_KEY,
    // время жизни токена
    {
      expiresIn: '24h',
    },
  );
};

// TODO посмотреть видео про jwt авторизацию

class UserController {
  async registration(req, res) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Неккоректный email или password'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    //  Роль после создания пользователя по умолчанию USER
    const token = generateJwt(user.id, user.email, user.role);
    //   возвращаем на клиент
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    //   сравниваем веденный пароль и который лежит в БВ в хэшированном виде
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  // функция middleware
  async check(req, res, next) {
    //  //   получаем параметры строки запроса через req.query
    //  const { id } = req.query;
    //  if (!id) {
    //    //   для прекращения работы функции пишем return
    //    return next(ApiError.badRequest('не задан ID'));
    //  }
    //  res.json(id);
    //   функция чек сводится к тому что бы сгенерировать новый токен и отправить его на клиент
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

export default new UserController();
