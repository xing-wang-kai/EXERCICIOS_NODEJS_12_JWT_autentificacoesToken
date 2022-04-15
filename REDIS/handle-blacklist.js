import blacklist from './blacklist.js';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

const setAsync = promisify(blacklist.set).bind(blacklist);
const existsAsync = promisify(blacklist.exists).bind(blacklist);

const gerarTokenHash = (token) => {
    return createHash('sha256')
           .update(token)
           .digest('hex');
}

export default {
    adicionar: async (token) => {
        const dataExp = jwt.decode(token).exp;
        const tokenHash = gerarTokenHash(token);
        await setAsync(tokenHash, "");
        blacklist.expireat(tokenHash, dataExp);
    },
    verificar: async (token) => {
        const tokenHash = gerarTokenHash(token);
        const res = existsAsync(tokenHash);
        return res === 1;
    }

}
