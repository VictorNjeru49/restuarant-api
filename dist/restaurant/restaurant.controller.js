"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleterestaurantController = exports.updaterestaurantController = exports.createrestaurantController = exports.getrestaurantController = exports.getrestaurant = void 0;
const restaurant_service_1 = require("./restaurant.service");
const getrestaurant = async (c) => {
    try {
        const address = await (0, restaurant_service_1.restaurantService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getrestaurant = getrestaurant;
const getrestaurantController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, restaurant_service_1.getrestaurantService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getrestaurantController = getrestaurantController;
// create restaurant
const createrestaurantController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, restaurant_service_1.createrestaurantService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createrestaurantController = createrestaurantController;
//  update restaurant
const updaterestaurantController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, restaurant_service_1.getrestaurantService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, restaurant_service_1.updaterestaurantService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updaterestaurantController = updaterestaurantController;
// delete restaurant
const deleterestaurantController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for restaurant by id
        const address = await (0, restaurant_service_1.getrestaurantService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete restaurant
        const res = await (0, restaurant_service_1.deleterestaurantService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleterestaurantController = deleterestaurantController;
