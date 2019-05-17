const chai = require("chai");
const server = require("../../index");
const chaiHttp = require("chai-http");
const { addToRedis } = require("../../config/connectToCache");

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

describe("get comment by shortTitle", function() {
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

  it("should return 404 without shortTitle", function(done) {
    chai
      .request(server)
      .get("/api/courses/niema")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should return course with invalid token", function(done) {
    chai
      .request(server)
      .get("/api/courses/Korepetycje")
      .set("token", "invalid-token")
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.be.an("object");
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
