import { heartLogo } from "../../../../abstracts/logos";
import { BaseComponent } from "../../../../utils/baseComponents";
import { StatusUser, UserResponse } from "../../../../utils/interfaces";

export class Users extends BaseComponent {
    private search: HTMLInputElement;

    private userList: HTMLUListElement;

    constructor() {
        super({ tag: "aside", classNames: ["users"] });
        this.search = this.createInputElement();
        this.userList = this.createUsersList();
        this.prepareUsers();
    }

    private prepareUsers(): void {
        this.getElement().append(this.search, this.userList);
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
        const label = new BaseComponent<HTMLLabelElement>({
            tag: "span",
            classNames: ["users__list__item__login"],
            text: name,
        }).getElement();
        list.append(status, label);
        return list;
    }

    public updateUsers(userArray: UserResponse[], status: StatusUser, currentUser: UserResponse | null): void {
        userArray.forEach((user) => {
            if (user.login !== currentUser?.login) {
                const item = this.createUsersItem(user.login, status);
                this.userList.append(item);
            }
        });
    }

    public clearUsers(): void {
        while (this.userList.firstChild) {
            this.userList.firstChild.remove();
        }
    }

    // public addUser(user: User, status: StatusUser): void {
    //     const oldUser = this.findUser(user);
    //     if (oldUser) {
    //         oldUser.classList.remove("active");
    //         oldUser.classList.remove("nonactive");
    //         oldUser.classList.add(status);
    //         return;
    //     }
    //     const lastItem = this.findLastItemWithStatus(status);
    //     const newUser = this.createUsersItem(user.login, status);
    //     if (lastItem === null) {
    //         this.userList.append(newUser);
    //         return;
    //     }
    //     lastItem.prepend(newUser);
    // }

    // private findLastItemWithStatus(status: StatusUser): Element | null {
    //     const items = [...document.querySelectorAll(`.users__list__item.${status}`)];
    //     if (items.length === 0) {
    //         return null;
    //     }
    //     return items[items.length - 1];
    // }

    // private findUser(user: User): Element | undefined | null {
    //     const users = [...document.querySelectorAll(`.users__list__item__login`)];
    //     const result = users.find((item) => item.textContent === user.login)?.parentElement;
    //     return result;
    // }
}
