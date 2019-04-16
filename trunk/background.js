// background.js
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    if ( localStorage["spider"] === "clicked" ) {
        localStorage["spider"] = "not clicked";
        chrome.tabs.reload(function(){});
        return;
    }

    localStorage["spider"] = "clicked";
    spiderSimulator();
});




