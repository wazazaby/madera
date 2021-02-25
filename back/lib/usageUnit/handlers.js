import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export const clear = async () => {
    await db.usageUnit.deleteMany();
}

export const generate = async () => {
    await db.usageUnit.create({
        data: {
            label: 'Centimètre',
            code: 'CENTIMETER'
        }
    });
    await db.usageUnit.create({
        data: {
            label: 'Mètre carré',
            code: 'SQUARE_METER'
        }
    });
    await db.usageUnit.create({
        data: {
            label: 'Mètre linéaire',
            code: 'LINEAR_METER'
        }
    });
    await db.usageUnit.create({
        data: {
            label: 'Unité',
            code: 'UNIT'
        }
    });
}
