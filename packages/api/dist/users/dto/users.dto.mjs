import {
  Pagination
} from "../../chunk-GZ4POAPY.mjs";

// src/users/dto/users.dto.ts
import { z } from "zod";
var UserRef = z.object({
  id: z.number()
});
var UserOut = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable()
});
var UserCreateIn = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable()
});
var UserUpdateIn = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable()
});
var UsersListFilter = Pagination.extend({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable()
});
export {
  UserCreateIn,
  UserOut,
  UserRef,
  UserUpdateIn,
  UsersListFilter
};
