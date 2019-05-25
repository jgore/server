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

describe("get all comments", function() {
  it("should return all courses", function(done) {
    chai
      .request(server)
      .get("/api/courses")
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("get course by shortTitle", function() {
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
              Course.update(
                { _id: course._id },
                {
                  $push: {
                    reviews: {
                      content: "Zawartość",
                      grade: 5,
                      user: {
                        googleId: "googleId",
                        name: "name",
                        email: "email@email.com",
                        phone: "000000000"
                      }
                    }
                  }
                }
              ).then(course => {
                done();
              });
            });
          });
        });
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });

  it("should return course", function(done) {
    chai
      .request(server)
      .get(`/api/courses/Korepetycje`)
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return 404", function(done) {
    chai
      .request(server)
      .get("/api/courses/niema")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should return course, invalid token", function(done) {
    chai
      .request(server)
      .get("/api/courses/Korepetycje")
      .set("token", "invalid-token")
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("course");
        expect(res.body).to.not.have.property("isReviewed");
        done();
      });
  });

  it("should return course, valid token", function(done) {
    chai
      .request(server)
      .get(`/api/courses/Korepetycje`)
      .set("token", token)
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("isReviewed");
        expect(res.body).to.have.property("course");
        done();
      });
  });

  it("should return course and user should has isReviewed true", function(done) {
    chai
      .request(server)
      .get(`/api/courses/Korepetycje`)
      .set("token", token)
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("isReviewed");
        expect(res.body).to.have.property("course");
        expect(res.body).to.include({ isReviewed: true });
        done();
      });
  });
});

describe("get all videos", function() {
  it("should return videos", function(done) {
    chai
      .request(server)
      .get("/api/videos")
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});
