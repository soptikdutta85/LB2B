public with sharing class LB2B_Model_Products {
    
    @AuraEnabled
    public List<LB2B_Model_Product> products { get; set; }

    @AuraEnabled
    public List<LB2B_Model_LogMessage> logMessages { get; set; }

    public LB2B_Model_Products(ConnectApi.ProductOverviewCollection productResults) {
        if(productResults.products != null) {
            this.products = new List<LB2B_Model_Product>();
            for(ConnectApi.ProductOverview product: productResults.products) {
                this.products.add(new LB2B_Model_Product(product));
            }
        }
    }

    public LB2B_Model_Products(ConnectApi.PricingResult pricingResults) {
        if(pricingResults.pricingLineItemResults != null) {
            this.products = new List<LB2B_Model_Product>();
            for(ConnectApi.PricingResultLineItem product: pricingResults.pricingLineItemResults) {
                this.products.add(new LB2B_Model_Product(product, pricingResults.currencyIsoCode));
            }
        }
    }

    public Set<Id> getProductIds() {
        Set<Id> productIds = new Set<Id>();

        if(this.products != null) {
            for(LB2B_Model_Product product: this.products) {
                productIds.add(product.productId);
            }
        }
        return productIds;
    }

    public LB2B_Model_Products addFieldInfo(List<Product2> product2Records, List<string> fields) {
        if(product2Records != null) {
            for(Product2 product2Record: product2Records) {
                LB2B_Model_Product product = findProduct(product2Record.Id);
                if(product != null) {
                    if(product.productFields == null) {
                        product.productFields = new Map<string, string>();
                    }

                    for(string field: fields) {
                        object fieldValue = product2Record.get(field);
                        product.productFields.put(field, fieldValue != null ? String.valueOf(fieldValue) : '');
                    }
                }
            }
        }
        return this;
    }

    public LB2B_Model_Products addSubQueryFieldInfo(List<Product2> product2Records, Map<string, object> subQuery) {
        if(product2Records != null) {
            for(Product2 product2Record: product2Records) {
                LB2B_Model_Product product = findProduct(product2Record.Id);
                if(product != null) {
                    product.productSubQueryFields = new Map<string, List<SObject>>();

                    for(string subQueryObject: subQuery.keySet()) {
                        List<SObject> subQueryRecords = new List<SObject>();
                        if(product2Record.getSObjects(subQueryObject) != null) {
                            for(SObject child: product2Record.getSObjects(subQueryObject)) {
                                subQueryRecords.add(child);
                            }
                        }
                        product.productSubQueryFields.put(subQueryObject, subQueryRecords);
                    }
                }
            }
        }
        return this;
    }

    private LB2B_Model_Product findProduct(string id) {
        for(LB2B_Model_Product product: this.products) {
            if(product.productId.equalsIgnoreCase(id)) {
                return product;
            }
        }
        return null;
    }

}