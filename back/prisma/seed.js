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
        },
        include: {
            stockist: true
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
        },
        include: {
            stockist: true
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
        },
        include: {
            client: true
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
        },
        include: {
            client: true
        }
    });
    const pro1 = await db.provider.upsert({
        where: { reference: 'pro1' },
        update: {},
        create: {
            name: 'Provider1',
            reference: 'pro1',
            logoUrl: 'https://images-eu.ssl-images-amazon.com/images/I/41cwNN2n2wL.png',
            stockists: {
                connect: {
                    id: sto1.stockist.id
                }
            }
        }
    });
    const pro2 = await db.provider.upsert({
        where: { reference: 'pro2' },
        update: {},
        create: {
            name: 'Provider2',
            reference: 'pro2',
            logoUrl: 'https://images-eu.ssl-images-amazon.com/images/I/41cwNN2n2wL.png',
            stockists: {
                connect: {
                    id: sto2.stockist.id
                }
            }
        }
    });
    const comp1 = await db.component.upsert({
        where: { reference: 'comp1' },
        update: {},
        create: {
            label: 'Component1',
            reference: 'comp1',
            shortDescription: 'Description courte',
            description: 'Ceci est une description longue',
            price: 76.4,
            provider: { connect: { id: pro1.id } },
            unit: { connect: { code: 'UNIT' } },
            stock: {
                create: {
                    quantity: 1111,
                    stockist: { connect: { id: sto1.stockist.id } }
                }
            }
        }
    });
    const comp2 = await db.component.upsert({
        where: { reference: 'comp2' },
        update: {},
        create: {
            label: 'Component2',
            reference: 'comp2',
            shortDescription: 'Description courte',
            description: 'Ceci est une description longue',
            price: 714.3,
            provider: { connect: { id: pro1.id } },
            unit: { connect: { code: 'LINEAR_METER' } },
            stock: {
                create: {
                    quantity: 1432,
                    stockist: { connect: { id: sto1.stockist.id } }
                }
            }
        }
    });
    const comp3 = await db.component.upsert({
        where: { reference: 'comp3' },
        update: {},
        create: {
            label: 'Component3',
            reference: 'comp3',
            shortDescription: 'Description courte',
            description: 'Ceci est une description longue',
            price: 1134.5,
            provider: { connect: { id: pro2.id } },
            unit: { connect: { code: 'CENTIMETER' } },
            stock: {
                create: {
                    quantity: 9572,
                    stockist: { connect: { id: sto2.stockist.id } }
                }
            }
        }
    });
    const comp4 = await db.component.upsert({
        where: { reference: 'comp4' },
        update: {},
        create: {
            label: 'Component4',
            reference: 'comp4',
            shortDescription: 'Description courte',
            description: 'Ceci est une description longue',
            price: 666,
            provider: { connect: { id: pro2.id } },
            unit: { connect: { code: 'SQUARE_METER' } },
            stock: {
                create: {
                    quantity: 335,
                    stockist: { connect: { id: sto2.stockist.id } }
                }
            }
        }
    });
    const mod1 = await db.module.upsert({
        where: { reference: 'mod1' },
        update: {},
        create: {
            label: 'Module1',
            reference: 'mod1',
            shortDescription: 'Description courte',
            description: 'Ceci est une longue description',
            components: { 
                create: [
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp4.id } } }
                ]
            }
        },
        include: { components: { include: { component: true } } }
    });
    const mod2 = await db.module.upsert({
        where: { reference: 'mod2' },
        update: {},
        create: {
            label: 'Module2',
            reference: 'mod2',
            shortDescription: 'Description courte',
            description: 'Ceci est une longue description',
            components: { 
                create: [
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp4.id } } }
                ]
            }
        },
        include: {
            components: true
        }
    });
    const mod3 = await db.module.upsert({
        where: { reference: 'mod3' },
        update: {},
        create: {
            label: 'Module2',
            reference: 'mod3',
            shortDescription: 'Description courte',
            description: 'Ceci est une longue description',
            components: { 
                create: [
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp4.id } } }
                ]
            }
        },
        include: { components: true }
    });
    const quo1 = await db.quotation.create({
        data: {
            label: 'Quotation1',
            shortDescription: 'Description courte',
            price: 123433,
            commercial: { connect: { id: com1.commercial.id } },
            client: { connect: { id: cli1.client.id } },
            status: { connect: { code: 'WAITING' } },
            modules: {
                create: [
                    { module: { connect: { id: mod1.id} } },
                    { module: { connect: { id: mod2.id} } },
                    { module: { connect: { id: mod2.id} } },
                    { module: { connect: { id: mod2.id} } },
                    { module: { connect: { id: mod3.id} } }
                ]
            }
        }
    });
    const quo2 = await db.quotation.create({
        data: {
            label: 'Quotation2',
            shortDescription: 'Description courte',
            price: 341264,
            commercial: { connect: { id: com2.commercial.id } },
            client: { connect: { id: cli2.client.id } },
            status: { connect: { code: 'WAITING' } },
            modules: {
                create: [
                    { module: { connect: { id: mod1.id} } },
                    { module: { connect: { id: mod1.id} } },
                    { module: { connect: { id: mod1.id} } },
                    { module: { connect: { id: mod2.id} } },
                    { module: { connect: { id: mod2.id} } },
                    { module: { connect: { id: mod3.id} } },
                    { module: { connect: { id: mod3.id} } }
                ]
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