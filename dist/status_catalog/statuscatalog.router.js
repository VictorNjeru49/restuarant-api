"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statuscatalogRouter = void 0;
const hono_1 = require("hono");
const statuscatalog_controller_1 = require("./statuscatalog.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.statuscatalogRouter = new hono_1.Hono();
exports.statuscatalogRouter.get("/status_catalog", authormiddle_1.adminRoleAuth, statuscatalog_controller_1.getstatuscatalog);
// get all status catalog
exports.statuscatalogRouter
    .post("status_catalog", (0, zod_validator_1.zValidator)('json', validators_1.statusCatalogValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, statuscatalog_controller_1.createstatuscatalogController);
// get status catalog by id
exports.statuscatalogRouter
    .get("/status_catalog/:id", authormiddle_1.bothRoleAuth, statuscatalog_controller_1.getstatuscatalogController)
    .put("/status_catalog/:id", authormiddle_1.bothRoleAuth, statuscatalog_controller_1.updatestatuscatalogController)
    .delete("/status_catalog/:id", statuscatalog_controller_1.deletestatuscatalogController);
