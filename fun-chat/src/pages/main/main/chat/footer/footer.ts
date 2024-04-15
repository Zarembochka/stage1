import { BaseComponent } from "../../../../../utils/baseComponents";
import { MessageForm } from "./form/messageForm";

export class ChatFooter extends BaseComponent {
    private messageForm: MessageForm;

    constructor() {
        super({ tag: "footer", classNames: ["chat__footer"] });
        this.messageForm = new MessageForm();
        this.prepareFooter();
    }

    private prepareFooter(): void {
        this.getElement().append(this.messageForm.getElement());
    }
}
