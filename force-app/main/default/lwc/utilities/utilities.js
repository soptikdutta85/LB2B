export function getUrlParam(param) {
    return new URL(window.location.href).searchParams.get(param);
}

export function format(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
}

export function getFormattedPrice(value, currencyIsoCode, localeCode) {
    return value.toLocaleString(localeCode, {
        style: 'currency',
        currency: currencyIsoCode
    });
}

export function log(...args) {
    console.log(...args);
}

export function logError(...args) {
    console.error(...args);
}

export function logException(error) {
    console.error(`Name: ${error.name} Message: ${error.message}`);
    if(error.stack) {
        console.error(error.stack);
    }
}

function writeMessage(message) {
    let cleansedMessage = JSON.stringify(message);
    cleansedMessage = cleansedMessage.replace(/\\"/g, '"');
    cleansedMessage = cleansedMessage.replace(/"###/g, '');
    cleansedMessage = cleansedMessage.replace(/###"/g, '');
    //cleansedMessage = cleansedMessage.replace(/###/g, '');

    //console.log('after', cleansedMessage);
    if(message.logType === 'Debug') {
        if(isJsonString(cleansedMessage)) {
            log(`${message.logType}[${message.correlationId}] ==> ${JSON.parse(cleansedMessage).message}`);
        }
        else {
            log(`${message.logType}[${message.correlationId}] ==> ${cleansedMessage}`);
        }
    }
    else if(message.logType === 'API') {
        log(`${message.logType}[${message.correlationId}] ==> ${cleansedMessage}`);
    }
    else if(message.logType === 'Error' || message.logType === 'Exception') {
        logError(`${message.logType}[${message.correlationId}] ==> ${cleansedMessage}`);
    }
}

export function logApexMessage(response) {
    if(response && response.length > 0) {
        console.group();
        for(let message of response) {
            writeMessage(message);
        }
        console.groupEnd();
    }
    //log(message);
}

export function logApexError(error) {
    if(error && error.body && error.body.message) {
        let errorMessage = error.body.message.replace(/\n/g, '\\n');
        if(isJsonString(errorMessage)){
            let errorObj = JSON.parse(errorMessage);
            if(errorObj.logMessages && errorObj.logMessages.length > 0) {
                console.group();
                for(let message of errorObj.logMessages) {
                    writeMessage(message);
                }
                console.groupEnd();
            }
        }
        else {
            console.log('not a json string');
        }
    }
    logError(error);
}

export function logApexError2(error) {
    let errorMessages = reduceErrors(error);
    console.error(errorMessages);
    //logError(error);
}

function isJsonString(str) {
    if (typeof str !=="string"){
        return false;
    }
    try{
        var json = JSON.parse(str);
        return (typeof json === 'object');
    }
    catch (error){
        return false;
    }
}

function reduceErrors(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return (
        errors
            // Remove null/undefined items
            .filter((error) => !!error)
            // Extract an error message
            .map((error) => {
                // UI API read errors
                if (Array.isArray(error.body)) {
                    return error.body.map((e) => e.message);
                }
                // UI API DML, Apex and network errors
                else if (error.body && Array.isArray(error.body.message)) {
                    return error.body.message.map((e) => {
                        if (e.message) {
                            return e.message;
                        } else if (
                            e.pageErrors &&
                            Array.isArray(e.pageErrors)
                        ) {
                            return e.pageErrors
                                .map((pageError) => pageError.message)
                                .join(' ');
                        }
                        return '';
                    });
                } else if (
                    error.body &&
                    typeof error.body.message === 'string'
                ) {
                    return error.body.message;
                }
                // JS errors
                else if (typeof error.message === 'string') {
                    return error.message;
                }
                // Unknown error shape so try HTTP status text
                return error.statusText;
            })
            // Flatten
            .reduce((prev, curr) => prev.concat(curr), [])
            // Remove empty strings
            .filter((message) => !!message)
    );
}

export function filterArray(baseItems, removeItems) {
    for(let removeItem of removeItems) {
        var index = baseItems.indexOf(removeItem);
        if(index !== -1) {
            baseItems.splice(index, 1);
        }
    }
    return baseItems;
}

export function compare(string1, string2) {
    if(string1 && string2) {
        return string1.toLowerCase() === string2.toLowerCase();
    }

    return false;
}