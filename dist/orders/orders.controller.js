"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteordersController = exports.updateordersController = exports.createordersController = exports.getordersController = exports.getorders = void 0;
const orders_service_1 = require("./orders.service");
const getorders = async (c) => {
    try {
        const address = await (0, orders_service_1.ordersService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getorders = getorders;
const getordersController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, orders_service_1.getordersService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getordersController = getordersController;
// create orders
const createordersController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, orders_service_1.createordersService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createordersController = createordersController;
//  update orders
const updateordersController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, orders_service_1.getordersService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, orders_service_1.updateordersService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateordersController = updateordersController;
// delete order
const deleteordersController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for orders by id
        const address = await (0, orders_service_1.getordersService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete orders
        const res = await (0, orders_service_1.deleteordersService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteordersController = deleteordersController;
