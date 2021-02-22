import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export const clear = async () => {
    await db.orderStatus.deleteMany();
}

export const generate = async () => {
    await db.orderStatus.create({
        data: {
            label: 'En attente',
            code: 'WAITING'
        }
    });
    await db.orderStatus.create({
        data: {
            label: 'En cours de production',
            code: 'IN_PRODUCTION'
        }
    });
    await db.orderStatus.create({
        data: {
            label: 'En cours d\'assemblage',
            code: 'IN_ASSEMBLY'
        }
    });
    await db.orderStatus.create({
        data: {
            label: 'En livraison',
            code: 'IN_DELIVERY'
        }
    });
    await db.orderStatus.create({
        data: {
            label: 'Installé',
            code: 'INSTALLED'
        }
    });
}