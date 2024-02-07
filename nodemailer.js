const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: "test_testovich2024@mail.ru",
    pass: "gd2uCQbWpq6KjPqcQWn2",
  },
});

transporter.verify((error, success) => {
  error
    ? console.log(error)
    : console.log("Server is ready to take our messages: ", success);
});

function mailer(mess) {
  transporter.sendMail(mess, (err, info) => {
    if (err) {
      return console.log(err);
    }
    console.log("Message send", info);
  });
}

module.exports = mailer;
