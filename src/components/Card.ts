import {Component} from "./base/Component";
import {IProduct, Category} from "../types";
import {ensureElement} from "../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

const TCategory: Record<string, string> = {
    'софт-скил': 'soft',
    'другое': 'other',
    'дополнительное': 'additional',
    'кнопка': 'button',
    'хард-скил': 'hard'
};

export class Card extends Component<IProduct> {
    protected _title: HTMLHeadingElement;
    protected _image?: HTMLImageElement;
    protected _text?: HTMLParagraphElement;
    protected _category?: HTMLSpanElement;
    protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._text = ensureElement<HTMLParagraphElement>('.card__text', container);
        this._category = ensureElement<HTMLSpanElement>('card__category', container);
        this._button = ensureElement<HTMLButtonElement>('.button', container);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick)
            } else {
                container.addEventListener('click', actions.onClick)
            }
        }
    };

    set title(value: string) {
        this.setText(this._title, value)
    };

    get title(): string {
        return this._title.textContent || ''
    };

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    };

    set text(value: string) {
        this.setText(this._text, value)
    };

    set category(value: Category) {
        this.setText(this._category, value);
        this._category.classList.add(`card__category_${TCategory.value}`)
    }
}
