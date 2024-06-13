"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuitemRouter = void 0;
const hono_1 = require("hono");
const menuitems_controller_1 = require("./menuitems.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.menuitemRouter = new hono_1.Hono();
exports.menuitemRouter.get("/menu_item", authormiddle_1.adminRoleAuth, menuitems_controller_1.getmenuitems);
// get all menu items
exports.menuitemRouter
    .post("menu_item", (0, zod_validator_1.zValidator)('json', validators_1.menuItemValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, menuitems_controller_1.createmenuitemsController);
// get menu items by id
exports.menuitemRouter
    .get("/menu_item/:id", authormiddle_1.bothRoleAuth, menuitems_controller_1.getmenuitemsController)
    .put("/menu_item/:id", authormiddle_1.adminRoleAuth, menuitems_controller_1.updatemenuitemsController)
    .delete("/menu_item/:id", authormiddle_1.adminRoleAuth, menuitems_controller_1.deletemenuitemsController);
