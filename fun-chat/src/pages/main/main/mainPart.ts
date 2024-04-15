import { BaseComponent } from "../../../utils/baseComponents";
import { StatusUser, UserResponse } from "../../../utils/interfaces";
import { Users } from "./users/users";
import { Chat } from "./chat/chat";
import { controller } from "../../..";

export class MainPart extends BaseComponent {
    private users: Users;

    private chat: Chat;

    constructor() {
        super({ tag: "main", classNames: ["main"] });
        this.users = new Users();
        this.chat = new Chat();
        this.prepareMainPart();
    }

    private prepareMainPart(): void {
        this.getElement().append(this.users.getElement(), this.chat.getElement());
    }

    public updateUsers(userArray: UserResponse[], status: StatusUser): void {
        this.users.updateUsers(userArray, status, controller.getActiveUser());
    }

    public removeUsers(): void {
        this.users.clearUsers();
    }
}
