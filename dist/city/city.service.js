"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecityService = exports.updatecityService = exports.createcityService = exports.getcityService = exports.cityService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const cityService = async (limit) => {
    if (limit) {
        return await db_1.default.query.citytable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.citytable.findMany();
};
exports.cityService = cityService;
const getcityService = async (id) => {
    return await db_1.default.query.citytable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.citytable.id, id),
        columns: {
            name: true
        }
    });
};
exports.getcityService = getcityService;
const createcityService = async (user) => {
    await db_1.default.insert(schema_1.citytable).values(user);
    return "User created successfully";
};
exports.createcityService = createcityService;
const updatecityService = async (id, user) => {
    await db_1.default.update(schema_1.citytable).set(user).where((0, drizzle_orm_1.eq)(schema_1.citytable.id, id));
    return "User updated successfully";
};
exports.updatecityService = updatecityService;
const deletecityService = async (id) => {
    await db_1.default.delete(schema_1.citytable).where((0, drizzle_orm_1.eq)(schema_1.citytable.id, id));
    return "User deleted successfully";
};
exports.deletecityService = deletecityService;
