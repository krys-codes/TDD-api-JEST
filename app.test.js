const request = require("supertest");
const app = require("./app");

describe("ToDo test", () => {
  it("GET /todos --> array todos", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });
  it("GET /todos/id --> get specific todo by id", () => {
    return request(app)
      .get("/todos/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("GET /todos/id --> return 404 if id hasn't been found", () => {
    return request(app).get("/todos/999").expect(404);
  });

  it("GET /todos --> validate body request", () => {
    return request(app).post("/todos/").send({ name: 1234556 }).expect(422);
  });

  it("POST /todos --> created todos", () => {
    return request(app)
      .post("/todos/")
      .send({ name: "do something" })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });
});
