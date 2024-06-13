import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { categorytable, TIcategory } from '../drizzle/schema';


const categoryService = async (limit?: number)=> {
    if (limit) {
        return await db.query.categorytable.findMany({
            limit: limit,
        });
    }
    return await db.query.categorytable.findMany();
}

const getcategoryService = async (id: number)=> {
    return await db.query.categorytable.findFirst({
        where: eq(categorytable.id, id)
    })
}

const createcategoryService = async (user: TIcategory) => {
    await db.insert(categorytable).values(user)
    return "User created successfully";
}

const updatecategoryService = async (id: number, user: TIcategory) => {
    await db.update(categorytable).set(user).where(eq(categorytable.id, id))
    return "User updated successfully";
}

const deletecategoryService = async (id: number) => {
    await db.delete(categorytable).where(eq(categorytable.id, id))
    return "User deleted successfully";
}

export{
    categoryService,
    getcategoryService,
    createcategoryService,
    updatecategoryService,
    deletecategoryService
}