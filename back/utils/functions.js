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
}

const isCommercial = async (req, rep) => {
    if (!['ADMIN', 'COMMERCIAL'].includes(req.user.role)) {
        return rep.unauthorized(lvlMessage);
    }
}

const isStockist = async (req, rep) => {
    if (!['ADMIN', 'STOCKIST'].includes(req.user.role)) {
        return rep.unauthorized(lvlMessage);
    }
}

const isClient = async (req, rep) => {
    if (!['ADMIN', 'CLIENT'].includes(req.user.role)) {
        return rep.unauthorized(lvlMessage);
    }
}

export { clearEnums, generateEnums, verifyJWT, isAdmin, isCommercial, isStockist, isClient };
