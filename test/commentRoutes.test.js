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

describe("post comment", function() {
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
              shortTitle: "Korepetycje2",
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

  it("should post new comment", function(done) {
    chai
      .request(server)
      .post(`/api/comments`)
      .set("token", token)
      .send({
        opinion: {
          shortTitle: "Korepetycje2",
          content: "Czy to jest dobry kurs"
        }
      })
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new comment with missing token", function(done) {
    chai
      .request(server)
      .post("/api/comments")
      .send({
        opinion: {
          shortTitle: "Korepetycje2",
          content: "Czy to jest dobry kurs"
        }
      })
      .end((err, res) => {
        validResponse(err, res, 401);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new comment with invalid token", function(done) {
    chai
      .request(server)
      .post("/api/comments")
      .set("token", "invalid token")
      .send({
        opinion: {
          shortTitle: "Korepetycje2",
          content: "Czy to jest dobry kurs"
        }
      })
      .end((err, res) => {
        validResponse(err, res, 401);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new comment with missing shortTitle", function(done) {
    chai
      .request(server)
      .post("/api/comments")
      .set("token", token)
      .send({
        opinion: {
          content: "Czy to jest dobry kurs"
        }
      })
      .end((err, res) => {
        validResponse(err, res, 400);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new comment with missing content", function(done) {
    chai
      .request(server)
      .post("/api/comments")
      .set("token", token)
      .send({
        opinion: {
          shortTitle: "asdadsadsads"
        }
      })
      .end((err, res) => {
        validResponse(err, res, 400);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not post new comment with not existing course", function(done) {
    chai
      .request(server)
      .post("/api/comments")
      .set("token", token)
      .send({
        opinion: {
          shortTitle: "asdadsadsads",
          content: "Czy to jest dobry kurs"
        }
      })
      .end((err, res) => {
        validResponse(err, res, 404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

describe("update comment", function() {
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
              shortTitle: "Korepetycje3",
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
              Course.updateOne(
                { shortTitle: "Korepetycje3" },
                {
                  $push: {
                    comments: {
                      $each: [
                        {
                          content: "dasaddsa",
                          user,
                          createdAt: new Date()
                        }
                      ],
                      $position: 0
                    }
                  }
                }
              ).then(() => {
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

  it("should update comment", function(done) {
    chai
      .request(server)
      .put("/api/comments/Korepetycje3")
      .set("token", token)
      .send({
        content: "zmieniony content"
      })
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not update comment with missing content", function(done) {
    chai
      .request(server)
      .put("/api/comments/Korepetycje3")
      .set("token", token)
      .send({})
      .end((err, res) => {
        validResponse(err, res, 400);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not update comment with missing token", function(done) {
    chai
      .request(server)
      .put("/api/comments/Korepetycje3")
      .send({
        content: "zmieniony content"
      })
      .end((err, res) => {
        validResponse(err, res, 401);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not update comment with invalid token", function(done) {
    chai
      .request(server)
      .put("/api/comments/Korepetycje3")
      .set("token", "asdasd")
      .send({
        content: "zmieniony content"
      })
      .end((err, res) => {
        validResponse(err, res, 401);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not update comment with not existing course", function(done) {
    chai
      .request(server)
      .put("/api/comments/saddasdaddasdsa")
      .set("token", token)
      .send({
        content: "zmieniony content"
      })
      .end((err, res) => {
        validResponse(err, res, 404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

describe("delete comment", function() {
  let token, comment;
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
              shortTitle: "Korepetycje4",
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
              Course.updateOne(
                { shortTitle: "Korepetycje4" },
                {
                  $push: {
                    comments: {
                      $each: [
                        {
                          content: "dasaddsa",
                          user,
                          createdAt: new Date()
                        }
                      ],
                      $position: 0
                    }
                  }
                }
              ).then(stats => {
                Course.findOne({ shortTitle: "Korepetycje4" }).then(course => {
                  comment = course.comments[0];
                  done();
                });
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

  it("should delete comment", function(done) {
    chai
      .request(server)
      .post("/api/comments/delete")
      .set("token", token)
      .send({
        shortTitle: "Korepetycje4",
        _id: comment._id
      })
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not update comment with missing _id", function(done) {
    chai
      .request(server)
      .post("/api/comments/delete")
      .set("token", token)
      .send({
        shortTitle: "Korepetycje4"
      })
      .end((err, res) => {
        validResponse(err, res, 400);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not update comment with missing token", function(done) {
    chai
      .request(server)
      .post("/api/comments/delete")
      .send({
        shortTitle: "Korepetycje4",
        _id: comment._id
      })
      .end((err, res) => {
        validResponse(err, res, 401);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not update comment with invalid token", function(done) {
    chai
      .request(server)
      .post("/api/comments/delete")
      .set("token", "asdaads")
      .send({
        shortTitle: "Korepetycje4",
        _id: comment._id
      })
      .end((err, res) => {
        validResponse(err, res, 401);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should not update comment with not existing course", function(done) {
    chai
      .request(server)
      .post("/api/comments/delete")
      .set("token", token)
      .send({
        shortTitle: "asdasdadsdasdas",
        _id: comment._id
      })
      .end((err, res) => {
        validResponse(err, res, 404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});
