"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorityrelationship = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const authentication_contoller_1 = require("./authentication.contoller");
const validators_1 = require("../validators");
exports.authorityrelationship = new hono_1.Hono();
exports.authorityrelationship.post('/register', (0, zod_validator_1.zValidator)('json', validators_1.userloginvalidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authentication_contoller_1.registerUser);
exports.authorityrelationship.post('/login', (0, zod_validator_1.zValidator)('json', validators_1.loginvalidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authentication_contoller_1.loginUser);
exports.authorityrelationship.post('/driver', (0, zod_validator_1.zValidator)('json', validators_1.driverloginvalidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authentication_contoller_1.registerdriverUser);
