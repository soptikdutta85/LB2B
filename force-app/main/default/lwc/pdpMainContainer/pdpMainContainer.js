import {LightningElement } from 'lwc';
//import { CurrentPageReference } from 'lightning/navigation';
//import UTILITIES from 'c/utilities';
import * as UTILITIES from 'c/utilities';
import CURRENTCONTEXT from 'c/currentContext';
import communityId from '@salesforce/community/Id';

export default class PdpMainContainer extends LightningElement {
    
    currentUserContext = CURRENTCONTEXT.getContext();
    storeConfiguration = CURRENTCONTEXT.getStoreConfig(this.storeConfigId);

    completeProductResults = [];

    //@track
    //totalProductCount;

    //@track
    //currentProductCount;

    //@track
    //pageSize;
    //get pageSize() {
        //return this.template.querySelector('c-pdp-page-size').retrievePageSize();
    //}

    connectedCallback() {
    }

    renderedCallback() {

        this.template.querySelector('c-pdp-sort-options').getSortRuleIdByName(this.storeConfiguration.plp.defaultSortOption.nameOrId, 
            this.storeConfiguration.plp.defaultSortOption.direction)
        .then((data) => {
            try {
                //console.log('Default sort option', data);
                const requestObject = {
                    communityId: communityId,
                    effectiveAccountId: this.currentUserContext.effectiveAccountId,
                    categoryId: '0ZG19000000004wGAA',
                    searchText: '',
                    includeProductImage: true,
                    includePrice: true,
                    fields: this.storeConfiguration.plp.fields,
                    pickListFields: this.storeConfiguration.plp.pickListFields,
                    subQuery: this.storeConfiguration.plp.subQuery,
                    facetFilters: null,
                    sortRuleId: data,
                    pageSize: this.storeConfiguration.plp.defaultPageSize,
                    pageNumber: 0,
                    isNewPage: false,
                    correlationId: 'correlationId-1234',
                    enableConsoleLogs: true
                }
                this.template.querySelector('c-pdp-product-results').getProducts(requestObject);
            }
            catch(error) {
                UTILITIES.logException(error);
                throw error;
            }
        })
        .catch((error) => {
            UTILITIES.logException(error);
            throw error;
        })
    }

    searchProducts(currentPage, isNewPage, modifiedFacet) {
        try {
            if(modifiedFacet === undefined) {
                modifiedFacet = null;
            }

            let facetFilters = this.template.querySelector('c-pdp-facet-filters').retriveSelectedFacets();
            let pageSize = this.template.querySelector('c-pdp-page-size').retrievePageSize();
            let sortRule = this.template.querySelector('c-pdp-sort-options').retrieveSortOption();
            const requestObject = {
                communityId: communityId,
                effectiveAccountId: this.currentUserContext.effectiveAccountId,
                categoryId: '0ZG19000000004wGAA',
                searchText: '',
                includeProductImage: true,
                includePrice: true,
                fields: this.storeConfiguration.plp.fields,
                pickListFields: this.storeConfiguration.plp.pickListFields,
                subQuery: this.storeConfiguration.plp.subQuery,
                facetFilters: facetFilters,
                //sortRuleId: this.storeConfiguration.plp.defaultSortRuleId,
                sortRuleId: sortRule,
                pageSize: pageSize,
                pageNumber: currentPage,
                isNewPage: isNewPage,
                modifiedFacet: modifiedFacet,
                correlationId: 'correlationId-1234',
                enableConsoleLogs: true
            }
            this.template.querySelector('c-pdp-product-results').getProducts(requestObject);
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    pageSizeChanged() {
        //UTILITIES.log(event.detail.pageSize);
        try {
            //this.pageSize = this.template.querySelector('c-pdp-page-size').retrievePageSize();
            this.searchProducts(0, false);
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    sortOptionChanged() {
        try {
            this.searchProducts(0, false);
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    filterByFacet(event) {
        try {
            //UTILITIES.log('YYY', event.detail);
            this.searchProducts(0, false, event.detail);
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    nextPageSelected(event) {
        let pageNumber = event.detail;
        this.searchProducts(pageNumber, true);
    }

    productResultsUpdated(event) {

        try {
            const productResults = event.detail.products;
            const isNewPage = event.detail.isNewPage;
            const modifiedFacet = event.detail.modifiedFacet;

            if(!isNewPage) {
                this.completeProductResults = [];
            }
            else {
                this.completeProductResults = Array.from(this.completeProductResults);
            }
            if(productResults && productResults.products && productResults.products.length > 0) {
                this.completeProductResults.push(...productResults.products);
                this.template.querySelector('c-pdp-product-count').showProductCount(productResults.totalProducts, 
                                                                                        this.completeProductResults.length);
                this.template.querySelector('c-pdp-product-results').renderProducts(this.completeProductResults);

                let pageSize = this.template.querySelector('c-pdp-page-size').retrievePageSize();
                this.template.querySelector('c-pdp-pagination').renderPagination(productResults.totalProducts, 
                    this.completeProductResults.length, pageSize);
            }
            else {
                this.completeProductResults = [];
                this.template.querySelector('c-pdp-product-count').showProductCount(0, 
                                                                                    this.completeProductResults.length);
                this.template.querySelector('c-pdp-product-results').renderProducts(this.completeProductResults);
            }
            
            if(productResults && productResults.searchFacets && productResults.searchFacets.length > 0) {
                if(event.detail.areFacetsChanged) {
                    this.template.querySelector('c-pdp-facet-filters').renderFacetRecordCountUpdates(productResults.searchFacets, 
                        modifiedFacet);
                } 
                else {
                    this.template.querySelector('c-pdp-facet-filters').renderFacetFilters(productResults.searchFacets);
                }
            }

            //this.totalProductCount = productResults.totalProducts;
            //this.currentProductCount = this.completeProductResults.length;
            //this.pageSize = this.template.querySelector('c-pdp-page-size').retrievePageSize();

        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }
}