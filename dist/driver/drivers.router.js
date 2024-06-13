"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const hono_1 = require("hono");
const drivers_controller_1 = require("./drivers.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.driverRouter = new hono_1.Hono();
exports.driverRouter.get("/driver", authormiddle_1.adminRoleAuth, drivers_controller_1.getdriver);
// get all driver
exports.driverRouter
    .post("driver", (0, zod_validator_1.zValidator)('json', validators_1.driverValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, drivers_controller_1.createdriverController);
// get driver by id
exports.driverRouter
    .get("/driver/:id", authormiddle_1.bothRoleAuth, drivers_controller_1.getdriverController)
    .put("/driver/:id", authormiddle_1.bothRoleAuth, drivers_controller_1.updatedriverController)
    .delete("/driver/:id", authormiddle_1.adminRoleAuth, drivers_controller_1.deletedriverController);
