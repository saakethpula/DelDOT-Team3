"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const zod_1 = require("zod");
exports.Pagination = zod_1.z.object({
    limit: zod_1.z.number().int().positive().max(100).default(20),
    offset: zod_1.z.number().int().nonnegative().default(0),
});
//# sourceMappingURL=queries.js.map