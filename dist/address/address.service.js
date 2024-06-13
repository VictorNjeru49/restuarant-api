"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteaddressService = exports.updateaddressService = exports.createaddressService = exports.getaddressService = exports.addressService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const addressService = async (limit) => {
    if (limit) {
        return await db_1.default.query.addresstable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.addresstable.findMany();
};
exports.addressService = addressService;
const getaddressService = async (id) => {
    return await db_1.default.query.addresstable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.addresstable.id, id),
        with: {
            user: {
                columns: {
                    name: true,
                    email: true,
                    email_verified: true,
                    contact_phone: true,
                    phone_verified: true,
                    confirmation_code: true,
                }
            },
            city: {
                columns: {
                    name: true
                }
            }
        }
    });
};
exports.getaddressService = getaddressService;
const createaddressService = async (user) => {
    await db_1.default.insert(schema_1.addresstable).values(user);
    return "User created successfully";
};
exports.createaddressService = createaddressService;
const updateaddressService = async (id, user) => {
    await db_1.default.update(schema_1.addresstable).set(user).where((0, drizzle_orm_1.eq)(schema_1.addresstable.id, id));
    return "User updated successfully";
};
exports.updateaddressService = updateaddressService;
const deleteaddressService = async (id) => {
    await db_1.default.delete(schema_1.addresstable).where((0, drizzle_orm_1.eq)(schema_1.addresstable.id, id));
    return "User deleted successfully";
};
exports.deleteaddressService = deleteaddressService;
