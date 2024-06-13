import { Context } from "hono";
import { orderMenuService, getorderMenuService, createorderMenuService, updateorderMenuService, deleteorderMenuService } from "./ordermenuitem.service"


const getorderMenu = async (c: Context) => {
    try {
        const address = await orderMenuService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getorderMenuController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getorderMenuService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create order Menu
const createorderMenuController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createorderMenuService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update order Menu
const updateorderMenuController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getorderMenuService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateorderMenuService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete order Menu

const deleteorderMenuController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for order Menu by id
        const address = await getorderMenuService(id);
        if (!address) return c.text("Address not found", 404);

        // delete order Menu
        const res = await deleteorderMenuService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    getorderMenu,
    getorderMenuController,
    createorderMenuController,
    updateorderMenuController,
    deleteorderMenuController
}