import { api, LightningElement, track } from 'lwc';
import * as UTILITIES from 'c/utilities';
import CURRENTCONTEXT from 'c/currentContext';
import getSortOptions from "@salesforce/apex/LB2B_Controller_PLP.getSortOptions";
import communityId from '@salesforce/community/Id';
import { getLabel } from './labels.js';

export default class PdpSortOptions extends LightningElement {
    
    currentUserContext = CURRENTCONTEXT.getContext();
    storeConfiguration = CURRENTCONTEXT.getStoreConfig(this.storeConfigId);

    @api
    selectedSortRuleId = '';

    enableConsoleLogs = true;

    @track
    sortOptions = [];

    connectedCallback() {
        this.getProductSortRules();
    }

    @api
    getSortRuleIdByName(sortRuleName, direction) {
        return new Promise((resolve, reject) => {
            getSortOptions({ 
                communityId: communityId, 
                effectiveAccountId: this.currentUserContext.effectiveAccountId, 
                correlationId: 'correlationId-5678', 
                enableConsoleLogs: this.enableConsoleLogs
            }).then((data) => {
                try {
                    if(this.enableConsoleLogs && data.logMessages) {
                        UTILITIES.logApexMessage(data.logMessages);
                    }

                    if(data && data.items) {
                        data.items.forEach((item2) => {
                            if(UTILITIES.compare(sortRuleName, item2.nameOrId)
                                && UTILITIES.compare(direction, item2.direction)) {
                                resolve(item2.sortRuleId);
                            }
                        })
                    }
                    throw new Error(`No sort rule ID found with Name: ${sortRuleName} and Direction: ${direction}`);
                }
                catch(error) {
                    reject(error);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getProductSortRules() {
        getSortOptions({ 
            communityId: communityId, 
            effectiveAccountId: this.currentUserContext.effectiveAccountId, 
            correlationId: 'correlationId-5678', 
            enableConsoleLogs: this.enableConsoleLogs
        }).then((data) => {
            try {
                if(this.enableConsoleLogs && data.logMessages) {
                    UTILITIES.logApexMessage(data.logMessages);
                }
                if(data && data.items) {
                    let fullSortOptions = [];
                    let storeDefaultConfiguration = Array.from(this.storeConfiguration.plp.sortOptions);
                    storeDefaultConfiguration.forEach((item) => {
                        var itemFound = false;
                        data.items.forEach((item2) => {
                            if(UTILITIES.compare(item.nameOrId,item2.nameOrId)) {
                                if(item.showAscending && UTILITIES.compare(item2.direction,'Ascending')) {
                                    item.ascendingSortRuleId = item2.sortRuleId;
                                    itemFound = true;
                                }
                                else if(item.showDescending && UTILITIES.compare(item2.direction,'Descending')) {
                                    item.descendingSortRuleId = item2.sortRuleId;
                                    itemFound = true;
                                }
                            }
                        });
                        if(itemFound) {
                            if(UTILITIES.compare(item.nameOrId,this.storeConfiguration.plp.defaultSortOption.nameOrId)) {
                                item.isSelected = true;
                                item.isSelectedAscending = UTILITIES.compare(this.storeConfiguration.plp.defaultSortOption.direction, 'Ascending');
                                item.isSelectedDescending = UTILITIES.compare(this.storeConfiguration.plp.defaultSortOption.direction, 'Descending');
                                this.selectedSortRuleId = (item.isSelectedAscending) ? item.ascendingSortRuleId : item.descendingSortRuleId;
                            }
                            item.hasBothAscDesc = (item.ascendingSortRuleId && item.descendingSortRuleId) ? true : false;
                            item.displayName = getLabel(item.customLabel);
                            item.ascendingLabel = getLabel(item.customLabelForAsc);
                            item.descendingLabel = getLabel(item.customLabelForDesc);

                            fullSortOptions.push(item);
                        }
                    });

                    this.sortOptions = fullSortOptions.sort((a,b) => a.sortOrder - b.sortOrder);
                    UTILITIES.log(JSON.stringify(this.sortOptions));
                }
            }
            catch(error) {
                UTILITIES.logException(error);
                throw error;
            }
        }).catch((error) => {
            //console.error(error);
            UTILITIES.logException(error);
            throw error;
        })
    }

    sortOptionSelected(event) {
        try {
            //UTILITIES.log(event.target.dataset.item);
            this.selectedSortRuleId = event.target.dataset.item;

            this.sortOptions.forEach((item) => {
                item.isSelected = false;
                item.isSelectedDescending = false;
                item.isSelectedAscending = false;
            });

            this.sortOptions.forEach((item) => {
                if(UTILITIES.compare(this.selectedSortRuleId, item.ascendingSortRuleId)) {
                    item.isSelected = true;
                    item.isSelectedAscending = true;
                }
                else if(UTILITIES.compare(this.selectedSortRuleId, item.descendingSortRuleId)) {
                    item.isSelected = true;
                    item.isSelectedDescending = true;
                }
            });
            const sortRuleChanged = new CustomEvent('sortchanged');
            this.dispatchEvent(sortRuleChanged);
        }
        catch(error) {
            //console.error(error);
            UTILITIES.logException(error);
            throw error;
        }
        //UTILITIES.log('button clickced', event.target.dataset.item);
    }

    @api
    retrieveSortOption() {
        return this.selectedSortRuleId;
    }
}