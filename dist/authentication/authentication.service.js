"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createownerservice = exports.driverLoginService = exports.createdriverService = exports.userLoginService = exports.createauthorityService = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const createauthorityService = async (user) => {
    await db_1.default.insert(schema_1.authoritytable).values(user);
    return "User created successfully";
};
exports.createauthorityService = createauthorityService;
// User login service
const userLoginService = async (user) => {
    const { username, password } = user;
    return await db_1.default.query.authoritytable.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.authoritytable.username} = ${username}`,
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
};
exports.userLoginService = userLoginService;
const createdriverService = async (driver) => {
    await db_1.default.insert(schema_1.authoritydrivertable).values(driver);
    return "Driver created successfully";
};
exports.createdriverService = createdriverService;
const driverLoginService = async (driver) => {
    const driversname = driver;
    return await db_1.default.query.authoritydrivertable.findFirst({
        columns: {
            driversname: true,
            role: true,
            password: true
        }, where: (0, drizzle_orm_1.sql) ` ${schema_1.authoritydrivertable.driversname} = ${driversname}`,
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
    });
};
exports.driverLoginService = driverLoginService;
const createownerservice = async () => { };
exports.createownerservice = createownerservice;
