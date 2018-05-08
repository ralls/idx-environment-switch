chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostContains: 'idxbroker.com'
                    }
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostContains: 'idxstaging.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostContains: 'idxsandbox.com'
                    }
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostContains: 'dev.lan'
                    }
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostContains: 'scrum.lan'
                    }
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
