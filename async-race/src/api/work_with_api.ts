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
}

export const api = new Api();
