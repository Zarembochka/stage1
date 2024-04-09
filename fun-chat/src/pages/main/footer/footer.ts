import { BaseComponent } from "../../../utils/baseComponents";
import { githubLogo, rsschoolLogo } from "../../../abstracts/logos";

export class Footer extends BaseComponent {
    private rsschool: HTMLElement;

    private github: HTMLElement;

    private year: HTMLElement;

    constructor() {
        super({ tag: "footer", classNames: ["footer"] });
        this.rsschool = this.createFooterItem("https://rs.school/", rsschoolLogo);
        this.github = this.createFooterItem("https://github.com/Zarembochka", githubLogo);
        this.year = this.createYear();
        this.prepareFooter();
    }

    private prepareFooter(): void {
        this.getElement().append(this.rsschool, this.year, this.github);
    }

    private createFooterItem(link: string, logo: string): HTMLElement {
        const elem = new BaseComponent<HTMLLinkElement>({ tag: "a", classNames: ["footer__item"] }).getElement();
        elem.href = link;
        elem.setAttribute("target", "_blank");
        elem.innerHTML = logo;
        return elem;
    }

    private createYear(): HTMLElement {
        const year = new BaseComponent({ tag: "span", classNames: ["footer__item"], text: "2024" }).getElement();
        return year;
    }
}
