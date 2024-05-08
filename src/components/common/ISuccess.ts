import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";

interface ISuccess {
    total: number
};

export class Success extends Component<ISuccess> {
    protected _total: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._total = ensureElement<HTMLParagraphElement>('.order-success__description', this.container)
    };

    set total(total: number) {
        this.setText(this._total, total)
    }
}
