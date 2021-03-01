const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const main = async () => {
    await db.usageUnit.createMany({
        data: [
            { label: 'Centimètre', code: 'CENTIMETER' },
            { label: 'Mètre carré', code: 'SQUARE_METER' },
            { label: 'Mètre linéaire', code: 'LINEAR_METER' },
            { label: 'Unité', code: 'UNIT' }
        ]
    });
    await db.role.createMany({
        data: [
            { label: 'Administrateur', code: 'ADMIN' },
            { label: 'Commercial', code: 'COMMERCIAL' },
            { label: 'Stockiste', code: 'STOCKIST' },
            { label: 'Client', code: 'CLIENT' }
        ]
    });
    await db.quotationStatus.createMany({
        data: [
            { label: 'En attente', code: 'WAITING' },
            { label: 'Accepté', code: 'ACCEPTED' },
            { label: 'Refusé', code: 'DENIED' }
        ]
    });
    await db.paymentType.createMany({
        data: [
            {
                label: 'À la signature',
                code: 'AT_SIGNATURE'
            },
            {
                label: 'À l\'obtention de la licence de construction',
                code: 'AT_CONSTRUCTION_LICENCE_OBTENTION'
            },
            {
                label: 'À l\'ouverture du chantier',
                code: 'AT_SITE_OPENING'
            },
            {
                label: 'À l\'achèvement de la fondation',
                code: 'AT_FOUNDATION_COMPLETION'
            },
            {
                label: 'À l\'achèvement des murs',
                code: 'AT_WALLS_COMPLETION'
            },
            {
                label: 'À la mise hors d\'eau / hors d\'air',
                code: 'AT_WATER_AIR_PUT_OUT'
            },
            {
                label: 'À l\'achèvement des travaux d\'équipement',
                code: 'AT_EQUIPMENT_WORK_COMPLETION'
            },
            {
                label: 'À la remise des clés',
                code: 'AT_KEY_HANDING'
            }
        ]
    });
    await db.orderStatus.createMany({
        data: [
            { label: 'En attente', code: 'WAITING' },
            { label: 'En cours de production', code: 'IN_PRODUCTION' },
            { label: 'En cours d\'assemblage', code: 'IN_ASSEMBLY' },
            { label: 'En livraison', code: 'IN_DELIVERY' },
            { label: 'Installé', code: 'INSTALLED' }
        ]
    });
    const teddy = await db.user.upsert({
        where: { email: 'megareda1998@gmail.com' },
        update: {},
        create: {
            firstName: 'Teddy',
            lastName: 'Sommavilla',
            email: 'megareda1998@gmail.com',
            phoneNumber: '0649784434',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            administrator: {
                create: {}
            },
            role: {
                connect: { code: 'ADMIN' }
            }
        }
    });
    const com1 = await db.user.upsert({
        where: { email: 'com1@gmail.com' },
        update: {},
        create: {
            firstName: 'Commercial1',
            lastName: 'Commercial1',
            email: 'com1@gmail.com',
            phoneNumber: 'qqqqqqqqqq',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            commercial: {
                create: {
                    administrator: { 
                        connect: { id: teddy.id } 
                    }
                }
            },
            role: {
                connect: { code: 'COMMERCIAL' }
            }
        },
        include: {
            commercial: true
        }
    });
    const com2 = await db.user.upsert({
        where: { email: 'com2@gmail.com' },
        update: {},
        create: {
            firstName: 'Commercial2',
            lastName: 'Commercial2',
            email: 'com2@gmail.com',
            phoneNumber: 'eeeeeeeeee',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            commercial: {
                create: {
                    administrator: { 
                        connect: { id: teddy.id } 
                    }
                }
            },
            role: {
                connect: { code: 'COMMERCIAL' }
            }
        },
        include: {
            commercial: true
        }
    });
    const sto1 = await db.user.upsert({
        where: { email: 'sto1@gmail.com' },
        update: {},
        create: {
            firstName: 'Stockiste1',
            lastName: 'Stockiste1',
            email: 'sto1@gmail.com',
            phoneNumber: 'kkkkkkkkkk',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            stockist: {
                create: {
                    administrator: {
                        connect: { id: teddy.id }
                    }
                }
            },
            role: {
                connect: { code: 'STOCKIST' }
            }
        }
    });
    const sto2 = await db.user.upsert({
        where: { email: 'sto2@gmail.com' },
        update: {},
        create: {
            firstName: 'Stockiste2',
            lastName: 'Stockiste2',
            email: 'sto2@gmail.com',
            phoneNumber: 'bbbbbbbbbb',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            stockist: {
                create: {
                    administrator: {
                        connect: { id: teddy.id }
                    }
                }
            },
            role: {
                connect: { code: 'STOCKIST' }
            }
        }
    });
    const cli1 = await db.user.upsert({
        where: { email: 'cli1@gmail.com' },
        update: {},
        create: {
            firstName: 'Client1',
            lastName: 'Client1',
            email: 'cli1@gmail.com',
            phoneNumber: 'hhhhhhhhhh',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            client: {
                create: {
                    city: 'Voiron',
                    postalCode: 38500,
                    adressLine1: 'AdressLine1',
                    adressLine2: 'AdressLine2',
                    commercial: {
                        connect: { id: com1.commercial.id } 
                    }
                }
            },
            role: {
                connect: { code: 'CLIENT' }
            }
        }
    });
    const cli2 = await db.user.upsert({
        where: { email: 'cli2@gmail.com' },
        update: {},
        create: {
            firstName: 'Client2',
            lastName: 'Client2',
            email: 'cli2@gmail.com',
            phoneNumber: 'uuuuuuuuuu',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            client: {
                create: {
                    city: 'Grenoble',
                    postalCode: 38500,
                    adressLine1: 'AdressLine1',
                    adressLine2: 'AdressLine2',
                    commercial: {
                        connect: { id: com2.commercial.id } 
                    }
                }
            },
            role: {
                connect: { code: 'CLIENT' }
            }
        }
    });
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await db.$disconnect()
    })