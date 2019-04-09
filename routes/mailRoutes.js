const sendEmail = require('./../services/mailer')

const mongoose = require('mongoose')

const Message = mongoose.model('messages')


module.exports = (app) => {

  app.post('/api/sendEmail', (req, res) => {

    console.log("POST SEND EMAIL ")

    const message = new Message(
      {
        subject: req.body.subject,
        text: req.body.text,
        email: req.body.email,
        phone: req.body.phone
      }).save(function (err, message) {
      if (err) console.log(err)
      return message
    })


    var options = {
      subject: req.body.subject,
      text: req.body.text,
      email: req.body.email,
      phone : req.body.phone
    }
    sendEmail(options, function (error, info) {
      if (error) {
        console.log(error);
        res.end("problem appeared when sending email")
      } else {
        console.log('Email sent: ' + info.response);
        res.end("email sent correctly")
      }
    })

  })


}
