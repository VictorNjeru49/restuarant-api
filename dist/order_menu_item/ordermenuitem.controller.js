"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteorderMenuController = exports.updateorderMenuController = exports.createorderMenuController = exports.getorderMenuController = exports.getorderMenu = void 0;
const ordermenuitem_service_1 = require("./ordermenuitem.service");
const getorderMenu = async (c) => {
    try {
        const address = await (0, ordermenuitem_service_1.orderMenuService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getorderMenu = getorderMenu;
const getorderMenuController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, ordermenuitem_service_1.getorderMenuService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getorderMenuController = getorderMenuController;
// create order Menu
const createorderMenuController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, ordermenuitem_service_1.createorderMenuService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createorderMenuController = createorderMenuController;
//  update order Menu
const updateorderMenuController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, ordermenuitem_service_1.getorderMenuService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, ordermenuitem_service_1.updateorderMenuService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateorderMenuController = updateorderMenuController;
// delete order Menu
const deleteorderMenuController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for order Menu by id
        const address = await (0, ordermenuitem_service_1.getorderMenuService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete order Menu
        const res = await (0, ordermenuitem_service_1.deleteorderMenuService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteorderMenuController = deleteorderMenuController;
