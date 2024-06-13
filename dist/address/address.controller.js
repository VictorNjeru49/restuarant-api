"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressController = exports.updateAddressController = exports.createAddressController = exports.getAddressController = exports.getaddress = void 0;
const address_service_1 = require("./address.service");
const getaddress = async (c) => {
    try {
        const address = await (0, address_service_1.addressService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getaddress = getaddress;
const getAddressController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, address_service_1.getaddressService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAddressController = getAddressController;
// create address
const createAddressController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, address_service_1.createaddressService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createAddressController = createAddressController;
//  update address
const updateAddressController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, address_service_1.getaddressService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, address_service_1.updateaddressService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateAddressController = updateAddressController;
// delete address
const deleteAddressController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await (0, address_service_1.getaddressService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete address
        const res = await (0, address_service_1.deleteaddressService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteAddressController = deleteAddressController;
