import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { status_catalogtable, TIstatuscatalog } from '../drizzle/schema';


const statuscatalogService = async (limit?: number)=> {
    if (limit) {
        return await db.query.status_catalogtable.findMany({
            limit: limit,
        });
    }
    return await db.query.status_catalogtable.findMany();
}

const getstatuscatalogService = async (id: number)=> {
    return await db.query.status_catalogtable.findFirst({
        where: eq(status_catalogtable.id, id),
        columns:{
            name: true
        }
    })
}

const createstatuscatalogService = async (user: TIstatuscatalog) => {
    await db.insert(status_catalogtable).values(user)
    return "User created successfully";
}

const updatestatuscatalogService = async (id: number, user: TIstatuscatalog) => {
    await db.update(status_catalogtable).set(user).where(eq(status_catalogtable.id, id))
    return "User updated successfully";
}

const deletestatuscatalogService = async (id: number) => {
    await db.delete(status_catalogtable).where(eq(status_catalogtable.id, id))
    return "User deleted successfully";
}

export{
    statuscatalogService,
    getstatuscatalogService,
    createstatuscatalogService,
    updatestatuscatalogService,
    deletestatuscatalogService
}