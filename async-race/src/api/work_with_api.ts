import { Car, CarResponse } from "../view/utils/interfaces";

const server = "http://127.0.0.1:3000";

class Api {
    public createCar(car: Car): Promise<CarResponse> {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(car);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        return fetch(`${server}/garage`, requestOptions).then((response: Response) => response.json());
    }

    public updateCar(car: Car, id: number): Promise<void> {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(car);

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
        };

        return fetch(`${server}/garage/${id}`, requestOptions).then((response: Response) => response.json());
    }

    public getCar(id: number): Promise<CarResponse> {
        const requestOptions = {
            method: "Get",
        };

        return fetch(`${server}/garage/${id}`, requestOptions).then((response: Response) => response.json());
    }

    public getCars(page: number, limit: number): Promise<Response> {
        const requestOptions = {
            method: "GET",
        };

        return fetch(`${server}/garage?_limit=${limit}&_page=${page}`, requestOptions);
    }

    public getWinners(page: number, limit: number): Promise<Response> {
        const requestOptions = {
            method: "GET",
        };

        return fetch(`${server}/winners?_limit=${limit}&_page=${page}`, requestOptions);
    }
}

export const api = new Api();
