"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteorderstatusService = exports.updateorderstatusService = exports.createorderstatusService = exports.getorderstatusService = exports.orderstatusService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const orderstatusService = async (limit) => {
    if (limit) {
        return await db_1.default.query.order_statustable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.order_statustable.findMany();
};
exports.orderstatusService = orderstatusService;
const getorderstatusService = async (id) => {
    return await db_1.default.query.order_statustable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.order_statustable.id, id)
    });
};
exports.getorderstatusService = getorderstatusService;
const createorderstatusService = async (user) => {
    await db_1.default.insert(schema_1.order_statustable).values(user);
    return "User created successfully";
};
exports.createorderstatusService = createorderstatusService;
const updateorderstatusService = async (id, user) => {
    await db_1.default.update(schema_1.order_statustable).set(user).where((0, drizzle_orm_1.eq)(schema_1.order_statustable.id, id));
    return "User updated successfully";
};
exports.updateorderstatusService = updateorderstatusService;
const deleteorderstatusService = async (id) => {
    await db_1.default.delete(schema_1.order_statustable).where((0, drizzle_orm_1.eq)(schema_1.order_statustable.id, id));
    return "User deleted successfully";
};
exports.deleteorderstatusService = deleteorderstatusService;
