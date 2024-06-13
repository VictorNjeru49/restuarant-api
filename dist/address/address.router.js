"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const hono_1 = require("hono");
const address_controller_1 = require("./address.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.addressRouter = new hono_1.Hono();
exports.addressRouter.get("/address", authormiddle_1.adminRoleAuth, address_controller_1.getaddress);
// get all addresses
exports.addressRouter
    .post("address", (0, zod_validator_1.zValidator)('json', validators_1.addressValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, address_controller_1.createAddressController);
// get address by id
exports.addressRouter
    .get("/address/:id", authormiddle_1.bothRoleAuth, address_controller_1.getAddressController)
    .put("/address/:id", authormiddle_1.adminRoleAuth, address_controller_1.updateAddressController)
    .delete("/address/:id", authormiddle_1.bothRoleAuth, address_controller_1.deleteAddressController);
