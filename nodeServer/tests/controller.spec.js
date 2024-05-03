
const request = require('supertest');
//const sinon = require('sinon');
const controller = require("../controller.js");
const app = require("../server.js");
//const expect = require("chai").expect;
const jest = require("jest");
describe('Test GET /id', ()=>{
    it('should generate uuid', async ()=>{
        var res = await request(app).get("/id");
        expect(res.status).to.equal(200);
        expect(res.text).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    })
});
describe('Test GET /user', ()=>{
    var stub;

    beforeEach(() => {
        stub = sinon.stub(controller, "getUserDetails");
    });
    afterEach(() => {
        sinon.restore();
    })

    it('should send all user details', async () => {
        stub.returns(1)
        var user = await request(app).get('/user');
        
        sinon.assert.calledOnce(stub)
    })
    it('should fail when no table found', async (done) => {
        //var user = await request(app).get('/user');
        //expect(user)
    })
});
describe('Test POST /user', ()=>{

})