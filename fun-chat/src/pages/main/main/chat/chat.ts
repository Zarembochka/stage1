import { BaseComponent } from "../../../../utils/baseComponents";
import { ChatFooter } from "./footer/footer";
import { ChatHeader } from "./header/header";

export class Chat extends BaseComponent {
    private header: ChatHeader;

    private footer: ChatFooter;

    constructor() {
        super({ tag: "article", classNames: ["chat"] });
        this.header = new ChatHeader();
        this.footer = new ChatFooter();
        this.prepareChat();
    }

    private prepareChat(): void {
        this.getElement().append(this.header.getElement(), this.footer.getElement());
    }
}
