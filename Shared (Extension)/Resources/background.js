/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Script that runs in the background of the browser.
*/
browser.runtime.onMessage.addListener((request) => {
    browser.storage.local.get((item) => {
        let styles = ".wap-nav-wrap{display: none!important;}";
        if (Object.keys(item).length !== 0){
            browser.tabs.insertCSS({code: styles})
        }
    });
});
