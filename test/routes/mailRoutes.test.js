
process.env.NODE_ENV = 'test';

const chai = require("chai");
const server = require("../../index");
const chaiHttp = require("chai-http");
const { addToRedis } = require("../../config/connectToCache");

const { expect } = chai;

chai.use(chaiHttp);

describe("sending emails", function() {
    it("should send email with all fields", function(done) {
        chai
            .request(server)
            .post("/api/sendEmail")
            .send({title: 'testTitle', text: 'testText'})
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});