// express - фреймворк для приложений node.js
import express from 'express';
// для считывания с файла переменных окружения
import dotenv from 'dotenv';
import sequelize from './db.js';
// создаются таблицы
import models from './models/models.js';
// для отправки fetch запросов с браузера
import cors from 'cors';
import router from './routes/index.js';
import { errorHandler } from './middleware/ErrorHandlingMiddleware.js';


const env = dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router)
// миддл варе, который работает с ошибками, всегда должен регистрироваться в конце
// обработка ошибок. Он последний в цепочке, поэтому мы не вызвали в нем ф-цию next
app.use(errorHandler)

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'все ок' });
// });

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
