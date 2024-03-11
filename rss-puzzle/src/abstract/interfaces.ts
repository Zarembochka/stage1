export interface User {
    firstName: string;
    surname: string;
}

export interface GameLevel {
    task: string[];
    answer: string[];
    image: string;
}

export interface GameField {
    header: Element;
    task: Element;
    hint: Element;
    image: Element;
    words: Element;
}
