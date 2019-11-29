// background.js
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    /*if ( localStorage["spider"] === "unclick" ) {
        localStorage["spider"] = "clicked";
        chrome.tabs.reload(function(){});
    } else {
        localStorage["spider"] = "unclick";
        spiderSimulator();
    } */
        spiderSimulator();
});




