import { Layout } from "../../abstract/classes";
import { container } from "../container/container";

class Main extends Layout {
    private main;
    constructor() {
        super();
        this.main = this.createElement("main", "main");
    }
    public createMain(): void {
        container.appendElement(this.main);
    }
    public createStartPage(): void {
        const wrapper = this.createElement("div", "main__start");
        const title = this.createElement("h2", "main__start__title", "RSS Puzzle");
        const text = `RSS Puzzle is an interactive mini game aimed at enhancing English language skills. The game integrates various levels of difficulty, hint options and a unique puzzle-like experience with artwork`;
        const description = this.createElement("p", "main__start__description", text);
        wrapper.append(title, description);
        this.main.append(wrapper);
    }
    public removeMain(): void {
        this.main.innerHTML = "";
    }
}

export const main = new Main();
