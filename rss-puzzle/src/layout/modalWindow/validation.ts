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
    if (checkTextValidation(element, /[a-zA-Z-]+$/, "Only English letters and the hyphen ara allowed")) {
        if (checkTextValidation(element, /^[A-Z]/, "The first letter should be in uppercase")) {
            let regexpToCheck = /[a-zA-Z-]{4}/;
            let message = "The surname should contain minimal 4 characters";
            if (element.id === "login_firstName") {
                regexpToCheck = /[a-zA-Z-]{3}/;
                message = "The first name should contain minimal 3 characters";
            }
            return checkTextValidation(element, regexpToCheck, message);
        }
        return false;
    }
    return false;
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
