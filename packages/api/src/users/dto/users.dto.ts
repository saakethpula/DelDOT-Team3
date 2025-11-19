import {z} from 'zod';
import { Pagination } from '../../queries';

/* 
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
}
*/
export const UserRef = z.object({
    id: z.number(),
  });
  export type UserRef = z.infer<typeof UserRef>;
  
  // =========================
  // Output DTO (API responses)
  // =========================
  export const UserOut = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    emailVerified: z.date().nullable(), 
  });
  
  export type UserOut = z.infer<typeof UserOut>;
  
  // =========================
  // Creation DTO (API request body)
  // =========================
  export const UserCreateIn = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    emailVerified: z.date().nullable(), 
  });
  export type UserCreateIn = z.infer<typeof UserCreateIn>;
  
  // =========================
  // Update DTO (API request body)
  // =========================
  export const UserUpdateIn = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    emailVerified: z.date().nullable(), 
  });
  export type UserUpdateIn = z.infer<typeof UserUpdateIn>;
  
  // =========================
  // Query DTO (API query parameters)
  // =========================
  export const UsersListFilter = Pagination.extend({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    emailVerified: z.date().nullable(), 
  });
  export type UsersListFilter = z.infer<typeof UsersListFilter>;