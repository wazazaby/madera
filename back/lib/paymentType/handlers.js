import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export const clear = async () => {
    await db.paymentType.deleteMany();
}

export const generate = async () => {
    await db.paymentType.create({
        data: {
            label: 'À la signature',
            code: 'AT_SIGNATURE'
        }
    });
    await db.paymentType.create({
        data: {
            label: 'À l\'obtention de la licence de construction',
            code: 'AT_CONSTRUCTION_LICENCE_OBTENTION'
        }
    });
    await db.paymentType.create({
        data: {
            label: 'À l\'ouverture du chantier',
            code: 'AT_SITE_OPENING'
        }
    });
    await db.paymentType.create({
        data: {
            label: 'À l\'achèvement de la fondation',
            code: 'AT_FOUNDATION_COMPLETION'
        }
    });
    await db.paymentType.create({
        data: {
            label: 'À l\'achèvement des murs',
            code: 'AT_WALLS_COMPLETION'
        }
    });
    await db.paymentType.create({
        data: {
            label: 'À la mise hors d\'eau / hors d\'air',
            code: 'AT_WATER_AIR_PUT_OUT'
        }
    });
    await db.paymentType.create({
        data: {
            label: 'À l\'achèvement des travaux d\'équipement',
            code: 'AT_EQUIPMENT_WORK_COMPLETION'
        }
    });
    await db.paymentType.create({
        data: {
            label: 'À la remise des clés',
            code: 'AT_KEY_HANDING'
        }
    });
}