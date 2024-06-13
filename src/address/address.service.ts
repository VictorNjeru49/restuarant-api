import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { addresstable, TIaddress,TSaddress } from '../drizzle/schema';
import { promise } from "zod";


const addressService = async (limit?: number):Promise <TSaddress[] | null>=> {
    if (limit) {
        return await db.query.addresstable.findMany({
            limit: limit,
        });
    }
    return await db.query.addresstable.findMany();
}

const getaddressService = async (id: number)=> {
    return await db.query.addresstable.findFirst({
        where: eq(addresstable.id, id),
        with:{
            user:{
                columns:{
                    name:true,
                    email:true,
                    email_verified:true,
                    contact_phone:true,
                    phone_verified:true,
                    confirmation_code:true,
                }
            },
            city:
            {
                columns:{
                    name:true
                }
            }
        }
    })
}

const createaddressService = async (user: TIaddress) => {
    await db.insert(addresstable).values(user)
    return "User created successfully";
}

const updateaddressService = async (id: number, user: TIaddress) => {
    await db.update(addresstable).set(user).where(eq(addresstable.id, id))
    return "User updated successfully";
}

const deleteaddressService = async (id: number) => {
    await db.delete(addresstable).where(eq(addresstable.id, id))
    return "User deleted successfully";
}

export{
    addressService,
    getaddressService,
    createaddressService,
    updateaddressService,
    deleteaddressService
}