function getBlockPageURL() {
    "use strict";

    var params = document.location.search;
    var server = "origin.sdx.microsoft.com";

    var queryIdx = params.indexOf('?');
    if (queryIdx != -1) {
        params = params.substring(queryIdx + 1);
    }

    var isIntEnv = "env=int&";
    if (params.indexOf(isIntEnv) == 0) {
        server = "sdx.microsoft-int.com";
        params = params.substring(isIntEnv.length);
    }

    return 'https://' + server + '/family/restricted-web2?' + params;
}

function HandleBlockedFrame() {
    "use strict";
    var link = document.getElementById('reqAcc');
    if (link) {
        link.href = getBlockPageURL();
    }
}

