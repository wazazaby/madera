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
        where: { email: 'romeo.elvis@madera.com' },
        update: {},
        create: {
            firstName: 'Roméo',
            lastName: 'Elvis',
            email: 'romeo.elvis@madera.com',
            phoneNumber: '1234567890',
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
        where: { email: 'tyler.onkonma@madera.com' },
        update: {},
        create: {
            firstName: 'Tyler',
            lastName: 'Onkonma',
            email: 'tyler.onkonma@madera.com',
            phoneNumber: '1122334455',
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
        where: { email: 'frank.ocean@madera.com' },
        update: {},
        create: {
            firstName: 'Frank',
            lastName: 'Ocean',
            email: 'frank.ocean@madera.com',
            phoneNumber: '0099887766',
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
        where: { email: 'ruby.da.cherry@madera.com' },
        update: {},
        create: {
            firstName: 'Ruby',
            lastName: 'Da Cherry',
            email: 'ruby.da.cherry@madera.com',
            phoneNumber: '6666666666',
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
        where: { email: 'solana.rowe@gmail.com' },
        update: {},
        create: {
            firstName: 'Solana',
            lastName: 'Rowe',
            email: 'solana.rowe@gmail.com',
            phoneNumber: '3333333333',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            client: {
                create: {
                    city: 'Voiron',
                    postalCode: 38500,
                    adressLine1: '34 Route de mon adresse',
                    adressLine2: 'Appartement B',
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
    const cli2 = await db.user.upsert({
        where: { email: 'steve.lacy@gmail.com' },
        update: {},
        create: {
            firstName: 'Steve',
            lastName: 'Lacy',
            email: 'steve.lacy@gmail.com',
            phoneNumber: '4444444444',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            client: {
                create: {
                    city: 'Grenoble',
                    postalCode: 38185,
                    adressLine1: '1 Rue du code postal',
                    adressLine2: 'Ligne 2',
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
    const cli3 = await db.user.upsert({
        where: { email: 'claire.cottrill@gmail.com' },
        update: {},
        create: {
            firstName: 'Claire',
            lastName: 'Cottrill',
            email: 'claire.cottrill@gmail.com',
            phoneNumber: '5555555555',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            client: {
                create: {
                    city: 'Atlanta',
                    postalCode: 1999,
                    adressLine1: '12 Route du chemin',
                    adressLine2: 'Ligne 5',
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
    const cli4 = await db.user.upsert({
        where: { email: 'tyron.frampton@gmail.com' },
        update: {},
        create: {
            firstName: 'Tyron',
            lastName: 'Frampton',
            email: 'tyron.frampton@gmail.com',
            phoneNumber: '9999999999',
            password: '$2b$10$unZGx/Ru46bWP33BK0GgTOZep3LTjOFPai5oq8c1Lln7I2Tkd0sSq',
            client: {
                create: {
                    city: 'Northampton',
                    postalCode: 4444,
                    adressLine1: '1 Rue de la poste',
                    adressLine2: '3è étage',
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
            name: 'Bois&Matériaux',
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
            name: 'Mr Bricolage',
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
            label: 'Pleinte bois',
            reference: 'comp1',
            shortDescription: 'Pleinte en bois 1',
            description: 'Pleinte en bois 1 description longue',
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
            label: 'Briques',
            reference: 'comp2',
            shortDescription: 'Briques 1',
            description: 'Briques 1 description longue',
            price: 91,
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
            label: 'Mosaïque couleur 1',
            reference: 'comp3',
            shortDescription: 'Mosaïque couleur 1',
            description: 'Mosaïque couleur 1 description courte',
            price: 3,
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
            label: 'Carrelage 1',
            reference: 'comp4',
            shortDescription: 'Carrelage 1',
            description: 'Carrelage 1 description longue',
            price: 114.5,
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
            label: 'Mur brique 1m X 1m',
            reference: 'mod1',
            shortDescription: 'Mur brique 1m X 1m',
            description: 'Mur brique 1m X 1m description longue',
            components: { 
                create: [
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp2.id } } },
                    { component: { connect: { id: comp2.id } } }
                ]
            }
        },
        include: { components: { include: { component: true } } }
    });
    const mod2 = await db.module.upsert({
        where: { reference: 'mod2' },
        update: {},
        create: {
            label: 'Décoration murale mosaïque',
            reference: 'mod2',
            shortDescription: 'Décoration murale mosaïque',
            description: 'Décoration murale mosaïque description longue',
            components: { 
                create: [
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } },
                    { component: { connect: { id: comp3.id } } }
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
            label: 'Sol carrelage chambre 8m2',
            reference: 'mod3',
            shortDescription: 'Sol carrelage chambre 8m2',
            description: 'Sol carrelage chambre 8m2 description longue',
            components: { 
                create: [
                    { component: { connect: { id: comp4.id } } },
                    { component: { connect: { id: comp4.id } } },
                    { component: { connect: { id: comp4.id } } },
                    { component: { connect: { id: comp4.id } } },
                    { component: { connect: { id: comp4.id } } },
                    { component: { connect: { id: comp4.id } } },
                    { component: { connect: { id: comp4.id } } },
                    { component: { connect: { id: comp4.id } } }
                ]
            }
        },
        include: { components: true }
    });
    const mod4 = await db.module.upsert({
        where: { reference: 'mod1' },
        update: {},
        create: {
            label: 'Pleinte tour chambre 8m2',
            reference: 'mod1',
            shortDescription: 'Pleinte tour chambre 8m2',
            description: 'Pleinte tour chambre 8m2 description longue',
            components: { 
                create: [
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp1.id } } },
                    { component: { connect: { id: comp1.id } } }
                ]
            }
        },
        include: { components: { include: { component: true } } }
    });
    const quo1 = await db.quotation.create({
        data: {
            label: 'Devis maison Tyron Frampton',
            shortDescription: 'Description courte',
            price: 245890,
            commercial: { connect: { id: com2.commercial.id } },
            client: { connect: { id: cli4.client.id } },
            status: { connect: { code: 'WAITING' } },
            modules: {
                create: [
                    { module: { connect: { id: mod1.id } } },
                    { module: { connect: { id: mod1.id } } },
                    { module: { connect: { id: mod1.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod4.id } } },
                ]
            }
        }
    });
    const quo2 = await db.quotation.create({
        data: {
            label: 'Devis maison Solana Rowe',
            shortDescription: 'Description courte',
            price: 134500,
            commercial: { connect: { id: com2.commercial.id } },
            client: { connect: { id: cli1.client.id } },
            status: { connect: { code: 'WAITING' } },
            modules: {
                create: [
                    { module: { connect: { id: mod1.id } } },
                    { module: { connect: { id: mod1.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod4.id } } },
                    { module: { connect: { id: mod4.id } } },
                ]
            }
        }
    });
    const quo3 = await db.quotation.create({
        data: {
            label: 'Devis maison Steve Lacy',
            shortDescription: 'Description courte',
            price: 405670,
            commercial: { connect: { id: com2.commercial.id } },
            client: { connect: { id: cli2.client.id } },
            status: { connect: { code: 'WAITING' } },
            modules: {
                create: [
                    { module: { connect: { id: mod1.id } } },
                    { module: { connect: { id: mod1.id } } },
                    { module: { connect: { id: mod1.id } } },
                    { module: { connect: { id: mod1.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod2.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod3.id } } },
                    { module: { connect: { id: mod4.id } } },
                    { module: { connect: { id: mod4.id } } },
                    { module: { connect: { id: mod4.id } } },
                    { module: { connect: { id: mod4.id } } },
                    { module: { connect: { id: mod4.id } } },
                    { module: { connect: { id: mod4.id } } },
                    { module: { connect: { id: mod4.id } } },
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