import { UserResponse } from "../utils/interfaces";

class SessionStorage {
    public saveUserToLS(user: UserResponse): void {
        sessionStorage.setItem("LH_user", JSON.stringify(user));
    }

    public getActiveUser(): null | UserResponse {
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
