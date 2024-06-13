"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMenuRouter = void 0;
const hono_1 = require("hono");
const ordermenuitem_controller_1 = require("./ordermenuitem.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.orderMenuRouter = new hono_1.Hono();
exports.orderMenuRouter.get("/order_menu_item", authormiddle_1.adminRoleAuth, ordermenuitem_controller_1.getorderMenu);
// get all order Menu
exports.orderMenuRouter
    .post("order_menu_item", (0, zod_validator_1.zValidator)('json', validators_1.orderMenuItemValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, ordermenuitem_controller_1.createorderMenuController);
// get order Menu by id
exports.orderMenuRouter
    .get("/order_menu_item/:id", authormiddle_1.bothRoleAuth, ordermenuitem_controller_1.getorderMenuController)
    .put("/order_menu_item/:id", authormiddle_1.adminRoleAuth, ordermenuitem_controller_1.updateorderMenuController)
    .delete("/order_menu_item/:id", authormiddle_1.adminRoleAuth, ordermenuitem_controller_1.deleteorderMenuController);
