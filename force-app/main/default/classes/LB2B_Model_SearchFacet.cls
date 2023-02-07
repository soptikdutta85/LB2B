public with sharing class LB2B_Model_SearchFacet {
    
    @AuraEnabled
    public string facetDisplayName;

    @AuraEnabled
    public string facetId;

    @AuraEnabled
    public integer displayRank;

    @AuraEnabled
    public string attributeType;

    @AuraEnabled
    public string facetType;

    @AuraEnabled
    public List<LB2B_Model_SearchFacetOption> searchFacetOptions;

    public LB2B_Model_SearchFacet(ConnectApi.SearchFacet searchFacet) {
        this.facetDisplayName = searchFacet.displayName;
        this.displayRank = searchFacet.displayRank;
        this.facetId = searchFacet.nameOrId;
        this.facetType = String.valueOf(searchFacet.facetType);
        this.attributeType = String.valueOf(searchFacet.attributeType);

        ConnectApi.DistinctValueSearchFacet searchFacetValues = (ConnectApi.DistinctValueSearchFacet)searchFacet;
        if(searchFacetValues.values != null) {
            this.searchFacetOptions = new List<LB2B_Model_SearchFacetOption>();
            for(ConnectApi.DistinctFacetValue searchFacetValue: searchFacetValues.values) {
                this.searchFacetOptions.add(new LB2B_Model_SearchFacetOption(searchFacetValue));
            }
        }
    }

    public LB2B_Model_SearchFacet(object requestObject) {
        object facetId = LB2B_Utilities.getObjectProperty(requestObject, 'facetId');
        object attributeType = LB2B_Utilities.getObjectProperty(requestObject, 'attributeType');
        object facetType = LB2B_Utilities.getObjectProperty(requestObject, 'facetType');
        List<object> values = (List<object>)LB2B_Utilities.getObjectProperty(requestObject, 'values');
        
        if(facetId != null) {
            this.facetId = String.valueOf(facetId);
        }

        if(attributeType != null) {
            this.attributeType = String.valueOf(attributeType);
        }

        if(facetType != null) {
            this.facetType = String.valueOf(facetType);
        }

        if(values != null) {
            this.searchFacetOptions = new List<LB2B_Model_SearchFacetOption>();
            for(object value: values) {
                LB2B_Model_SearchFacetOption searchFacetOption = new LB2B_Model_SearchFacetOption(value);
                this.searchFacetOptions.add(searchFacetOption);
            }
        }
    }

    public class LB2B_Model_SearchFacetOption {

        @AuraEnabled
        public string facetOptionDisplayName;

        @AuraEnabled
        public string facetOptionId;

        @AuraEnabled
        public integer productCount;

        public LB2B_Model_SearchFacetOption(ConnectApi.DistinctFacetValue facetOption) {
            this.facetOptionDisplayName = facetOption.displayName;
            this.facetOptionId = facetOption.nameOrId;
            this.productCount = Integer.valueOf(facetOption.productCount);
        }

        public LB2B_Model_SearchFacetOption(object facetOption) {
            this.facetOptionId = String.valueOf(facetOption);
        }
    }
}