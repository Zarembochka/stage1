import { controller } from "../../../..";
import { heartLogo } from "../../../../abstracts/logos";
import { BaseComponent } from "../../../../utils/baseComponents";
import { StatusUser, UserResponse } from "../../../../utils/interfaces";
import { socket } from "../../../../websocket/websocket";

export class Users extends BaseComponent {
    private search: HTMLInputElement;

    private userList: HTMLUListElement;

    private user: UserResponse | null;

    constructor() {
        super({ tag: "aside", classNames: ["users"] });
        this.search = this.createInputElement();
        this.userList = this.createUsersList();
        this.user = null;
        this.prepareUsers();
    }

    private prepareUsers(): void {
        this.search.addEventListener("keyup", () => this.findUsers());
        this.getElement().append(this.search, this.userList);
        window.addEventListener("new-message", (event) => this.showNewMessageIco(event));
        window.addEventListener("unread-messages", (event) => this.showUnreadMessagesIco(event));
        window.addEventListener("user-change", (event) => this.updateUser(event));
        window.addEventListener("logout", () => this.clearUsers());
    }

    private updateUser(event: Event): void {
        if (event instanceof CustomEvent) {
            const info = event.detail.user;
            this.user = info;
        }
    }

    private createInputElement(): HTMLInputElement {
        const input = new BaseComponent<HTMLInputElement>({
            tag: "input",
            classNames: ["users__search"],
        }).getElement();
        input.type = "text";
        input.placeholder = "...Search";
        return input;
    }

    private createUsersList(): HTMLUListElement {
        const list = new BaseComponent<HTMLUListElement>({
            tag: "ul",
            classNames: ["users__list"],
        }).getElement();
        return list;
    }

    private createUsersItem(name: string, classname: string): HTMLLIElement {
        const list = new BaseComponent<HTMLLIElement>({
            tag: "li",
            classNames: ["users__list__item", classname],
        }).getElement();
        const status = new BaseComponent({
            tag: "span",
            classNames: ["users__list__item__status"],
        }).getElement();
        status.innerHTML = heartLogo;
        const label = new BaseComponent({
            tag: "span",
            classNames: ["users__list__item__login"],
            text: name,
        }).getElement();
        const ico = new BaseComponent({
            tag: "span",
            classNames: ["users__list__item__ico"],
        }).getElement();
        list.append(status, label, ico);
        list.addEventListener("click", () => this.selectUser(name, classname));
        return list;
    }

    private selectUser(name: string, classname: string): void {
        this.showUserInfo(name, classname);
        socket.sendRequestForUnreadMessage(name);
    }

    private showUserInfo(name: string, classname: string): void {
        controller.selectUser({ login: name, isLogined: classname === "active" ? true : false });
    }

    public updateUsers(userArray: UserResponse[], status: StatusUser, currentUser: UserResponse | null): void {
        userArray.forEach((user) => {
            if (user.login !== currentUser?.login) {
                const item = this.createUsersItem(user.login, status);
                this.userList.append(item);
                socket.sendRequestForUnreadMessage(user.login);
            }
        });
    }

    public clearUsers(): void {
        this.user = null;
        while (this.userList.firstChild) {
            this.userList.firstChild.remove();
        }
    }

    private findUsers(): void {
        const str = this.search.value;
        this.hideOtherUsers(str);
    }

    private hideOtherUsers(str: string): void {
        const users = [...document.querySelectorAll(`.users__list__item__login`)];
        users.forEach((item) => item.parentElement?.classList.add("hide"));
        const resultUsers = users.filter((item) => item.textContent?.includes(str));
        resultUsers.forEach((item) => item.parentElement?.classList.remove("hide"));
    }

    private showNewMessageIco(event: Event): void {
        if (event instanceof CustomEvent) {
            const messageFrom = event.detail.from;
            if (messageFrom !== this.user?.login) {
                const user = this.findUser(messageFrom);
                const msgs = this.msgsCount(user);
                if (user && user.nextElementSibling) {
                    user.nextElementSibling.textContent = String(msgs + 1);
                    user.nextElementSibling.classList.add("show");
                }
            }
        }
    }

    private msgsCount(user: Element | undefined): number {
        let msgs = 0;
        if (user && user.nextElementSibling) {
            if (user.nextElementSibling.textContent) {
                msgs = parseInt(user.nextElementSibling.textContent);
            }
        }
        return msgs;
    }

    private findUser(login: string): Element | undefined {
        const users = [...document.querySelectorAll(`.users__list__item__login`)];
        const result = users.find((item) => item.textContent === login);
        return result;
    }

    private showUnreadMessagesIco(event: Event): void {
        if (event instanceof CustomEvent) {
            const messageFrom = event.detail.from;
            const user = this.findUser(messageFrom);
            const msgs = event.detail.count;
            if (user && user.nextElementSibling) {
                user.nextElementSibling.textContent = String(msgs);
                if (msgs > 0) {
                    user.nextElementSibling.classList.add("show");
                    return;
                }
                user.nextElementSibling.classList.remove("show");
            }
        }
    }

    private hideMessageCountIco(name: string): void {
        const user = this.findUser(name);
        if (user && user.nextElementSibling) {
            user.nextElementSibling.textContent = "";
            user.nextElementSibling.classList.remove("show");
        }
    }
}
