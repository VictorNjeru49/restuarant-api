"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteresturantownerService = exports.updateresturantownerService = exports.createresturantownerService = exports.getresturantownerService = exports.resturantownerService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const resturantownerService = async (limit) => {
    if (limit) {
        return await db_1.default.query.restaurant_ownertable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.restaurant_ownertable.findMany();
};
exports.resturantownerService = resturantownerService;
const getresturantownerService = async (id) => {
    return await db_1.default.query.restaurant_ownertable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurant_ownertable.id, id),
        with: {
            restaurant: {
                columns: {
                    name: true,
                    street_address: true,
                    zip_code: true
                }
            }
        }
    });
};
exports.getresturantownerService = getresturantownerService;
const createresturantownerService = async (user) => {
    await db_1.default.insert(schema_1.restaurant_ownertable).values(user);
    return "User created successfully";
};
exports.createresturantownerService = createresturantownerService;
const updateresturantownerService = async (id, user) => {
    await db_1.default.update(schema_1.restaurant_ownertable).set(user).where((0, drizzle_orm_1.eq)(schema_1.restaurant_ownertable.id, id));
    return "User updated successfully";
};
exports.updateresturantownerService = updateresturantownerService;
const deleteresturantownerService = async (id) => {
    await db_1.default.delete(schema_1.restaurant_ownertable).where((0, drizzle_orm_1.eq)(schema_1.restaurant_ownertable.id, id));
    return "User deleted successfully";
};
exports.deleteresturantownerService = deleteresturantownerService;
