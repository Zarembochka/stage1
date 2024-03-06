import "./style.scss";
import { loginPage } from "./layout/startPage/loginPage";
import { lStorage } from "./layout/startPage/localStorage";
import { startPage } from "./layout/main/startPage";

function start() {
    if (lStorage.isUserinLS()) {
        startPage();
        return;
    }
    loginPage.createMain();
}

start();
