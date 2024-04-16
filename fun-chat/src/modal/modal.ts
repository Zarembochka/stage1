import { BaseComponent } from "../utils/baseComponents";

class ModalForm extends BaseComponent {
    modal: HTMLElement;

    title: HTMLElement;

    btnClose: HTMLButtonElement;

    constructor() {
        super({ tag: "div", classNames: ["modalBackground"] });
        this.modal = new BaseComponent({
            tag: "div",
            classNames: ["modal"],
        }).getElement();
        this.title = new BaseComponent({
            tag: "h3",
            classNames: ["modal__title"],
        }).getElement();
        this.btnClose = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-close"],
            text: "Ok",
        }).getElement();
        this.prepareModal();
    }

    private prepareModal(): void {
        this.btnClose.addEventListener("click", () => this.hideModal());
        this.modal.append(this.title, this.btnClose);
        this.getElement().append(this.modal);
        //this.addModalToDOM();
    }

    private setTitle(msg: string): void {
        this.title.textContent = msg;
    }

    public showModal(msg: string): void {
        //this.addModalToDOM();
        this.setTitle(msg);
        this.getElement().classList.add("show");
    }

    public hideModal(): void {
        this.getElement().classList.remove("show");
        //this.getElement().remove();
    }

    private addModalToDOM(): void {
        document.body.append(this.getElement());
    }
}

export const myModal = new ModalForm();
