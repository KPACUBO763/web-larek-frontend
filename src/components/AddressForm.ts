import {Form} from "./common/Form";
import {IAddressForm} from "../types";
import {IEvents} from "./base/events";

export class AddressForm extends Form<IAddressForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}
