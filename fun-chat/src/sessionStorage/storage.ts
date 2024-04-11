import { UserResponse } from "../utils/interfaces";

class SessionStorage {
    public saveUserToLS(user: UserResponse): void {
        sessionStorage.setItem("LH_user", JSON.stringify(user));
    }
}

export const sStorage = new SessionStorage();
