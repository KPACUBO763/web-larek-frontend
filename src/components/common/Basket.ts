import {Component} from "../base/Component";
import {createElement, ensureElement} from "../../utils/utils";
import {IBasketView} from "../../types";
import {EventEmitter} from "../base/events";

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _price: HTMLSpanElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLUListElement>('.basket__list', this.container);
        this._price = ensureElement<HTMLSpanElement>('.basket__price', this.container);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this._button.addEventListener('click', () => {
            events.emit('order:open');
        });

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set price(price: number) {
        this.setText(this._price, price + ' синапсов')
    }
}
