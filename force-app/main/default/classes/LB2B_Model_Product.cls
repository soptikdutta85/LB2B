public with sharing class LB2B_Model_Product {

    @AuraEnabled
    public string productId;

    @AuraEnabled
    public string productSku;

    @AuraEnabled
    public string productName;

    @AuraEnabled
    public Map<string,string> productFields;

    @AuraEnabled
    public Map<string, List<SObject>> productSubQueryFields;

    //@AuraEnabled
    //public Map<string, object> parentFields;

    @AuraEnabled
    public decimal listPrice;

    @AuraEnabled
    public decimal unitPrice;

    @AuraEnabled
    public string currencyIsoCode;


    @AuraEnabled
    public List<LB2B_Model_ProductImage> images;

    public LB2B_Model_Product(ConnectApi.ProductSummary productSummary) {
        this.productId = productSummary.id;
        this.productName = productSummary.name;
    }

    public LB2B_Model_Product(ConnectApi.ProductOverview productSummary) {
        this.productId = productSummary.id;
        this.productSku = productSummary.sku;
        if(productSummary.fields != null) {
            this.productName = productSummary.fields.containsKey('Name') ? productSummary.fields.get('Name') : '';
            this.productFields = new Map<string, string>();
            for(string key: productSummary.fields.keySet()) {
                this.productFields.put(key, productSummary.fields.get(key));
            }
        }
        if(productSummary.defaultImage != null) {
            this.images = new List<LB2B_Model_ProductImage>();
            this.images.add(new LB2B_Model_ProductImage(productSummary.defaultImage));
        }
    }

    public LB2B_Model_Product(ConnectApi.PricingResultLineItem productPrice, string currencyIsoCode) {
        this.productId = productPrice.productId;
        this.unitPrice = productPrice.unitPrice != null ? decimal.valueOf(productPrice.unitPrice) : null;
        this.listPrice = productPrice.listPrice != null ? decimal.valueOf(productPrice.listPrice) : null;
        this.currencyIsoCode = currencyIsoCode;
    }

    public class LB2B_Model_ProductImage {

        @AuraEnabled
        public string imageType { get; set; }

        @AuraEnabled
        public string imageUrl { get; set; }

        @AuraEnabled
        public integer sortOrder { get; set; }

        public LB2B_Model_ProductImage(ConnectApi.ProductMedia productImage) {
            this.imageType = productImage.mediaType != null ? string.valueOf(productImage.mediaType) : '';
            this.sortOrder = productImage.sortOrder;
            this.imageUrl = productImage.url;
        }

    }
}