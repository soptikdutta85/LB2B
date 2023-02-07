import { LightningElement, api } from 'lwc';
import { labels } from "./labels.js";
import * as UTILITIES from 'c/utilities';

export default class PdpProductCount extends LightningElement {

    LABELS = labels;

    formattedProductCountText;

    @api
    showProductCount(totalProducts, productsOnDisplay) {
        //UTILITIES.log(productsOnDisplay, totalProducts);
        this.formattedProductCountText = UTILITIES.format(labels.ProductCountLabel, productsOnDisplay, totalProducts);
    }
}