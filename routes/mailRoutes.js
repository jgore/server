const sendEmail = require('./../services/mailer')

const mongoose = require('mongoose')

const Message = mongoose.model('messages')


module.exports = (app) => {

  app.post('/api/sendEmail', (req, res) => {

    const message = new Message(
      {
        subject: req.body.subject,
        text: req.body.text,
        email: req.body.email,
        phone: req.body.phone,
        online: req.body.online,
        city: req.body.city
      }).save(function (err, message) {
      if (err) console.log(err)
      return message
    })


    let options = {
      subject: req.body.subject,
      text: req.body.text,
      email: req.body.email,
      phone : req.body.phone,
      online: req.body.online,
      city: req.body.city
    }
    sendEmail(options, function (error, info) {
      if (error) {
        console.log(error);
        res.end("problem appeared when sending email")
      } else {

        res.end("email sent correctly")
      }
    })

  })


}
