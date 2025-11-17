"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/users/dto/users.dto.ts
var users_dto_exports = {};
__export(users_dto_exports, {
  UserCreateIn: () => UserCreateIn,
  UserOut: () => UserOut,
  UserRef: () => UserRef,
  UserUpdateIn: () => UserUpdateIn,
  UsersListFilter: () => UsersListFilter
});
module.exports = __toCommonJS(users_dto_exports);
var import_zod2 = require("zod");

// src/queries.ts
var import_zod = require("zod");
var Pagination = import_zod.z.object({
  limit: import_zod.z.number().int().positive().max(100).default(20),
  offset: import_zod.z.number().int().nonnegative().default(0)
});

// src/users/dto/users.dto.ts
var UserRef = import_zod2.z.object({
  id: import_zod2.z.number()
});
var UserOut = import_zod2.z.object({
  id: import_zod2.z.string(),
  name: import_zod2.z.string().nullable(),
  email: import_zod2.z.string().nullable(),
  emailVerified: import_zod2.z.date().nullable()
});
var UserCreateIn = import_zod2.z.object({
  id: import_zod2.z.string(),
  name: import_zod2.z.string().nullable(),
  email: import_zod2.z.string().nullable(),
  emailVerified: import_zod2.z.date().nullable()
});
var UserUpdateIn = import_zod2.z.object({
  id: import_zod2.z.string(),
  name: import_zod2.z.string().nullable(),
  email: import_zod2.z.string().nullable(),
  emailVerified: import_zod2.z.date().nullable()
});
var UsersListFilter = Pagination.extend({
  id: import_zod2.z.string(),
  name: import_zod2.z.string().nullable(),
  email: import_zod2.z.string().nullable(),
  emailVerified: import_zod2.z.date().nullable()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserCreateIn,
  UserOut,
  UserRef,
  UserUpdateIn,
  UsersListFilter
});
