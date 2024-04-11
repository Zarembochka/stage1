import { BaseComponent } from "../../../utils/baseComponents";
import { StatusUser, UserResponse } from "../../../utils/interfaces";
import { Users } from "./users/users";

export class MainPart extends BaseComponent {
    private users: Users;

    constructor() {
        super({ tag: "main", classNames: ["main"] });
        this.users = new Users();
        this.prepareMainPart();
    }

    private prepareMainPart(): void {
        this.getElement().append(this.users.getElement());
    }

    public updateUsers(userArray: UserResponse[], status: StatusUser): void {
        this.users.updateUsers(userArray, status);
    }
}
