import { STATUSSENTENCE } from "./enums";

export interface User {
    firstName: string;
    surname: string;
}

export interface GameLevel {
    task: string[];
    answer: string[];
    image: string;
    audio: string[];
    imageDescription: string;
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

export interface Sentence {
    question: number;
    level: number;
    round: number;
    status: STATUSSENTENCE;
}

export interface SentenceWithAudio {
    sentence: string;
    pathToAudio: string;
}

export interface ImageDescription {
    pathToImage: string;
    descriptionImage: string;
}
