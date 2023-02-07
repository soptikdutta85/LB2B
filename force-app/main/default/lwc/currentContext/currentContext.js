import * as UTILITIES from 'c/utilities';

export default class {
    
    static getContext() {
        //let effectiveAccountId = UTILITIES.getUrlParam('effectiveAccountId');
        return {
            effectiveAccountId : '0011900001Ef4KZAAZ',
            currentUserId : '',
            webStoreId : '',
            activeCartId : '',
            currentUserLocale : 'en-US'
        }
    }

    static getStoreConfig(configurationId) {
        return {
            plp: {
                defaultImageUrl: '/img/b2b/default-product-image.svg',
                defaultSortRuleId: '0qU190000008OJnEAM',
                fields: ["Name", "StockKeepingUnit", "CreatedBy.Name"],
                pickListFields: ["Product_Type__c", "IP_Product_Variant__c"],
                subQuery: { Assets: 'Select Id, Name from Assets Limit 3' },
                facetFilters: ['Tier__c','IP_Product_Variant__c'],
                //facetFilters: ['Tier__c'],
                pageSizeOptions: [2, 5, 10, 25],
                defaultPageSize: 5,
                sortOptions: [
                    {
                        nameOrId: 'Name',
                        showAscending: true,
                        showDescending: true,
                        sortOrder: 2,
                        customLabel: 'LB2B_PLP_SortFieldName',
                        customLabelForAsc: 'LB2B_PLP_SortDirectionCharAtoZ',
                        customLabelForDesc: 'LB2B_PLP_SortDirectionCharZtoA'
                    },
                    {
                        nameOrId: 'StockKeepingUnit',
                        showAscending: true,
                        showDescending: true,
                        sortOrder: 1,
                        customLabel: 'LB2B_PLP_SortFieldSku',
                        customLabelForAsc: 'LB2B_PLP_SortDirectionCharAtoZ',
                        customLabelForDesc: 'LB2B_PLP_SortDirectionCharZtoA'
                    },
                    {
                        nameOrId: 'Price',
                        showAscending: true,
                        showDescending: true,
                        sortOrder: 0,
                        customLabel: 'LB2B_PLP_SortFieldPrice',
                        customLabelForAsc: 'LB2B_PLP_SortDirectionPriceAsc',
                        customLabelForDesc: 'LB2B_PLP_SortDirectionPriceDesc'
                    },
                    {
                        nameOrId: 'ip_Display_Order__c',
                        showAscending: true,
                        showDescending: false,
                        sortOrder: 5,
                        customLabel: 'LB2B_PLP_SortFieldSequence',
                        customLabelForAsc: '',
                        customLabelForDesc: ''
                    }
                ],
                defaultSortOption: { 
                    nameOrId: 'Name',
                    direction: 'Descending'
                    //direction: 'Ascending'
                }
            }
        }
    }
}