public with sharing class LB2B_Model_AuraError {

    public string message { get; set; }
    public string stackTrace { get; set; }
    public string lineNumber { get; set; }
    public string exceptionType { get; set; }
    public List<LB2B_Model_LogMessage> logMessages { get; set; }


    public string getFullMessage() {
        return JSON.serialize(this);
    }

    public LB2B_Model_AuraError(Exception ex, LB2B_Utilities_Logger logger) {
        this.message = ex.getMessage();
        this.exceptionType = ex.getTypeName();
        this.lineNumber = ex.getLineNumber() != null ? String.valueOf(ex.getLineNumber()) : ' ';
        this.stackTrace = ex.getStackTraceString();
        if(logger != null && logger.logMessages != null) {
            this.logMessages = logger.logMessages;
        }
    }
}