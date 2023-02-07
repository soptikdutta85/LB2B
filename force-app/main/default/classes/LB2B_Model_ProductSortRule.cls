public with sharing class LB2B_Model_ProductSortRule {
    
    @AuraEnabled
    public List<LB2B_Model_ProductSortRuleItem> items;
    @AuraEnabled
    public List<LB2B_Model_LogMessage> logMessages {get; set; }

    public LB2B_Model_ProductSortRule(ConnectApi.SortRulesCollection sortRules) {
        this.items = new List<LB2B_Model_ProductSortRuleItem>();

        if(sortRules != null && sortRules.sortRules != null && sortRules.sortRules.size() > 0) {
            for(ConnectApi.SortRule sortRule: sortRules.sortRules) {
                this.items.add(new LB2B_Model_ProductSortRuleItem(sortRule));
            }
        }
        //return null;
    }

    public class LB2B_Model_ProductSortRuleItem {
        @AuraEnabled
        public string nameOrId;
        @AuraEnabled
        public string sortRuleId;
        @AuraEnabled
        public string direction;

        public LB2B_Model_ProductSortRuleItem(ConnectApi.SortRule sortRule) {
            this.nameOrId = sortRule.nameOrId;
            this.sortRuleId = sortRule.sortRuleId;
            //this.direction = sortRule.direction != null ? ConnectApi.​CommerceSearch​.SortRuleDirection.valueOf(sortRule.direction) : '';
            this.direction = sortRule.direction != null ? sortRule.direction.name() : '';
        }

    }
}