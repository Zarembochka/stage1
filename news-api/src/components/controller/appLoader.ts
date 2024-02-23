import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        if (!process.env.API_KEY) {
            throw Error('No apiKey to get news sources!');
        }
        super(process.env.API_URL, {
            apiKey: process.env.API_KEY,
        });
    }
}

export default AppLoader;
