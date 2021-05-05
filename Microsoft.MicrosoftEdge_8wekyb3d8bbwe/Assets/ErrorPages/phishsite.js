var sRealPageUrl = realPageURL();
var sMainTitle = L_TopFrameUnsafe_TEXT;
var sOriginalSite = "";
var sContentLocations = contentLocations();

function realPageURL() {
    "use strict";
    var urlresult = '';
    var DocURL = document.location.href;

    var BeginURL = DocURL.indexOf("#", 1) + 1;
    urlresult = DocURL.substring(BeginURL);

    if (!isExternalUrlSafeForNavigation(urlresult)) {
        urlresult = window.document.location.toString();
    }
    return urlresult;
}

function closePage() {
    "use strict";
    window.close();
}

function makeReportURL() {
    "use strict";
    window.external.msReportSafeUrl();
}

function threats() {
    "use strict";
    var threats = '0';

    var DocQuery = document.location.search;
    var BeginThreats = DocQuery.indexOf("Threats=");

    if (BeginThreats > 0) {
        BeginThreats += 8;
        var EndThreats = DocQuery.indexOf("&", BeginThreats);

        if (EndThreats > 0) {
            threats = DocQuery.substring(BeginThreats, EndThreats);
        } else {
            threats = DocQuery.substring(BeginThreats);
        }
    }

    return threats;
}

function contentLocations() {
    "use strict";
    var hostname = '0';

    var DocQuery = document.location.search;
    var BeginHostname = DocQuery.indexOf("Host=");

    if (BeginHostname > 0) {
        BeginHostname += 5;
        var EndHostname = DocQuery.indexOf("&", BeginHostname);

        if (EndHostname > 0) {
            hostname = DocQuery.substring(BeginHostname, EndHostname);
        } else {
            hostname = DocQuery.substring(BeginHostname);
        }
    }

    
    if (DocQuery.indexOf("BlockedDomain=") > 0) {
        sMainTitle = L_ContentUnsafe_TEXT;
        sOriginalSite = L_Content_TEXT + hostname;
        return blockedDomain();
    }

    return hostname;
}



function blockedDomain() {
    "use strict";
    var blockedName = "0";
    var DocQuery = document.location.search;
    var BeginBlockedName = DocQuery.indexOf("BlockedDomain=");

    if (BeginBlockedName > 0) {
        BeginBlockedName += 14;
        var EndBlockedName = DocQuery.indexOf("&", BeginBlockedName);

        if (EndBlockedName > 0) {
            blockedName = DocQuery.substring(BeginBlockedName, EndBlockedName);
        } else {
            blockedName = DocQuery.substring(BeginBlockedName);
        }
    }
    return blockedName;
}

function blockOverride() {
    "use strict";
    var blockOverride = '0';

    var DocQuery = document.location.search;
    var BeginBlock = DocQuery.indexOf("Block=");

    if (BeginBlock > 0) {
        BeginBlock += 6;
        var EndBlock = DocQuery.indexOf("&", BeginBlock);

        if (EndBlock > 0) {
            blockOverride = DocQuery.substring(BeginBlock, EndBlock);
        } else {
            blockOverride = DocQuery.substring(BeginBlock);
        }
    }

    return blockOverride;
}

function BodyLoad() {
    "use strict";
    
    var iThreats = threats();

    

    
    var iPhishing = 4;

    
    var iMalware = 16;
    
    var overridden = false;

    if (iThreats & iPhishing) {
        document.getElementById("PhishingThreat").style.display = "list-item";
        document.getElementById("PhishingThreat").innerText = L_PhishingThreat_TEXT;
        overridden = true;
    }

    if (iThreats & iMalware) {
        document.getElementById("MalwareThreat").style.display = "list-item";
        document.getElementById("MalwareThreat").innerText = L_MalwareThreat_TEXT;
        overridden = true;
    }

    
    var iBlockOverride = blockOverride();

    if (iBlockOverride == 0) {
        document.getElementById("DoOverride").style.display = "block";
        document.getElementById("overrideLink").href = sRealPageUrl;
    } else {
        document.getElementById("DoOverride").style.display = "none";
    }

    document.getElementById("contentlocations").innerText = sContentLocations;
    if (sOriginalSite) {
        document.getElementById("hostsite").innerText = sOriginalSite;
    } else {
        document.getElementById("hostsite").style.visibility = "hidden";
    }

    document.getElementById("mainTitle").innerText = sMainTitle;

    
    removeNoScriptElements();

    document.getElementById("moreInformationDropdownLink").setAttribute("aria-label", L_MOREINFO_TEXT);
    document.getElementById("moreInformationDropdownSpan").innerText = L_MOREINFO_TEXT;
    
    var icons = document.getElementsByClassName("msgIcon white icon");
    for (var i = 0; i < icons.length; i++) {
        icons[i].setAttribute("aria-hidden", "true");
    }
}

function reverseForRTL() {
    "use strict";
    if (document.dir == "rtl") {
        document.getElementById("threatsList").className = "ul-rtl";
        document.getElementById("PhishingThreat").className = "bullet-li-rtl";
        document.getElementById("MalwareThreat").className = "bullet-li-rtl";
        document.getElementById("branding").style.textAlign = "left";
    }
}

function expandCollapseIM(elem) {
    "use strict";
    if (document.getElementById) {
        var ecBlock = document.getElementById(elem);

        if (ecBlock !== null) {
            if (ecBlock.currentStyle.display === "block") {
                
                ecBlock.style.display = "none";
            } else {
                
                ecBlock.style.display = "block";
            }
        }
    }
}
