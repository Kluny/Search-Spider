function spiderSimulator() {
    chrome.tabs.insertCSS({
        file: 'search-spider-simulator.css'
    });
    chrome.tabs.executeScript({
        file: 'search-spider-simulator.js'
    });
}