"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletestatuscatalogService = exports.updatestatuscatalogService = exports.createstatuscatalogService = exports.getstatuscatalogService = exports.statuscatalogService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const statuscatalogService = async (limit) => {
    if (limit) {
        return await db_1.default.query.status_catalogtable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.status_catalogtable.findMany();
};
exports.statuscatalogService = statuscatalogService;
const getstatuscatalogService = async (id) => {
    return await db_1.default.query.status_catalogtable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.status_catalogtable.id, id),
        columns: {
            name: true
        }
    });
};
exports.getstatuscatalogService = getstatuscatalogService;
const createstatuscatalogService = async (user) => {
    await db_1.default.insert(schema_1.status_catalogtable).values(user);
    return "User created successfully";
};
exports.createstatuscatalogService = createstatuscatalogService;
const updatestatuscatalogService = async (id, user) => {
    await db_1.default.update(schema_1.status_catalogtable).set(user).where((0, drizzle_orm_1.eq)(schema_1.status_catalogtable.id, id));
    return "User updated successfully";
};
exports.updatestatuscatalogService = updatestatuscatalogService;
const deletestatuscatalogService = async (id) => {
    await db_1.default.delete(schema_1.status_catalogtable).where((0, drizzle_orm_1.eq)(schema_1.status_catalogtable.id, id));
    return "User deleted successfully";
};
exports.deletestatuscatalogService = deletestatuscatalogService;
