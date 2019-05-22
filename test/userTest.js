/*process.env.NODE_ENV = 'test'


 let chai = require('chai');
 let chaiHttp = require('chai-http');
 let should = chai.should();
 let expect = chai.expect;

 process.env.NODE_ENV = 'test';


 chai.use(chaiHttp);

 describe('users CRUD rest', () => {
   it('get all users ', (done) => {
     chai.request('http://localhost:5000')
       .post("/api/sendEmail")
         .send({title: 'testTitle', text: 'testText'})
       .end(function (err, res) {
         expect(res).to.have.status(200);
         var body = res.body
         done();                               // <= Call done to signal callback end
       });
   })

   it('get one user ', (done) => {
     chai.request('http://localhost:8088/')
       .get("user/1")
       .end(function (err, res) {
         expect(res).to.have.status(200);
         var body = res.body
         done();                               // <= Call done to signal callback end
       });
   })

   it(' add user ', (done) => {
     chai.request('http://localhost:8088/')
       .post("user")
       .send({ login: "krokoski", email: "dupa@gmail.com" })
       .end(function (err, res) {
         expect(res).to.have.status(200);
         var body = res.body
         done();                               // <= Call done to signal callback end
       });
   })

   it(' update user ', (done) => {
     chai.request('http://localhost:8088/')
     .put("user")
       .send({ id:"1", login: "krokoski", email: "dupa@gmail.com" })
       .end(function (err, res) {
         expect(res).to.have.status(200);
         var body = res.body
         done();                               // <= Call done to signal callback end
       });
   })

 })*/
