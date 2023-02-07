import { api, LightningElement, track } from 'lwc';
import * as UTILITIES from 'c/utilities';
import CURRENTCONTEXT from 'c/currentContext';

export default class PdpFacetFilters extends LightningElement {

    @track
    facetOptions = [];
    storeConfiguration = CURRENTCONTEXT.getStoreConfig(this.storeConfigId);

    /*renderedCallback() {
        //UTILITIES.log('Hello1');
        this.template.querySelectorAll('c-pdp-facet-filter-item').forEach((element) => {
            //UTILITIES.log('Hello56');
            element.disableOptions();
        });
    }*/

    @api
    renderFacetFilters(data) {
        try {
            //Get the Facet Filters that should be rendered from the Store Configuration
            let facetFilters = this.storeConfiguration.plp.facetFilters;

            //Filter the returned facets
            data = data.filter((item) => {
                return facetFilters.includes(item.facetId);
            });

            //Sort the Facets
            let sortedRecords = data.sort((a,b) => {
                if(b.displayRank && a.displayRank) {
                    return a.displayRank - b.displayRank;
                }
                return 0;
            });

            this.facetOptions = sortedRecords;
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    @api
    renderFacetRecordCountUpdates(data, modifiedFacet) {
        try {
            this.facetOptions.forEach((item) => {
                if(item.facetId === modifiedFacet) {
                    return;
                }

                item.searchFacetOptions.forEach((item2) => {
                    let facetOption = data.find((x) => {
                        return x.facetId === item.facetId;
                    });

                    if(facetOption) {
                        let searchFacetOption = facetOption.searchFacetOptions.find((y) => {
                            return y.facetOptionId === item2.facetOptionId;
                        });
                        if(searchFacetOption) {
                            item2.productCount = searchFacetOption.productCount;
                        }
                        else {
                            item2.productCount = 0;
                        }
                    }

                });
            });
            let facetItems  = this.template.querySelectorAll('c-pdp-facet-filter-item');
            let facetItemsArray  = Array.from(facetItems);
            facetItemsArray.forEach((element) => {
                element.setFacetOptions();
            });


        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    @api
    retriveSelectedFacets() {
        try {
            let facetItems  = this.template.querySelectorAll('c-pdp-facet-filter-item');
            let facetItemsArray  = Array.from(facetItems);
            let facetFilters = [];
            facetItemsArray.forEach((element) => {
                facetFilters.push({
                    facetId: element.facetFilterItem.facetId,
                    attributeType: element.facetFilterItem.attributeType,
                    facetType: element.facetFilterItem.facetType,
                    values: element.selectedValues
                });
                //UTILITIES.log('KKK', JSON.stringify(element.selectedValues));
            });
            return facetFilters;
        
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    facetChanged(event) {
        try {
            const customEvent = new CustomEvent('filterbyfacet', {
                detail: event.detail
            });
            this.dispatchEvent(customEvent);
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }

    }
}