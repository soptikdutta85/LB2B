public with sharing class LB2B_Utilities_Logger {

    public List<LB2B_Model_LogMessage> logMessages;
    public string correlationId;
    public boolean enableConsoleLogs;
    public boolean enableSObjectLogs;

    /********************************* Constructor **************************************** */

    public LB2B_Utilities_Logger(string correlationId, boolean enableConsoleLogs) {
        this.logMessages = new List<LB2B_Model_LogMessage>();
        this.correlationId = correlationId;
        this.enableConsoleLogs = enableConsoleLogs;
        this.enableSObjectLogs = false;
    }

    public LB2B_Utilities_Logger() {
        this.logMessages = new List<LB2B_Model_LogMessage>();
        this.correlationId = LB2B_Utilities.newGuid();
        this.enableConsoleLogs = false;
        this.enableSObjectLogs = false;
    }

    /********************************* Log Methods **************************************** */
    
    public void log(object logObject) {
        string fullMessage = '';
        
        try {
            JSON.serialize(logObject);
        }
        catch(System.JSONException error) {
            fullMessage = 'SERIALISATION ERROR IN LOGGING OBJECT';
        }
        system.debug(logObject);
        if(this.enableConsoleLogs) {
            this.logMessages.add(new LB2B_Model_LogMessage(fullMessage, this.correlationId));
        }
        if(this.enableSObjectLogs) {
            //publish event
        }
    }

    public void log(string logMessage) {
        string fullMessage = logMessage;
        system.debug(fullMessage);
        if(this.enableConsoleLogs) {
            this.logMessages.add(new LB2B_Model_LogMessage(fullMessage, this.correlationId));
        }
        if(this.enableSObjectLogs) {
            //publish event
        }
    }

    public void logException(Exception ex) {
        if(this.enableConsoleLogs) {
            this.logMessages.add(new LB2B_Model_LogMessage(ex.getMessage(), ex.getTypeName(), ex.getStackTraceString(),
                                                            ex.getLineNumber() != null ? String.valueOf(ex.getLineNumber()) : ' ', 
                                                            this.correlationId));
        }
        if(this.enableSObjectLogs) {
            //publish event
        }
    }

    public void logAPI(HttpRequest request, HttpResponse response) {

    }

    public void logConnectAPI(string name, Map<string, object> requestObject, object responseObject) {

        if(this.enableConsoleLogs) {
            this.logMessages.add(new LB2B_Model_LogMessage(name, requestObject, responseObject, this.correlationId));
            system.debug(this.logMessages);
        }
        if(this.enableSObjectLogs) {
            //publish event
        }
    }

    /********************************* Private Methods **************************************** */

    private static string validatedString(string value, integer stringLength) {
        if(string.isblank(value)) {
            return '';
        }

        if(value.length() > stringLength) {
            return value.subString(0, stringLength);
        }
        return value;
    }

    static final Set<string> requestBodyKeys = new Set<string> { 'Content-Type' };
    private static string getRequestHeaderString(HttpRequest request) {
        string requestHeaderString = '';
        for(string requestBodyKey: requestBodyKeys) {
            if(request.getHeader(requestBodyKey) != null && !string.isBlank(request.getHeader(requestBodyKey))) {
                requestHeaderString += requestBodyKey + '=' + request.getHeader(requestBodyKey) + ';#';
            }
        }
        return requestHeaderString;
    }

    private static string getResponseHeaderString(HttpResponse response) {
        string responseHeaderString = '';
        for(string responseBodyKey: response.getHeaderKeys()) {
            if(response.getHeader(responseBodyKey) != null && !string.isBlank(response.getHeader(responseBodyKey))) {
                responseHeaderString += responseBodyKey + '=' + response.getHeader(responseBodyKey) + ';#';
            }
        }
        return responseHeaderString;
    }


}