import { z } from "zod";
export declare const Pagination: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type Pagination = z.infer<typeof Pagination>;
//# sourceMappingURL=queries.d.ts.map