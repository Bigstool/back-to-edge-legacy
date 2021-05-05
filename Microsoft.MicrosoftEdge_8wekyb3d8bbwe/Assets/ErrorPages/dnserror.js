window.onload = function () {
    "use strict";
    var url = getUrl();
    var urlElements = document.getElementsByClassName("webpageURL");
    for (var i = 0; i < urlElements.length; i++) {
        urlElements[i].textContent = url;
    }

    getInfo();
    initMoreInfo('infoBlockID', document.getElementById("L_MOREINFO_TEXT").textContent);
}

function getInfo() {
    "use strict";

    
    checkConnection();

    
    if (document.addEventListener) {
        addEventListener("offline", reportConnectionEvent, false);
    }
    else {
        attachEvent("onoffline", reportConnectionEvent);
    }

    
    document.body.ononline = reportConnectionEvent;
    document.body.onoffline = reportConnectionEvent;
}

function checkConnection()
{
    "use strict";
    var notConnected = document.getElementById("NotConnected");
    var pageUnavailable = document.getElementById("PageUnavailable");
    var hostHvsiPolicyEnabled = isHostHvsiPolicyEnabled();

    if (navigator.onLine) {
        
        document.title = document.getElementById("L_Unavailable_Title_TEXT").textContent;

        
        var pageUnavailableApplicationGuardWorkRelatedSuggestion = document.getElementById("PageUnavailableApplicationGuardWorkRelatedSuggestion");
        pageUnavailableApplicationGuardWorkRelatedSuggestion.style.display = hostHvsiPolicyEnabled ? null : "none";

        notConnected.style.display = "none";
        pageUnavailable.style.display = null;

        
        document.getElementById("dnsErrorSearchLink").onclick = function () { clickSearch(); return false; }
        document.getElementById("dnsErrorRefreshLink").onclick = function () { clickRefresh(); return false; }
        document.getElementById("dnsSendFeedbackLink").onclick = function () { clickSendFeedback(); return false; }
        document.getElementById("dnsPrivacyStatementLink").onclick = function () { clickPrivacyStatement(); return false; }
        document.getElementById("moreInformationDropdownLink").onclick = function () { expandCollapseDetails('infoBlockID'); return false; }
    }
    else {
        
        document.title = document.getElementById("L_Disconnected_Title_TEXT").textContent;

        
        var buttonLaunchMSSettingsNetworkStatus = document.getElementById("LaunchMSSettingsNetworkStatus");
        buttonLaunchMSSettingsNetworkStatus.style.display = hostHvsiPolicyEnabled ? "none" : null;

        notConnected.style.display = null;
        pageUnavailable.style.display = "none";

        if (isCablefree()) {
            var cabledOnlyMessages = document.getElementsByClassName("noCables");
            for (var i = 0; i < cabledOnlyMessages.length; i++) {
                cabledOnlyMessages[i].style.display = "none";
            }
        }

        var networkSettingsUrl = (isNetworkStatusSupported()) ? "ms-settings:network-status" : "ms-settings:network";
        document.getElementById("LaunchMSSettingsNetworkStatus").onclick = function () {
            window.location = networkSettingsUrl;
        }
    }

    getErrorStatus();

}

function reportConnectionEvent(e) {
    "use strict";
    if (!e) e = window.event;

    if ('online' === e.type) {
        setTimeout ( "clickRefresh()", 1000 ); 
    }
    else if ('offline' === e.type) {
        checkConnection();
    }
    else {
        checkConnection();
    }
}

function getErrorStatus() {
    "use strict";
    var errorStatus = findValue("ErrorStatus=");

    if (errorStatus) {
        var errorCode = "";
        var errorString = "";
        var subError = document.getElementById("subError");

        var errorCodes = {
            "0x800C0008": { name: "INET_E_DOWNLOAD_FAILURE", description: document.getElementById("L_DOWNLOAD_FAILURE_TEXT").textContent },
            "0x800C0014": { name: "INET_E_REDIRECT_FAILED", description: document.getElementById("L_REDIRECT_FAILED_TEXT").textContent },
            "0x800C000B": { name: "INET_E_CONNECTION_TIMEOUT", description: document.getElementById("L_CONNECTION_TIMEOUT_TEXT").textContent },
            "0x800C0007": { name: "INET_E_DATA_NOT_AVAILABLE", description: document.getElementById("L_DATA_NOT_AVAILABLE_TEXT").textContent },
            "0x800C0004": { name: "INET_E_CANNOT_CONNECT", description: null },
            "0x800C000E": { name: "INET_E_SECURITY_PROBLEM", description: null },
            "0x800C0006": { name: "INET_E_OBJECT_NOT_FOUND", description: null },
            "0x800C0002": { name: "INET_E_INVALID_URL", description: null }
        };

        var INET_E_RESOURCE_NOT_FOUND = "0x800C0005";
        if (errorStatus === INET_E_RESOURCE_NOT_FOUND) {
            errorCode = "INET_E_RESOURCE_NOT_FOUND";

            var dnsString = findValue("DNSError=");
            if (dnsString) {
                var dnsStatus = Number(dnsString);

                var ERROR_SUCCESS = 0;
                var WSAECONNRESET = 10054;
                var WSAETIMEDOUT = 10060;
                var WSAHOST_NOT_FOUND = 11001;

                if (dnsStatus === WSAECONNRESET) {
                    errorString = document.getElementById("L_RESOURCE_NOT_FOUND_WSAECONNRESET_TEXT").textContent;
                }
                else if (dnsStatus === WSAETIMEDOUT) {
                    errorString = document.getElementById("L_RESOURCE_NOT_FOUND_WSAETIMEDOUT_TEXT").textContent;
                }
                else if (dnsStatus === ERROR_SUCCESS) {
                    errorString = document.getElementById("L_RESOURCE_NOT_FOUND_ERROR_SUCCESS_TEXT").textContent;
                }
                else if (dnsStatus === WSAHOST_NOT_FOUND) {
                    errorString = document.getElementById("L_RESOURCE_NOT_FOUND_WSAHOST_NOT_FOUND_TEXT").textContent;
                }
                else {
                    errorString = document.getElementById("L_RESOURCE_NOT_FOUND_ERROR_OTHER_TEXT").textContent;
                }
            }
            else {
                errorString = document.getElementById("L_RESOURCE_NOT_FOUND_TEXT").textContent;
            }
        }
        else if (errorStatus in errorCodes) {
            var error = errorCodes[errorStatus];
            errorCode = error.name;
            if (error.description) {
                errorString = error.description;
            }
        }
        else {
            errorCode = errorStatus;
        }

        document.getElementById("ErrorCode").textContent = document.getElementById("L_ERROR_CODE_TEXT").textContent + errorCode;
        subError.textContent = errorString;
    }
}
