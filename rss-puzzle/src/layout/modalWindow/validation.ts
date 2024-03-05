function checkTextValidation(input: HTMLInputElement, pattern: RegExp, messageText: string): boolean {
    const value = input.value.trim();
    if (pattern.test(value) === false) {
        input.classList.remove("modal__login__item-valid");
        input.classList.add("modal__login__item-notvalid");
        //message
        const message = input.nextElementSibling;
        if (message) {
            message.textContent = messageText;
        }
        return false;
    }
    input.classList.add("modal__login__item-valid");
    return true;
}

function checkInputValidation(element: HTMLInputElement): boolean {
    if (!checkTextValidation(element, /^[a-zA-Z-]{1}/, "The field is required!")) {
        return false;
    }
    if (!checkTextValidation(element, /[a-zA-Z-]+$/, "Only English letters and the hyphen ara allowed")) {
        return false;
    }
    if (!checkTextValidation(element, /^[A-Z]/, "The first letter should be in uppercase")) {
        return false;
    }
    let regexpToCheck = /[a-zA-Z-]{4}/;
    let message = "The surname should contain minimal 4 characters";
    if (element.id === "login_firstName") {
        regexpToCheck = /[a-zA-Z-]{3}/;
        message = "The first name should contain minimal 3 characters";
    }
    if (!checkTextValidation(element, regexpToCheck, message)) {
        return false;
    }
    return true;
}

export function checkValidation(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element) {
        checkInputValidation(element);
    }
}

export function focusValidation(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.type !== "submit") {
        input.classList.remove("modal__login__item-notvalid");
        const message = input.nextElementSibling;
        if (message) {
            message.textContent = "";
        }
    }
}

export function checkValidationBeforeSaving(): boolean {
    const inputs = [...document.querySelectorAll(".modal__login__item-input")];
    for (let i = 0; i < inputs.length; i += 1) {
        if (!checkInputValidation(inputs[i] as HTMLInputElement)) {
            return false;
        }
    }
    return true;
}
