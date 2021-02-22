import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export const clear = async () => {
    await db.role.deleteMany();
}

export const generate = async () => {
    await db.role.create({
        data: {
            label: 'Administrateur',
            code: 'ADMIN'
        }
    });
    await db.role.create({
        data: {
            label: 'Commercial',
            code: 'COMMERCIAL'
        }
    });
    await db.role.create({
        data: {
            label: 'Stockiste',
            code: 'STOCKIST'
        }
    });
    await db.role.create({
        data: {
            label: 'Client',
            code: 'CLIENT'
        }
    });
}