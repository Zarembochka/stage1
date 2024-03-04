export abstract class Layout {
    protected createElement(name: string, classname: string, text?: string): Element {
        const newElement = document.createElement(name);
        newElement.className = classname;
        if (text) {
            newElement.textContent = text;
        }
        return newElement;
    }
}
