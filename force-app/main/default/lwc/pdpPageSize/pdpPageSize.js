import { api, LightningElement } from 'lwc';
import * as UTILITIES from 'c/utilities';
import CURRENTCONTEXT from 'c/currentContext';
import { labels } from './labels.js'

export default class PdpPageSize extends LightningElement {

    value = '';
    storeConfiguration = CURRENTCONTEXT.getStoreConfig(this.storeConfigId);
    LABELS = labels;

    options = [];

    connectedCallback() {
        try {
            this.options = [];
            this.storeConfiguration.plp.pageSizeOptions.forEach((item) => {
                this.options.push({
                    label: UTILITIES.format(this.LABELS.PageSizeFormat, item),
                    value: item + ''
                })
            });
            this.value = this.storeConfiguration.plp.defaultPageSize + '';
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    pageSizeChanged(event) {
        try {
            this.value = event.detail.value;

            const customEvent = new CustomEvent('pagesizechanged');
            this.dispatchEvent(customEvent);
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    @api
    retrievePageSize() {
        return this.value;
    }
}