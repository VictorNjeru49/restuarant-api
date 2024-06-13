import { pgTable, serial, text, varchar, integer, boolean, decimal,pgEnum } from "drizzle-orm/pg-core";
import { time,timestamp, numeric, foreignKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const userstable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    contact_phone: text('contact_phone').notNull(),
    phone_verified: boolean('phone_verified').notNull(),
    email: text('email').notNull(),
    email_verified: boolean('email_verified').notNull(),
    confirmation_code: text('confirmation_code'),
    password: text('password').notNull(),
    created_at: time('created_at').notNull().defaultNow(),
    updated_at: time('updated_at').notNull().defaultNow()
  });

  const statetable = pgTable('state', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    code: text('code').notNull()
  });

  const status_catalogtable = pgTable('status_catalog', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name').notNull(),
  });

  const citytable = pgTable('city', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    state_id: integer('state_id').references(() => statetable.id).notNull()
  });

  const categorytable = pgTable('category', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull()
  });

const addresstable = pgTable('address', {
    id: serial('id').primaryKey(),
    street_address_1: text('street_address_1').notNull(),
    street_address_2: text('street_address_2'),
    zip_code: text('zip_code').notNull(),
    delivery_instructions: text('delivery_instructions'),
    user_id: integer('user_id').references(() => userstable.id).notNull(),
    city_id: integer('city_id').references(() => citytable.id).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  });

  const drivertable = pgTable('driver', {
    id: serial('id').primaryKey(),
    car_make: text('car_make').notNull(),
    car_model: text('car_model').notNull(),
    car_year: integer('car_year').notNull(),
    user_id: integer('user_id').references(() => userstable.id).notNull(),
    online: boolean('online').notNull(),
    delivering: boolean('delivering').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow()
  });

  const restauranttable = pgTable('restaurant', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    street_address: text('street_address').notNull(),
    zip_code: text('zip_code').notNull(),
    city_id: integer('city_id').references(() => citytable.id).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow()
  });
  
  const orderstable = pgTable('orders', {
    id: serial('id').primaryKey(),
    restaurant_id: integer('restaurant_id').references(() => restauranttable.id).notNull(),
    estimated_delivery_time: timestamp('estimated_delivery_time').notNull().defaultNow(),
    actual_delivery_time: timestamp('actual_delivery_time').defaultNow(),
    delivery_address_id: integer('delivery_address_id').references(() => addresstable.id).notNull(),
    user_id: integer('user_id').references(() => userstable.id).notNull(),
    driver_id: integer('driver_id').references(() => drivertable.id),
    price: numeric('price').notNull(),
    discount: numeric('discount').notNull(),
    final_price: numeric('final_price').notNull(),
    comment: text('comment'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow()
  });
  
  const commenttable = pgTable('comment', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').references(() => orderstable.id).notNull(),
    user_id: integer('user_id').references(() => userstable.id).notNull(),
    comment_text: text('comment_text').notNull(),
    is_complaint: boolean('is_complaint').notNull(),
    is_praise: boolean('is_praise').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow()
  });
  
  const menu_itemtable = pgTable('menu_item', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    restaurant_id: integer('restaurant_id').references(() => restauranttable.id).notNull(),
    category_id: integer('category_id').references(() => categorytable.id).notNull(),
    description: text('description').notNull(),
    ingredients: text('ingredients').notNull(),
    price: numeric('price').notNull(),
    active: boolean('active').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow()
  });
  
  const order_menu_itemtable = pgTable('order_menu_item', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').references(() => orderstable.id).notNull(),
    menu_item_id: integer('menu_item_id').references(() => menu_itemtable.id).notNull(),
    quantity: integer('quantity').notNull(),
    item_price: numeric('item_price').notNull(),
    price: numeric('price').notNull(),
    comment: text('comment')
  });

  const order_statustable = pgTable('order_status', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').references(() => orderstable.id).notNull(),
    status_catalog_id: integer('status_catalog_id').references(() => status_catalogtable.id).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow()
  });
  
  const restaurant_ownertable = pgTable('restaurant_owner', {
    id: serial('id').primaryKey(),
    restaurant_id: integer('restaurant_id').references(() => restauranttable.id).notNull(),
    owner_id: integer('owner_id').references(() => userstable.id).notNull(),
  });




  export const roleEnum = pgEnum("role", ["admin", "user", "driver"])

  export const authoritytable = pgTable("authorityusers", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => userstable.id),
    password: varchar("password", { length: 100 }),
    username: varchar("username", { length: 100 }),
    role: roleEnum("role").default("user")
});

