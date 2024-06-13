"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecommentController = exports.updatecommentController = exports.createcommentController = exports.getcommentController = exports.getcomment = void 0;
const comment_service_1 = require("./comment.service");
const getcomment = async (c) => {
    try {
        const address = await (0, comment_service_1.commentService)();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getcomment = getcomment;
const getcommentController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, comment_service_1.getcommentService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getcommentController = getcommentController;
// create comment
const createcommentController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, comment_service_1.createcommentService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createcommentController = createcommentController;
//  update comment
const updatecommentController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, comment_service_1.getcommentService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, comment_service_1.updatecommentService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updatecommentController = updatecommentController;
// delete comment
const deletecommentController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for comment by id
        const address = await (0, comment_service_1.getcommentService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete comment
        const res = await (0, comment_service_1.deletecommentService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deletecommentController = deletecommentController;
