import * as usageUnit from '../lib/usageUnit/handlers';
import * as quotationStatus from '../lib/quotationStatus/handlers';
import * as orderStatus from '../lib/orderStatus/handlers';
import * as paymentType from '../lib/paymentType/handlers';
import * as role from '../lib/role/handlers';

const clearEnums = async () => {
    return await Promise.all([
        await paymentType.clear(),
        await role.clear(),
        await orderStatus.clear(),
        await quotationStatus.clear(),
        await usageUnit.clear(),
    ]);
}

const generateEnums = async () => {
    return await Promise.all([
        await paymentType.generate(),
        await role.generate(),
        await quotationStatus.generate(),
        await usageUnit.generate(),
        await orderStatus.generate(),
    ]);
}

const verifyJWT = async req => {
    await req.jwtVerify();
}

const lvlMessage = 'Vous n\'avez pas un niveau d\'authentification assez élevé pour effectuer cette tâche';
const isAdmin = async (req, rep) => {
    if (req.user.role !== 'ADMIN') {
        return rep.unauthorized(lvlMessage);
    }
    return;
}

const isCommercial = async (req, rep) => {
    if (req.user.role !== 'COMMERCIAL') {
        return rep.unauthorized(lvlMessage);
    }
    return;
}

const isStockist = async (req, rep) => {
    if (req.user.role !== 'STOCKIST') {
        return rep.unauthorized(lvlMessage);
    }
    return;
}

const isClient = async (req, rep) => {
    if (req.user.role !== 'CLIENT') {
        return rep.unauthorized(lvlMessage);
    }
    return;
}

export { clearEnums, generateEnums, verifyJWT, isAdmin, isCommercial, isStockist, isClient };
