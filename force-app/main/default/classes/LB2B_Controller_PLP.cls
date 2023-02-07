public without sharing class LB2B_Controller_PLP {
    
    @AuraEnabled
    public static LB2B_Model_ProductSearchResult getProducts(string communityId, string effectiveAccountId, 
                                                                string categoryId, string searchText, List<object> facetFilters, 
                                                                string sortRuleId, integer pageNumber, integer pageSize, 
                                                                string correlationId, boolean enableConsoleLogs) {
        LB2B_Utilities_Logger logger = new LB2B_Utilities_Logger(correlationId, enableConsoleLogs);                 
        try {

            //logger.log('sortRuleId');
            //logger.log(sortRuleId);

            string webStoreId = LB2B_Utilities.getWebStoreId_Cached(communityId);
            LB2B_ServiceClass_Product productServiceClass = new LB2B_ServiceClass_Product(webStoreId, effectiveAccountId, logger);
            LB2B_Model_ProductSearchResult productResult = productServiceClass.getProducts(categoryId, searchText, facetFilters, 
                                                                                             sortRuleId, pageNumber, pageSize);
            if(enableConsoleLogs) {
                productResult.logMessages = logger.logMessages;
            }
            return productResult;
        } 
        catch (Exception e) {
            LB2B_Model_AuraError auraError = new LB2B_Model_AuraError(e, logger);
            throw new AuraHandledException(auraError.getFullMessage());
        }
    }

    @AuraEnabled
    public static LB2B_Model_Products getProductsWithFields(string communityId, string effectiveAccountId, 
                                                                    List<string> productIds, List<string> fields, 
                                                                    List<string> pickListFields, Map<string, object> subQuery,
                                                                    boolean includeImage,
                                                                    string correlationId, boolean enableConsoleLogs) {
        LB2B_Utilities_Logger logger = new LB2B_Utilities_Logger(correlationId, enableConsoleLogs);                 
        try {
            string webStoreId = LB2B_Utilities.getWebStoreId_Cached(communityId);
            LB2B_ServiceClass_Product productServiceClass = new LB2B_ServiceClass_Product(webStoreId, effectiveAccountId, logger);
            LB2B_Model_Products products = productServiceClass.getProductDetails(productIds, fields, pickListFields, subQuery,
                                                                                    includeImage);
            if(enableConsoleLogs) {
                products.logMessages = logger.logMessages;
            }
            return products;
        } 
        catch (Exception e) {
            LB2B_Model_AuraError auraError = new LB2B_Model_AuraError(e, logger);
            throw new AuraHandledException(auraError.getFullMessage());
        }
    }

    @AuraEnabled
    public static LB2B_Model_Products getProductPrices(string communityId, string effectiveAccountId, 
                                                                    List<string> productIds,
                                                                    string correlationId, boolean enableConsoleLogs) {
        LB2B_Utilities_Logger logger = new LB2B_Utilities_Logger(correlationId, enableConsoleLogs);                 
        try {
            string webStoreId = LB2B_Utilities.getWebStoreId_Cached(communityId);
            LB2B_ServiceClass_Product productServiceClass = new LB2B_ServiceClass_Product(webStoreId, effectiveAccountId, logger);
            LB2B_Model_Products products = productServiceClass.getProductPrices(productIds);
            if(enableConsoleLogs) {
                products.logMessages = logger.logMessages;
            }
            return products;
        } 
        catch (Exception e) {
            LB2B_Model_AuraError auraError = new LB2B_Model_AuraError(e, logger);
            throw new AuraHandledException(auraError.getFullMessage());
        }
    }

    @AuraEnabled
    public static LB2B_Model_ProductSortRule getSortOptions(string communityId, string correlationId, boolean enableConsoleLogs){

        LB2B_Utilities_Logger logger = new LB2B_Utilities_Logger(correlationId, enableConsoleLogs);
        try {
            string webStoreId = LB2B_Utilities.getWebStoreId_Cached(communityId);
            LB2B_ServiceClass_Product productServiceClass = new LB2B_ServiceClass_Product(webStoreId, null, logger);
            LB2B_Model_ProductSortRule productSortRules = productServiceClass.getProductSortRules();
            if(enableConsoleLogs) {
                productSortRules.logMessages = logger.logMessages;
            }
            return productSortRules;
        } 
        catch (Exception e) {
            LB2B_Model_AuraError auraError = new LB2B_Model_AuraError(e, logger);
            throw new AuraHandledException(auraError.getFullMessage());
        }
    }
    
}