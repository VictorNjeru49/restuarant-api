"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteorderstatusController = exports.updateorderstatusController = exports.createorderstatusController = exports.getorderstatusController = exports.getorderstatus = void 0;
const orderstatus_service_1 = require("./orderstatus.service");
const getorderstatus = async (c) => {
    try {
        const address = await (0, orderstatus_service_1.orderstatusService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getorderstatus = getorderstatus;
const getorderstatusController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, orderstatus_service_1.getorderstatusService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getorderstatusController = getorderstatusController;
// create order status
const createorderstatusController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, orderstatus_service_1.createorderstatusService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createorderstatusController = createorderstatusController;
//  update order status
const updateorderstatusController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, orderstatus_service_1.getorderstatusService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, orderstatus_service_1.updateorderstatusService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateorderstatusController = updateorderstatusController;
// delete order status
const deleteorderstatusController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for order status by id
        const address = await (0, orderstatus_service_1.getorderstatusService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete order status
        const res = await (0, orderstatus_service_1.deleteorderstatusService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteorderstatusController = deleteorderstatusController;
