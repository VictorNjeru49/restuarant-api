"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteuserService = exports.updateuserService = exports.createuserService = exports.getuserService = exports.userService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const userService = async (limit) => {
    if (limit) {
        return await db_1.default.query.userstable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.userstable.findMany();
};
exports.userService = userService;
const getuserService = async (id) => {
    return await db_1.default.query.userstable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.userstable.id, id),
        columns: {
            name: true,
            contact_phone: true,
            phone_verified: true,
            email: true,
            email_verified: true,
            confirmation_code: true
        },
        with: {
            address: {
                columns: {
                    street_address_1: true,
                    street_address_2: true,
                    delivery_instructions: true,
                    zip_code: true
                }
            },
            orders: {
                columns: {
                    actual_delivery_time: true,
                    delivery_address_id: true,
                    price: true,
                    discount: true,
                    final_price: true,
                    comment: true
                }
            },
            comment: {
                columns: {
                    comment_text: true,
                    is_complaint: true,
                    is_praise: true
                }
            },
            driver: {
                columns: {
                    car_make: true,
                    car_model: true,
                    car_year: true,
                    online: true,
                    delivering: true
                }
            }
        }
    });
};
exports.getuserService = getuserService;
const createuserService = async (user) => {
    await db_1.default.insert(schema_1.userstable).values(user);
    return "User created successfully";
};
exports.createuserService = createuserService;
const updateuserService = async (id, user) => {
    await db_1.default.update(schema_1.userstable).set(user).where((0, drizzle_orm_1.eq)(schema_1.userstable.id, id));
    return "User updated successfully";
};
exports.updateuserService = updateuserService;
const deleteuserService = async (id) => {
    await db_1.default.delete(schema_1.userstable).where((0, drizzle_orm_1.eq)(schema_1.userstable.id, id));
    return "User deleted successfully";
};
exports.deleteuserService = deleteuserService;
