import { ENDPOINTS } from './evetydayTypes';
import { Source } from './interfaces';

export type LoadOptions = {
    apiKey?: string;
    sources?: string | null;
};

export type RequestOptions = {
    endpoint: ENDPOINTS;
    options?: LoadOptions;
};

export type CallBackType<T> = (data: T) => void;

export type SourceInfo = Pick<Source, 'id' | 'name'>;
