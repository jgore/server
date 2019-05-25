// process.env.NODE_ENV = "test";

// const chai = require("chai");
// const server = require("../index");
// const chaiHttp = require("chai-http");
// const { addToRedis } = require("../config/connectToCache");
// const Message = require("../models/Message");

// const { expect } = chai;

// chai.use(chaiHttp);

// describe("sending emails", function() {
//   before(() => {
//     return new Promise((resolve, reject) => {
//       Message.remove({}, err => {
//         if (err) {
//           reject();
//         }
//         resolve();
//       });
//     });
//   });
//   it("should send email with all fields", async function(done) {
//     const { body } = await chai
//       .request(server)
//       .post("/api/sendEmail")
//       .send({ subject: "testTitle", text: "testText" });

//     console.log(body);
//     expect(body).to.have.status(200);
//     done();
//   }).timeout(10000);

//   it("should return 400 with missing fields", async function(done) {
//     const { body } = await chai
//       .request(server)
//       .post("/api/sendEmail")
//       .send({ subject: "testTitle" });

//     console.log(body);
//     expect(body).to.have.status(400);
//     done();
//   }).timeout(10000);
// });
