import { Layout } from "../../abstract/classes";

class Container extends Layout {
    private container;

    constructor() {
        super();
        this.container = this.createElement("div", "container");
    }

    public createContainer() {
        document.body.append(this.container);
    }

    public appendElement(element: Element) {
        this.container.append(element);
    }
}

export const container = new Container();
