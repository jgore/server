const sendEmail = require('./../services/mailer')

describe('send email', () => {

    it('send email ', (done) => {

      var mailOptions = {
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };

      sendEmail(mailOptions)

      done()

    })

  }
)