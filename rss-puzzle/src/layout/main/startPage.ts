import { header } from "../header/header";
import { mainPage } from "./mainPage";

export function startPage(): void {
    header.createHeader();
    mainPage.createMain();
    mainPage.createStartPage();
}
