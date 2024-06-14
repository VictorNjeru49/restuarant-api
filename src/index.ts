import { serve } from '@hono/node-server'
import { Hono } from 'hono'

  
import { userRouter } from './users/users.router'
import {addressRouter} from './address/address.router'
import {stateRouter} from './state/state.router'
import { categoriesRouter } from './categories/categories.router'
import { cityRouter } from './city/city.router'
import { commentRouter } from './comment/comment.router'
import { driverRouter } from './driver/drivers.router'
import { menuitemRouter } from './menu_item/menuitems.router'
import { restaurantRouter } from './restaurant/restaurant.router'
import { orderMenuRouter } from './order_menu_item/ordermenuitem.router'
import { orderstatusRouter } from './order_status/orderstatus.router'
import { ordersRouter } from './orders/orders.router'
import { resturantownerRouter } from './restaurant_owner/restaurantowner.router'
import { statuscatalogRouter } from './status_catalog/statuscatalog.router'
import { authorityrelationship } from './authentication/authentication.router'
  
  const app = new Hono()
  
  app.get('/', (c) => {
    return c.text('Hello Hono!')
  })
  
  //custom routes
  app.route('/', userRouter)
  
  app.route('/' , addressRouter)
  
  app.route('/' , stateRouter)
  
  app.route('/' , categoriesRouter)
  
  app.route('/' , cityRouter)
  
  app.route('/' , commentRouter)
  
  app.route('/' , driverRouter)
  
  app.route('/' , menuitemRouter) 
  
  app.route('/' , restaurantRouter) 
  
  app.route('/' , orderMenuRouter)
  
  app.route('/' , orderstatusRouter)
  
  app.route('/' , ordersRouter)
  
  app.route('/' , resturantownerRouter)
  
  app.route('/' , statuscatalogRouter)
  
  app.route('/' , authorityrelationship)
  
  // const port = 3000
  console.log(`server listening to port ${process.env.PORT}`)
  
  
  serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
  })
