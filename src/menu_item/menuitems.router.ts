import { Hono } from "hono";
import { getmenuitems, getmenuitemsController,  createmenuitemsController, updatemenuitemsController, deletemenuitemsController} from "./menuitems.controller";
import { zValidator } from "@hono/zod-validator";
import { menuItemValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const menuitemRouter = new Hono();

menuitemRouter.get("/menu_item", adminRoleAuth, getmenuitems);

// get all menu items
menuitemRouter
    .post("menu_item", zValidator('json', menuItemValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), adminRoleAuth, createmenuitemsController)

// get menu items by id
menuitemRouter
    .get("/menu_item/:id", bothRoleAuth, getmenuitemsController)
    .put("/menu_item/:id", adminRoleAuth, updatemenuitemsController)
    .delete("/menu_item/:id",adminRoleAuth, deletemenuitemsController)