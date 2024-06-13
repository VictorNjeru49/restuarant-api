"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecityController = exports.updatecityController = exports.createcityController = exports.getcityController = exports.getcity = void 0;
const city_service_1 = require("./city.service");
const getcity = async (c) => {
    try {
        const address = await (0, city_service_1.cityService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getcity = getcity;
const getcityController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, city_service_1.getcityService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getcityController = getcityController;
// create city
const createcityController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, city_service_1.createcityService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createcityController = createcityController;
//  update city
const updatecityController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, city_service_1.getcityService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, city_service_1.updatecityService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updatecityController = updatecityController;
// delete city
const deletecityController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for city by id
        const address = await (0, city_service_1.getcityService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete city
        const res = await (0, city_service_1.deletecityService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deletecityController = deletecityController;
