"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const hono_1 = require("hono");
const categories_controller_1 = require("./categories.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const authormiddle_1 = require("../middleware/authormiddle");
exports.categoriesRouter = new hono_1.Hono();
exports.categoriesRouter.get("/categories", authormiddle_1.adminRoleAuth, categories_controller_1.getcategory);
// get all category table
exports.categoriesRouter
    .post("/categories", (0, zod_validator_1.zValidator)('json', validators_1.categoryValidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authormiddle_1.adminRoleAuth, categories_controller_1.createcategoryController);
// get category table by id
exports.categoriesRouter
    .get("/categories/:id", authormiddle_1.bothRoleAuth, categories_controller_1.getcategoryController)
    .put("/categories/:id", authormiddle_1.adminRoleAuth, categories_controller_1.updatecategoryController)
    .delete("/categories/:id", authormiddle_1.adminRoleAuth, categories_controller_1.deletecategoryController);
