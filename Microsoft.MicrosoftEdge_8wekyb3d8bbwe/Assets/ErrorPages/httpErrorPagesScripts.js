

function isExternalUrlSafeForNavigation(urlStr) {
    "use strict";
    var regEx = new RegExp("^(http(s?)|ftp|file)://", "i");
    return regEx.exec(urlStr);
}

function clickRefresh() {
    "use strict";
    var location = window.location.href;
    var poundIndex = location.indexOf('#');

    if (poundIndex != -1 && poundIndex+1 < location.length && isExternalUrlSafeForNavigation(location.substring(poundIndex+1))) {
        window.location.replace(location.substring(poundIndex+1));
    }
}

function navCancelInit() {
    "use strict";
    var location = window.location.href;
    var poundIndex = location.indexOf('#');

    if (poundIndex != -1 && poundIndex+1 < location.length && isExternalUrlSafeForNavigation(location.substring(poundIndex+1))) {
        var bElement = document.createElement("A");
        bElement.innerText = L_REFRESH_TEXT;
        bElement.href = 'javascript:clickRefresh()';
        navCancelContainer.appendChild(bElement);
    } else {
        var textNode = document.createTextNode(L_RELOAD_TEXT);
        navCancelContainer.appendChild(textNode);
    }
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

function expandCollapse(elem, changeImage) {
    "use strict";
    if (document.getElementById) {
        var ecBlock = document.getElementById(elem);

        if (ecBlock != null) {
            if (changeImage) {
                
                elemImage = document.getElementById(elem + "Image");
            }

            
            if (!changeImage || (elemImage != null)) {
                var displayValue = getDisplayValue(ecBlock);
                if (displayValue == "none" || displayValue == null || displayValue == "") {
                    
                    ecBlock.style.display = "block";
                    if (changeImage) {
                        
                        elemImage.src = "up.png";
                    }
                }
                else if (displayValue == "block") {
                    
                    ecBlock.style.display = "none";
                    if (changeImage) {
                        
                        elemImage.src = "down.png";
                    }
                } else {
                    
                    ecBlock.style.display = "block";
                    if (changeImage) {
                        elemImage.src = "up.png";
                    }
                }
            }
        }
    }
}


function initHomepage() {
    "use strict";
    

    
    var DocURL = document.location.href;

    var poundIndex = DocURL.indexOf('#');

    if (poundIndex != -1 && poundIndex+1 < location.length && isExternalUrlSafeForNavigation(location.substring(poundIndex+1))) {

       
       var protocolIndex = DocURL.indexOf("://", 4);

       
       var serverIndex = DocURL.indexOf("/", protocolIndex + 3);

       
       var BeginURL = DocURL.indexOf("#",1) + 1;
       var urlresult = DocURL.substring(BeginURL, serverIndex);
       if (protocolIndex - BeginURL > 7)
           urlresult="";

        
       var displayresult = DocURL.substring(protocolIndex + 3, serverIndex);
    } else {
       var displayresult = "";
       var urlresult = "";
    }

    var aElement = document.createElement("A");

    aElement.innerText = displayresult;
    aElement.href = urlresult;

    homepageContainer.appendChild(aElement);
}


function initConnectionStatus() {
    "use strict";
    if (navigator.onLine) { 
        checkConnection.innerText = L_CONNECTION_ON_TEXT;
    } else {
        checkConnection.innerText = L_CONNECTION_OFF_TEXT;
    }
}

function initGoBack() {
    "use strict";
    

    if (history.length < 1) {
        
        var textNode = document.createTextNode(L_GOBACK_TEXT);
        goBackContainer.appendChild(textNode);
    } else {
        var bElement = document.createElement("A");
        bElement.innerText = L_GOBACK_TEXT ;
        bElement.href = "javascript:history.back();";
        goBackContainer.appendChild(bElement);
    }
}

function initMoreInfo(infoBlockID) {
    "use strict";
    var bElement = document.createElement("A");
    bElement.innerText = L_MOREINFO_TEXT;
    bElement.href = "javascript:expandCollapse(\'infoBlockID\', true);";
    moreInfoContainer.appendChild(bElement);

}

function initOfflineUser(offlineUserID) {
    "use strict";
    var bElement = document.createElement("A");
    bElement.innerText = L_OFFLINE_USERS_TEXT;
    bElement.href = "javascript:expandCollapse('offlineUserID', true);";
    offlineUserContainer.appendChild(bElement);
}

function initUnframeContent() {
    "use strict";
    var location = window.location.href;
    var poundIndex = location.indexOf('#');

    if (poundIndex != -1 && poundIndex+1 < location.length && isExternalUrlSafeForNavigation(location.substring(poundIndex+1))) {
        document.getElementById("whatToDoIntro").style.display="";
        document.getElementById("whatToDoBody").style.display="";
    }
}

function removeNoScriptElements() {
    "use strict";
    var noScriptElements = document.getElementsByTagName("noscript");
    for (var i = noScriptElements.length - 1; i >= 0; i--) {
        var bElement = noScriptElements[i];
        if (bElement !== null) {
            bElement.parentNode.removeChild(bElement);
        }
    }
}

function makeNewWindow() {
    "use strict";
    var location = window.location.href;
    var poundIndex = location.indexOf('#');

    if (poundIndex != -1 && poundIndex+1 < location.length && isExternalUrlSafeForNavigation(location.substring(poundIndex+1))) {
        window.open(location.substring(poundIndex+1));
    }
}

function setTabInfo(tabInfoBlockID) {
    "use strict";
    
    var bPrevElement = document.getElementById("tabInfoTextID");
    var bPrevImage   = document.getElementById("tabInfoBlockIDImage");

    if (bPrevElement != null) {
        tabInfoContainer.removeChild(bPrevElement);
    }

    if (bPrevImage != null) {
        tabImageContainer.removeChild(bPrevImage);
    }

    var bElement = document.createElement("A");
    var bImageElement = document.createElement("IMG");

    var ecBlock = document.getElementById(tabInfoBlockID);

    
    if ((ecBlock != null) &&
        (getDisplayValue(ecBlock) == "none" || getDisplayValue(ecBlock) == null || getDisplayValue(ecBlock) == "")) {
        bElement.innerText = L_SHOW_HOTKEYS_TEXT;
        bImageElement.alt = L_SHOW_HOTKEYS_TEXT;
        bImageElement.src="down.png";
    } else {
        bElement.innerText = L_HIDE_HOTKEYS_TEXT;
        bImageElement.alt = L_HIDE_HOTKEYS_TEXT;
        bImageElement.src="up.png";
    }

    bElement.id = "tabInfoTextID";
    bElement.href = "javascript:expandCollapse(\'tabInfoBlockID\', false); setTabInfo('tabInfoBlockID');";


    bImageElement.id="tabInfoBlockIDImage";
    bImageElement.border="0";
    bImageElement.className="actionIcon";

    tabInfoContainer.appendChild(bElement);
    tabImageContainer.appendChild(bImageElement);
}

function launchInternetOptions() {
    "use strict";
    window.external.msLaunchInternetOptions();
}

function diagnoseConnection() {
    "use strict";
    window.external.DiagnoseConnection();
}

function diagnoseConnectionAndRefresh() {
    "use strict";
    window.external.DiagnoseConnection();
    if (navigator.onLine) { 
        clickRefresh();
    }
}

function getInfo() {
    "use strict";
    
    checkConnection();

    
    if (document.addEventListener) {
        addEventListener("offline", reportConnectionEvent, false);
    } else {
        attachEvent("onoffline", reportConnectionEvent);
    }

    
    document.body.ononline = reportConnectionEvent;
    document.body.onoffline = reportConnectionEvent;
}

function checkConnection() {
    "use strict";
    var newHeading = document.getElementById("mainTitle");
    var notConnectedTasks = document.getElementById("notConnectedTasks");
    var cantDisplayTasks = document.getElementById("cantDisplayTasks");

    if (navigator.onLine) { 
        document.title = L_INTERNET_CONNECTED_TEXT;
        newHeading.textContent = L_INTERNET_CONNECTED_TEXT;

        addURL();

        notConnectedTasks.style.display = "none";
        cantDisplayTasks.style.display = "";
    } else {
        document.title = L_INTERNET_NOT_CONNECTED_TEXT;
        newHeading.textContent = L_INTERNET_NOT_CONNECTED_TEXT;

        notConnectedTasks.style.display = "";
        cantDisplayTasks.style.display = "none";
    }
 }

function reportConnectionEvent(e) {
    "use strict";
    if (!e) e = window.event;

    if ('online' == e.type) {
        setTimeout ( "clickRefresh()", 1000 ); 
    }
    else if ('offline' == e.type) {
        checkConnection();
    } else {
        checkConnection();
    }
}

function addURL() {
    "use strict";
    
    var urlResult = "";
    var DocURL = document.location.href;
    var urlPlaceholder = document.getElementById("webpage");

    var beginIndex = DocURL.indexOf('#') + 1;

    
    if (DocURL.indexOf("file://", beginIndex) == -1) {
        
        var protocolEndIndex = DocURL.indexOf("://", beginIndex);

        
        var endIndex=DocURL.indexOf("/", protocolEndIndex + 3);

        urlResult = DocURL.substring(beginIndex, endIndex);
    }
    
    urlPlaceholder.innerText = urlResult + " ";
}

function addDomainName() {
    "use strict";
    var domainNamePlaceholder = document.getElementById("DomainName");

    
    domainNamePlaceholder.innerText = findValue("DomainName=") + " ";
}

function addProxyDetail() {
    "use strict";
    var proxyDetailPlaceholder = document.getElementById("ProxyDetail");

    proxyDetailPlaceholder.innerText = findValue("ProxyDetail=");
}

function findValue(key) {
    "use strict";
    var value = '';

    DocQuery = document.location.search;
    BeginString = DocQuery.indexOf(key);

    if (BeginString > 0) {
        BeginString += key.length;
        EndString = Math.max(0, Math.min(DocQuery.indexOf("&", BeginString), DocQuery.indexOf("#", BeginString)));

        if (EndString > 0) {
            value = DocQuery.substring(BeginString, EndString);
        } else {
            value = DocQuery.substring(BeginString);
        }
    }

    return value;
}

function isHTTPS(cantDisplayTasks) {
    "use strict";
    

    
    var DocURL = document.location.href;
    var poundIndex = DocURL.indexOf('#');

    
    var protocolIndex = DocURL.indexOf("https://", poundIndex);

    if (protocolIndex>poundIndex) {
        var bElement = document.createElement("li");
        bElement.textContent = L_TLS_SSL_TEXT;
        cantDisplayTasks.appendChild(bElement);
    }
}