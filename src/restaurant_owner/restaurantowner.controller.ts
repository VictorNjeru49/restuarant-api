import { Context } from "hono";
import { resturantownerService, getresturantownerService, createresturantownerService, updateresturantownerService, deleteresturantownerService } from "./restaurantowner.service"


const getresturantowner = async (c: Context) => {
    try {
        const address = await resturantownerService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getresturantownerController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getresturantownerService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create resturant owner
const createresturantownerController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createresturantownerService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update resturant owner
const updateresturantownerController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getresturantownerService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateresturantownerService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete resturant owner

const deleteresturantownerController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for resturant owner by id
        const address = await getresturantownerService(id);
        if (!address) return c.text("Address not found", 404);

        // delete resturant owner
        const res = await deleteresturantownerService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    getresturantowner,
    getresturantownerController,
    createresturantownerController,
    updateresturantownerController,
    deleteresturantownerController
}