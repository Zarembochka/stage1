export interface User {
    firstName: string;
    surname: string;
}

export interface GameLevel {
    task: string[];
    answer: string[];
    image: string;
    audio: string[];
}

export interface GameField {
    header: Element;
    task: Element;
    hint: Element;
    image: Element;
    words: Element;
}

export interface Hints {
    textHints: boolean;
    audioHints: boolean;
    backgroundHints: boolean;
}

export interface UserProgress {
    rounds: string[];
    currentRound: number;
    completedlevels: number[];
    currentLevel: number;
}
