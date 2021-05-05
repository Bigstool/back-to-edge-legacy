var resourceJSON = "";

var L_Kiosk_Error_Header_TEXT = "We'll be back up soon";
var L_Kiosk_Error_Subheader_TEXT = "There seems to be a problem";
var L_Kiosk_Error_Moredetails_TEXT = "More details";

function getUrl() {
    "use strict";
    

    var docUrl = document.location.href;

    
    var beginIndex = docUrl.indexOf('#') + 1;

    var urlResult;
    
    if (docUrl.indexOf("file://", beginIndex) == -1) {
        
        var protocolEndIndex = docUrl.indexOf("://", beginIndex);

        
        var endIndex = docUrl.indexOf("/", protocolEndIndex + 3);
        urlResult = docUrl.substring(beginIndex, endIndex);
    }
    else {
        urlResult = docUrl.substring(beginIndex);
    }

    return urlResult
}

function isExternalUrlSafeForNavigation(urlStr) {
    "use strict";
    var regEx = new RegExp("^(http(s?)|ftp|file)://", "i");
    return regEx.exec(urlStr);
}

function isNTPUrlSafeForNavigation(ntpUrlStr) {
    "use strict";
    var ntpRegEx = new RegExp("^about:", "i");
    return ntpRegEx.exec(ntpUrlStr);
}

function clickRefresh() {
    "use strict";
    var currentLocation = document.location.href;
    var poundIndex = currentLocation.indexOf('#');

    if (poundIndex != -1 && poundIndex + 1 < currentLocation.length && isExternalUrlSafeForNavigation(currentLocation.substring(poundIndex + 1))) {
        window.location.replace(currentLocation.substring(poundIndex + 1));
    }
}

function clickSendFeedback() {
    "use strict";
    var currentLocation = document.location.href;
    var poundIndex = currentLocation.indexOf('#');

    if (poundIndex != -1 && poundIndex + 1 < currentLocation.length && isExternalUrlSafeForNavigation(currentLocation.substring(poundIndex + 1)))  {
    	window.open('windows-feedback:?categoryId=5&ContextId=401&tabID=2&feedbackType=2&newFeedback=true&searchString=' + document.title + ' ' + currentLocation.substring(poundIndex + 1) +'&mode=mini&metadata={"Metadata":[{"url":"about:blank"},{"ua":""},{"browserType":"Microsoft Edge"}]}');
    }
}

function clickPrivacyStatement() {
    "use strict";
    window.open('https://go.microsoft.com/fwlink/p/?LinkId=521839');
}

function clickSearch() {
    "use strict";
    var currentLocation = document.location.href;
    var poundIndex = currentLocation.indexOf('#');

    if (poundIndex != -1 && poundIndex + 1 < currentLocation.length && isExternalUrlSafeForNavigation(currentLocation.substring(poundIndex + 1))) {
        window.open('https://www.bing.com/search?q=' + currentLocation.substring(poundIndex + 1) + '&PC=MENEPB');
    }
}

function getNavigationURL() {
    "use strict";
    var currentLocation = document.location.href;
    var poundIndex = currentLocation.indexOf('#');
    var possibleNavigationURL = currentLocation.substring(poundIndex + 1);

    if (poundIndex != -1 && poundIndex + 1 < currentLocation.length && isExternalUrlSafeForNavigation(possibleNavigationURL)) {
        return possibleNavigationURL;
    } else {
        return '';
    }
}

function isCablefree() {
    "use strict";
    var regExp = new RegExp("[?&;]NoNetworkCables=([^&#;]*)");
    var value = (regExp.exec(document.location.search) || [null, ""])[1];

    return (decodeURIComponent(value) || "0") === "1";
}

function isHostHvsiPolicyEnabled() {
    "use strict";
    var regExp = new RegExp("[?&;]HostHvsiPolicyEnabled=([^&#;]*)");
    var value = (regExp.exec(document.location.search) || [null, ""])[1];

    return (decodeURIComponent(value) || "0") === "1";
}

function isInApplicationGuard() {
    "use strict";
    var regExp = new RegExp("[?&;]InApplicationGuard=([^&#;]*)");
    var value = (regExp.exec(document.location.search) || [null, ""])[1];

    return (decodeURIComponent(value) || "0") === "1";
}

