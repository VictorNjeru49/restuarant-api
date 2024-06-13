"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateRouter = void 0;
const hono_1 = require("hono");
const state_controller_1 = require("./state.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.stateRouter = new hono_1.Hono();
exports.stateRouter.get("/state", authormiddle_1.adminRoleAuth, state_controller_1.getstate);
// get all state
exports.stateRouter
    .post("state", (0, zod_validator_1.zValidator)('json', validators_1.stateValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, state_controller_1.createstateController);
// get state by id
exports.stateRouter
    .get("/state/:id", authormiddle_1.bothRoleAuth, state_controller_1.getstateController)
    .put("/state/:id", authormiddle_1.bothRoleAuth, state_controller_1.updatestateController)
    .delete("/state/:id", authormiddle_1.bothRoleAuth, state_controller_1.deletestateController);
