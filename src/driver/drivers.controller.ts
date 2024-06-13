import { Context } from "hono";
import { driverService, getdriverService, createdriverService, updatedriverService, deletedriverService } from "./drivers.service"


const getdriver = async (c: Context) => {
    try {
        const address = await driverService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getdriverController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getdriverService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create driver
const createdriverController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createdriverService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update driver
const updatedriverController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getdriverService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updatedriverService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete driver

const deletedriverController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for driver by id
        const address = await getdriverService(id);
        if (!address) return c.text("Address not found", 404);

        // delete driver
        const res = await deletedriverService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    getdriver,
    getdriverController,
    createdriverController,
    updatedriverController,
    deletedriverController
}