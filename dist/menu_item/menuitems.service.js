"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletemenuitemsService = exports.updatemenuitemsService = exports.createmenuitemsService = exports.getmenuitemsService = exports.menuitemsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const menuitemsService = async (limit) => {
    if (limit) {
        return await db_1.default.query.menu_itemtable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.menu_itemtable.findMany();
};
exports.menuitemsService = menuitemsService;
const getmenuitemsService = async (id) => {
    return await db_1.default.query.menu_itemtable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.menu_itemtable.id, id),
        columns: {
            name: true,
            description: true,
            ingredients: true,
            price: true,
            active: true
        }, with: {
            restaurant: {
                columns: {
                    name: true,
                    street_address: true,
                    zip_code: true,
                }
            },
            category: {
                columns: {
                    name: true
                }
            }
        }
    });
};
exports.getmenuitemsService = getmenuitemsService;
const createmenuitemsService = async (user) => {
    await db_1.default.insert(schema_1.menu_itemtable).values(user);
    return "User created successfully";
};
exports.createmenuitemsService = createmenuitemsService;
const updatemenuitemsService = async (id, user) => {
    await db_1.default.update(schema_1.menu_itemtable).set(user).where((0, drizzle_orm_1.eq)(schema_1.menu_itemtable.id, id));
    return "User updated successfully";
};
exports.updatemenuitemsService = updatemenuitemsService;
const deletemenuitemsService = async (id) => {
    await db_1.default.delete(schema_1.menu_itemtable).where((0, drizzle_orm_1.eq)(schema_1.menu_itemtable.id, id));
    return "User deleted successfully";
};
exports.deletemenuitemsService = deletemenuitemsService;
