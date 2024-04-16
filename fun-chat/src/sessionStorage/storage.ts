import { ActiveUser, UserResponse } from "../utils/interfaces";

class SessionStorage {
    public saveUserToLS(user: UserResponse, password = ""): void {
        const userToSave = { login: user.login, password: password, isLogined: user.isLogined };
        sessionStorage.setItem("LH_user", JSON.stringify(userToSave));
    }

    public getActiveUser(): null | ActiveUser {
        const user = sessionStorage.getItem("LH_user");
        if (!user) {
            return null;
        }
        return JSON.parse(user);
    }

    public removeUser(): void {
        sessionStorage.removeItem("LH_user");
    }
}

export const sStorage = new SessionStorage();
