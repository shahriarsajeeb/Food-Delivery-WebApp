import { PrismaClient } from "@prisma/client";

declare global{
    namespace globalThis{
        var prismadb: PrismaClient;
    }
}