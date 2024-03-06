import { Layout } from "../../abstract/classes";

export class Container extends Layout {
    private container;

    constructor(className: string) {
        super();
        this.container = this.createElement("div", `container ${className}`);
    }

    public createContainer(): void {
        document.body.append(this.container);
    }

    public appendElement(element: Element): void {
        this.container.append(element);
    }

    public destroy(): void {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
}
