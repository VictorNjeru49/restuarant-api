import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { order_statustable, TIOrderStatus } from '../drizzle/schema';


const orderstatusService = async (limit?: number)=> {
    if (limit) {
        return await db.query.order_statustable.findMany({
            limit: limit,
        });
    }
    return await db.query.order_statustable.findMany();
}

const getorderstatusService = async (id: number)=> {
    return await db.query.order_statustable.findFirst({
        where: eq(order_statustable.id, id)
    })
}

const createorderstatusService = async (user: TIOrderStatus) => {
    await db.insert(order_statustable).values(user)
    return "User created successfully";
}

const updateorderstatusService = async (id: number, user: TIOrderStatus) => {
    await db.update(order_statustable).set(user).where(eq(order_statustable.id, id))
    return "User updated successfully";
}

const deleteorderstatusService = async (id: number) => {
    await db.delete(order_statustable).where(eq(order_statustable.id, id))
    return "User deleted successfully";
}

export{
    orderstatusService,
    getorderstatusService,
    createorderstatusService,
    updateorderstatusService,
    deleteorderstatusService
}