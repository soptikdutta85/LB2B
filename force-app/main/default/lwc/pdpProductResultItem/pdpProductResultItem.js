import { api, LightningElement } from 'lwc';
import * as UTILITIES from 'c/utilities';
import CURRENTCONTEXT from 'c/currentContext';
import { labels } from "./labels.js";

export default class PdpProductResultItem extends LightningElement {
    @api
    productResultItem;
    @api
    storeConfigId;

    LABELS = labels;

    currentUserContext = CURRENTCONTEXT.getContext();
    storeConfiguration = CURRENTCONTEXT.getStoreConfig(this.storeConfigId);

    get productImageUrl() {

        try {
            if(this.productResultItem.images 
                && this.productResultItem.images.length > 0 && this.productResultItem.images[0].imageUrl) {
                    return this.productResultItem.images[0].imageUrl;
            }
            return this.storeConfiguration.plp.defaultImageUrl;
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    get unitPrice() {
        try {
            if(this.productResultItem.unitPrice && this.productResultItem.currencyIsoCode) {
                return UTILITIES.getFormattedPrice(this.productResultItem.unitPrice, 
                                                    this.productResultItem.currencyIsoCode,
                                                    this.currentUserContext.currentUserLocale);
            }
            return '';
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    //*******************************Button Actions**************************** */
    addToCartClicked(event) {
        
    }
}