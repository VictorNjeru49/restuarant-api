"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteresturantownerController = exports.updateresturantownerController = exports.createresturantownerController = exports.getresturantownerController = exports.getresturantowner = void 0;
const restaurantowner_service_1 = require("./restaurantowner.service");
const getresturantowner = async (c) => {
    try {
        const address = await (0, restaurantowner_service_1.resturantownerService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getresturantowner = getresturantowner;
const getresturantownerController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, restaurantowner_service_1.getresturantownerService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getresturantownerController = getresturantownerController;
// create resturant owner
const createresturantownerController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, restaurantowner_service_1.createresturantownerService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createresturantownerController = createresturantownerController;
//  update resturant owner
const updateresturantownerController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, restaurantowner_service_1.getresturantownerService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, restaurantowner_service_1.updateresturantownerService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateresturantownerController = updateresturantownerController;
// delete resturant owner
const deleteresturantownerController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for resturant owner by id
        const address = await (0, restaurantowner_service_1.getresturantownerService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete resturant owner
        const res = await (0, restaurantowner_service_1.deleteresturantownerService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteresturantownerController = deleteresturantownerController;
