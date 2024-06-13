import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { order_menu_itemtable, TIorderMenu } from '../drizzle/schema';


const orderMenuService = async (limit?: number)=> {
    if (limit) {
        return await db.query.order_menu_itemtable.findMany({
            limit: limit,
        });
    }
    return await db.query.order_menu_itemtable.findMany();
}

const getorderMenuService = async (id: number)=> {
    return await db.query.order_menu_itemtable.findFirst({
        where: eq(order_menu_itemtable.id, id),
        columns:{
            quantity:true,
            item_price:true,
            price:true,
            comment:true
        },with:{
            menu_item:{
                columns:{
                    name:true,
                    description:true,
                    price:true,
                    active:true
                }
            },
            order:{
                columns:{
                    estimated_delivery_time:true,
                    actual_delivery_time:true,
                    delivery_address_id:true,
                    price:true,
                    discount:true,
                    final_price:true,
                    comment:true
                }
    
        }}
    })
}

const createorderMenuService = async (user: TIorderMenu) => {
    await db.insert(order_menu_itemtable).values(user)
    return "User created successfully";
}

const updateorderMenuService = async (id: number, user: TIorderMenu) => {
    await db.update(order_menu_itemtable).set(user).where(eq(order_menu_itemtable.id, id))
    return "User updated successfully";
}

const deleteorderMenuService = async (id: number) => {
    await db.delete(order_menu_itemtable).where(eq(order_menu_itemtable.id, id))
    return "User deleted successfully";
}

export{
    orderMenuService,
    getorderMenuService,
    createorderMenuService,
    updateorderMenuService,
    deleteorderMenuService
}