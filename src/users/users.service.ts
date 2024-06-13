import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { userstable, TIuser } from '../drizzle/schema';


const userService = async (limit?: number)=> {
    if (limit) {
        return await db.query.userstable.findMany({
            limit: limit,
        });
    }
    return await db.query.userstable.findMany();
}



const getuserService = async (id: number)=> {
    return await db.query.userstable.findFirst({
        where: eq(userstable.id, id),
        columns:{
            name: true,
            contact_phone: true,
            phone_verified: true,
            email:true,
            email_verified: true,
            confirmation_code: true
        },
        with:{
            address:{
                columns:{
                    street_address_1: true,
                    street_address_2: true,
                    delivery_instructions: true,
                    zip_code: true
                }
            },
            orders:{
                columns:{
                    actual_delivery_time:true,
                    delivery_address_id:true,
                    price:true,
                    discount:true,
                    final_price:true,
                    comment:true
                }
            },
            comment:{
                columns:{
                    comment_text: true,
                    is_complaint:true,
                    is_praise:true
                }
            },
            driver:{
                columns:{
                    car_make: true,
                    car_model: true,
                    car_year: true,
                    online: true,
                    delivering: true
                }
            }
        }
    })
}

const createuserService = async (user: TIuser) => {
    await db.insert(userstable).values(user)
    return "User created successfully";
}

const updateuserService = async (id: number, user: TIuser) => {
    await db.update(userstable).set(user).where(eq(userstable.id, id))
    return "User updated successfully";
}

const deleteuserService = async (id: number) => {
    await db.delete(userstable).where(eq(userstable.id, id))
    return "User deleted successfully";
}

export{
    userService,
    getuserService,
    createuserService,
    updateuserService,
    deleteuserService
}