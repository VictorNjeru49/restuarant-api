"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const users_controller_1 = require("./users.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.userRouter = new hono_1.Hono();
exports.userRouter.get("/users", authormiddle_1.adminRoleAuth, users_controller_1.userstate);
// get all addresses
exports.userRouter
    .post("/users", (0, zod_validator_1.zValidator)('json', validators_1.usersValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, users_controller_1.createuserController)
    .delete("/users", authormiddle_1.adminRoleAuth, users_controller_1.deleteuserController);
// get address by id
exports.userRouter
    .get("/users/:id", authormiddle_1.bothRoleAuth, users_controller_1.getuserController)
    .put("/users/:id", authormiddle_1.adminRoleAuth, users_controller_1.updateuserController)
    .delete("/users/:id", authormiddle_1.bothRoleAuth, users_controller_1.deleteuserController);
