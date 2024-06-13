"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityRouter = void 0;
const hono_1 = require("hono");
const city_controller_1 = require("./city.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.cityRouter = new hono_1.Hono();
exports.cityRouter.get("/city", authormiddle_1.adminRoleAuth, city_controller_1.getcity);
// get all city
exports.cityRouter
    .post("city", (0, zod_validator_1.zValidator)('json', validators_1.cityValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, city_controller_1.createcityController);
// get city by id
exports.cityRouter
    .get("/city/:id", authormiddle_1.bothRoleAuth, city_controller_1.getcityController)
    .put("/city/:id", authormiddle_1.bothRoleAuth, city_controller_1.updatecityController)
    .delete("/city/:id", authormiddle_1.bothRoleAuth, city_controller_1.deletecityController);
