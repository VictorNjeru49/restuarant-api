import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"

export const client = neon("postgresql://restuarantdb_owner:LxfwP7haEW0K@ep-weathered-frost-a5oh2con.us-east-2.aws.neon.tech/restuarantdb?sslmode=require") //as string


const db = drizzle(client, { schema, logger: true });

export default db;