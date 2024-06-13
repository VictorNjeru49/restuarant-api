"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletestatuscatalogController = exports.updatestatuscatalogController = exports.createstatuscatalogController = exports.getstatuscatalogController = exports.getstatuscatalog = void 0;
const statuscatalog_service_1 = require("./statuscatalog.service");
const getstatuscatalog = async (c) => {
    try {
        const address = await (0, statuscatalog_service_1.statuscatalogService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getstatuscatalog = getstatuscatalog;
const getstatuscatalogController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, statuscatalog_service_1.getstatuscatalogService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getstatuscatalogController = getstatuscatalogController;
// create status catalog
const createstatuscatalogController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, statuscatalog_service_1.createstatuscatalogService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createstatuscatalogController = createstatuscatalogController;
//  update status catalog
const updatestatuscatalogController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, statuscatalog_service_1.getstatuscatalogService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, statuscatalog_service_1.updatestatuscatalogService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updatestatuscatalogController = updatestatuscatalogController;
// delete status catalog Service
const deletestatuscatalogController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for status catalog by id
        const address = await (0, statuscatalog_service_1.getstatuscatalogService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete status catalog
        const res = await (0, statuscatalog_service_1.deletestatuscatalogService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deletestatuscatalogController = deletestatuscatalogController;
