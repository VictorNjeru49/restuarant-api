import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { restaurant_ownertable, TIresturantowner } from '../drizzle/schema';


const resturantownerService = async (limit?: number)=> {
    if (limit) {
        return await db.query.restaurant_ownertable.findMany({
            limit: limit,
        });
    }
    return await db.query.restaurant_ownertable.findMany();
}

const getresturantownerService = async (id: number)=> {
    return await db.query.restaurant_ownertable.findFirst({
        where: eq(restaurant_ownertable.id, id),
        with:{
        restaurant:{
                columns:{
                    name:true,
                    street_address:true,
                    zip_code:true
                }
            }
        }
    })
}

const createresturantownerService = async (user: TIresturantowner) => {
    await db.insert(restaurant_ownertable).values(user)
    return "User created successfully";
}

const updateresturantownerService = async (id: number, user: TIresturantowner) => {
    await db.update(restaurant_ownertable).set(user).where(eq(restaurant_ownertable.id, id))
    return "User updated successfully";
}

const deleteresturantownerService = async (id: number) => {
    await db.delete(restaurant_ownertable).where(eq(restaurant_ownertable.id, id))
    return "User deleted successfully";
}

export{
    resturantownerService,
    getresturantownerService,
    createresturantownerService,
    updateresturantownerService,
    deleteresturantownerService
}