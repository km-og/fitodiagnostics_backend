const express = require("express");
const cors = require("./middlewares/cors");
const { errors } = require("celebrate");
const mailer = require("./nodemailer");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const PORT = 3001;

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.post("/send-form", (req, res) => {
  const { company, userName, tel, email, sample, comment, selectedPathogen } =
    req.body;

  if (!company || !tel || !email) {
    return res.sendStatus(400).send({ message: "Что-то пошло не так..." });
  }

  const newSelectedPathogen = Object.values(selectedPathogen);

  const mess = {
    from: "<test_testovich2024@mail.ru>",
    // to: "mikniy@gmail.com",
    to: "fitodiagnostika@mail.ru",
    subject: "Получена заявка с сайта",
    text: `Получена заявка с сайта https://fitodiagnostika.ru/ 
    
    Данные из формы:

    Наименование компании: ${company}
    ФИО контактного лица:  ${userName}
    Контактный телефон: ${tel}
    E-mail: ${email}
    Наименование образца: ${sample}
    Комментарий к заявке: ${comment}
    Выбранные патогены: ${newSelectedPathogen}
    `,
  };
  mailer(mess);

  res.status(201).send({ message: "Заявка отправлена успешно!" });
});

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
