let bodyContent = document.querySelector('body').innerHTML;

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type !== "content") {
        return;
    }
    
    sendResponse({ content: bodyContent });
});
