"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const hono_1 = require("hono");
const comment_controller_1 = require("./comment.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.commentRouter = new hono_1.Hono();
exports.commentRouter.get("/comment", authormiddle_1.adminRoleAuth, comment_controller_1.getcomment);
// get all comment
exports.commentRouter
    .post("comment", (0, zod_validator_1.zValidator)('json', validators_1.commentValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.userRoleAuth, comment_controller_1.createcommentController);
// get comment by id
exports.commentRouter
    .get("/comment/:id", authormiddle_1.bothRoleAuth, comment_controller_1.getcommentController)
    .put("/comment/:id", authormiddle_1.userRoleAuth, comment_controller_1.updatecommentController)
    .delete("/comment/:id", authormiddle_1.bothRoleAuth, comment_controller_1.deletecommentController);
