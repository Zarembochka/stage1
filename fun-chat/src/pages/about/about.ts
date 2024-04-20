import { router } from "../../router/router";
import { BaseComponent } from "../../utils/baseComponents";

const description = `This application was creating during the course "RSSchool: JS / Front-end. Stage 2". Have fun!!!`;

export class AboutPage {
    private container: HTMLElement;

    private btnBack: HTMLButtonElement;

    private title: HTMLElement;

    private description: HTMLElement;

    private author: HTMLLinkElement;

    private wrapper: HTMLElement;

    constructor() {
        this.container = new BaseComponent({ tag: "div", classNames: ["container", "container__about"] }).getElement();
        this.wrapper = new BaseComponent({ tag: "div", classNames: ["about"] }).getElement();
        this.title = new BaseComponent({ tag: "h1", classNames: ["about__title"], text: "Fun-chat" }).getElement();
        this.description = new BaseComponent({
            tag: "p",
            classNames: ["about__description"],
            text: description,
        }).getElement();
        this.author = this.createAuthor();
        this.btnBack = this.createBtnBack();
        this.createPage();
    }

    private createAuthor(): HTMLLinkElement {
        const link = new BaseComponent<HTMLLinkElement>({
            tag: "a",
            classNames: ["about__author"],
            text: "Author: Zarembochka",
        }).getElement();
        link.href = "https://github.com/Zarembochka";
        link.setAttribute("target", "blank");
        return link;
    }

    private createBtnBack(): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-action", "btn-back"],
            text: "Go back",
        }).getElement();
        btn.addEventListener("click", () => this.goBack());
        return btn;
    }

    private createPage() {
        this.wrapper.append(this.title, this.description, this.author, this.btnBack);
        this.container.append(this.wrapper);
    }

    public getPage(): HTMLElement {
        return this.container;
    }

    private goBack(): void {
        router.goBack();
    }
}
