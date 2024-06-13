"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletemenuitemsController = exports.updatemenuitemsController = exports.createmenuitemsController = exports.getmenuitemsController = exports.getmenuitems = void 0;
const menuitems_service_1 = require("./menuitems.service");
const getmenuitems = async (c) => {
    try {
        const address = await (0, menuitems_service_1.menuitemsService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getmenuitems = getmenuitems;
const getmenuitemsController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, menuitems_service_1.getmenuitemsService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getmenuitemsController = getmenuitemsController;
// create menu items
const createmenuitemsController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, menuitems_service_1.createmenuitemsService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createmenuitemsController = createmenuitemsController;
//  update menu items
const updatemenuitemsController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, menuitems_service_1.getmenuitemsService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, menuitems_service_1.updatemenuitemsService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updatemenuitemsController = updatemenuitemsController;
// delete menu items
const deletemenuitemsController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for menu items by id
        const address = await (0, menuitems_service_1.getmenuitemsService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete menu items
        const res = await (0, menuitems_service_1.deletemenuitemsService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deletemenuitemsController = deletemenuitemsController;
