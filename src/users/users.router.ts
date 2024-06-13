import { Hono } from "hono";
import { userstate, getuserController, createuserController, updateuserController, deleteuserController} from "./users.controller";
import { zValidator } from "@hono/zod-validator";
import { usersValidator } from "../validators";
import { adminRoleAuth,bothRoleAuth } from "../middleware/authormiddle";


export const userRouter = new Hono();

userRouter.get("/users", adminRoleAuth, userstate);

// get all addresses
userRouter
    .post("/users",zValidator('json', usersValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), adminRoleAuth, createuserController)
    .delete("/users", adminRoleAuth, deleteuserController)

// get address by id
userRouter
    .get("/users/:id", bothRoleAuth, getuserController)
    .put("/users/:id", adminRoleAuth, updateuserController)
    .delete("/users/:id", bothRoleAuth, deleteuserController)