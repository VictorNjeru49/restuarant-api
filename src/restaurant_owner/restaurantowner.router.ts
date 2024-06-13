import { Hono } from "hono";
import { getresturantowner, getresturantownerController, createresturantownerController, updateresturantownerController, deleteresturantownerController } from "./restaurantowner.controller";
import { zValidator } from "@hono/zod-validator";
import { restaurantOwnerValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const resturantownerRouter = new Hono();

resturantownerRouter.get("/restaurant_owner", adminRoleAuth, getresturantowner);

// get all restaurant owners
resturantownerRouter
    .post("restaurant_owner", zValidator('json', restaurantOwnerValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), adminRoleAuth, createresturantownerController)

// get restaurant owner by id
resturantownerRouter
    .get("/restaurant_owner/:id",bothRoleAuth, getresturantownerController)
    .put("/restaurant_owner/:id", bothRoleAuth, updateresturantownerController)
    .delete("/restaurant_owner/:id", adminRoleAuth, deleteresturantownerController)