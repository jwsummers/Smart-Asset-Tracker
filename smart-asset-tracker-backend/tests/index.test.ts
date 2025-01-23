import request from "supertest";
import app from "../src/index";
import { Server } from "http";

let server: Server;

beforeAll(() => {
  server = app.listen(); // Start the server
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

describe("GET /api/assets", () => {
  it("should return a 200 status and a list of assets", async () => {
    const response = await request(app).get("/api/assets");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
