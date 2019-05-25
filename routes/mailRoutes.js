const sendEmail = require("./../services/mailer");

const mongoose = require("mongoose");

const Message = mongoose.model("messages");

module.exports = app => {
  app.post("/api/sendEmail", (req, res) => {
    let options = {
      subject: req.body.subject,
      text: req.body.text,
      email: req.body.email,
      phone: req.body.phone,
      online: req.body.online
    };
    
    process.nextTick(() => {
      const message = new Message(options).save(function(err, message) {
        if (err) console.log(err);
        return message;
      });
    });
    sendEmail(options, function(err, info) {
      if (err) {
        console.log(error);
        return res.status(400).send({
          code: 400,
          message: "Problem with send email"
        });
      } else {
        res.send({});
      }
    });
  });
};
