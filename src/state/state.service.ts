import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { statetable, TIstate} from '../drizzle/schema';


const stateService = async (limit?: number)=> {
    if (limit) {
        return await db.query.statetable.findMany({
            limit: limit,
        });
    }
    return await db.query.statetable.findMany();
}

const getstateService = async (id: number)=> {
    return await db.query.statetable.findFirst({
        where: eq(statetable.id, id),
        columns:{
            name: true,
            code: true,
        }
    })
}

const createstateService = async (user: TIstate) => {
    await db.insert(statetable).values(user)
    return "User created successfully";
}

const updatestateService = async (id: number, user: TIstate) => {
    await db.update(statetable).set(user).where(eq(statetable.id, id))
    return "User updated successfully";
}

const deletestateService = async (id: number) => {
    await db.delete(statetable).where(eq(statetable.id, id))
    return "User deleted successfully";
}

export{
    stateService,
    getstateService,
    createstateService,
    updatestateService,
    deletestateService
}