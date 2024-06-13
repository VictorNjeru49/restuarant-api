"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecategoryService = exports.updatecategoryService = exports.createcategoryService = exports.getcategoryService = exports.categoryService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const categoryService = async (limit) => {
    if (limit) {
        return await db_1.default.query.categorytable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.categorytable.findMany();
};
exports.categoryService = categoryService;
const getcategoryService = async (id) => {
    return await db_1.default.query.categorytable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.categorytable.id, id)
    });
};
exports.getcategoryService = getcategoryService;
const createcategoryService = async (user) => {
    await db_1.default.insert(schema_1.categorytable).values(user);
    return "User created successfully";
};
exports.createcategoryService = createcategoryService;
const updatecategoryService = async (id, user) => {
    await db_1.default.update(schema_1.categorytable).set(user).where((0, drizzle_orm_1.eq)(schema_1.categorytable.id, id));
    return "User updated successfully";
};
exports.updatecategoryService = updatecategoryService;
const deletecategoryService = async (id) => {
    await db_1.default.delete(schema_1.categorytable).where((0, drizzle_orm_1.eq)(schema_1.categorytable.id, id));
    return "User deleted successfully";
};
exports.deletecategoryService = deletecategoryService;
