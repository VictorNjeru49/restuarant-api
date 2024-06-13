"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownershipvalidator = exports.driverloginvalidator = exports.userloginvalidator = exports.loginvalidator = exports.restaurantOwnerValidator = exports.usersValidator = exports.statusCatalogValidator = exports.stateValidator = exports.restaurantValidator = exports.ordersValidator = exports.orderStatusValidator = exports.orderMenuItemValidator = exports.menuItemValidator = exports.driverValidator = exports.commentValidator = exports.cityValidator = exports.categoryValidator = exports.addressValidator = void 0;
const zod_1 = require("zod");
// Address Validator
exports.addressValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    street_address_1: zod_1.z.string(),
    street_address_2: zod_1.z.string().nullable(),
    zip_code: zod_1.z.string(),
    delivery_instructions: zod_1.z.string().nullable(),
    user_id: zod_1.z.number(),
    city_id: zod_1.z.number(),
});
// Category Validator
exports.categoryValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string()
});
// City Validator
exports.cityValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    state_id: zod_1.z.number()
});
// Comment Validator
exports.commentValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    order_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    comment_text: zod_1.z.string(),
    is_complaint: zod_1.z.boolean(),
    is_praise: zod_1.z.boolean(),
});
// Driver Validator
exports.driverValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    car_make: zod_1.z.string(),
    car_model: zod_1.z.string(),
    car_year: zod_1.z.number(),
    user_id: zod_1.z.number(),
    online: zod_1.z.boolean(),
    delivering: zod_1.z.boolean(),
});
// MenuItem Validator
exports.menuItemValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    restaurant_id: zod_1.z.number(),
    category_id: zod_1.z.number(),
    description: zod_1.z.string(),
    ingredients: zod_1.z.string(),
    price: zod_1.z.number(),
    active: zod_1.z.boolean(),
});
// OrderMenuItem Validator
exports.orderMenuItemValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    order_id: zod_1.z.number(),
    menu_item_id: zod_1.z.number(),
    quantity: zod_1.z.number(),
    item_price: zod_1.z.number(),
    price: zod_1.z.number(),
    comment: zod_1.z.string().nullable()
});
// OrderStatus Validator
exports.orderStatusValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    order_id: zod_1.z.number(),
    status_catalog_id: zod_1.z.number(),
});
// Orders Validator
exports.ordersValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    restaurant_id: zod_1.z.number(),
    delivery_address_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    driver_id: zod_1.z.number(),
    price: zod_1.z.number(),
    discount: zod_1.z.number(),
    final_price: zod_1.z.number(),
    comment: zod_1.z.string().nullable(),
});
// Restaurant Validator
exports.restaurantValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    street_address: zod_1.z.string(),
    zip_code: zod_1.z.string(),
    city_id: zod_1.z.number(),
});
// State Validator
exports.stateValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    code: zod_1.z.string()
});
// StatusCatalog Validator
exports.statusCatalogValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string()
});
// Users Validator
exports.usersValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    phone_verified: zod_1.z.boolean(),
    email: zod_1.z.string().email(),
    email_verified: zod_1.z.boolean(),
    confirmation_code: zod_1.z.string().nullable(),
    password: zod_1.z.string(),
});
// RestaurantOwner Validator
exports.restaurantOwnerValidator = zod_1.z.object({
    id: zod_1.z.number().optional(),
    restaurant_id: zod_1.z.number(),
    owner_id: zod_1.z.number()
});
//login Validator
exports.loginvalidator = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
// userlogin validator
exports.userloginvalidator = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional()
});
//DRIVER LOGIN Validator
exports.driverloginvalidator = zod_1.z.object({
    driverId: zod_1.z.number(),
    driversname: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional()
});
//ownership validator
exports.ownershipvalidator = zod_1.z.object({
    ownerId: zod_1.z.number(),
    ownersname: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional()
});
