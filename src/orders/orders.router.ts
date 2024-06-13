import { Hono } from "hono";
import { getorders, getordersController, createordersController, updateordersController, deleteordersController } from "./orders.controller";
import { zValidator } from "@hono/zod-validator";
import { ordersValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const ordersRouter = new Hono();

ordersRouter.get("/orders", adminRoleAuth, getorders);

// get all orders
ordersRouter
    .post("orders", zValidator('json', ordersValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), adminRoleAuth, createordersController)

// get orders by id
ordersRouter
    .get("/orders/:id",bothRoleAuth, getordersController)
    .put("/orders/:id", bothRoleAuth, updateordersController)
    .delete("/orders/:id", deleteordersController)