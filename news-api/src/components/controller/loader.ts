import { CallBackType, LoadOptions } from '../abstracts/types';
import { RequestOptions } from '../abstracts/types';
import { NewsData, NewsSource } from '../abstracts/interfaces';
import { Endpoints } from '../abstracts/evetydayTypes';

class Loader {
    baseLink: string;
    options: LoadOptions;
    constructor(baseLink: string, options: LoadOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<data>(
        { endpoint, options = {} }: RequestOptions,
        callback: CallBackType<data> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(endpoint: Endpoints, options = {}): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof LoadOptions]}&`;
        });
        return url.slice(0, -1);
    }

    private load<data>(method: string, endpoint: Endpoints, callback: CallBackType<data>, options = {}) {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
