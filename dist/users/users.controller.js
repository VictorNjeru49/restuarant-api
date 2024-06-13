"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteuserController = exports.updateuserController = exports.createuserController = exports.getuserController = exports.userstate = void 0;
const users_service_1 = require("./users.service");
const userstate = async (c) => {
    try {
        const address = await (0, users_service_1.userService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.userstate = userstate;
const getuserController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, users_service_1.getuserService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getuserController = getuserController;
// create state
const createuserController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, users_service_1.createuserService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createuserController = createuserController;
//  update address
const updateuserController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, users_service_1.getuserService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, users_service_1.updateuserService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateuserController = updateuserController;
// delete address
const deleteuserController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await (0, users_service_1.getuserService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete address
        const res = await (0, users_service_1.deleteuserService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteuserController = deleteuserController;
