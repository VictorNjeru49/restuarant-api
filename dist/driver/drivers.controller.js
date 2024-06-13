"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedriverController = exports.updatedriverController = exports.createdriverController = exports.getdriverController = exports.getdriver = void 0;
const drivers_service_1 = require("./drivers.service");
const getdriver = async (c) => {
    try {
        const address = await (0, drivers_service_1.driverService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getdriver = getdriver;
const getdriverController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, drivers_service_1.getdriverService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getdriverController = getdriverController;
// create driver
const createdriverController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, drivers_service_1.createdriverService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createdriverController = createdriverController;
//  update driver
const updatedriverController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, drivers_service_1.getdriverService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, drivers_service_1.updatedriverService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updatedriverController = updatedriverController;
// delete driver
const deletedriverController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for driver by id
        const address = await (0, drivers_service_1.getdriverService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete driver
        const res = await (0, drivers_service_1.deletedriverService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deletedriverController = deletedriverController;
