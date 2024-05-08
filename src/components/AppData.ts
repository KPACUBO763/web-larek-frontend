import {Model} from "./base/Model";
import {FormErrors, IAppState, IProduct, IOrder, Category} from "../types";

export class Product extends Model<IProduct> {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number | null
}

export class AppState extends Model<IAppState> {
    basket: IProduct[];
    catalog: IProduct[];
    order: IOrder = {
        payment: 'card',
        address: '',
        email: '',
        phone: '',
        items: [],
        total: 0
    };
    formErrors: FormErrors = {};

    setCatalog(items: IProduct[]) {
        this.catalog = items.map(item => new Product(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    };

    addProduct(item: Product) {
        this.basket.push(item)
    };

    removeProduct(id: string) {
        this.basket = this.basket.filter(item => item.id !== id)
    };

    get countProducts() {
        return this.basket.length
    };

    get priceProducts() {
        return this.basket.reduce((total, item) => total + item.price, 0);
    };
    // TODO ...
    setDataOrder() {};

    resetBasket() {
        this.basket = []
    };

    resetDataOrder() {
        this.order = {
            payment: 'card',
            address: '',
            email: '',
            phone: '',
            items: [],
            total: 0
        }
    };

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}
