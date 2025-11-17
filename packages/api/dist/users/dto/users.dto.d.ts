import { z } from 'zod';
export declare const UserRef: z.ZodObject<{
    id: z.ZodNumber;
}, z.core.$strip>;
export type UserRef = z.infer<typeof UserRef>;
export declare const UserOut: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    emailVerified: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type UserOut = z.infer<typeof UserOut>;
export declare const UserCreateIn: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    emailVerified: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type UserCreateIn = z.infer<typeof UserCreateIn>;
export declare const UserUpdateIn: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    emailVerified: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type UserUpdateIn = z.infer<typeof UserUpdateIn>;
export declare const UsersListFilter: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    id: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    emailVerified: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type UsersListFilter = z.infer<typeof UsersListFilter>;
//# sourceMappingURL=users.dto.d.ts.map