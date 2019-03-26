var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'goreit1@gmail.com',
    pass: 'ymgrabmdjnhhteqp'
  }
});

var sendEmail = function ({subject, text, email}, callback) {

  var mailOptions = {
    from: 'goreit1@gmail.com',
    to: 'p.szczepkowski87@gmail.com',
    subject,
    text,
  };

  transporter.sendMail(mailOptions, callback)
}


module.exports =  sendEmail