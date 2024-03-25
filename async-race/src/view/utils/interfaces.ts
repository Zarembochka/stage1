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
