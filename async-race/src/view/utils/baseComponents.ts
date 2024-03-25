import { ParamsToComponent } from "./interfaces";

export class BaseComponent<T extends HTMLElement = HTMLElement> {
    protected element: T;

    constructor(params: ParamsToComponent) {
        this.element = document.createElement(params.tag) as T;
        this.createElement(params);
    }

    protected createElement(params: ParamsToComponent) {
        params.classNames.forEach((name) => this.element?.classList.add(name));
        if (params.text) {
            this.element.textContent = params.text;
        }
    }

    public getElement(): T {
        return this.element;
    }

    public appendElement(element: T): void {
        this.element?.append(element);
    }

    public removeElement(): void {
        this.element.remove();
    }
}
