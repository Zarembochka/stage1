import { BaseComponent } from "../../../utils/baseComponents";
import { ActiveUser, StatusUser, UserResponse } from "../../../utils/interfaces";
import { Users } from "./users/users";
import { socket } from "../../../websocket/websocket";

export class MainPart extends BaseComponent {
    private users: Users;

    private activeUser: ActiveUser | null;

    constructor() {
        super({ tag: "main", classNames: ["main"] });
        this.activeUser = null;
        this.users = new Users();
        this.prepareMainPart();
    }

    private prepareMainPart(): void {
        this.getElement().append(this.users.getElement());
    }

    public updateUsers(userArray: UserResponse[], status: StatusUser): void {
        this.users.updateUsers(userArray, status, this.activeUser);
    }

    public setActiveUser(): void {
        if (this.activeUser) {
            this.activeUser.isLogined = true;
        }
    }

    public setCurrentUser(login: string, password: string): void {
        this.activeUser = { login: login, password: password, isLogined: false };
    }

    private clearUsers(): void {
        this.activeUser = null;
        this.users.clearUsers();
    }

    public getUsername(): string {
        return this.activeUser?.login || "";
    }

    public logout(): void {
        if (this.activeUser) {
            socket.sendRequestForUserLogout(this.activeUser);
            this.clearUsers();
        }
    }

    // public addUser(user: User, status: StatusUser): void {
    //     this.users.addUser(user, status);
    // }

    public removeUsers(): void {
        this.users.clearUsers();
    }
}
