import { Hono } from "hono";
import { getstatuscatalog, getstatuscatalogController, createstatuscatalogController, updatestatuscatalogController, deletestatuscatalogController } from "./statuscatalog.controller";
import { zValidator } from "@hono/zod-validator";
import { statusCatalogValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const statuscatalogRouter = new Hono();

statuscatalogRouter.get("/status_catalog", adminRoleAuth, getstatuscatalog);

// get all status catalog
statuscatalogRouter
    .post("status_catalog", zValidator('json', statusCatalogValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), adminRoleAuth, createstatuscatalogController)

// get status catalog by id
statuscatalogRouter
    .get("/status_catalog/:id", bothRoleAuth, getstatuscatalogController)
    .put("/status_catalog/:id",bothRoleAuth, updatestatuscatalogController)
    .delete("/status_catalog/:id", deletestatuscatalogController)