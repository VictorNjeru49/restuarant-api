import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { drivertable, TIdriver } from '../drizzle/schema';


const driverService = async (limit?: number)=> {
    if (limit) {
        return await db.query.drivertable.findMany({
            limit: limit,
        });
    }
    return await db.query.drivertable.findMany();
}

const getdriverService = async (id: number)=> {
    return await db.query.drivertable.findFirst({
        where: eq(drivertable.id, id),
        columns:{
            car_make:true,
            car_model:true,
            car_year:true,
            online:true,
            delivering:true
        },with:{
            user:{
                columns:{
                    name: true,
                    contact_phone:true,
                    email:true,
                    confirmation_code:true,
                }
            }
        }
    })
}

const createdriverService = async (user: TIdriver) => {
    await db.insert(drivertable).values(user)
    return "User created successfully";
}

const updatedriverService = async (id: number, user: TIdriver) => {
    await db.update(drivertable).set(user).where(eq(drivertable.id, id))
    return "User updated successfully";
}

const deletedriverService = async (id: number) => {
    await db.delete(drivertable).where(eq(drivertable.id, id))
    return "User deleted successfully";
}

export{
    driverService,
    getdriverService,
    createdriverService,
    updatedriverService,
    deletedriverService
}