import { Hono } from "hono";
import { getcategory, getcategoryController, createcategoryController, updatecategoryController, deletecategoryController} from "./categories.controller";
import { zValidator } from "@hono/zod-validator";
import { categoryValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const categoriesRouter = new Hono();

categoriesRouter.get("/categories",adminRoleAuth, getcategory);

// get all category table
categoriesRouter
    .post("/categories", zValidator('json', categoryValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), adminRoleAuth, createcategoryController)

// get category table by id
categoriesRouter
    .get("/categories/:id", bothRoleAuth, getcategoryController)
    .put("/categories/:id", adminRoleAuth, updatecategoryController)
    .delete("/categories/:id", adminRoleAuth, deletecategoryController)