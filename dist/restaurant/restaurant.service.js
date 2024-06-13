"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleterestaurantService = exports.updaterestaurantService = exports.createrestaurantService = exports.getrestaurantService = exports.restaurantService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const restaurantService = async (limit) => {
    if (limit) {
        return await db_1.default.query.restauranttable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.restauranttable.findMany();
};
exports.restaurantService = restaurantService;
const getrestaurantService = async (id) => {
    return await db_1.default.query.restauranttable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.restauranttable.id, id),
        columns: {
            name: true,
            street_address: true,
            zip_code: true
        },
        with: {
            city: {
                columns: {
                    name: true
                }
            },
            menubar: {
                columns: {
                    name: true,
                    description: true,
                    ingredients: true,
                    price: true,
                    active: true
                }
            },
            orders: {
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
exports.getrestaurantService = getrestaurantService;
const createrestaurantService = async (user) => {
    await db_1.default.insert(schema_1.restauranttable).values(user);
    return "User created successfully";
};
exports.createrestaurantService = createrestaurantService;
const updaterestaurantService = async (id, user) => {
    await db_1.default.update(schema_1.restauranttable).set(user).where((0, drizzle_orm_1.eq)(schema_1.restauranttable.id, id));
    return "User updated successfully";
};
exports.updaterestaurantService = updaterestaurantService;
const deleterestaurantService = async (id) => {
    await db_1.default.delete(schema_1.restauranttable).where((0, drizzle_orm_1.eq)(schema_1.restauranttable.id, id));
    return "User deleted successfully";
};
exports.deleterestaurantService = deleterestaurantService;
