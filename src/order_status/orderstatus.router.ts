import { Hono } from "hono";
import { getorderstatus, getorderstatusController, createorderstatusController, updateorderstatusController, deleteorderstatusController } from "./orderstatus.controller";
import { zValidator } from "@hono/zod-validator";
import { orderStatusValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const orderstatusRouter = new Hono();

orderstatusRouter.get("/order_status", adminRoleAuth, getorderstatus);

// get all order status
orderstatusRouter

    .post("order_status", zValidator('json', orderStatusValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), createorderstatusController)

// get order status by id
orderstatusRouter
    .get("/order_status/:id", bothRoleAuth, getorderstatusController)
    .put("/order_status/:id", updateorderstatusController)
    .delete("/order_status/:id", deleteorderstatusController)