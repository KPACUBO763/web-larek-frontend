export type Category = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";

// состояние данных в приложении
export interface IAppState {
    catalog: IProduct[];
    basket: IProduct[];
    order: IOrder | null;
};

// товар
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number | null;
    selected?: boolean
};

// модалка с адресом
export interface IAddressForm {
    payment: string;
    address: string
};

// модалка с контактами
export interface IСontactsForm {
    email: string;
    phone: string
};

// валидация форм
export interface IValidForm extends IAddressForm, IСontactsForm {
}

// оформление заказа
export interface IOrder extends IAddressForm, IСontactsForm {
    items: string[];
    total: number
};

// состояние формы
export interface IFormState {
    valid: boolean;
    errors: string[]
};

// корзина
export interface IBasketView {
    items: HTMLElement[];
    total: number
};

// ошибка в форме
export type FormErrors = Partial<Record<keyof IOrder, string>>
