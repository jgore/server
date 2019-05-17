import sinon from "sinon";
import chai from "chai";
import mongoose from "mongoose";
import sinonMongoose from "sinon-mongoose";
import CourseModel from "../../models/Course";

const { expect } = chai;

describe("get all comments", function() {
  it("should return all courses", function(done) {
    const CourseMock = sinon.mock(CourseModel);
    const expectedResult = [];
    CourseMock.expects("find").yields(null, expectedResult);
    CourseModel.find(function(err, result) {
      CourseMock.verify();
      CourseMock.restore();
      expect(result).to.be.an("array");
      done();
    });
  });

  

});
