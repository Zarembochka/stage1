import { Car, CarAnimation, CarResponse, WinnerResponse } from "../view/utils/interfaces";

const server = "http://127.0.0.1:3000";

class Api {
    private errorCallback(res: Response): Response {
        if (res.status !== 200) {
            throw Error(res.statusText);
        }
        return res;
    }

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

    public async getCars(page: number, limit: number): Promise<Response> {
        const requestOptions = {
            method: "GET",
        };

        return fetch(`${server}/garage?_limit=${limit}&_page=${page}`, requestOptions).then((res: Response) =>
            this.errorCallback(res)
        );
    }

    public getWinners(page: number, limit: number): Promise<Response> {
        const requestOptions = {
            method: "GET",
        };

        return fetch(`${server}/winners?_limit=${limit}&_page=${page}`, requestOptions);
    }

    public getAllWinners(): Promise<WinnerResponse[]> {
        const requestOptions = {
            method: "GET",
        };

        return fetch(`${server}/winners`, requestOptions).then((response: Response) => response.json());
    }

    public getWinner(id: number): Promise<Response> {
        const requestOptions = {
            method: "GET",
        };

        return fetch(`${server}/winners/${id}`, requestOptions);
    }

    public deleteCar(id: number): Promise<Response> {
        const requestOptions = {
            method: "DELETE",
        };

        return fetch(`${server}/garage/${id}`, requestOptions);
    }

    public async deleteWinner(id: number): Promise<void> {
        const requestOptions = {
            method: "DELETE",
        };
        await fetch(`${server}/winners/${id}`, requestOptions);
    }

    public startRace(id: number): Promise<CarAnimation> {
        const requestOptions = {
            method: "PATCH",
        };

        return fetch(`${server}/engine/?id=${id}&status=started`, requestOptions).then((response: Response) =>
            response.json()
        );
    }

    public stopRace(id: number): Promise<Response> {
        const requestOptions = {
            method: "PATCH",
        };

        return fetch(`${server}/engine/?id=${id}&status=stopped`, requestOptions);
    }

    public async driveMode(id: number): Promise<boolean> {
        const requestOptions = {
            method: "PATCH",
        };

        const response = await fetch(`${server}/engine?id=${id}&status=drive`, requestOptions);
        return response?.status === 200;
    }
}

export const api = new Api();
