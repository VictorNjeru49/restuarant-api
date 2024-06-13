"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteorderMenuService = exports.updateorderMenuService = exports.createorderMenuService = exports.getorderMenuService = exports.orderMenuService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const orderMenuService = async (limit) => {
    if (limit) {
        return await db_1.default.query.order_menu_itemtable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.order_menu_itemtable.findMany();
};
exports.orderMenuService = orderMenuService;
const getorderMenuService = async (id) => {
    return await db_1.default.query.order_menu_itemtable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.order_menu_itemtable.id, id),
        columns: {
            quantity: true,
            item_price: true,
            price: true,
            comment: true
        }, with: {
            menu_item: {
                columns: {
                    name: true,
                    description: true,
                    price: true,
                    active: true
                }
            },
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
            }
        }
    });
};
exports.getorderMenuService = getorderMenuService;
const createorderMenuService = async (user) => {
    await db_1.default.insert(schema_1.order_menu_itemtable).values(user);
    return "User created successfully";
};
exports.createorderMenuService = createorderMenuService;
const updateorderMenuService = async (id, user) => {
    await db_1.default.update(schema_1.order_menu_itemtable).set(user).where((0, drizzle_orm_1.eq)(schema_1.order_menu_itemtable.id, id));
    return "User updated successfully";
};
exports.updateorderMenuService = updateorderMenuService;
const deleteorderMenuService = async (id) => {
    await db_1.default.delete(schema_1.order_menu_itemtable).where((0, drizzle_orm_1.eq)(schema_1.order_menu_itemtable.id, id));
    return "User deleted successfully";
};
exports.deleteorderMenuService = deleteorderMenuService;
