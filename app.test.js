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
              id: expect.any(Number),
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
      .expect(200)
      .expect("Content-Type", /json/)

      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("GET /todos/id --> return 404 if id hasn't been found", () => {
    return request(app).get("/todos/9999").expect(404);
  });

  it("POST /todos --> validate body request", () => {
    return request(app).post("/todos").send({ name: 123 }).expect(422);
  });

  it("POST /todos --> created todo", () => {
    return (
      request(app)
        .post("/todos")
        .send({ name: "do something" })
        .expect(201)
        .expect("Content-Type", /json/)
        // .expect((response) => { console.log(response); }) you can log response to check error
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: "do something",
              completed: false,
            })
          );
        })
    );
  });
});
