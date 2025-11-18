import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): import("@repo/database").Prisma.PrismaPromise<{
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
    }[]>;
    findOne(id: string): import("@repo/database").Prisma.Prisma__UserClient<{
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
    }, null, import("@repo/database/generated/client/runtime/library").DefaultArgs, import("@repo/database").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=user.controller.d.ts.map