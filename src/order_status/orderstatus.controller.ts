import { Context } from "hono";
import { orderstatusService, getorderstatusService, createorderstatusService, updateorderstatusService, deleteorderstatusService } from "./orderstatus.service"


const getorderstatus = async (c: Context) => {
    try {
        const address = await orderstatusService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getorderstatusController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getorderstatusService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create order status
const createorderstatusController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createorderstatusService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update order status
const updateorderstatusController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getorderstatusService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateorderstatusService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete order status

const deleteorderstatusController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for order status by id
        const address = await getorderstatusService(id);
        if (!address) return c.text("Address not found", 404);

        // delete order status
        const res = await deleteorderstatusService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    getorderstatus,
    getorderstatusController,
    createorderstatusController,
    updateorderstatusController,
    deleteorderstatusController
}