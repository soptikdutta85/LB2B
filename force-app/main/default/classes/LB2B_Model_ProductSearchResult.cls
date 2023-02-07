public with sharing class LB2B_Model_ProductSearchResult extends LB2B_Model_BaseModel {

    //************************* PROPERTIES ********************************* */

    @AuraEnabled
    public List<LB2B_Model_Product> products { get; set; }

    @AuraEnabled
    public List<LB2B_Model_SearchFacet> searchFacets { get; set; }

    @AuraEnabled
    public integer totalProducts { get; set; }

    @AuraEnabled
    public integer pageSize { get; set; }

    @AuraEnabled
    public string locale {get; set; }
    //public List<string> allMessages;

    @AuraEnabled
    public List<LB2B_Model_LogMessage> logMessages {get; set; }

   //************************* GETTER SETTER PROPERTIES ********************************* */
    public integer productsInCurrentPage {
        get {
            if(this.products != null) {
                return this.products.size();
            }
            return 0;
        }
    }

    public boolean hasMoreProducts {
        get {
            if(this.productsInCurrentPage < this.pageSize) {
                return false;
            }
            return true;
        }
    }
    
    //************************* CONSTRUCTORS ********************************* */
    public LB2B_Model_ProductSearchResult(ConnectApi.ProductSearchResults productSearchResults) {
        this.locale = productSearchResults.locale;
        if(productSearchResults.productsPage != null) {
            this.pageSize = productSearchResults.productsPage.pageSize;
            if(productSearchResults.productsPage.products != null) {
                this.totalProducts = productSearchResults.productsPage.total != null 
                                        ? Integer.valueOf(productSearchResults.productsPage.total) : null;
                this.products = new List<LB2B_Model_Product>();
                for(ConnectApi.ProductSummary productSummary: productSearchResults.productsPage.products) {
                    this.products.add(new LB2B_Model_Product(productSummary));
                }
            }
        }
        if(productSearchResults.facets != null) {
            this.searchFacets = new List<LB2B_Model_SearchFacet>();
            for(ConnectApi.SearchFacet searchFacet: productSearchResults.facets) {
                this.searchFacets.add(new LB2B_Model_SearchFacet(searchFacet));
            }
        }
    }

    //************************* CHILD CLASSES ********************************* */

    
    
}