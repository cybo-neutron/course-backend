import { timestamps } from 'db/helpers/timestamps.helper';
import {pgTable, uuid} from 'drizzle-orm/pg-core';


export const Course = pgTable('course',{
    id : uuid('id').primaryKey(),
    ...timestamps
})
