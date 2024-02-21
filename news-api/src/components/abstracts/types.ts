import { Endpoints } from './evetydayTypes';

export type LoadOptions = {
    apiKey: string;
};

export type RequestOptions = {
    endpoint: Endpoints;
    options?: {};
};
