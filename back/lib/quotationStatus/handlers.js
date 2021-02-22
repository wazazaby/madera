import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export const clear = async () => {
    await db.quotationStatus.deleteMany();
}

export const generate = async () => {
    await db.quotationStatus.create({
        data: {
            label: 'En attente',
            code: 'WAITING'
        }
    });
    await db.quotationStatus.create({
        data: {
            label: 'Accepté',
            code: 'ACCEPTED'
        }
    });
    await db.quotationStatus.create({
        data: {
            label: 'Refusé',
            code: 'DENIED'
        }
    });
}