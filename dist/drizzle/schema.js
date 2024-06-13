"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userrelations = exports.RestaurantOwnerRelations = exports.RestaurantRelations = exports.OrdersRelations = exports.OrderStatusRelations = exports.OrderMenuItemRelations = exports.MenuItemRelations = exports.DriverRelations = exports.CommentRelations = exports.CityRelations = exports.AddressRelations = exports.restaurant_ownertable = exports.userstable = exports.status_catalogtable = exports.statetable = exports.restauranttable = exports.orderstable = exports.order_statustable = exports.order_menu_itemtable = exports.menu_itemtable = exports.drivertable = exports.commenttable = exports.citytable = exports.categorytable = exports.addresstable = exports.authorityrelations = exports.authoritydrivertable = exports.authoritytable = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const userstable = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    contact_phone: (0, pg_core_1.text)('contact_phone').notNull(),
    phone_verified: (0, pg_core_1.boolean)('phone_verified').notNull(),
    email: (0, pg_core_1.text)('email').notNull(),
    email_verified: (0, pg_core_1.boolean)('email_verified').notNull(),
    confirmation_code: (0, pg_core_1.text)('confirmation_code'),
    password: (0, pg_core_1.text)('password').notNull(),
    created_at: (0, pg_core_2.time)('created_at').notNull().defaultNow(),
    updated_at: (0, pg_core_2.time)('updated_at').notNull().defaultNow()
});
exports.userstable = userstable;
const statetable = (0, pg_core_1.pgTable)('state', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    code: (0, pg_core_1.text)('code').notNull()
});
exports.statetable = statetable;
const status_catalogtable = (0, pg_core_1.pgTable)('status_catalog', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(),
    name: (0, pg_core_1.varchar)('name').notNull(),
});
exports.status_catalogtable = status_catalogtable;
const citytable = (0, pg_core_1.pgTable)('city', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    state_id: (0, pg_core_1.integer)('state_id').references(() => statetable.id).notNull()
});
exports.citytable = citytable;
const categorytable = (0, pg_core_1.pgTable)('category', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull()
});
exports.categorytable = categorytable;
const addresstable = (0, pg_core_1.pgTable)('address', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    street_address_1: (0, pg_core_1.text)('street_address_1').notNull(),
    street_address_2: (0, pg_core_1.text)('street_address_2'),
    zip_code: (0, pg_core_1.text)('zip_code').notNull(),
    delivery_instructions: (0, pg_core_1.text)('delivery_instructions'),
    user_id: (0, pg_core_1.integer)('user_id').references(() => userstable.id).notNull(),
    city_id: (0, pg_core_1.integer)('city_id').references(() => citytable.id).notNull(),
    created_at: (0, pg_core_2.timestamp)('created_at').notNull().defaultNow(),
    updated_at: (0, pg_core_2.timestamp)('updated_at').notNull().defaultNow(),
});
exports.addresstable = addresstable;
const drivertable = (0, pg_core_1.pgTable)('driver', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    car_make: (0, pg_core_1.text)('car_make').notNull(),
    car_model: (0, pg_core_1.text)('car_model').notNull(),
    car_year: (0, pg_core_1.integer)('car_year').notNull(),
    user_id: (0, pg_core_1.integer)('user_id').references(() => userstable.id).notNull(),
    online: (0, pg_core_1.boolean)('online').notNull(),
    delivering: (0, pg_core_1.boolean)('delivering').notNull(),
    created_at: (0, pg_core_2.timestamp)('created_at').notNull().defaultNow(),
    updated_at: (0, pg_core_2.timestamp)('updated_at').notNull().defaultNow()
});
exports.drivertable = drivertable;
const restauranttable = (0, pg_core_1.pgTable)('restaurant', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    street_address: (0, pg_core_1.text)('street_address').notNull(),
    zip_code: (0, pg_core_1.text)('zip_code').notNull(),
    city_id: (0, pg_core_1.integer)('city_id').references(() => citytable.id).notNull(),
    created_at: (0, pg_core_2.timestamp)('created_at').notNull().defaultNow(),
    updated_at: (0, pg_core_2.timestamp)('updated_at').notNull().defaultNow()
});
exports.restauranttable = restauranttable;
const orderstable = (0, pg_core_1.pgTable)('orders', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    restaurant_id: (0, pg_core_1.integer)('restaurant_id').references(() => restauranttable.id).notNull(),
    estimated_delivery_time: (0, pg_core_2.timestamp)('estimated_delivery_time').notNull().defaultNow(),
    actual_delivery_time: (0, pg_core_2.timestamp)('actual_delivery_time').defaultNow(),
    delivery_address_id: (0, pg_core_1.integer)('delivery_address_id').references(() => addresstable.id).notNull(),
    user_id: (0, pg_core_1.integer)('user_id').references(() => userstable.id).notNull(),
    driver_id: (0, pg_core_1.integer)('driver_id').references(() => drivertable.id),
    price: (0, pg_core_2.numeric)('price').notNull(),
    discount: (0, pg_core_2.numeric)('discount').notNull(),
    final_price: (0, pg_core_2.numeric)('final_price').notNull(),
    comment: (0, pg_core_1.text)('comment'),
    created_at: (0, pg_core_2.timestamp)('created_at').notNull().defaultNow(),
    updated_at: (0, pg_core_2.timestamp)('updated_at').notNull().defaultNow()
});
exports.orderstable = orderstable;
const commenttable = (0, pg_core_1.pgTable)('comment', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    order_id: (0, pg_core_1.integer)('order_id').references(() => orderstable.id).notNull(),
    user_id: (0, pg_core_1.integer)('user_id').references(() => userstable.id).notNull(),
    comment_text: (0, pg_core_1.text)('comment_text').notNull(),
    is_complaint: (0, pg_core_1.boolean)('is_complaint').notNull(),
    is_praise: (0, pg_core_1.boolean)('is_praise').notNull(),
    created_at: (0, pg_core_2.timestamp)('created_at').notNull().defaultNow(),
    updated_at: (0, pg_core_2.timestamp)('updated_at').notNull().defaultNow()
});
exports.commenttable = commenttable;
const menu_itemtable = (0, pg_core_1.pgTable)('menu_item', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    restaurant_id: (0, pg_core_1.integer)('restaurant_id').references(() => restauranttable.id).notNull(),
    category_id: (0, pg_core_1.integer)('category_id').references(() => categorytable.id).notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    ingredients: (0, pg_core_1.text)('ingredients').notNull(),
    price: (0, pg_core_2.numeric)('price').notNull(),
    active: (0, pg_core_1.boolean)('active').notNull(),
    created_at: (0, pg_core_2.timestamp)('created_at').notNull().defaultNow(),
    updated_at: (0, pg_core_2.timestamp)('updated_at').notNull().defaultNow()
});
exports.menu_itemtable = menu_itemtable;
const order_menu_itemtable = (0, pg_core_1.pgTable)('order_menu_item', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    order_id: (0, pg_core_1.integer)('order_id').references(() => orderstable.id).notNull(),
    menu_item_id: (0, pg_core_1.integer)('menu_item_id').references(() => menu_itemtable.id).notNull(),
    quantity: (0, pg_core_1.integer)('quantity').notNull(),
    item_price: (0, pg_core_2.numeric)('item_price').notNull(),
    price: (0, pg_core_2.numeric)('price').notNull(),
    comment: (0, pg_core_1.text)('comment')
});
exports.order_menu_itemtable = order_menu_itemtable;
const order_statustable = (0, pg_core_1.pgTable)('order_status', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    order_id: (0, pg_core_1.integer)('order_id').references(() => orderstable.id).notNull(),
    status_catalog_id: (0, pg_core_1.integer)('status_catalog_id').references(() => status_catalogtable.id).notNull(),
    created_at: (0, pg_core_2.timestamp)('created_at').notNull().defaultNow()
});
exports.order_statustable = order_statustable;
const restaurant_ownertable = (0, pg_core_1.pgTable)('restaurant_owner', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    restaurant_id: (0, pg_core_1.integer)('restaurant_id').references(() => restauranttable.id).notNull(),
    owner_id: (0, pg_core_1.integer)('owner_id').references(() => userstable.id).notNull(),
});
exports.restaurant_ownertable = restaurant_ownertable;
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user", "driver"]);
exports.authoritytable = (0, pg_core_1.pgTable)("authorityusers", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => userstable.id),
    password: (0, pg_core_1.varchar)("password", { length: 100 }),
    username: (0, pg_core_1.varchar)("username", { length: 100 }),
    role: (0, exports.roleEnum)("role").default("user")
});
exports.authoritydrivertable = (0, pg_core_1.pgTable)("authoritydriver", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    driverId: (0, pg_core_1.integer)("user_id").notNull().references(() => drivertable.id),
    password: (0, pg_core_1.varchar)("password", { length: 100 }),
    driversname: (0, pg_core_1.varchar)("username", { length: 100 }),
    role: (0, exports.roleEnum)("role").default("driver")
});
//relationships
exports.authorityrelations = (0, drizzle_orm_1.relations)(exports.authoritytable, ({ one }) => ({
    usersing: one(userstable, {
        fields: [exports.authoritytable.userId],
        references: [userstable.id]
    })
}));
const AddressRelations = (0, drizzle_orm_1.relations)(addresstable, ({ one }) => ({
    user: one(userstable, {
        fields: [addresstable.user_id],
        references: [userstable.id]
    }),
    city: one(citytable, {
        fields: [addresstable.city_id],
        references: [citytable.id]
    })
}));
exports.AddressRelations = AddressRelations;
const CityRelations = (0, drizzle_orm_1.relations)(citytable, ({ one }) => ({
    state: one(statetable, {
        fields: [citytable.state_id],
        references: [statetable.id],
    }),
}));
exports.CityRelations = CityRelations;
const CommentRelations = (0, drizzle_orm_1.relations)(commenttable, ({ one }) => ({
    order: one(orderstable, {
        fields: [commenttable.order_id],
        references: [orderstable.id]
    }),
    user: one(userstable, {
        fields: [commenttable.user_id],
        references: [userstable.id]
    }),
}));
exports.CommentRelations = CommentRelations;
const DriverRelations = (0, drizzle_orm_1.relations)(drivertable, ({ one }) => ({
    user: one(userstable, {
        fields: [drivertable.user_id],
        references: [userstable.id]
    }),
}));
exports.DriverRelations = DriverRelations;
const MenuItemRelations = (0, drizzle_orm_1.relations)(menu_itemtable, ({ one }) => ({
    restaurant: one(restauranttable, {
        fields: [menu_itemtable.restaurant_id],
        references: [restauranttable.id]
    }),
    category: one(categorytable, {
        fields: [menu_itemtable.category_id],
        references: [categorytable.id]
    }),
}));
exports.MenuItemRelations = MenuItemRelations;
const OrderMenuItemRelations = (0, drizzle_orm_1.relations)(order_menu_itemtable, ({ one }) => ({
    order: one(orderstable, {
        fields: [order_menu_itemtable.order_id],
        references: [orderstable.id]
    }),
    menu_item: one(menu_itemtable, {
        fields: [order_menu_itemtable.menu_item_id],
        references: [menu_itemtable.id]
    }),
}));
exports.OrderMenuItemRelations = OrderMenuItemRelations;
const OrderStatusRelations = (0, drizzle_orm_1.relations)(order_statustable, ({ one }) => ({
    order: one(orderstable, {
        fields: [order_statustable.order_id],
        references: [orderstable.id]
    }),
    status_catalog: one(status_catalogtable, {
        fields: [order_statustable.status_catalog_id],
        references: [status_catalogtable.id]
    }),
}));
exports.OrderStatusRelations = OrderStatusRelations;
const OrdersRelations = (0, drizzle_orm_1.relations)(orderstable, ({ one, many }) => ({
    restaurant: one(restauranttable, {
        fields: [orderstable.restaurant_id],
        references: [restauranttable.id]
    }),
    delivery_address: one(addresstable, {
        fields: [orderstable.delivery_address_id],
        references: [addresstable.id]
    }),
    user: one(userstable, {
        fields: [orderstable.user_id],
        references: [userstable.id]
    }),
    driver: one(drivertable, {
        fields: [orderstable.driver_id],
        references: [drivertable.id]
    }),
    orderStatus: many(order_statustable)
}));
exports.OrdersRelations = OrdersRelations;
const RestaurantRelations = (0, drizzle_orm_1.relations)(restauranttable, ({ one, many }) => ({
    city: one(citytable, {
        fields: [restauranttable.city_id],
        references: [citytable.id]
    }),
    menubar: many(menu_itemtable),
    orders: many(orderstable)
}));
exports.RestaurantRelations = RestaurantRelations;
const RestaurantOwnerRelations = (0, drizzle_orm_1.relations)(restaurant_ownertable, ({ one }) => ({
    restaurant: one(restauranttable, {
        fields: [restaurant_ownertable.restaurant_id],
        references: [restauranttable.id]
    }),
    user: one(userstable, {
        fields: [restaurant_ownertable.owner_id],
        references: [userstable.id]
    }),
}));
exports.RestaurantOwnerRelations = RestaurantOwnerRelations;
const userrelations = (0, drizzle_orm_1.relations)(userstable, ({ many }) => ({
    address: many(addresstable),
    orders: many(orderstable),
    restaurant_owner: many(restaurant_ownertable),
    comment: many(commenttable),
    driver: many(drivertable)
}));
exports.userrelations = userrelations;
