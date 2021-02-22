import * as usageUnit from '../lib/usageUnit/handlers';
import * as quotationStatus from '../lib/quotationStatus/handlers';
import * as orderStatus from '../lib/orderStatus/handlers';
import * as paymentType from '../lib/paymentType/handlers';
import * as role from '../lib/role/handlers';

const clearEnums = async () => {
    return await Promise.all([
        usageUnit.clear(),
        quotationStatus.clear(),
        orderStatus.clear(),
        paymentType.clear(),
        role.clear()
    ]);
}

const generateEnums = async () => {
    return await Promise.all([
        usageUnit.generate(),
        quotationStatus.generate(),
        orderStatus.generate(),
        paymentType.generate(),
        role.generate()
    ]);
}

const verifyJWT = async (req, rep) => {
    try {
        const res = await req.jwtVerify();
        console.log(res);
    } catch (err) {
        throw err;
    }
}

export { clearEnums, generateEnums, verifyJWT };