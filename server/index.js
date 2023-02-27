import express from 'express';
// для считывания с файла переменных окружения
import dotenv from 'dotenv';
import sequelize from './db.js';
import models from './models/models.js';
// для отправки запросов с браузера
import cors from 'cors';

const env = dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'все ок' });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Подключение к бд установлено');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
