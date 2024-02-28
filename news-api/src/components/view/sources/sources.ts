import './sources.css';
import { Source } from '../../abstracts/interfaces';

class Sources {
    public draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);

                const name = sourceClone.querySelector<HTMLElement>('.source__item-name');
                if (name) {
                    name.textContent = item.name;
                }
                sourceClone.querySelector<HTMLElement>('.source__item')?.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        document.querySelector<HTMLElement>('.sources')?.append(fragment);
    }
}

export { Sources };
