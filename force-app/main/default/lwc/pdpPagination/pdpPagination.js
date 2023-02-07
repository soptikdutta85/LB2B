import { api, LightningElement } from 'lwc';
import { labels } from './labels.js'
import * as UTILITIES from 'c/utilities';

export default class PdpPagination extends LightningElement {

    LABELS = labels;

    displayShowMoreButton = false;

    totalProducts;
    currentProductCount;
    pageSize;

    // 1 based Index
    //get totalPages() {
    //    return Math.ceil(this.totalProducts/this.pageSize);
    //}

    //0 based index
    //get currentPage() {
    //    return Math.ceil(this.currentProductCount/this.pageSize) - 1;
    //}

    showMoreProducts() {
        let currentPage = Math.ceil(this.currentProductCount/this.pageSize) - 1;
        const showMoreEvent = new CustomEvent('shownextpage', {
            detail: currentPage + 1
        });
        this.dispatchEvent(showMoreEvent);
        //const 
    }

    @api
    renderPagination(totalProducts, currentProductCount, pageSize) {
        //UTILITIES.log(totalProducts, currentProductCount, pageSize);
        this.totalProducts = totalProducts;
        this.currentProductCount = currentProductCount;
        this.pageSize = pageSize;

        if(totalProducts > currentProductCount) {
            this.displayShowMoreButton = true;
        }
        else {
            this.displayShowMoreButton = false;
        }
    }

}