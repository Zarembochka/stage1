import { User } from "../../abstract/interfaces";

class LocalStorage {
    private saveDataToLS(user: User): void {
        localStorage.setItem("LH_user", JSON.stringify(user));
    }
    public saveUserToLS(): void {
        const login_firstName = <HTMLInputElement>document.getElementById("login_firstName");
        const login_surname = <HTMLInputElement>document.getElementById("login_surname");
        const firstName = login_firstName.value.trim();
        const surname = login_surname.value.trim();
        this.saveDataToLS({ firstName: firstName, surname: surname });
    }
}

export const lStorage = new LocalStorage();
