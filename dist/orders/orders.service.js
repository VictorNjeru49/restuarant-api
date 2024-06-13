"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteordersService = exports.updateordersService = exports.createordersService = exports.getordersService = exports.ordersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const ordersService = async (limit) => {
    if (limit) {
        return await db_1.default.query.orderstable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.orderstable.findMany();
};
exports.ordersService = ordersService;
const getordersService = async (id) => {
    return await db_1.default.query.orderstable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.orderstable.id, id),
        columns: {
            estimated_delivery_time: true,
            actual_delivery_time: true,
            delivery_address_id: true,
            comment: true,
            price: true,
            discount: true,
            final_price: true,
        }, with: {
            driver: {
                columns: {
                    online: true,
                    delivering: true,
                }
            },
            user: {
                columns: {
                    name: true,
                    contact_phone: true,
                    phone_verified: true,
                    email: true,
                    email_verified: true,
                    confirmation_code: true
                }
            },
            delivery_address: {
                columns: {
                    street_address_1: true,
                    street_address_2: true,
                    delivery_instructions: true,
                    zip_code: true
                }
            },
            restaurant: {
                columns: {
                    name: true
                }
            }
        }
    });
};
exports.getordersService = getordersService;
const createordersService = async (user) => {
    await db_1.default.insert(schema_1.orderstable).values(user);
    return "User created successfully";
};
exports.createordersService = createordersService;
const updateordersService = async (id, user) => {
    await db_1.default.update(schema_1.orderstable).set(user).where((0, drizzle_orm_1.eq)(schema_1.orderstable.id, id));
    return "User updated successfully";
};
exports.updateordersService = updateordersService;
const deleteordersService = async (id) => {
    await db_1.default.delete(schema_1.orderstable).where((0, drizzle_orm_1.eq)(schema_1.orderstable.id, id));
    return "User deleted successfully";
};
exports.deleteordersService = deleteordersService;