function isNetworkStatusSupported() {
    "use strict";
    var regExp = new RegExp("[?&;]NetworkStatusSupported=([^&#;]*)");
    var value = (regExp.exec(document.location.search) || [null, ""])[1];

    return (decodeURIComponent(value) || "0") === "1";
}


function getWpcBlockPageURL() {
    "use strict";

    var params = document.location.search;
    var server = "origin.sdx.microsoft.com";

    var errorParam = "error=100004&"
    var queryIdx = params.indexOf(errorParam);
    if (queryIdx != -1) {
        params = params.substring(queryIdx + errorParam.length);
    }

    var isIntEnv = "env=int&";
    var intIdx = params.indexOf(isIntEnv);
    if (intIdx != -1) {
        server = "sdx.microsoft-int.com";
        params = params.substring(intIdx + isIntEnv.length);
    }
    return 'https://' + server + '/family/restricted-web2?' + params;
}


function handleWpcBlockedFrame() {
    "use strict";
    var link = document.getElementById('wpcReqAcc');
    if (link) {
        link.href = getWpcBlockPageURL();
    }
}

function findValue(key) {
    "use strict";
    var value = '';

    var DocQuery = document.location.href;
    var BeginString = DocQuery.indexOf(key);

    if (BeginString > 0) {
        BeginString += key.length;
        var ampLocation = DocQuery.indexOf("&", BeginString);
        var poundLocation = DocQuery.indexOf("#", BeginString);

        var EndString = 0;
        if (ampLocation > 0 && poundLocation > 0) {
            EndString = Math.min(ampLocation, poundLocation);
        }
        else if (ampLocation > 0) {
            EndString = ampLocation;
        }
        else if (poundLocation > 0) {
            EndString = poundLocation;
        }

        if (EndString > 0) {
            value = DocQuery.substring(BeginString, EndString);
        }
        else {
            value = DocQuery.substring(BeginString);
        }
    }

    return value;
}

function getDisplayValue(elem) {
    "use strict";
    var objStyle;
    if (window.getComputedStyle) {
        objStyle = window.getComputedStyle(elem);
    } else {
        objStyle = elem.currentStyle;
    }
    return objStyle.display;
}

function initMoreInfo(infoBlockID, moreInfoText) {
    "use strict";
    document.getElementById("moreInformationDropdownLink").setAttribute("aria-label", moreInfoText);
    document.getElementById("moreInformationDropdownLink").setAttribute("aria-controls", infoBlockID);
    document.getElementById("moreInformationDropdownSpan").innerText = moreInfoText;

    expandCollapseDetails(infoBlockID);
}

function expandCollapseDetails(elem) {
    "use strict";
    if (document.getElementById) {
        var ecBlock = document.getElementById(elem);
        var ecLink = document.getElementById("moreInformationDropdownLink");

        if (ecBlock != null && ecLink != null) {
            var displayValue = getDisplayValue(ecBlock);
            if (displayValue == "none" || displayValue == null || displayValue == "") {
                
                ecBlock.style.display = "block";
                ecLink.setAttribute("aria-expanded", true);
                ecBlock.setAttribute("aria-hidden", false);
            }
            else if (displayValue == "block") {
                
                ecBlock.style.display = "none";
                ecLink.setAttribute("aria-expanded", false);
                ecBlock.setAttribute("aria-hidden", true);
            }
            else {
                
                ecBlock.style.display = "block";
                ecLink.setAttribute("aria-expanded", true);
                ecBlock.setAttribute("aria-hidden", false);
            }
        }
    }
}

