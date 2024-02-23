import { Endpoints } from './evetydayTypes';
import { Source } from './interfaces';

export type LoadOptions = {
    apiKey: string;
};

export type RequestOptions = {
    endpoint: Endpoints;
    options?: {};
};

export type CallBackType<T> = (data: T) => void;

export type SourceInfo = Pick<Source, 'id' | 'name'>;
