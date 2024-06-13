"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const hono_1 = require("hono");
const restaurant_controller_1 = require("./restaurant.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.restaurantRouter = new hono_1.Hono();
exports.restaurantRouter.get("/restaurant", authormiddle_1.adminRoleAuth, restaurant_controller_1.getrestaurant);
// get all restaurant
exports.restaurantRouter
    .post("restaurant", (0, zod_validator_1.zValidator)('json', validators_1.restaurantValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, restaurant_controller_1.createrestaurantController);
// get restaurant by id
exports.restaurantRouter
    .get("/restaurant/:id", authormiddle_1.bothRoleAuth, restaurant_controller_1.getrestaurantController)
    .put("/restaurant/:id", authormiddle_1.bothRoleAuth, restaurant_controller_1.updaterestaurantController)
    .delete("/restaurant/:id", authormiddle_1.adminRoleAuth, restaurant_controller_1.deleterestaurantController);