export const authoritydrivertable = pgTable("authoritydriver", {
  id: serial("id").primaryKey(),
  driverId: integer("user_id").notNull().references(() => drivertable.id),
  password: varchar("password", { length: 100 }),
  driversname: varchar("username", { length: 100 }),
  role: roleEnum("role").default("driver")
});




//relationships



   export const authorityrelations = relations(authoritytable, ({ one }) => ({
    usersing: one(userstable, {
        fields: [authoritytable.userId],
        references: [userstable.id]
    })
}));



        const AddressRelations = relations(addresstable, ({ one}) => ({
        user: one(userstable,{
          fields:[addresstable.user_id],
          references:[userstable.id]
        }),
        city: one(citytable,{
          fields:[addresstable.city_id],
          references:[citytable.id]
        })
        }));
        
        const CityRelations = relations(citytable, ({ one }) => ({
        state: one(statetable, {
          fields:[citytable.state_id],
          references: [statetable.id],
        }),
        }));

        const CommentRelations = relations(commenttable, ({ one }) => ({
        order: one(orderstable,{
          fields:[commenttable.order_id],
          references:[orderstable.id]
        }),
        user: one(userstable,{
          fields:[commenttable.user_id],
          references:[userstable.id]
        }),
        }));
        
        const DriverRelations = relations(drivertable, ({ one }) => ({
        user: one(userstable,{
          fields:[drivertable.user_id],
          references:[userstable.id]
        }),
        }));
        
        const MenuItemRelations = relations(menu_itemtable, ({ one }) => ({
          restaurant: one(restauranttable,{
            fields:[menu_itemtable.restaurant_id],
            references:[restauranttable.id]
          }),
          category: one(categorytable,{
            fields:[menu_itemtable.category_id],
            references:[categorytable.id]
          }),
        }));
        
        const OrderMenuItemRelations = relations(order_menu_itemtable, ({ one }) => ({
        order: one(orderstable,{
          fields:[order_menu_itemtable.order_id],
          references:[orderstable.id]
        }),
        menu_item: one(menu_itemtable,{
          fields:[order_menu_itemtable.menu_item_id],
          references:[menu_itemtable.id]
        }),
        }));
        
        const OrderStatusRelations = relations(order_statustable, ({ one }) => ({
        order: one(orderstable,{
          fields:[order_statustable.order_id],
          references:[orderstable.id]
        }),
        status_catalog: one(status_catalogtable,{
          fields:[order_statustable.status_catalog_id],
          references:[status_catalogtable.id]
        }),
        }));
        
        const OrdersRelations = relations(orderstable, ({ one, many }) => ({
        restaurant: one(restauranttable,{
          fields:[orderstable.restaurant_id],
          references:[restauranttable.id]
        }),
        delivery_address: one(addresstable,{
          fields:[orderstable.delivery_address_id],
          references:[addresstable.id]
        }),
        user: one(userstable,{
          fields:[orderstable.user_id],
          references:[userstable.id]
        }),
        driver: one(drivertable,{
          fields:[orderstable.driver_id],
          references:[drivertable.id]
        }),
        orderStatus: many(order_statustable)
        }));
        
        const RestaurantRelations = relations(restauranttable, ({ one, many }) => ({
        city: one(citytable,{
          fields:[restauranttable.city_id],
          references:[citytable.id]
        }),
        menubar: many(menu_itemtable),
        orders: many(orderstable)
        }));
        
        const RestaurantOwnerRelations = relations(restaurant_ownertable, ({ one }) => ({
        restaurant: one(restauranttable,{
          fields:[restaurant_ownertable.restaurant_id],
          references:[restauranttable.id]
        }),
        user: one(userstable,{
          fields:[restaurant_ownertable.owner_id],
          references:[userstable.id]
        }),
        }));

        const userrelations = relations(userstable,({many})=>({
          address:many(addresstable),
          orders:many(orderstable),
          restaurant_owner:many(restaurant_ownertable),
          comment: many(commenttable),
          driver:many(drivertable)
        }))
    
