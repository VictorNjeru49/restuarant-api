"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const fs_1 = require("fs");
const users_router_1 = require("./users/users.router");
const address_router_1 = require("./address/address.router");
const state_router_1 = require("./state/state.router");
const categories_router_1 = require("./categories/categories.router");
const city_router_1 = require("./city/city.router");
const comment_router_1 = require("./comment/comment.router");
const drivers_router_1 = require("./driver/drivers.router");
const menuitems_router_1 = require("./menu_item/menuitems.router");
const restaurant_router_1 = require("./restaurant/restaurant.router");
const ordermenuitem_router_1 = require("./order_menu_item/ordermenuitem.router");
const orderstatus_router_1 = require("./order_status/orderstatus.router");
const orders_router_1 = require("./orders/orders.router");
const restaurantowner_router_1 = require("./restaurant_owner/restaurantowner.router");
const statuscatalog_router_1 = require("./status_catalog/statuscatalog.router");
const authentication_router_1 = require("./authentication/authentication.router");
const app = new hono_1.Hono();
app.get('/', async (c) => {
    try {
        let html = (0, fs_1.readFileSync)('./index.html', 'utf-8');
        return c.html(html);
    }
    catch (error) {
        return c.json({ error: error.message, status: 500 });
    }
});
app.notFound((c) => {
    return c.text('Not Found', 404);
});
//custom routes
app.route('/', users_router_1.userRouter);
app.route('/', address_router_1.addressRouter);
app.route('/', state_router_1.stateRouter);
app.route('/', categories_router_1.categoriesRouter);
app.route('/', city_router_1.cityRouter);
app.route('/', comment_router_1.commentRouter);
app.route('/', drivers_router_1.driverRouter);
app.route('/', menuitems_router_1.menuitemRouter);
app.route('/', restaurant_router_1.restaurantRouter);
app.route('/', ordermenuitem_router_1.orderMenuRouter);
app.route('/', orderstatus_router_1.orderstatusRouter);
app.route('/', orders_router_1.ordersRouter);
app.route('/', restaurantowner_router_1.resturantownerRouter);
app.route('/', statuscatalog_router_1.statuscatalogRouter);
app.route('/', authentication_router_1.authorityrelationship);
// const port = 3000
console.log(`server listening to port ${process.env.PORT}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});
