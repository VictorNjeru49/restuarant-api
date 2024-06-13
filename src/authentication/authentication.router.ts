import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { registerUser, loginUser, registerdriverUser, registerownerUser } from './authentication.contoller'
import { userloginvalidator, loginvalidator,driverloginvalidator, ownershipvalidator } from '../validators'

export const authorityrelationship = new Hono();


authorityrelationship.post('/register', zValidator('json', userloginvalidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), registerUser)

authorityrelationship.post('/login', zValidator('json', loginvalidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), loginUser);

authorityrelationship.post('/driver', zValidator('json', driverloginvalidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), registerdriverUser)

authorityrelationship.post('/ownership', zValidator('json', ownershipvalidator, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), registerownerUser)