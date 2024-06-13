import { Context } from "hono";
import { menuitemsService, getmenuitemsService, createmenuitemsService, updatemenuitemsService, deletemenuitemsService } from "./menuitems.service"


const getmenuitems = async (c: Context) => {
    try {
        const address = await menuitemsService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getmenuitemsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getmenuitemsService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create menu items
const createmenuitemsController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createmenuitemsService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update menu items
const updatemenuitemsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getmenuitemsService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updatemenuitemsService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete menu items

const deletemenuitemsController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for menu items by id
        const address = await getmenuitemsService(id);
        if (!address) return c.text("Address not found", 404);

        // delete menu items
        const res = await deletemenuitemsService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    getmenuitems,
    getmenuitemsController,
    createmenuitemsController,
    updatemenuitemsController,
    deletemenuitemsController
}