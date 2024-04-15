import { MessageResponse, UserResponse } from "../utils/interfaces";

export class Controller {
    public selectUser(user: UserResponse): void {
        const userChange = new CustomEvent("user-change", { detail: { user: user } });
        window.dispatchEvent(userChange);
    }

    public updateStatusUser(user: UserResponse): void {
        const userChangeStatus = new CustomEvent("user-change-status", { detail: { user: user } });
        window.dispatchEvent(userChangeStatus);
    }

    public showNewMessage(data: MessageResponse): void {
        const newMessage = new CustomEvent("new-message", {
            detail: { from: data.payload.message.from, to: data.payload.message.to, text: data.payload.message.text },
        });
        window.dispatchEvent(newMessage);
    }
}
