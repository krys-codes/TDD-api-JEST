var express = require("express");
var router = express.Router();
var createError = require("http-errors");

const todos = [{ id: 1, name: "do something", completed: false }];

/* GET todos. */
router.get("/", function (req, res, next) {
  res.json(todos);
});
router.get("/:id", function (req, res, next) {
  const findTodo = todos.find((todo) => todo.id === Number(req.params.id));
  if (!findTodo) {
    return next(createError(404, "id not found"));
  }
  res.json(findTodo);
});

router.post("/", function (req, res, next) {
  const { body } = req;

  if (typeof body.name !== "string") {
    return next(createError(422, "Validation error"));
  }

  const newTodo = {
    id: todos.length + 1,
    name: body.name,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = router;
