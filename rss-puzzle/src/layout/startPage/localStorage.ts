import { STATUSSENTENCE } from "../../abstract/enums";
import { Hints, Sentence, User, UserProgress } from "../../abstract/interfaces";

export class LocalStorage {
    private saveDataToLS(user: User): void {
        localStorage.setItem("LH_user", JSON.stringify(user));
    }

    public saveUserToLS(): void {
        const loginFirstName = <HTMLInputElement>document.getElementById("login_firstName");
        const loginSurname = <HTMLInputElement>document.getElementById("login_surname");
        const firstName = loginFirstName.value.trim();
        const surname = loginSurname.value.trim();
        this.saveDataToLS({ firstName: firstName, surname: surname });
    }

    public removeUserFromLS(): void {
        localStorage.removeItem("LH_user");
        localStorage.removeItem("LH_user__hints");
        localStorage.removeItem("LH_user__progress");
        this.removeAllSentences();
        localStorage.removeItem("LH_user__image");
    }

    public isUserinLS(): boolean {
        if (this.getUserFromLS()) {
            return true;
        }
        return false;
    }

    private getUserFromLS(): User | null {
        const user = localStorage.getItem("LH_user");
        if (!user) {
            return null;
        }
        return JSON.parse(user);
    }

    public getGreeting(): string {
        const user = this.getUserFromLS();
        const greeting = `Welcome, ${user?.firstName} ${user?.surname}`;
        return greeting;
    }

    public saveHintsToLS(hints: Hints): void {
        localStorage.setItem("LH_user__hints", JSON.stringify(hints));
    }

    public getHintsFromLS(): Hints | null {
        const hints = localStorage.getItem("LH_user__hints");
        if (!hints) {
            return null;
        }
        return JSON.parse(hints);
    }

    public saveProgressToLS(progress: UserProgress): void {
        localStorage.setItem("LH_user__progress", JSON.stringify(progress));
    }

    public getProgressFromLS(): UserProgress | null {
        const progress = localStorage.getItem("LH_user__progress");
        if (!progress) {
            return null;
        }
        return JSON.parse(progress);
    }

    public getSentences(): Sentence[] {
        const sentences = localStorage.getItem("LH_user__sentences");
        if (!sentences) {
            return [];
        }
        return JSON.parse(sentences);
    }

    private saveSentencesToLS(array: Sentence[]): void {
        localStorage.setItem("LH_user__sentences", JSON.stringify(array));
    }

    public saveSentence(round: number, level: number, question: number, status: STATUSSENTENCE): void {
        const sentences = this.getSentences();
        sentences.push({ round: round, level: level, question: question, status: status });
        this.saveSentencesToLS(sentences);
    }

    public removeAllSentences(): void {
        localStorage.removeItem("LH_user__sentences");
    }

    // public saveImageDescription(path: string, description: string): void {
    //     this.saveImageDescriptionToLS({ pathToImage: path, descriptionImage: description });
    // }

    // private saveImageDescriptionToLS(image: ImageDescription): void {
    //     localStorage.setItem("LH_user__image", JSON.stringify(image));
    // }

    // public getImageDescription
}

//export const lStorage = new LocalStorage();
