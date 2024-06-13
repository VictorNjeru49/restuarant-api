"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecategoryController = exports.updatecategoryController = exports.createcategoryController = exports.getcategoryController = exports.getcategory = void 0;
const categories_service_1 = require("./categories.service");
const getcategory = async (c) => {
    try {
        const address = await (0, categories_service_1.categoryService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getcategory = getcategory;
const getcategoryController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, categories_service_1.getcategoryService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getcategoryController = getcategoryController;
// create category table
const createcategoryController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, categories_service_1.createcategoryService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createcategoryController = createcategoryController;
//  update category table
const updatecategoryController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, categories_service_1.getcategoryService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, categories_service_1.updatecategoryService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updatecategoryController = updatecategoryController;
// delete category table
const deletecategoryController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for category table by id
        const address = await (0, categories_service_1.getcategoryService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete category table
        const res = await (0, categories_service_1.deletecategoryService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deletecategoryController = deletecategoryController;
