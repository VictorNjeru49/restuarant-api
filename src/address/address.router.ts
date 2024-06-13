import { Hono } from "hono";
import { getaddress, getAddressController, createAddressController, updateAddressController, deleteAddressController} from "./address.controller";
import { zValidator } from "@hono/zod-validator";
import { addressValidator } from "../validators";
import { adminRoleAuth,bothRoleAuth} from "../middleware/authormiddle";


export const addressRouter = new Hono();

addressRouter.get("/address",adminRoleAuth, getaddress);

// get all addresses
addressRouter
    .post("address", zValidator('json', addressValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), adminRoleAuth, createAddressController)

// get address by id
addressRouter
    .get("/address/:id", bothRoleAuth, getAddressController)
    .put("/address/:id", adminRoleAuth, updateAddressController)
    .delete("/address/:id", bothRoleAuth, deleteAddressController)
