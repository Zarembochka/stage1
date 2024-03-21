import { BaseComponent } from "../utils/baseComponents";
import { InputTYPES } from "../utils/enums";

export class Main extends BaseComponent {
    constructor() {
        super({ tag: "main", classNames: ["main", "main__garage"] });
        this.prepareMain();
    }

    private prepareMain(): void {
        this.createSettings();
    }

    private createSettings(): void {
        const wrapper = this.createWrapperToField(["main__settings"]);
        const formCreate = this.createFormNewCar();
        const formUpdate = this.createFormUpdateCar();
        const buttons = this.createSettingButtons();
        wrapper.append(formCreate, formUpdate, buttons);
    }

    private createSettingButtons(): Element {
        const wrapper = this.createWrapperToField(["main__setting__buttons"]);
        const btnRace = this.createBtn(["btn", "btn__setting", "btn-race"], "Race");
        const btnReset = this.createBtn(["btn", "btn__setting", "btn-reset"], "Reset");
        const btnGenerate = this.createBtn(["btn", "btn__setting", "btn-generate"], "Generate cars");
        wrapper.append(btnRace, btnReset, btnGenerate);
        return wrapper;
    }

    private createFormNewCar(): HTMLFormElement {
        const formCreate = this.createForm("form__create");
        const input = this.createInput(["input", "input__newCar"], InputTYPES.text);
        const colorChoice = this.createInput(["input", "input__newCarColor"], InputTYPES.color);
        const btn = this.createBtn(["btn", "btn__main", "btn-create"], "Create");
        formCreate?.append(input, colorChoice, btn);
        return formCreate;
    }

    private createFormUpdateCar(): HTMLFormElement {
        const formCreate = this.createForm("form__update");
        const input = this.createInput(["input", "input__updateCar"], InputTYPES.text);
        const colorChoice = this.createInput(["input", "input__updateCarColor"], InputTYPES.color);
        const btn = this.createBtn(["btn", "btn__main", "btn-update"], "Update");
        formCreate?.append(input, colorChoice, btn);
        return formCreate;
    }

    private createWrapperToField(classNames: string[]): Element {
        const wrapper = new BaseComponent({ tag: "div", classNames }).getElement();
        this.appendElement(wrapper);
        return wrapper;
    }

    private createForm(formClass: string): HTMLFormElement {
        const form = new BaseComponent<HTMLFormElement>({
            tag: "form",
            classNames: ["main__form", formClass],
        }).getElement();
        return form;
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

    private createBtn(btnClass: string[], text: string): Element {
        const btn = new BaseComponent({
            tag: "button",
            classNames: btnClass,
            text: text,
        }).getElement();
        return btn;
    }
}
