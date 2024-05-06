import { IMesssage } from '@/types/message';
import { html } from 'lit';

export const messageTemplate = (message: IMesssage) => {
    return html` <div><strong>${message.role}: </strong>${message.content}</div> `;
};
