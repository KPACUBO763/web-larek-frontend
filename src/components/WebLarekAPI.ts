import { Api, ApiListResponse } from './base/api';
import {IOrder, IProductList, IProductItem} from "../types";

export interface IWebLarekAPI {
    getProductList: () => Promise<IProductList[]>;
    getProductItem: (id: string) => Promise<IProductItem>;
}

export class WebLarekAPI extends Api implements IWebLarekAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(id: string): Promise<IProductItem> {
        return this.get(`/api/weblarek/${id}`).then(
            (item: IProductItem) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    getProductList(): Promise<IProductItem[]> {
        return this.get('/api/weblarek').then((data: ApiListResponse<IProductItem>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

}
