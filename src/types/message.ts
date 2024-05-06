export interface IMesssage {
    id: string;
    content: string;
    role: MESSAGE_ROLE;
}

export enum MESSAGE_ROLE {
    HUMAN = 'HUMAN',
    AI = 'AI',
}
