import {Model} from "./base/Model";
import {FormErrors, IAppState, IProductItem, IProductList, IOrder, IAddressForm, IСontactsForm} from "../types";

export class AppState extends Model<IAppState> {
    basket: string[] = [];
    catalog: IProductItem[];
    order: IOrder;
    formErrors: FormErrors = {};

    getCatalog(items: IProductList[]) {};

    addProduct() {};

    removeProduct() {};

    get countProducts() {
        return
    };

    get priceProducts() {
        return
    };

    setDataOrder() {};

    resetBasket() {};

    resetDataOrder() {};

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
