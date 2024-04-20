function checkTextValidation(input: HTMLInputElement, pattern: RegExp, messageText: string): boolean {
    const value = input.value.trim();
    if (pattern.test(value) === false) {
        input.classList.remove("form__login__item-valid");
        input.classList.add("form__login__item-notvalid");
        // message
        const message = input.nextElementSibling;
        if (message) {
            message.textContent = messageText;
        }
        return false;
    }
    input.classList.add("form__login__item-valid");
    return true;
}

function checkLengthValidation(input: HTMLInputElement, messageText: string): boolean {
    const value = input.value.trim();
    if (!value.length) {
        input.classList.remove("form__login__item-valid");
        input.classList.add("form__login__item-notvalid");
        // message
        const message = input.nextElementSibling;
        if (message) {
            message.textContent = messageText;
        }
        return false;
    }
    input.classList.add("form__login__item-valid");
    return true;
}

function checkInputValidation(element: HTMLInputElement): boolean {
    if (!checkLengthValidation(element, "The field is required!")) {
        return false;
    }
    // if (!checkTextValidation(element, /^[A-Z]/, "The first letter should be in uppercase")) {
    //     return false;
    // }
    if (element.type === "text") {
        if (!checkTextValidation(element, /^[a-zA-Z-]+$/, "Only English letters and the hyphen ara allowed")) {
            return false;
        }
    }
    if (!checkTextValidation(element, /.{4}/, "The field should contain minimal 4 characters")) {
        return false;
    }
    if (element.type === "password") {
        if (!checkTextValidation(element, /[a-zA-Z]+/, "The passwors should contain minimal one English letter")) {
            return false;
        }
    }
    return true;
}

export function checkValidation(input: HTMLInputElement): void {
    checkInputValidation(input);
}

export function focusValidation(input: HTMLInputElement) {
    input.classList.remove("form__login__item-notvalid");
    const message = input.nextElementSibling;
    if (message) {
        message.textContent = "";
    }
}

export function checkValidationBeforeSaving(inputs: HTMLInputElement[]): boolean {
    for (let i = 0; i < inputs.length; i += 1) {
        if (!checkInputValidation(inputs[i])) {
            return false;
        }
    }
    return true;
}
