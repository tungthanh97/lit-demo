import mapValues from 'lodash.mapvalues';
import { TIMEOUT_REQUEST } from '../constants/constant';

type InputFunction<P extends any[], D> = (fetch: typeof fetcher, ...args: P) => Promise<D>;

type CreateRepositoryInput = {
    [key: string]: InputFunction<any, any>;
};

type CreateRepositoryOutput<
    Input extends CreateRepositoryInput,
    Keys extends keyof Input = keyof Input
> = {
    [P in Keys]: Input[P] extends InputFunction<infer P, infer D>
        ? (...args: P) => Promise<D>
        : never;
};

export default function createRepository<Input extends CreateRepositoryInput>(
    input: Input
): CreateRepositoryOutput<Input> {
    return mapValues(input, (resourceCreator) => {
        return (...args: any[]) => {
            return resourceCreator(fetcher, ...args);
        };
    }) as CreateRepositoryOutput<Input>;
}

export const fetcher = async <ResponseData = any>(url: string, config?: any): Promise<any> => {
    return fetch(url, {
        ...config,
        timeout: config?.timeout || TIMEOUT_REQUEST.NORMAL, // 5 mins
    })
        .then((response) => response.json())
        .catch((error: any) => {
            return { error } as any;
        });
};
