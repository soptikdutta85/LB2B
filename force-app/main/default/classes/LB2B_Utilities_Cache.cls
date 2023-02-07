public with sharing class LB2B_Utilities_Cache {
    private static string PartitionKey = 'LB2B';

    public static string get(string key) {
        Cache.OrgPartition orgPart = Cache.Org.getPartition('local.' + PartitionKey);
        if (orgPart.contains(key)) {
            //return JSON.des
            return (string)orgPart.get(key);
        }
        //Type resultType = Type.forName('ConnectApi.SortRulesCollection');
        return null;
    }

    public static void add(string key, string value) {
        Cache.OrgPartition orgPart = Cache.Org.getPartition('local.' + PartitionKey);
        orgPart.put(key, value);
    }
}