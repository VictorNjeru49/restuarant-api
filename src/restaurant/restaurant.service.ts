import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { restauranttable, TIresturant } from '../drizzle/schema';


const restaurantService = async (limit?: number)=> {
    if (limit) {
        return await db.query.restauranttable.findMany({
            limit: limit,
        });
    }
    return await db.query.restauranttable.findMany();
}

const getrestaurantService = async (id: number)=> {
    return await db.query.restauranttable.findFirst({
        where: eq(restauranttable.id, id),
        columns:{
            name:true,
            street_address:true,
            zip_code:true
        },
        with:{
            city:{
                columns:{
                    name:true
                }
            },
            menubar:{
                columns:{
                    name:true,
                    description:true,
                    ingredients:true,
                    price:true,
                    active:true
                }
            }, 
            orders:{
                columns:{
                    estimated_delivery_time:true,
                    actual_delivery_time:true,
                    delivery_address_id:true,
                    price:true,
                    discount:true,
                    final_price:true,
                    comment:true
                }
            }
    }})
}

const createrestaurantService = async (user: TIresturant) => {
    await db.insert(restauranttable).values(user)
    return "User created successfully";
}

const updaterestaurantService = async (id: number, user: TIresturant) => {
    await db.update(restauranttable).set(user).where(eq(restauranttable.id, id))
    return "User updated successfully";
}

const deleterestaurantService = async (id: number) => {
    await db.delete(restauranttable).where(eq(restauranttable.id, id))
    return "User deleted successfully";
}

export{
    restaurantService,
    getrestaurantService,
    createrestaurantService,
    updaterestaurantService,
    deleterestaurantService
}