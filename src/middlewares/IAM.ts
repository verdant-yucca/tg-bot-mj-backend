import fs from 'fs';
import axiosCall from 'axios';
import jose from 'node-jose';
import path from 'path';
class IAM {
    private key: string;
    private serviceAccountId: string;
    private keyId: string;
    private now: number;
    constructor() {
        this.now = Math.floor(new Date().getTime() / 1000);
        this.serviceAccountId = process.env.SERVICE_ACCOUNT_ID || '';
        this.keyId = process.env.SERVICE_ACCOUNT_PUBLIK_KEY || '';
        const rootPath = process.cwd();
        const filePath = path.resolve(rootPath, 'privat_key');
        this.key = fs.readFileSync(filePath, 'utf-8');
    }

    getToken = async () => {
        this.now = Math.floor(new Date().getTime() / 1000);
        const payload = {
            aud: 'https://iam.api.cloud.yandex.net/iam/v1/tokens',
            iss: this.serviceAccountId,
            iat: this.now,
            exp: this.now + 3600,
        };

        console.log('this.key', this.key);
        try {
            const resultKey = await jose.JWK.asKey(this.key, 'pem', { kid: this.keyId, alg: 'PS256' });
            const jwt = await jose.JWS.createSign({ format: 'compact' }, resultKey)
                .update(JSON.stringify(payload))
                .final();
            return jwt;
        } catch (e) {
            console.log('eeee', e);
            return '';
        }
    };

    getIAMToken = async () => {
        const jwt = await this.getToken();
        console.log('jwt', jwt);
        try {
            const response = await axiosCall({
                method: 'POST',
                url: `https://iam.api.cloud.yandex.net/iam/v1/tokens`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    jwt: jwt,
                },
            });
            return response;
        } catch (e) {
            console.log('e', e);
            return '';
        }
    };
}

export default IAM;
