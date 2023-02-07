public with sharing class LB2B_DataAccess_Product {
    
    private LB2B_Utilities_Logger logger;

    public LB2B_DataAccess_Product(LB2B_Utilities_Logger logger) {
        this.logger = logger;
    }

    public LB2B_Model_Products getPicklistFields(LB2B_Model_Products products, List<string> pickListFields) {

        Set<Id> productIds = products.getProductIds();

        List<string> pickListFields2 = new List<string>();
        for(string pickListField: pickListFields) {
            pickListFields2.add('toLabel(' + pickListField + ')');
        }

        string queryString = LB2B_Utilities.generateQuery('Product2', pickListFields2, productIds);
        logger.log(queryString);

        List<Product2> product2Records = (List<Product2>)Database.query(queryString);
        logger.log(product2Records);

        return products.addFieldInfo(product2Records, pickListFields);
    }

    public LB2B_Model_Products getSubQueryFields(LB2B_Model_Products products, Map<string, object> subQuery) {

        Set<Id> productIds = products.getProductIds();

        List<string> queryParams = new List<string>();
        for(string subQueryKey: subQuery.keySet()) {
            queryParams.add('(' + subQuery.get(subQueryKey) + ')');
        }

        string queryString = LB2B_Utilities.generateQuery('Product2', queryParams, productIds);
        logger.log(queryString);

        List<Product2> product2Records = (List<Product2>)Database.query(queryString);
        logger.log(product2Records);

        return products.addSubQueryFieldInfo(product2Records, subQuery);//.addFieldInfo(product2Records, pickListFields);
    }

}