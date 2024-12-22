const request = require("supertest");
const app = require("../src/index");


describe("GET /api/assets", () => {
  it("should return a 200 status and a list of assets", async () => {
    const response = await request(app).get("/api/assets");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

afterAll((done) => {
  // Ensure the Prisma client disconnects after tests
  app.listen().close(() => {
    done();
  });
});
