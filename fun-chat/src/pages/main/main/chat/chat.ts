import { BaseComponent } from "../../../../utils/baseComponents";
import { ChatDialog } from "./dialog/dialog";
import { ChatFooter } from "./footer/footer";
import { ChatHeader } from "./header/header";

export class Chat extends BaseComponent {
    private header: ChatHeader;

    private dialog: ChatDialog;

    private footer: ChatFooter;

    constructor() {
        super({ tag: "article", classNames: ["chat"] });
        this.header = new ChatHeader();
        this.dialog = new ChatDialog();
        this.footer = new ChatFooter();
        this.prepareChat();
    }

    private prepareChat(): void {
        this.getElement().append(this.header.getElement(), this.dialog.getElement(), this.footer.getElement());
    }
}
