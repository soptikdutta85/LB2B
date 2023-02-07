/*
LB2B_ConnectAPI_Product product = new LB2B_ConnectAPI_Product('0ZE190000008OK6GAM', '0011900001Ef4KZAAZ', 'CorrelationId-3');
System.debug(product.getProducts('0ZG19000000004wGAA', '', null, null, 0, 2));
*/
public with sharing class LB2B_ConnectAPI_Product {
    
    private string webStoreId;
    private string effectiveAccountId;
    private LB2B_Utilities_Logger logger;

    public LB2B_ConnectAPI_Product(string webStoreId, string effectiveAccountId, LB2B_Utilities_Logger logger) {
        this.webStoreId = webStoreId;
        this.effectiveAccountId = effectiveAccountId;
        this.logger = logger;
    }

    public LB2B_Model_ProductSearchResult getProducts(string categoryId, string searchTerm, 
                                                     List<LB2B_Model_SearchFacet> facetFilters, 
                                                    string sortRuleId, integer pageNumber, integer pageSize) {
        List<ConnectApi.DistinctValueRefinementInput> refinementInputs = null;

        if(facetFilters != null) {
            refinementInputs = new List<ConnectApi.DistinctValueRefinementInput>();
            for(LB2B_Model_SearchFacet facetFilter: facetFilters) {
                ConnectApi.DistinctValueRefinementInput searchRefinement = new ConnectApi.DistinctValueRefinementInput();

                if(facetFilter.attributeType.equalsIgnoreCase('custom')) {
                    searchRefinement.attributeType = ConnectApi.CommerceSearchAttributeType.Custom;
                }

                if(facetFilter.facetType.equalsIgnoreCase('distinctvalue')) {
                    searchRefinement.type = ConnectApi.CommerceSearchFacetType.DistinctValue;
                }
                searchRefinement.nameOrId = facetFilter.facetId;

                List<string> values = null;
                if(facetFilter.searchFacetOptions != null) {
                    values = new List<string>();
                    for(LB2B_Model_SearchFacet.LB2B_Model_SearchFacetOption searchFacetOption: facetFilter.searchFacetOptions) {
                        values.add(searchFacetOption.facetOptionId);
                    }
                }
                searchRefinement.values = values;

                refinementInputs.add(searchRefinement);
            }
        }
        return getProducts(categoryId, searchTerm, refinementInputs, false, false, null, sortRuleId, null, pageNumber, pageSize);
    }

    
    private LB2B_Model_ProductSearchResult getProducts(string categoryId, string searchTerm, 
                                                       	List<ConnectApi.DistinctValueRefinementInput> facetFilters, 
                                                    	boolean includePrices, 
                                                       	boolean includeQuantityRule, List<string> fields, 
                                                       	string sortRuleId, 
                                                    	ConnectApi.ProductSearchGroupingInput grouping,
                                                       	integer pageNumber, integer pageSize) {
        ConnectApi.ProductSearchInput searchInput= new ConnectApi.ProductSearchInput();
        searchInput.categoryId = String.isblank(categoryId) ? null : categoryId;
        searchInput.searchTerm = String.isblank(searchTerm) ? null : searchTerm;
        searchInput.sortRuleId = String.isblank(sortRuleId) ? null : sortRuleId;
        searchInput.refinements = (facetFilters == null) ? null : facetFilters;
        searchInput.fields = (fields == null) ? new List<string> { 'ID' } : fields;
        searchInput.grouping = (grouping == null) ? null : grouping;
        searchInput.includePrices = includePrices;
        searchInput.includeQuantityRule = includeQuantityRule;
        searchInput.page = pageNumber;
        searchInput.pageSize = pageSize;

        ConnectApi.ProductSearchResults results = ConnectApi.CommerceSearch.searchProducts(this.webStoreId, this.effectiveAccountId, searchInput);
                                                            ConnectApi.ProductSummaryPage page=results.productsPage;
                                                            List<ConnectApi.ProductSummary> products=page.products;
                                                            system.debug(products.size());
        logger.logConnectApi('ConnectApi.CommerceSearch.searchProducts', 
                            new Map<string, object> {
                                 'webStoreId' => this.webStoreId, 
                                 'effectiveAccountId' => this.effectiveAccountId,
                                 'searchInput.categoryId' => searchInput.categoryId,
                                 'searchInput.searchTerm' => searchInput.searchTerm,
                                 'searchInput.sortRuleId' => searchInput.sortRuleId,
                                 'searchInput.refinements' => searchInput.refinements,
                                 'searchInput.fields' => searchInput.fields,
                                 'searchInput.grouping' => searchInput.grouping,
                                 'searchInput.includePrices' => searchInput.includePrices,
                                 'searchInput.includeQuantityRule' => searchInput.includeQuantityRule,
                                 'searchInput.page' => searchInput.page,
                                 'searchInput.pageSize' => searchInput.pageSize
                                },
                            results);
        return new LB2B_Model_ProductSearchResult(results);
    }

    public LB2B_Model_ProductSortRule getSortRules() {
        ConnectApi.SortRulesCollection results = ConnectApi.CommerceSearch.getSortRules(this.webstoreId);
        
        logger.logConnectApi('ConnectApi.CommerceSearch.getSortRules',
                                        new Map<string, object> { 
                                            'webStoreId' => this.webStoreId, 
                                            'effectiveAccountId' => this.effectiveAccountId },
                                        results);
        
        return new LB2B_Model_ProductSortRule(results);
    }

    public LB2B_Model_ProductSortRule getSortRules_Cached() {
        string key = this.webStoreId + 'SortRules';
        string cachedValue = LB2B_Utilities_Cache.get(key);
        if(string.isblank(cachedValue)) {
            //LB2B_ConnectAPI_Product productsConnectApi = new LB2B_ConnectAPI_Product(this.webStoreId, this.effectiveAccountId);
            LB2B_Model_ProductSortRule sortRules = getSortRules();
            LB2B_Utilities_Cache.add(key, JSON.serialize(sortRules));
            //system.debug('Not Returned from Cache');
            return sortRules;
        }
        //system.debug('Returned from Cache');
        Type resultType = Type.forName('LB2B_Model_ProductSortRule');
        LB2B_Model_ProductSortRule deserializeResults = (LB2B_Model_ProductSortRule)JSON.deserialize(cachedValue, resultType);
        return deserializeResults;
    }

    public LB2B_Model_Products getProductDetails(List<string> productIds, List<string> fields, boolean includeImage) {
        ConnectApi.ProductOverviewCollection products = ConnectApi.CommerceCatalog.getProducts(this.webStoreId, this.effectiveAccountId, productIds, null, fields, !includeImage, true);
        logger.logConnectApi('ConnectApi.CommerceCatalog.getProducts', 
                            new Map<string, object> {
                                 'webStoreId' => this.webStoreId, 
                                 'effectiveAccountId' => this.effectiveAccountId,
                                 'ids' => productIds,
                                 'skus' => null,
                                 'fields' => fields,
                                 'excludeMedia' => !includeImage,
                                 'excludePrices' => true
                                },
                            products);
        return new LB2B_Model_Products(products);
    }

    public LB2B_Model_Products getProductPrices(List<string> productIds) {

        ConnectApi.PricingInput pricingInput = new ConnectApi.PricingInput();
        pricingInput.pricingLineItems = new List<ConnectApi.PricingLineItemInput>();
        //pricingInput.pricingLineItems = new List<ConnectApi.​PricingLineItemInput>();
        for(string productId: productIds) {
            ConnectApi.PricingLineItemInput pricingLineItemInput = new ConnectApi.PricingLineItemInput();
            pricingLineItemInput.productId = productId;
            pricingInput.pricingLineItems.add(pricingLineItemInput);
        }

        ConnectApi.PricingResult productPrices = ConnectApi.CommerceStorePricing.getProductPrices(this.webStoreId, this.effectiveAccountId, pricingInput);
        //system.debug(productPrices);
        logger.logConnectApi('ConnectApi.CommerceStorePricing.getProductPrices', 
                            new Map<string, object> {
                                 'webStoreId' => this.webStoreId, 
                                 'effectiveAccountId' => this.effectiveAccountId,
                                 'pricingLineItems' => productIds
                                },
                            productPrices);
        return new LB2B_Model_Products(productPrices);
    }
}