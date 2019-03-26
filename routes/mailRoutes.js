const sendEmail = require('./../services/mailer')

module.exports = (app) => {

  app.post('/api/sendEmail', (req, res) => {

    console.log("POST SEND EMAIL ")

    var options = {
      subject: req.body.subject,
      text: req.body.text
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
