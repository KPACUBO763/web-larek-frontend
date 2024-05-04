export type Category = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";

// отображение данных на странице
export interface IPage {
    counter: number;
    catalog: HTMLElement[]
}

// состояние данных в приложении
export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    order: IOrder | null;
};

// товар
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number | null
};

// карточка
export interface ICard {
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number | null
};

// модалка
export interface IModalData {
    content: HTMLElement;
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

// оформление заказа
export interface IOrder extends IAddressForm, IСontactsForm {
    items: string | string[];
    total: number
};

// успешный заказ
export interface ISuccess {
    id: string;
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
    price: number
};

// ошибка в форме
export type FormErrors = Partial<Record<keyof IOrder, string>>
