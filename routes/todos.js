var express = require("express");
var router = express.Router();

const todos = [{ id: 1, name: "do something cool", completed: false }];

/* GET todos. */
router.get("/", function (req, res, next) {
  res.json(todos);
});

module.exports = router;
