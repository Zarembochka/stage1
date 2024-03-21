import { BaseComponent } from "../utils/baseComponents";
import { InputTYPES } from "../utils/enums";

export class Main extends BaseComponent {
    constructor() {
        super({ tag: "main", classNames: ["main", "main__garage"] });
        this.prepareMain();
    }

    private prepareMain(): void {
        this.createNewCarField();
    }

    private createNewCarField(): void {
        const wrapper = this.createWrapperToField();
        const input = this.createInput(["input", "input__newCar"], InputTYPES.text);
        const colorChoice = this.createInput(["input", "input__newCarColor"], InputTYPES.color);
        const btn = this.createBtn();
        wrapper?.append(input, colorChoice, btn);
    }

    private createWrapperToField(): Element {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["main__newCar"] }).getElement();
        this.appendElement(wrapper);
        return wrapper;
    }

    private createInput(classNames: string[], type: InputTYPES): HTMLInputElement {
        const input = new BaseComponent<HTMLInputElement>({
            tag: "input",
            classNames: classNames,
        }).getElement();
        input.type = type;
        if (type === InputTYPES.color) {
            input.value = "#ce63dd";
        }
        return input;
    }

    private createBtn(): Element {
        const btn = new BaseComponent({
            tag: "button",
            classNames: ["btn", "btn__main", "btn-create"],
            text: "Create",
        }).getElement();
        return btn;
    }
}
