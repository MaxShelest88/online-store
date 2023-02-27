import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

// имя модели - 'user'
const User = sequelize.define('user', {
  // тип - число, primaryKey - первичный ключ, и будет автоинкрементироваться, те послед. записи будут +1
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // тип - строка, должен не повторяться у пользователей
  email: { type: DataTypes.STRING, unique: true },
  // тип - строка, может повторяться у пользователей
  password: { type: DataTypes.STRING },
  // по умолчанию будем делать пользователя просто юзером
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Basket = sequelize.define('basket', {
  // тип - число, primaryKey - первичный ключ, и будет автоинкрементироваться, те послед. записи будут +1
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define('basket_device', {
  // тип - число, primaryKey - первичный ключ, и будет автоинкрементироваться, те послед. записи будут +1
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define('device', {
  // тип - число, primaryKey - первичный ключ, и будет автоинкрементироваться, те послед. записи будут +1
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // allowNull false - не может быть равно нулю
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
  // тип - число, primaryKey - первичный ключ, и будет автоинкрементироваться, те послед. записи будут +1
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define('brand', {
  // тип - число, primaryKey - первичный ключ, и будет автоинкрементироваться, те послед. записи будут +1
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
  // тип - число, primaryKey - первичный ключ, и будет автоинкрементироваться, те послед. записи будут +1
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define('device_info', {
  // тип - число, primaryKey - первичный ключ, и будет автоинкрементироваться, те послед. записи будут +1
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Описание связей моделей
// Все внешние ключи sequelize добавит сам при связывании

// // одна запись девайса в бд имеет много записей с характеристиками
// Device.hasMany(DeviceInfo)

// // для DeviceInfo указываем что эта сущность пренадлежит Device
// DeviceInfo.belongesTo(Device);

// cсвязь один к одному
User.hasOne(Basket);
// корзина пренадлежит пользователю
Basket.belongsTo(User);

// пользователь может иметь несколько оценок
User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

// связь многие ко многим
// необходимо указать связующую таблицу - связующую модель
Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export default {
  User,
  Basket,
  BasketDevice,
  Brand,
  Device,
  DeviceInfo,
  Rating,
  Type,
  TypeBrand,
};
