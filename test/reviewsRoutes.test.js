process.env.NODE_ENV = "test";

const chai = require("chai");
const server = require("../index");
const chaiHttp = require("chai-http");
const User = require("../models/User");
const Course = require("../models/Course");
const { createToken } = require("../services/token");

const { expect } = chai;

chai.use(chaiHttp);

function validResponse(err, res, status) {
  expect(err).to.be.null;
  expect(res).to.have.status(status);
  expect(res).to.be.json;
}

describe("post reviews", function() {
  let token;
  before(done => {
    Course.remove({})
      .then(r => {
        User.remove({}).then(stat => {
          User.create({
            googleId: "googleId",
            name: "name",
            email: "email@email.com",
            phone: "000000000"
          }).then(user => {
            token = createToken({ googleId: user.googleId });
            Course.create({
              title: "Tytuł",
              shortTitle: "Korepetycje",
              video: {
                link: "http://",
                title: "Tytuł",
                shortDescription: "video desc"
              },
              content: "zawartość",
              image: "gosc.jpg",
              duration: "2 tygonie",
              price: "120zł/h",
              shortDescription: "Krótki opis",
              technologies: ["Java", "Javascript"],
              maxMembers: "12/12",
              reviews: [],
              comments: []
            }).then(course => {
              done();
            });
          });
        });
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });

  it("should post new review", function(done) {
    chai
      .request(server)
      .post(`/api/reviews`)
      .set("token", token)
      .send({
        opinion: {
          shortTitle: "Korepetycje",
          content: "TO jest dobry kurs",
          grade: 10
        }
      })
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new review with missing token", function(done) {
    chai
      .request(server)
      .post(`/api/reviews`)
      .send({
        opinion: {
          shortTitle: "Korepetycje",
          content: "TO jest dobry kurs",
          grade: 10
        }
      })
      .end((err, res) => {
        validResponse(err, res, 401);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new review with invalid token", function(done) {
    chai
      .request(server)
      .post(`/api/reviews`)
      .set("token", "invalid token")
      .send({
        opinion: {
          shortTitle: "Korepetycje",
          content: "TO jest dobry kurs",
          grade: 10
        }
      })
      .end((err, res) => {
        validResponse(err, res, 401);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new review with existing review in course", function(done) {
    chai
      .request(server)
      .post(`/api/reviews`)
      .set("token", token)
      .send({
        opinion: {
          shortTitle: "Korepetycje",
          content: "TO jest dobry kurs",
          grade: 10
        }
      })
      .end((err, res) => {
        validResponse(err, res, 409);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new review with missing shortTitle", function(done) {
    chai
      .request(server)
      .post(`/api/reviews`)
      .set("token", token)
      .send({
        opinion: {
          content: "TO jest dobry kurs",
          grade: 10
        }
      })
      .end((err, res) => {
        validResponse(err, res, 400);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new review with not existing course", function(done) {
    chai
      .request(server)
      .post(`/api/reviews`)
      .set("token", token)
      .send({
        opinion: {
          shortTitle: "nie istnieje",
          content: "TO jest dobry kurs",
          grade: 10
        }
      })
      .end((err, res) => {
        validResponse(err, res, 404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});
