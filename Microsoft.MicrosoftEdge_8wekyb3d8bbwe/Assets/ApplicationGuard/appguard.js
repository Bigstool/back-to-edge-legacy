

(function() {
    'use strict';

    
    var laptopStart = 1.75;

    setTimeout(function() {
        document.body.classList.add('laptop-expanded');
    }, laptopStart * 1000);

    
    var aspectContain = function(outer, aspect, op) {
        var r = op && op.autoRound ? Math.round : function(n) { return n; };

        outer.calcWidth = op && op.maxWidth ? (op.maxWidth + '').indexOf('&') > 0 ?
            (parseFloat(op.maxWidth) / 100) * outer.width : parseFloat(op.maxWidth) : outer.width;
        outer.calcHeight = op && op.maxHeight ? (op.maxHeight + '').indexOf('&') > 0 ?
            (parseFloat(op.maxHeight) / 100) * outer.height : parseFloat(op.maxHeight) : outer.height;

        var wpri = { width: outer.calcWidth, height: outer.calcWidth * (1/aspect) },
            hpri = { width: outer.calcHeight * aspect, height: outer.calcHeight };

        var contain = (wpri.width <= outer.width && wpri.height <= outer.height) ? 
            
            { width: r(wpri.width), height: r(wpri.height), left: r((outer.width - outer.calcWidth)/2), top: r((outer.height - wpri.height) / 2) } :
            
            { width: r(hpri.width), height: r(hpri.height), left: r((outer.width - hpri.width) / 2), top: r((outer.height - outer.calcHeight)/2) };

        return contain;
    };

    var resize = function() {
        
        document.body.classList.add('no-transition-for-reals');

        var designFontSize = 16,
            designWidth = 1400;

        var content = document.getElementById('content'),
            contentAspect = content.offsetWidth / content.offsetHeight,
            outer = {
                width: document.body.offsetWidth,
                height: document.body.offsetHeight
            };

        var newSize = aspectContain(outer, contentAspect, {
            maxWidth: Math.min(1600, outer.width * 0.95),
            autoRound: true
        });

        var calcFontSize = (newSize.width / designWidth) * designFontSize;
        document.body.style.fontSize = calcFontSize + 'px';
        document.documentElement.style.fontSize = calcFontSize + 'px';

        
        setTimeout(function() {
            document.body.classList.remove('no-transition-for-reals');
            document.body.classList.remove('loading');
        });
    };
    
    function isDownloadToHostPolicyEnabled() {
        "use strict";
        var regExp = new RegExp("[?&;]DownloadToHostPolicyEnabled=([^&#;]*)");
        var value = (regExp.exec(document.location.search) || [null, ""])[1];

        return (decodeURIComponent(value) || "0") === "1";
    }


    window.onresize = function(event) {
        resize();
    };

    window.onload = function () {        
        var standardWdagMessage = document.getElementById("safeguard-message");
        var standardWdagWithDownloadToHostMessage = document.getElementById("safeguard-message-download-to-host-available");
        
        if (isDownloadToHostPolicyEnabled()) {
            standardWdagMessage.style.display = "none";
            standardWdagWithDownloadToHostMessage.style.display = null;
        }
        else {
            standardWdagMessage.style.display = null;
            standardWdagWithDownloadToHostMessage.style.display = "none";
        }
    };

    resize();

})();
