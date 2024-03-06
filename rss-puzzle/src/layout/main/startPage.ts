import { header } from "../header/header";
import { main } from "./mainPage";

export function startPage(): void {
    header.createHeader();
    main.createMain();
    main.createStartPage();
}
