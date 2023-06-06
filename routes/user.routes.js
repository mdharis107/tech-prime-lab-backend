const { Router } = require("express");
const { login } = require("../controllers/user.controller");

const UserRouter = Router();

UserRouter.post("/login", login);

module.exports = { UserRouter };
