import { Context } from "hono";
import { statuscatalogService, getstatuscatalogService, createstatuscatalogService, updatestatuscatalogService, deletestatuscatalogService } from "./statuscatalog.service"


const getstatuscatalog = async (c: Context) => {
    try {
        const address = await statuscatalogService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getstatuscatalogController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getstatuscatalogService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create status catalog
const createstatuscatalogController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createstatuscatalogService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update status catalog
const updatestatuscatalogController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getstatuscatalogService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updatestatuscatalogService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete status catalog Service

const deletestatuscatalogController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for status catalog by id
        const address = await getstatuscatalogService(id);
        if (!address) return c.text("Address not found", 404);

        // delete status catalog
        const res = await deletestatuscatalogService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    getstatuscatalog,
    getstatuscatalogController,
    createstatuscatalogController,
    updatestatuscatalogController,
    deletestatuscatalogController
}