import axiosCall from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

interface GetTranslationResponse {
    translations: Array<{
        text: string;
        detectedLanguageCode: string;
    }>;
}

class TranslateService {
    private apiKey: string;
    private serviceAccountId: string;
    constructor() {
        this.serviceAccountId = process.env.SERVICE_ACCOUNT_ID || '';
        this.apiKey = process.env.YANDEX_API_KEY || '';
    }

    getTranslate = async (text: string, targetLanguage: string): Promise<GetTranslationResponse> => {
        const response = await axiosCall<any, any>({
            method: 'POST',
            url: `https://translate.api.cloud.yandex.net/translate/v2/translate`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.apiKey,
            },
            data: {
                texts: [text],
                targetLanguageCode: targetLanguage,
            },
        });
        return response.data;
    };
}

const YandexTranslate = new TranslateService();

export default YandexTranslate;
