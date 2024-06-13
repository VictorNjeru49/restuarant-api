import { z } from "zod";

// Address Validator
export const addressValidator = z.object({
  id: z.number().optional(),
  street_address_1: z.string(),
  street_address_2: z.string().nullable(),
  zip_code: z.string(),
  delivery_instructions: z.string().nullable(),
  user_id: z.number(),
  city_id: z.number(),
});

// Category Validator
export const categoryValidator = z.object({
  id: z.number().optional(),
  name: z.string()
});

// City Validator
export const cityValidator = z.object({
  id: z.number().optional(),
  name: z.string(),
  state_id: z.number()
});

// Comment Validator
export const commentValidator = z.object({
  id: z.number().optional(),
  order_id: z.number(),
  user_id: z.number(),
  comment_text: z.string(),
  is_complaint: z.boolean(),
  is_praise: z.boolean(),
});

// Driver Validator
export const driverValidator = z.object({
  id: z.number().optional(),
  car_make: z.string(),
  car_model: z.string(),
  car_year: z.number(),
  user_id: z.number(),
  online: z.boolean(),
  delivering: z.boolean(),
});

// MenuItem Validator
export const menuItemValidator = z.object({
  id: z.number().optional(),
  name: z.string(),
  restaurant_id: z.number(),
  category_id: z.number(),
  description: z.string(),
  ingredients: z.string(),
  price: z.number(),
  active: z.boolean(),
});

// OrderMenuItem Validator
export const orderMenuItemValidator = z.object({
  id: z.number().optional(),
  order_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number(),
  item_price: z.number(),
  price: z.number(),
  comment: z.string().nullable()
});

// OrderStatus Validator
export const orderStatusValidator = z.object({
  id: z.number().optional(),
  order_id: z.number(),
  status_catalog_id: z.number(),
});

// Orders Validator
export const ordersValidator = z.object({
  id: z.number().optional(),
  restaurant_id: z.number(),
  delivery_address_id: z.number(),
  user_id: z.number(),
  driver_id: z.number(),
  price: z.number(),
  discount: z.number(),
  final_price: z.number(),
  comment: z.string().nullable(),
});

// Restaurant Validator
export const restaurantValidator = z.object({
  id: z.number().optional(),
  name: z.string(),
  street_address: z.string(),
  zip_code: z.string(),
  city_id: z.number(),
});

// State Validator
export const stateValidator = z.object({
  id: z.number().optional(),
  name: z.string(),
  code: z.string()
});

// StatusCatalog Validator
export const statusCatalogValidator = z.object({
  id: z.number().optional(),
  name: z.string()
});

// Users Validator
export const usersValidator = z.object({
  id: z.number().optional(),
  name: z.string(),
  contact_phone: z.string(),
  phone_verified: z.boolean(),
  email: z.string().email(),
  email_verified: z.boolean(),
  confirmation_code: z.string().nullable(),
  password: z.string(),
});

// RestaurantOwner Validator
export const restaurantOwnerValidator = z.object({
  id: z.number().optional(),
  restaurant_id: z.number(),
  owner_id: z.number()
});

//login Validator
export const loginvalidator = z.object({
    username: z.string(),
    password:  z.string()
})
// userlogin validator
export const userloginvalidator = z.object({
    userId: z.number(),
    username: z.string(),
    password:  z.string(),
    role: z.string().optional()
})

//DRIVER LOGIN Validator
export const driverloginvalidator = z.object({
  driverId: z.number(),
  driversname: z.string(),
  password: z.string(),
  role: z.string().optional()
})

//ownership validator
export const ownershipvalidator = z.object({
  ownerId: z.number(),
  ownersname: z.string(),
  password: z.string(),
  role: z.string().optional()
});