import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { commenttable, TIcomment } from '../drizzle/schema';


const commentService = async (limit?: number)=> {
    if (limit) {
        return await db.query.commenttable.findMany({
            limit: limit,
        });
    }
    return await db.query.commenttable.findMany();
}

const getcommentService = async (id: number)=> {
    return await db.query.commenttable.findFirst({
        where: eq(commenttable.id, id),
        columns:{
            comment_text: true,
            is_complaint: true,
            is_praise: true
        },
        with:{
            order:{
                columns:{
                    estimated_delivery_time: true,
                    actual_delivery_time: true,
                    delivery_address_id: true,
                    price: true,
                    discount: true,
                    final_price: true,
                    comment: true
                }
            },
            user:{
                columns:{
                name:true,
                email:true,
                contact_phone:true,
                phone_verified:true,
                password:true,
                email_verified:true,
                confirmation_code:true,
                }
            }
}})
}

const createcommentService = async (user: TIcomment) => {
    await db.insert(commenttable).values(user)
    return "User created successfully";
}

const updatecommentService = async (id: number, user: TIcomment) => {
    await db.update(commenttable).set(user).where(eq(commenttable.id, id))
    return "User updated successfully";
}

const deletecommentService = async (id: number) => {
    await db.delete(commenttable).where(eq(commenttable.id, id))
    return "User deleted successfully";
}

export{
    commentService,
    getcommentService,
    createcommentService,
    updatecommentService,
    deletecommentService
}