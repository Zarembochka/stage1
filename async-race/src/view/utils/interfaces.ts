export interface ParamsToComponent {
    tag: string;
    classNames: string[];
    text?: string;
}

export interface Car {
    color: string;
    name: string;
}

export interface CarResponse extends Car {
    id: number;
}

export interface WinnerResponse {
    id: number;
    wins: number;
    time: number;
}

export interface WinnerRow {
    color: string;
    name: string;
    wins: number;
    time: number;
}
