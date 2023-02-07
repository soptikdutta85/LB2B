import { LightningElement, api, track } from 'lwc';
import * as UTILITIES from 'c/utilities';
import CURRENTCONTEXT from 'c/currentContext';
import getProducts from "@salesforce/apex/LB2B_Controller_PLP.getProducts";
import getProductsWithFields from "@salesforce/apex/LB2B_Controller_PLP.getProductsWithFields";
import getProductPrices from "@salesforce/apex/LB2B_Controller_PLP.getProductPrices";
//import getProductsWithPrices from "@salesforce/apex/LB2B_Controller_PLP.getProductsWithPrices";

export default class PdpProductResults extends LightningElement {
    @api
    storeConfigId;

    @track
    productResults = [];
    fullSearchResultSet = {}; 

    connectedCallback() {
    }

    @api
    renderProducts(productResults) {
        try {
            this.productResults = productResults;
            UTILITIES.log('this.productResults', JSON.stringify(this.productResults));
        }
        catch(error) {
            UTILITIES.logException(error);
            throw error;
        }
    }

    @api
    getProducts({communityId, effectiveAccountId, categoryId, searchText, 
                includeProductImage, includePrice, fields, pickListFields, subQuery,
                facetFilters, sortRuleId, 
                pageSize, pageNumber, isNewPage, modifiedFacet, correlationId, 
                enableConsoleLogs}) {
        //UTILITIES.log('communityId', communityId);
        this.fullSearchResultSet = {};

        getProducts({ communityId: communityId, effectiveAccountId: effectiveAccountId, 
                        categoryId: categoryId, searchText: searchText, facetFilters: facetFilters, 
                        sortRuleId: sortRuleId, pageSize: pageSize, pageNumber: pageNumber,
                        correlationId: correlationId, enableConsoleLogs: enableConsoleLogs })
        .then((data) => {

            try {
                if(enableConsoleLogs && data.logMessages) {
                    UTILITIES.logApexMessage(data.logMessages);
                }
                if(data.products && data.products.length > 0) {
                    this.fullSearchResultSet = data;
                    UTILITIES.log('STEP:1', JSON.stringify(this.fullSearchResultSet.products));

                    let productIds = this.fullSearchResultSet.products.map((item) => {
                        return item.productId;
                    });

                    //UTILITIES.log('before prod attrib', JSON.stringify(productIds));
                    //console.log(subQuery);
                    return getProductsWithFields({communityId: communityId, effectiveAccountId: effectiveAccountId,
                                                    productIds: productIds, fields: fields,
                                                    pickListFields: pickListFields, subQuery: subQuery,
                                                    includeImage: includeProductImage,
                                                    correlationId: correlationId, enableConsoleLogs: enableConsoleLogs});
                }
                else {
                    return [];
                }
            }
            catch(error) {
                UTILITIES.logException(error);
                throw error;
            }
        })
        .then((data) => {

            try {
                if(enableConsoleLogs && data.logMessages) {
                    UTILITIES.logApexMessage(data.logMessages);
                }
                //UTILITIES.log('after prod attrib', JSON.stringify(this.fullSearchResultSet.products));
                UTILITIES.log('STEP:2', JSON.stringify(data.products));
                if(data.products && data.products.length > 0) {
                    //this.fullSearchResultSet.products = data.products;
                    let updatedFullSearchResultSet = [];
                    for(let productResult of this.fullSearchResultSet.products) {
                        //UTILITIES.log('1');
                        let productResult2 = data.products.find((x) => {
                            return x.productId === productResult.productId;
                        });
                        //UTILITIES.log('2');
                        updatedFullSearchResultSet.push(productResult2);
                    }
                    this.fullSearchResultSet.products = updatedFullSearchResultSet;
                    UTILITIES.log('STEP:2.5', JSON.stringify(this.fullSearchResultSet.products));

                    if(!includePrice) {
                        return data;
                    }

                    let productIds = this.fullSearchResultSet.products.map((item) => {
                        return item.productId;
                    });
                    //UTILITIES.log('after prod attrib', JSON.stringify(data.products));
                    //UTILITIES.log('after prod attrib2', JSON.stringify(this.fullSearchResultSet.products));
                    return getProductPrices({communityId: communityId, effectiveAccountId: effectiveAccountId,
                                            productIds: productIds,
                                            correlationId: correlationId, enableConsoleLogs: enableConsoleLogs});
                }
                else {
                    return [];
                }
            }
            catch(error) {
                UTILITIES.logException(error);
                throw error;
            }
        })
        .then((priceData) => {

            try {
                if(enableConsoleLogs && priceData.logMessages) {
                    UTILITIES.logApexMessage(priceData.logMessages);
                }
                UTILITIES.log(priceData.products);

                if(priceData.products && priceData.products.length > 0) {
                    for(let productResult of this.fullSearchResultSet.products) {
                        //UTILITIES.log('3');
                        let element = priceData.products.find(x => productResult.productId.startsWith(x.productId));
                        //UTILITIES.log('4');
                        productResult.unitPrice = element.unitPrice;
                        productResult.listPrice = element.listPrice;
                        productResult.currencyIsoCode = element.currencyIsoCode;
                    }
                }
                UTILITIES.log('STEP:3', JSON.stringify(this.fullSearchResultSet.products));
                //this.productResults = this.fullSearchResultSet.products;
                //UTILITIES.log('this.fullSearchResultSet', this.fullSearchResultSet);

                const event = new CustomEvent('productresultsupdated', {
                    detail: {
                        products: this.fullSearchResultSet,
                        areFacetsChanged: (facetFilters && facetFilters !== null),
                        isNewPage: isNewPage,
                        modifiedFacet: modifiedFacet
                    } 
                });
                this.dispatchEvent(event);
            }
            catch(error) {
                UTILITIES.logException(error);
                throw error;
            }
        })
        .catch((error) => {
            UTILITIES.logApexError(error);
        });
        
    }



}