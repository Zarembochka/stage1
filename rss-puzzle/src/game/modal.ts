import { Layout } from "./../abstract/classes";

class Modal extends Layout {
    private modalBackground: Element;

    private modal: Element;

    constructor() {
        super();
        this.modalBackground = this.createElement("div", "modal__background");
        this.modal = this.createElement("div", "modal");
        //this.createModal();
    }

    public createModal(): void {
        this.createButtonOk(this.modal);
        this.modalBackground.append(this.modal);
        document.body.append(this.modalBackground);
    }

    public showResults(): void {
        this.modalBackground.classList.add("show");
    }

    private createButtonOk(element: Element): void {
        const btn = this.createElement("button", "btn btn-submit btn-close", "Ok");
        btn.addEventListener("click", () => this.hideModal());
        element.append(btn);
    }

    private hideModal(): void {
        this.modalBackground.classList.remove("show");
    }
}

export const modalWindow = new Modal();
