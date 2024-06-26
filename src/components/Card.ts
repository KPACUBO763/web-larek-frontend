import {Component} from "./base/Component";
import {IProduct} from "../types";
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
    protected _price: HTMLSpanElement;
    protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
        this._image = container.querySelector('.card__image');
        this._text = container.querySelector('.card__text');
        this._category = container.querySelector('.card__category');
        this._price = container.querySelector('.card__price');
        this._button = container.querySelector('.card__button');

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick)
            } else {
                container.addEventListener('click', actions.onClick)
            }
        }
    };

    // устанавливает название товара
    set title(value: string) {
        this.setText(this._title, value)
    };

    // устанавливает картинку
    set image(value: string) {
        this.setImage(this._image, value, this.title)
    };

    // устанавливает описание
    set text(value: string) {
        this.setText(this._text, value)
    };

    // устанавливает категорию
    set category(value: string) {
        this.setText(this._category, value);
        this._category.classList.add(`card__category_${TCategory[value]}`);
    }

    // устанавливает цену
    set price(value: number | null) {
		this.setText(this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
		if (value === null && this._button) {
			this._button.disabled = true;
			this.setText(this._button, 'Нельзя купить');
		}
    };

    // возвращает цену
    get price(): number {
		return Number(this._price.textContent) || 0;
	};

    // устанавливает текст кнопки
    set button(value: string) {
		this.setText(this._button, value);
	};

    // устанавливает статус товара (выбран или нет)
	set selected(value: boolean) {
		this.toggleButton(value);
	};

    // метод для изменения кнопки
	toggleButton(selected: boolean) {
		!selected?
        this.button = 'В корзину' : this.button = 'Убрать из корзины';
	}
}
