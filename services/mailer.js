var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'goreit1@gmail.com',
    pass: 'ymgrabmdjnhhteqp'
  }
});

var sendEmail = function ({subject, text, email, phone, online}, callback) {

  text += `\n\n email : ${email}`
  text += `\n\n phone : ${phone}`
  text += `\n\n online : ${online}`
  text += `\n\n Pozdrawiamy,  \n Zespól GJava \n http://gjava.pl  \n tel : 535 106 204`


  var mailOptions = {
    from: 'goreit1@gmail.com',
    to: 'p.szczepkowski87@gmail.com',
    subject,
    text,
  };

  transporter.sendMail(mailOptions, callback)
}


module.exports = sendEmail