import { Hono } from "hono";
import { getdriver, getdriverController, createdriverController, updatedriverController, deletedriverController} from "./drivers.controller";
import { zValidator } from "@hono/zod-validator";
import { driverValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth, driverRoleAuth} from "../middleware/authormiddle";


export const driverRouter = new Hono();

driverRouter.get("/driver", adminRoleAuth, getdriver);

// get all driver
driverRouter

    .post("driver", zValidator('json', driverValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), adminRoleAuth, createdriverController)

// get driver by id
driverRouter
    .get("/driver/:id", bothRoleAuth, getdriverController)
    .put("/driver/:id", bothRoleAuth ,updatedriverController)
    .delete("/driver/:id", adminRoleAuth, deletedriverController)