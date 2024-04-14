import { BaseComponent } from "../../../../../utils/baseComponents";
import { UserResponse } from "../../../../../utils/interfaces";

export class ChatHeader extends BaseComponent {
    private userName: HTMLElement;

    private userStatus: HTMLElement;

    private user: UserResponse | null;

    constructor() {
        super({ tag: "header", classNames: ["chat__header"] });
        this.userName = new BaseComponent({ tag: "div", classNames: ["chat__header__userName"] }).getElement();
        this.userStatus = new BaseComponent({ tag: "div", classNames: ["chat__header__userStatus"] }).getElement();
        this.user = null;
        this.prepareHeader();
    }

    private prepareHeader(): void {
        this.getElement().append(this.userName, this.userStatus);
        window.addEventListener("user-change", (event) => this.updateInfo(event));
        window.addEventListener("user-change-status", (event) => this.updateStatus(event));
    }

    private updateInfo(event: Event): void {
        if (event instanceof CustomEvent) {
            const info = event.detail.user;
            this.user = info;
            this.userName.textContent = info.login;
            this.changeUserStatus(info.isLogined);
        }
    }

    private changeUserStatus(status: boolean): void {
        this.userStatus.textContent = status ? "online" : "offline";
        this.userStatus.classList.remove("online");
        this.userStatus.classList.remove("offline");
        this.userStatus.classList.add(status ? "online" : "offline");
    }

    private updateStatus(event: Event): void {
        if (event instanceof CustomEvent) {
            const info = event.detail.user;
            if (this.user?.login === info.login) {
                this.changeUserStatus(info.isLogined);
            }
        }
    }
}