function getCertErrorInfo() {
    "use strict";

    var iError = certError();
    var iPolicy = preventIgnoreCertErrors();
    var sRealPageUrl = getNavigationURL();

    

    
    var iCertUnknownCA = 16777216;

    
    var iCertExpired = 67108864;

    
    var iCertCNMismatch = 33554432;

    
    var iCertRevoked = 12170;

    
    var iCertWeakSignature = 2097152;

    var certReasons = [];
    var errorCodes = [];

    
    if (iError == iCertRevoked) {
        certReasons.push(L_CertRevoked_TEXT);
        errorCodes.push("ERROR_INTERNET_SEC_CERT_REVOKED");
        if (document.getElementById("override")) {
            document.getElementById("override").style.display = "none";
        }
    }
    else {
        if (iError & iCertUnknownCA) {
            certReasons.push(L_CertUnknownCA_TEXT);
            errorCodes.push("DLG_FLAGS_INVALID_CA");
        }

        if (iError & iCertExpired) {
            certReasons.push(L_CertExpired_TEXT);
            errorCodes.push("DLG_FLAGS_SEC_CERT_DATE_INVALID");
        }

        if (iError & iCertCNMismatch) {
            certReasons.push(L_CertCNMismatch_TEXT);
            errorCodes.push("DLG_FLAGS_SEC_CERT_CN_INVALID");
        }

        if (iError == 0) {
            certReasons.push(L_CertSigFailed_TEXT);
            errorCodes.push("0");
        }

        if (iError & iCertWeakSignature) {
            certReasons.push(L_CertWeakSignature_TEXT);
            errorCodes.push("DLG_FLAGS_WEAK_SIGNATURE");
        }

        if (document.getElementById("override")) {
            if (iPolicy == 1 || iError == 0) {
                document.getElementById("override").style.display = "none";
            }
            else {
                document.getElementById("overridelink").href = sRealPageUrl;
            }
        }
    }

    if (certReasons.length > 0) {
        document.getElementById("certReason").innerHTML = certReasons.join("<br>");
    }

    if (errorCodes.length > 0) {
        document.getElementById("ErrorCode").innerHTML = L_ERROR_CODE_TEXT + errorCodes.join("<br>");
    }
}

function certError() {
    "use strict";

    var error = '0';

    var DocQuery = document.location.search;
    var BeginError = DocQuery.indexOf("SSLError=");

    if (BeginError > 0) {
        BeginError += 9;
        var EndError = DocQuery.indexOf("&", BeginError);

        if (EndError > 0) {
            error = DocQuery.substring(BeginError, EndError);
        }
        else {
            error = DocQuery.substring(BeginError);
        }
    }

    return error;
}

function preventIgnoreCertErrors() {
    "use strict";

    var Policy = '0';

    var DocQuery = document.location.search;
    var BeginPolicy = DocQuery.indexOf("PreventIgnoreCertErrors=") + 24;
    if (BeginPolicy > 0) {
        var EndPolicy = DocQuery.indexOf("&", BeginPolicy);
        if (EndPolicy > 0) {
            Policy = DocQuery.substring(BeginPolicy, EndPolicy);
        }
        else {
            Policy = DocQuery.substring(BeginPolicy);
        }
    }

    return Policy;
}

function setGoHomeTarget() {
    "use strict";
    var link = document.getElementById("gohome");
    if (link) {
        var ntpUrl = findValue("NTPUrl=");
        if (ntpUrl && isNTPUrlSafeForNavigation(ntpUrl)) {
            link.href = ntpUrl;
        }
    }
}
function getIsKioskSignageMode() {
    "use strict";

    var kioskMode = findValue("UseFriendlyKioskDisplay=");

    return kioskMode && kioskMode == "1";
}

function addKioskSignageBlock() {
    "use strict";

    var kioskSignContainer = document.createElement("div");
    kioskSignContainer.id = "KioskSignageErrorWrapper";

    var kioskMessage = document.createElement("div");
    kioskSignContainer.appendChild(kioskMessage);

    
    var headerBlock = document.createElement("h2");
    headerBlock.textContent = L_Kiosk_Error_Header_TEXT;
    kioskMessage.appendChild(headerBlock);

    
    var subheaderBlock = document.createElement("h3");
    subheaderBlock.textContent = L_Kiosk_Error_Subheader_TEXT;
    kioskMessage.appendChild(subheaderBlock);

    
    var errorPhrase = document.createElement("a");
    errorPhrase.id = "KioskSignageErrorMessage";
    errorPhrase.href="#";
    errorPhrase.textContent = L_Kiosk_Error_Moredetails_TEXT;
    errorPhrase.onclick = dismissKioskSignageBlock;
    kioskMessage.appendChild(errorPhrase);

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(kioskSignContainer);
}

function dismissKioskSignageBlock() {
    "use strict";

    var kioskSignContainer = document.getElementById("KioskSignageErrorWrapper");
    if (kioskSignContainer) {
        kioskSignContainer.style.display = "none";
    }
}

window.addEventListener("load", function() {
    "use strict";

    if (getIsKioskSignageMode()) {
        addKioskSignageBlock();
    }
}, false);
