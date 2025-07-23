console.log("BeatCode Pusher v2.3: Content script active. Watching for submissions.");

let problemTitle = '';


function captureProblemTitle() {
    const titleSelector = 'div.text-title-large'; 
    const titleElement = document.querySelector(titleSelector);

    if (titleElement) {
        problemTitle = titleElement.textContent.trim().replace(/^\d+\.\s*/, '');
        console.log(`BeatCode SUCCESS: Captured problem title on page load: "${problemTitle}"`);
    } else {

        setTimeout(captureProblemTitle, 1000);
        console.warn("BeatCode WARNING: Could not find title element immediately. Retrying...");
    }
}

function scrapeAndSendData() {
    console.log("BeatCode: scrapeAndSendData() function initiated.");
    let success = true;

    if (!problemTitle) {
        console.error("BeatCode FAILURE: Problem title was not captured. Aborting.");
        success = false;
    }

    const codeSelector = '.monaco-editor .view-lines';
    const codeElement = document.querySelector(codeSelector);
    if (!codeElement) {
        console.error(`BeatCode FAILURE: Could not find code lines with selector: '${codeSelector}'`);
        success = false;
    }
    const code = codeElement ? codeElement.innerText : '';
    if (code) console.log("BeatCode SUCCESS: Code extracted successfully.");

    if (success) {
        const solutionData = { problemTitle, code };
        console.log("BeatCode: Sending data to background script:", solutionData);
        chrome.runtime.sendMessage({ type: "pushToGitHub", data: solutionData }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("BeatCode FATAL: Error sending message to background:", chrome.runtime.lastError.message);
            } else if (response) {
                console.log("BeatCode: Response from background:", response);
            }
        });
    } else {
        console.error("BeatCode FATAL: Could not scrape all required data. Aborting push.");
    }
}

const observer = new MutationObserver((mutationsList, obs) => {
    const acceptedSelector = 'div.flex.items-center.gap-2.text-green-s';
    const acceptedNode = document.querySelector(acceptedSelector);
    
    if (acceptedNode && acceptedNode.textContent.trim().includes("Accepted")) {
        console.log(`BeatCode SUCCESS: Detected 'Accepted' status.`);
        
        obs.disconnect();
        console.log("BeatCode: Observer disconnected.");
        
        setTimeout(scrapeAndSendData, 500);
    }
});

captureProblemTitle();

console.log("BeatCode: Starting MutationObserver.");
observer.observe(document.body, {
    childList: true,
    subtree: true
});