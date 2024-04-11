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
        const label = new BaseComponent<HTMLLabelElement>({
            tag: "label",
            classNames: ["users__list__item__login"],
            text: name,
        }).getElement();
        list.append(status, label);
        return list;
    }

    public updateUsers(userArray: UserResponse[], status: StatusUser): void {
        userArray.forEach((user) => {
            const item = this.createUsersItem(user.login, status);
            this.userList.append(item);
        });
    }
}
