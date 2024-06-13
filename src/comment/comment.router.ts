import { Hono } from "hono";
import { getcomment, getcommentController, createcommentController, updatecommentController, deletecommentController} from "./comment.controller";
import { zValidator } from "@hono/zod-validator";
import { commentValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth,userRoleAuth} from "../middleware/authormiddle";


export const commentRouter = new Hono();

commentRouter.get("/comment", adminRoleAuth, getcomment);

// get all comment
commentRouter
    .post("comment", zValidator('json', commentValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), userRoleAuth, createcommentController,)

// get comment by id
commentRouter
    .get("/comment/:id", bothRoleAuth, getcommentController)
    .put("/comment/:id", userRoleAuth, updatecommentController)
    .delete("/comment/:id", bothRoleAuth, deletecommentController)