
import { authoritytable,authoritydrivertable, authorityownertable,  TIAuthOnUser, TSAuthOnUser,  TIdriverauth, TSdriverauth, TSresturantownerRoleAuth } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createauthorityService = async (user: TIAuthOnUser): Promise<string | null> => {
    await db.insert(authoritytable).values(user)
    return "User created successfully";
}

// User login service
export const userLoginService = async (user: TSAuthOnUser) => {
    const { username, password } = user;
    return await db.query.authoritytable.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        },
        where: sql`${authoritytable.username} = ${username}`,
        with: {
            usersing: {
                columns: {
                    id: true,
                    name: true,
                    contact_phone: true,
                    phone_verified: true,
                    email: true,
                    email_verified: true
                },
            }
        }
    });
}


export const createdriverService = async (driver: TIdriverauth): Promise<string | null> => {
    await db.insert(authoritydrivertable).values(driver)
    return "Driver created successfully";
}

export const driverLoginService = async (driver: TSdriverauth) =>{
    const driversname = driver;
    return await db.query.authoritydrivertable.findFirst({
        columns: {
            driversname: true,
            role: true,
            password: true
        }, where: sql` ${authoritydrivertable.driversname} = ${driversname}`,
        with: {
            driver: {
                columns: {
                    id: true,
                    car_make: true,
                    car_model: true,
                    car_year: true,
                    user_id: true,
                    online: true,
                    delivering: true
                }
            }
        }
    })
}



export const createownerservice = async () => {}

export const ownerService = async (owner: TSresturantownerRoleAuth) =>{
    const ownersname = owner;
    return await db.query.authorityownertable.findFirst({
        columns: {
            ownersname: true,
            role: true,
            password: true
        }, where: sql` ${authorityownertable.ownersname} = ${ownersname}`,
        with: {
            owner: {
                columns: {
                    id: true,
                    restaurant_id: true,
                    owner_id: true
                }
            }
        }
    })
}