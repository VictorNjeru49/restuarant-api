"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderstatusRouter = void 0;
const hono_1 = require("hono");
const orderstatus_controller_1 = require("./orderstatus.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.orderstatusRouter = new hono_1.Hono();
exports.orderstatusRouter.get("/order_status", authormiddle_1.adminRoleAuth, orderstatus_controller_1.getorderstatus);
// get all order status
exports.orderstatusRouter
    .post("order_status", (0, zod_validator_1.zValidator)('json', validators_1.orderStatusValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orderstatus_controller_1.createorderstatusController);
// get order status by id
exports.orderstatusRouter
    .get("/order_status/:id", authormiddle_1.bothRoleAuth, orderstatus_controller_1.getorderstatusController)
    .put("/order_status/:id", orderstatus_controller_1.updateorderstatusController)
    .delete("/order_status/:id", orderstatus_controller_1.deleteorderstatusController);
