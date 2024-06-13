import { Hono } from "hono";
import { getrestaurant, getrestaurantController, createrestaurantController, updaterestaurantController, deleterestaurantController} from "./restaurant.controller";
import { zValidator } from "@hono/zod-validator";
import { restaurantValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const restaurantRouter = new Hono();

restaurantRouter.get("/restaurant", adminRoleAuth, getrestaurant);

// get all restaurant
restaurantRouter
   .post("restaurant", zValidator('json', restaurantValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }),adminRoleAuth, createrestaurantController)

// get restaurant by id
restaurantRouter
    .get("/restaurant/:id",bothRoleAuth, getrestaurantController)
    .put("/restaurant/:id", bothRoleAuth, updaterestaurantController)
    .delete("/restaurant/:id", adminRoleAuth, deleterestaurantController)