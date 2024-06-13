"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletestateService = exports.updatestateService = exports.createstateService = exports.getstateService = exports.stateService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const stateService = async (limit) => {
    if (limit) {
        return await db_1.default.query.statetable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.statetable.findMany();
};
exports.stateService = stateService;
const getstateService = async (id) => {
    return await db_1.default.query.statetable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.statetable.id, id),
        columns: {
            name: true,
            code: true,
        }
    });
};
exports.getstateService = getstateService;
const createstateService = async (user) => {
    await db_1.default.insert(schema_1.statetable).values(user);
    return "User created successfully";
};
exports.createstateService = createstateService;
const updatestateService = async (id, user) => {
    await db_1.default.update(schema_1.statetable).set(user).where((0, drizzle_orm_1.eq)(schema_1.statetable.id, id));
    return "User updated successfully";
};
exports.updatestateService = updatestateService;
const deletestateService = async (id) => {
    await db_1.default.delete(schema_1.statetable).where((0, drizzle_orm_1.eq)(schema_1.statetable.id, id));
    return "User deleted successfully";
};
exports.deletestateService = deletestateService;
