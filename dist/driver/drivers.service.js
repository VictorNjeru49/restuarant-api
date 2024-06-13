"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedriverService = exports.updatedriverService = exports.createdriverService = exports.getdriverService = exports.driverService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const driverService = async (limit) => {
    if (limit) {
        return await db_1.default.query.drivertable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.drivertable.findMany();
};
exports.driverService = driverService;
const getdriverService = async (id) => {
    return await db_1.default.query.drivertable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.drivertable.id, id),
        columns: {
            car_make: true,
            car_model: true,
            car_year: true,
            online: true,
            delivering: true
        }, with: {
            user: {
                columns: {
                    name: true,
                    contact_phone: true,
                    email: true,
                    confirmation_code: true,
                }
            }
        }
    });
};
exports.getdriverService = getdriverService;
const createdriverService = async (user) => {
    await db_1.default.insert(schema_1.drivertable).values(user);
    return "User created successfully";
};
exports.createdriverService = createdriverService;
const updatedriverService = async (id, user) => {
    await db_1.default.update(schema_1.drivertable).set(user).where((0, drizzle_orm_1.eq)(schema_1.drivertable.id, id));
    return "User updated successfully";
};
exports.updatedriverService = updatedriverService;
const deletedriverService = async (id) => {
    await db_1.default.delete(schema_1.drivertable).where((0, drizzle_orm_1.eq)(schema_1.drivertable.id, id));
    return "User deleted successfully";
};
exports.deletedriverService = deletedriverService;
