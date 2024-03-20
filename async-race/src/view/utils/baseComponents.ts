import { ParamsToComponent } from "./interfaces";

export class BaseComponent {
    private element: Element;

    constructor(params: ParamsToComponent) {
        this.element = document.createElement(params.tag);
        this.createElement(params);
    }

    private createElement(params: ParamsToComponent) {
        params.classNames.forEach((name) => this.element?.classList.add(name));
        if (params.text) {
            this.element.textContent = params.text;
        }
    }

    public getElement(): Element {
        return this.element;
    }

    public appendElement(element: Element) {
        this.element?.append(element);
    }
}
