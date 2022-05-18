const request = require("supertest");
const app = require("./app");

describe("ToDo test", () => {
  it("GET /todos --> validate body request", () => {});
  it("GET /todos --> array todos", () => {});
  it("GET /todos/id --> return 404 if id hasn't been found", () => {});

  it("POST /todos --> created todos", () => {});
  it("GET /todos/id --> get specific todo by id", () => {});
});
