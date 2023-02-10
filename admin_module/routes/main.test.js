const request = require("supertest");
const app = require('../app');
const {response} = require("express");

describe("Test the root path", () => {
    test("GET ROOT", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("VOID LOGIN", async() => {
        const res = await request(app).post('/login', {mail: '', password: ''});
        expect(res.body.status).toBe(false);
    });
    test("WRONG NEWS", async() => {
        const res = await request(app).get('/news-a');
        expect(res.statusCode).toBe(200);
    });

});