// address table to insert and select
        type TIaddress = typeof addresstable.$inferInsert;
        type TSaddress = typeof addresstable.$inferSelect;


// user table to insert and select
        type TIuser = typeof userstable.$inferInsert;
        type TSuser = typeof userstable.$inferSelect;


// categories table to insert and select
        type TIcategory = typeof categorytable.$inferInsert;
        type TScategory = typeof categorytable.$inferSelect;


// state table to insert and select
        type TIstate = typeof statetable.$inferInsert;
        type TSstate = typeof statetable.$inferSelect;


// city table to insert and select
        type TIcity = typeof citytable.$inferInsert;
        type TScity = typeof citytable.$inferSelect;


// comment table to insert and select
        type TIcomment = typeof commenttable.$inferInsert;
        type TScomment = typeof commenttable.$inferSelect;

// resturant table to insert and select
        type TIresturant = typeof restauranttable.$inferInsert;
        type TSresturant = typeof restauranttable.$inferSelect;

// status catalog to insert and select
        type TIstatuscatalog = typeof status_catalogtable.$inferInsert;
        type TSstatuscatalog= typeof status_catalogtable.$inferSelect;
    

// resturant owner to insert and select
        type TSrestaurantowner = typeof restaurant_ownertable.$inferSelect;
        type TIresturantowner = typeof restaurant_ownertable.$inferInsert;

// order to select and insert
        type TSorder = typeof orderstable.$inferSelect;
        type TIorder = typeof orderstable.$inferInsert;


// order menu item to select and insert
        type TSorderMenu = typeof order_menu_itemtable.$inferSelect;
        type TIorderMenu = typeof order_menu_itemtable.$inferInsert;

// menu items to select and insert
        type TImenuitems = typeof menu_itemtable.$inferInsert;
        type TSmenuitems = typeof menu_itemtable.$inferSelect;

// order status to select and insert
        type TIOrderStatus = typeof order_statustable.$inferInsert;
        type TSOrderStatus = typeof order_statustable.$inferSelect;


// driver to select and insert
        type TIdriver = typeof drivertable.$inferInsert;
        type TSdriver = typeof drivertable.$inferSelect;

// users relations
        type TIAuthOnUser= typeof authoritytable.$inferInsert;
        type TSAuthOnUser = typeof authoritytable.$inferSelect;

// drivers relations
        type TIdriverauth = typeof authoritydrivertable.$inferInsert;
        type TSdriverauth = typeof authoritydrivertable.$inferSelect;

// owners relations
        type TIresturantownerRoleAuth = typeof authoritytable.$inferInsert;
        type TSresturantownerRoleAuth = typeof authoritytable.$inferSelect;


  export {
    addresstable,
    categorytable,
    citytable,
    commenttable,
    drivertable,
    menu_itemtable,
    order_menu_itemtable,
    order_statustable,
    orderstable,
    restauranttable,
    statetable,
    status_catalogtable,
    userstable,
    restaurant_ownertable,


    AddressRelations,
    CityRelations,
    CommentRelations,
    DriverRelations,
    MenuItemRelations,
    OrderMenuItemRelations,
    OrderStatusRelations,
    OrdersRelations,
    RestaurantRelations,
    RestaurantOwnerRelations,
    userrelations,

  

    TIaddress,
    TSaddress,

    TIuser,
    TSuser,

    TIcategory,
    TScategory,

    TIstate,
    TSstate,

    TIcity,
    TScity,

    TIOrderStatus,
    TSOrderStatus,

    TScomment,
    TIcomment,

    TIdriver,
    TSdriver,

    TImenuitems,
    TSmenuitems,

    TIorder,
    TSorder,

    TIorderMenu,
    TSorderMenu,

    TSrestaurantowner,
    TIresturantowner,

    TIresturant,
    TSresturant,

    TIstatuscatalog,
    TSstatuscatalog,

    TIAuthOnUser,
    TSAuthOnUser,

    TIdriverauth,
    TSdriverauth,

    TIresturantownerRoleAuth,
    TSresturantownerRoleAuth
  };