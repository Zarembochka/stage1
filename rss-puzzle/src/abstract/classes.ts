export abstract class Layout {
    protected createElement(name: string, classname: string, text?: string, id?: string): Element {
        const newElement = document.createElement(name);
        newElement.className = classname;
        if (text) {
            newElement.textContent = text;
        }
        if (id) {
            newElement.setAttribute("id", id);
        }
        return newElement;
    }
}
