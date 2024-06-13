import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { citytable, TIcity } from '../drizzle/schema';


const cityService = async (limit?: number)=> {
    if (limit) {
        return await db.query.citytable.findMany({
            limit: limit,
        });
    }
    return await db.query.citytable.findMany();
}

const getcityService = async (id: number)=> {
    return await db.query.citytable.findFirst({
        where: eq(citytable.id, id),
        columns:{
            name: true
        }
    })
}

const createcityService = async (user: TIcity) => {
    await db.insert(citytable).values(user)
    return "User created successfully";
}

const updatecityService = async (id: number, user: TIcity) => {
    await db.update(citytable).set(user).where(eq(citytable.id, id))
    return "User updated successfully";
}

const deletecityService = async (id: number) => {
    await db.delete(citytable).where(eq(citytable.id, id))
    return "User deleted successfully";
}

export{
    cityService,
    getcityService,
    createcityService,
    updatecityService,
    deletecityService
}