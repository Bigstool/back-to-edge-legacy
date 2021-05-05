(function() {
    "use strict";
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', afterDOMLoaded);
    } else {
        afterDOMLoaded();
    }

    function afterDOMLoaded() {
        window.bookViewer = new BookViewer.BookViewer(new BookViewer.BookControllerProxy(browser.webruntime), true );
        
        window.onbeforeunload = function () {
            bookViewer.unload();
        }
    }
})();