import { BACKEND_API_URL } from '@/constants/config';
import createRepository from '@/repositories/createRepository';
import { IMesssage } from '@/types/message';

const MessageRepository = createRepository({
    getMessages: async (fetch) => {
        const response = await fetch<IMesssage[]>(`${BACKEND_API_URL}/message`, {
            method: 'GET',
        });
        return response;
    },
    postMessage: async (fetch, message: string) => {
        const response = await fetch<IMesssage>(`${BACKEND_API_URL}/message`, {
            method: 'POST',
            body: message,
        });
        return response;
    },
});

export default MessageRepository;
