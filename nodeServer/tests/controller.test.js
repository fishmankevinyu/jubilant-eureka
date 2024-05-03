import request from "supertest";
import controller from "../controller.js";
import app from "../server.js";
import { Client } from 'pg';

jest.mock('pg', () => {
    const mClient = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn(),
    };
    return { Client: jest.fn(() => mClient) };
});

describe("Controller Unit Testing", () => {
    describe("GET /id", () => {
        it("should generate uuid", async () => {
            var res = await request(app).get('/id');
            expect(res.text).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        })
    });
    var client;
    beforeEach(() => {
        client = new Client();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /user", () => {
 
        it("should get all users", async () => {
            client.query.mockResolvedValue({
                rows: [{
                    name: "John Doe",
                    email: "doej@gmail.com"
                }]
            })
            var res = await request(app).get('/user');
            var users = res.body.rows;
            expect(res.status).toBe(200);
            expect(client.connect).toHaveBeenCalledTimes(1);
            expect(client.end).toHaveBeenCalledTimes(1);
        });
        it("should fail", async () => {
            client.query.mockRejectedValue(new Error("Ops"));
            var res = await request(app).get('/user');
            expect(res.status).toBe(500);
            expect(client.connect).toHaveBeenCalledTimes(1);
            expect(client.end).toHaveBeenCalledTimes(1);
        });
    });
    describe("POST /user", () => {
        it("should post a new user to db", async() => {
            client.query.mockResolvedValue({
                rowCount: 1,
                rows: [{
                    name: "John Doe",
                    email: "doej@gmail.com"
                }]
            })
            var res = await request(app).post('/user');
            expect(res.status).toBe(200);
            expect(client.connect).toHaveBeenCalledTimes(1);
            expect(client.end).toHaveBeenCalledTimes(1);
        });
        it("should fail", async() => {
            client.query.mockRejectedValue(new Error("Ops"));
            var res = await request(app).post('/user');
            expect(res.status).toBe(500);
            expect(client.connect).toHaveBeenCalledTimes(1);
            expect(client.end).toHaveBeenCalledTimes(1);
        })
    });
});