"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletestateController = exports.updatestateController = exports.createstateController = exports.getstateController = exports.getstate = void 0;
const state_service_1 = require("./state.service");
const getstate = async (c) => {
    try {
        const address = await (0, state_service_1.stateService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getstate = getstate;
const getstateController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, state_service_1.getstateService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getstateController = getstateController;
// create state
const createstateController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, state_service_1.createstateService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createstateController = createstateController;
//  update state
const updatestateController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, state_service_1.getstateService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, state_service_1.updatestateService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updatestateController = updatestateController;
// delete state
const deletestateController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for state by id
        const address = await (0, state_service_1.getstateService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete state
        const res = await (0, state_service_1.deletestateService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deletestateController = deletestateController;
