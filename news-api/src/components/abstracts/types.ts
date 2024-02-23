import { Endpoints } from './evetydayTypes';
import { Source } from './interfaces';

export type LoadOptions = {
    apiKey?: string;
    sources?: string | null;
};

export type RequestOptions = {
    endpoint: Endpoints;
    options?: LoadOptions;
};

export type CallBackType<T> = (data: T) => void;

export type SourceInfo = Pick<Source, 'id' | 'name'>;
