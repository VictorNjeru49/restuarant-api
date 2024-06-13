import { Context } from "hono";
import {  restaurantService, getrestaurantService, createrestaurantService, updaterestaurantService, deleterestaurantService } from "./restaurant.service"


const getrestaurant = async (c: Context) => {
    try {
        const address = await restaurantService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getrestaurantController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getrestaurantService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create restaurant
const createrestaurantController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createrestaurantService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update restaurant
const updaterestaurantController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getrestaurantService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updaterestaurantService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete restaurant

const deleterestaurantController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for restaurant by id
        const address = await getrestaurantService(id);
        if (!address) return c.text("Address not found", 404);

        // delete restaurant
        const res = await deleterestaurantService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    getrestaurant,
    getrestaurantController,
    createrestaurantController,
    updaterestaurantController,
    deleterestaurantController
}