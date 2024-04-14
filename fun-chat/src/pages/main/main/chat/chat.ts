import { BaseComponent } from "../../../../utils/baseComponents";
import { ChatHeader } from "./header/header";

export class Chat extends BaseComponent {
    private header: ChatHeader;

    constructor() {
        super({ tag: "article", classNames: ["chat"] });
        this.header = new ChatHeader();
        this.prepareChat();
    }

    private prepareChat(): void {
        this.getElement().append(this.header.getElement());
    }
}
