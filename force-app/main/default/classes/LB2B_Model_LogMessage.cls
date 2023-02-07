public with sharing class LB2B_Model_LogMessage {
    
    @AuraEnabled
    public string logType { get; set; }

    @AuraEnabled
    public string message { get; set; }

    @AuraEnabled
    public string stackTrace { get; set; }

    @AuraEnabled
    public string lineNumber { get; set; }

    @AuraEnabled
    public string exceptionType { get; set; }

    @AuraEnabled
    public string request { get; set; }

    @AuraEnabled
    public string response { get; set; }

    @AuraEnabled
    public string correlationId { get; set; }

    public LB2B_Model_LogMessage(string message, string correlationId) {
        this.logType = 'Debug';
        this.message = message;
        this.correlationId = correlationId;
    }

    public LB2B_Model_LogMessage(string message, string exceptionType, string stackTrace, string lineNumber, string correlationId) {
        this.logType = 'Exception';
        this.message = message;
        this.exceptionType = exceptionType;
        this.stackTrace = stackTrace;
        this.lineNumber = lineNumber;
        this.correlationId = correlationId;
    }

    public LB2B_Model_LogMessage(string message, object request, object response, string correlationId) {
        this.logType = 'API';
        this.message = message;
        this.correlationId = correlationId;

        try {
            this.request = '###' + JSON.serialize(request) + '###';
        }
        catch(System.JSONException ex) {
            this.request = 'Request Object could not be serialized';
        }

        try {
            this.response = '###' + JSON.serialize(response) + '###';
        }
        catch(System.JSONException ex) {
            this.request = 'Resonse Object could not be serialized';
        }
    }
}