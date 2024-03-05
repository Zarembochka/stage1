import "./style.scss";
import { container } from "./layout/container/container";
import "./layout/modalWindow/modal";
import { modalWindow } from "./layout/modalWindow/modal";
import { lStorage } from "./layout/modalWindow/localStorage";
import { header } from "./layout/header/header";

function start() {
    container.createContainer();
    modalWindow.createModal();
    if (lStorage.isUserinLS()) {
        header.createHeader();
        return;
    }
    modalWindow.showModal();
}

start();
