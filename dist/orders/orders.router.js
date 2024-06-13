"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const hono_1 = require("hono");
const orders_controller_1 = require("./orders.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.ordersRouter = new hono_1.Hono();
exports.ordersRouter.get("/orders", authormiddle_1.adminRoleAuth, orders_controller_1.getorders);
// get all orders
exports.ordersRouter
    .post("orders", (0, zod_validator_1.zValidator)('json', validators_1.ordersValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, orders_controller_1.createordersController);
// get orders by id
exports.ordersRouter
    .get("/orders/:id", authormiddle_1.bothRoleAuth, orders_controller_1.getordersController)
    .put("/orders/:id", authormiddle_1.bothRoleAuth, orders_controller_1.updateordersController)
    .delete("/orders/:id", orders_controller_1.deleteordersController);
