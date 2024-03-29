// express - фреймворк для приложений node.js
import express from 'express';
// для считывания с файла переменных окружения
import dotenv from 'dotenv';
// ORM
import sequelize from './db.js';
// создаются таблицы
import models from './models/models.js';
// для отправки fetch запросов с браузера
import cors from 'cors';
// для загрузки файлов
import fileUpload from 'express-fileupload'
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js'

import path from 'path';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json()); 
// файлы из папки static необходимо раздавать как статику
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router);
// миддл варе, который работает с ошибками, всегда должен регистрироваться в конце
// обработка ошибок. Он последний в цепочке, поэтому мы не вызвали в нем ф-цию next
// если нет id, то будет ответ от серера в виде ошибки серввера в HTML, а миддлеваре обрабаоывает его и делает на выходе json, 
// который мы потом можем обработать на странице, так же сохраняет код ошибки, сгенерированный сервером
app.use(errorHandler);

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
