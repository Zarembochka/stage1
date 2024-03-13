import { Hints, User } from "../../abstract/interfaces";

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
        this.removeHintsFromLS();
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

    private removeHintsFromLS(): void {
        localStorage.removeItem("LH_user__hints");
    }
}

//export const lStorage = new LocalStorage();
