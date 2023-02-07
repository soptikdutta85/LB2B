public with sharing class LB2B_Utilities {

    public static string getWebStoreId(string communityId) {
        string webstoreId;
        List<WebstoreNetwork> networkList = [SELECT webstoreId from webstoreNetwork where networkId = :communityId];
        if(!networkList.isEmpty()){
            webstoreId = networkList[0].webstoreId;
        }
        return webstoreId;
    }

    public static string getWebStoreId_Cached(string communityId) {
        string key = communityId + 'WebStoreId'; 
        string cachedValue = LB2B_Utilities_Cache.get(key);
        if(string.isblank(cachedValue)) {
            string webStoreId = getWebStoreId(communityId);
            LB2B_Utilities_Cache.add(key, webStoreId);
            //system.debug('Not Returned from Cache');
            return webStoreId;
        }
        return cachedValue;
    }

    public static string newGuid() {
        Blob b = Crypto.GenerateAESKey(128);
        String h = EncodingUtil.ConvertTohex(b);
        String guid = h.SubString(0,8)+ '-' + h.SubString(8,12) + '-' + h.SubString(12,16) + '-' + h.SubString(16,20) + '-' + h.substring(20);
        return guid;
    }

    public static string generateQuery(string objectName, List<string> fields, Set<Id> ids) {
        string query = generateQuery(objectName, fields);

        string idString = '';
        for(ID id: ids) {
            idString += '\'' + id + '\',';
        }
        idString = idString.removeEndIgnoreCase(',');
        query += ' where ID IN (' + idString + ')';
        if(query.contains('"')) {
            query = query.replace('"', '\'');
        }
        return query;
    }

    public static string generateQuery(string objectName, List<string> fields) {
        string fieldSet = ''; 
        for(string field: fields) {
            fieldSet += field + ', ';
        }
        fieldSet = fieldSet.removeEndIgnoreCase(', ');

        return 'select ' + fieldSet + ' from ' + objectName;
    }

    public static object getObjectProperty(object objectItem, string property) {
        string serializedValue = Json.serialize(objectItem);
        Map<String, Object> untypedInstance = (Map<String, Object>)JSON.deserializeUntyped(serializedValue);
        return untypedInstance.get(property);
    }
}