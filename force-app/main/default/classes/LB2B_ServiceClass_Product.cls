public with sharing class LB2B_ServiceClass_Product {
    
    private string webStoreId;
    private string effectiveAccountId;
    private LB2B_Utilities_Logger logger;
    
    public LB2B_ServiceClass_Product(string webStoreId, string effectiveAccountId, LB2B_Utilities_Logger logger) {
        this.logger = logger;
        this.webStoreId = webStoreId;
        this.effectiveAccountId = effectiveAccountId;
    }

    public LB2B_Model_ProductSearchResult getProducts(string categoryId, string searchText, List<object> facetFilters, 
                                                        string sortRuleId, integer pageNumber, integer pageSize) {
        LB2B_ConnectAPI_Product product = new LB2B_ConnectAPI_Product(this.webStoreId, this.effectiveAccountId, this.logger);

        List<LB2B_Model_SearchFacet> facetFiltersTypeValues = new List<LB2B_Model_SearchFacet>();

        if(facetFilters != null) {
            for(object facetFilter: facetFilters) {
                facetFiltersTypeValues.add(new LB2B_Model_SearchFacet(facetFilter));
            }
        }

        return product.getProducts(categoryId, searchText, facetFiltersTypeValues, sortRuleId, pageNumber, pageSize);
    }

    public LB2B_Model_Products getProductDetails(List<string> productIds, List<string> fields, List<string> pickListFields, 
                                                    Map<string, object> subQuery, boolean includeImage) {
        LB2B_ConnectAPI_Product product = new LB2B_ConnectAPI_Product(this.webStoreId, this.effectiveAccountId, this.logger);
        LB2B_Model_Products productRecords = product.getProductDetails(productIds, fields, includeImage);

        if(productRecords.products != null && pickListFields != null && pickListFields.size() > 0) {
            LB2B_DataAccess_Product productData = new LB2B_DataAccess_Product(this.logger);
            productRecords =  productData.getPicklistFields(productRecords, pickListFields);
        }
        if(productRecords.products != null && subQuery != null && subQuery.size() > 0) {
            LB2B_DataAccess_Product productData = new LB2B_DataAccess_Product(this.logger);
            productRecords =  productData.getSubQueryFields(productRecords, subQuery);
        }

        return productRecords;
    }

    public LB2B_Model_Products getProductPrices(List<string> productIds) {
        LB2B_ConnectAPI_Product product = new LB2B_ConnectAPI_Product(this.webStoreId, this.effectiveAccountId, this.logger);
        return product.getProductPrices(productIds);
    }

    public LB2B_Model_ProductSortRule getProductSortRules() {
        LB2B_ConnectAPI_Product product = new LB2B_ConnectAPI_Product(this.webStoreId, this.effectiveAccountId, this.logger);
        return product.getSortRules();
    }

}