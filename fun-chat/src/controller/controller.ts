import { UserResponse } from "../utils/interfaces";

export class Controller {
    public selectUser(user: UserResponse): void {
        const userChange = new CustomEvent("user-change", { detail: { user: user } });
        window.dispatchEvent(userChange);
    }

    public updateStatusUser(user: UserResponse): void {
        const userChangeStatus = new CustomEvent("user-change-status", { detail: { user: user } });
        window.dispatchEvent(userChangeStatus);
    }
}
