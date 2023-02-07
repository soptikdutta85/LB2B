import { LightningElement, api, track } from 'lwc';
import * as UTILITIES from 'c/utilities';
import { labels } from './labels.js'

export default class PdpFacetFilterItem extends LightningElement {

    LABELS = labels;
    
    @api facetFilterItem;
    //should contain the actual value that Salesforce Needs for example ['Tier 1', 'Tier 2']
    @api actualSelectedValue = [];
    
    //this value should be the same as the oldValue below
    currentValue = 'all';
    //this value shouould be the same as the current value above
    oldValue = ['all'];
    newValue = [];

    @track
    facetOptions2;

    connectedCallback() {
        try {
            if(this.facetFilterItem.searchFacetOptions && this.facetFilterItem.searchFacetOptions.length > 0) {
                this.actualSelectedValue = Array.from(this.facetFilterItem.searchFacetOptions.map(item => item.facetOptionId));
                this.setFacetOptions();
            }

        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    @api
    get selectedValues() {
        try {
            let values = [];
            const boxes = this.template.querySelectorAll('lightning-input');
            boxes.forEach((box) => {
                if(box.value === 'all' && box.checked) {
                    //UTILITIES.log('MMM', JSON.stringify(this.facetFilterItem.searchFacetOptions));
                    values = this.facetFilterItem.searchFacetOptions.map((item) => {
                        return item.facetOptionId;
                    });
                }
                else if(box.values !== 'all' && box.checked) {
                    values.push(box.value);
                }
            });
            return values;
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    /*@api
    disableOptions() {
        UTILITIES.log('456454');
        this.template.querySelectorAll('span').forEach((element) => {
            UTILITIES.log('ABCYU');
        });
    }*/
    
    get facetHeader() {
        try {
            if(this.facetFilterItem.facetDisplayName) {
                return this.facetFilterItem.facetDisplayName;
            }
            return '';
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    };

    @api
    setFacetOptions() {
        try {
            if(this.facetFilterItem.searchFacetOptions && this.facetFilterItem.searchFacetOptions.length > 0) {
                let clonedFacetOptions = [...this.facetFilterItem.searchFacetOptions];
                let sortedFacetOptions = clonedFacetOptions.sort((a,b) => {
                    if (a.facetOptionDisplayName < b.facetOptionDisplayName){
                        return -1;
                    }
                    if (a.facetOptionDisplayName > b.facetOptionDisplayName){
                        return 1;
                    }
                    return 0;
                });
                
                let formattedFacets = sortedFacetOptions.map((item) => {
                    return { 
                            label: UTILITIES.format(this.LABELS.FacetNameFormat, item.facetOptionDisplayName, item.productCount), 
                            value: item.facetOptionId,
                            isDisabled: item.productCount === 0 ? true: false,
                            isChecked: false
                        }
                });
                formattedFacets.unshift({
                    label: this.LABELS.FacetAllLabel, 
                    value: 'all',
                    isDisabled: false,
                    isChecked: true
                });
                this.facetOptions2 = formattedFacets;
            }
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    
    get facetOptions() {
        try {
            if(this.facetFilterItem.searchFacetOptions && this.facetFilterItem.searchFacetOptions.length > 0) {
                let clonedFacetOptions = [...this.facetFilterItem.searchFacetOptions];
                let sortedFacetOptions = clonedFacetOptions.sort((a,b) => {
                    if (a.facetOptionDisplayName < b.facetOptionDisplayName){
                        return -1;
                    }
                    if (a.facetOptionDisplayName > b.facetOptionDisplayName){
                        return 1;
                    }
                    return 0;
                });
                
                let formattedFacets = sortedFacetOptions.map((item) => {
                    return { 
                            label: UTILITIES.format(this.LABELS.FacetNameFormat, item.facetOptionDisplayName, item.productCount), 
                            value: item.facetOptionId,
                            isDisabled: item.productCount === 0 ? true: false,
                            isChecked: false
                        }
                });
                formattedFacets.unshift({
                    label: this.LABELS.FacetAllLabel, 
                    value: 'all',
                    isDisabled: false,
                    isChecked: true
                });
                return formattedFacets;
            }
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    };

    facetSelected2(event) {
        try {
            //UTILITIES.log(event.target.value, event.target.checked);
            if(event.target.value === 'all' && event.target.checked) {
                const boxes = this.template.querySelectorAll('lightning-input');
                boxes.forEach((box) => {
                    if(box.value !== 'all') {
                        box.checked = false;
                    }
                });
            }
            else if(event.target.value !== 'all' && event.target.checked) {
                const boxes = this.template.querySelectorAll('lightning-input');
                boxes.forEach((box) => {
                    if(box.value === 'all') {
                        box.checked = false;
                    }
                });
            }

            const facetChangedEvent = new CustomEvent('facetchanged', {
                detail: this.facetFilterItem.facetId
            });
            this.dispatchEvent(facetChangedEvent);
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }
    
    facetSelected(event) {
        try {
            this.newValue = Array.from(event.detail.value);

            let modifiedValue = this.getModifiedValue(this.newValue, this.oldValue);

            let isAllSelected = event.detail.value.includes('all');

            if(modifiedValue.isAdded === true && modifiedValue.value !== 'all' && isAllSelected) {
                this.currentValue = event.detail.value.filter((item) => {
                    return item !== 'all';
                });
                this.oldValue = Array.from(this.currentValue);
                this.actualSelectedValue = Array.from(this.currentValue);
            }
            else if(modifiedValue.isAdded === true && modifiedValue.value === 'all') {
                this.currentValue = event.detail.value.filter((item) => {
                    return item === 'all';
                });
                this.oldValue = Array.from(this.currentValue);
                this.actualSelectedValue = Array.from(this.facetFilterItem.searchFacetOptions.map(item => item.facetOptionId));
            }
            else {
                this.oldValue = Array.from(event.detail.value);
                this.actualSelectedValue = Array.from(event.detail.value);
            }
            const facetChangedEvent = new CustomEvent('facetchanged', {
                detail: this.facetFilterItem.facetId
            });
            this.dispatchEvent(facetChangedEvent);
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    getModifiedValue(currentValue, oldValue) {
        if(currentValue.length > oldValue.length) {
            let filteredArray = UTILITIES.filterArray(currentValue, oldValue);
            return {
                isAdded: true,
                value: filteredArray[0]
            };
        }
        else if(currentValue.length < oldValue.length) {
            let filteredArray = UTILITIES.filterArray(oldValue, currentValue);
            return {
                isAdded: false,
                value: filteredArray[0]
            };
        }
        else {
            UTILITIES.logError('Something weird happened');
        }
    }
}