"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resturantownerRouter = void 0;
const hono_1 = require("hono");
const restaurantowner_controller_1 = require("./restaurantowner.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.resturantownerRouter = new hono_1.Hono();
exports.resturantownerRouter.get("/restaurant_owner", authormiddle_1.adminRoleAuth, restaurantowner_controller_1.getresturantowner);
// get all restaurant owners
exports.resturantownerRouter
    .post("restaurant_owner", (0, zod_validator_1.zValidator)('json', validators_1.restaurantOwnerValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, restaurantowner_controller_1.createresturantownerController);
// get restaurant owner by id
exports.resturantownerRouter
    .get("/restaurant_owner/:id", authormiddle_1.bothRoleAuth, restaurantowner_controller_1.getresturantownerController)
    .put("/restaurant_owner/:id", authormiddle_1.bothRoleAuth, restaurantowner_controller_1.updateresturantownerController)
    .delete("/restaurant_owner/:id", authormiddle_1.adminRoleAuth, restaurantowner_controller_1.deleteresturantownerController);
