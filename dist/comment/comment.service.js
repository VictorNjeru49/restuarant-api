"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecommentService = exports.updatecommentService = exports.createcommentService = exports.getcommentService = exports.commentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const commentService = async (limit) => {
    if (limit) {
        return await db_1.default.query.commenttable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.commenttable.findMany();
};
exports.commentService = commentService;
const getcommentService = async (id) => {
    return await db_1.default.query.commenttable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.commenttable.id, id),
        columns: {
            comment_text: true,
            is_complaint: true,
            is_praise: true
        },
        with: {
            order: {
                columns: {
                    estimated_delivery_time: true,
                    actual_delivery_time: true,
                    delivery_address_id: true,
                    price: true,
                    discount: true,
                    final_price: true,
                    comment: true
                }
            },
            user: {
                columns: {
                    name: true,
                    email: true,
                    contact_phone: true,
                    phone_verified: true,
                    password: true,
                    email_verified: true,
                    confirmation_code: true,
                }
            }
        }
    });
};
exports.getcommentService = getcommentService;
const createcommentService = async (user) => {
    await db_1.default.insert(schema_1.commenttable).values(user);
    return "User created successfully";
};
exports.createcommentService = createcommentService;
const updatecommentService = async (id, user) => {
    await db_1.default.update(schema_1.commenttable).set(user).where((0, drizzle_orm_1.eq)(schema_1.commenttable.id, id));
    return "User updated successfully";
};
exports.updatecommentService = updatecommentService;
const deletecommentService = async (id) => {
    await db_1.default.delete(schema_1.commenttable).where((0, drizzle_orm_1.eq)(schema_1.commenttable.id, id));
    return "User deleted successfully";
};
exports.deletecommentService = deletecommentService;
