const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'hienanh090399@gmail.com',
    pass: '01644247103'
  }
});

transporter.sendMail({
  from: 'Hien Anh <hienanh090399@gmail.com>',
  to: 'hung <vinhhungfk@gmail.com>',
  subject: 'Hello',
  text: 'Hello world?',
}).then(console.log).catch(console.error);
