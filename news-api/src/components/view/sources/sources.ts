import './sources.css';
import { Source } from '../../abstracts/interfaces';

class Sources {
    public draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const name = sourceClone.querySelector<HTMLElement>('.source__item-name');
            if (name) {
                name.textContent = item.name;
            }
            sourceClone.querySelector<HTMLElement>('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector<HTMLElement>('.sources')?.append(fragment);
    }
}

export default Sources;
