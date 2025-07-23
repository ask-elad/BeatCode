import { github } from './github.js';

console.log("BeatCode DEBUG: Background Service Worker started.");

const GITHUB_USERNAME = "Your profile name";
const GITHUB_REPO = "Your Repo";
const GITHUB_TOKEN = "Your Token";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("BeatCode DEBUG: Message received in background script.", request);

    if (request.type === "pushToGitHub") {
        console.log("BeatCode DEBUG: Message type is correct. Processing pushToGitHub.");
        
        if (!GITHUB_USERNAME || !GITHUB_REPO || !GITHUB_TOKEN) {
            console.error("BeatCode FATAL ERROR: Credentials are not set in background.js!");
            sendResponse({ status: "Error", message: "Credentials missing in background script." });
            return;
        }

        const { problemTitle, code } = request.data;
        const fileName = `${problemTitle}.cpp`;
        const commitMessage = `Solve ${problemTitle}`;

        console.log(`BeatCode DEBUG: Preparing to push file: ${fileName}`);
        
        github.pushFile(GITHUB_USERNAME, GITHUB_REPO, GITHUB_TOKEN, fileName, code, commitMessage)
            .then(response => {
                console.log(`BeatCode SUCCESS: Successfully pushed/updated ${fileName}.`, response);
                sendResponse({ status: "Success", message: `Pushed ${fileName} successfully.` });
            })
            .catch(error => {
                console.error("BeatCode FATAL ERROR during GitHub push:", error);
                sendResponse({ status: "Error", message: error.message });
            });

        return true; 
    } else {
        console.warn("BeatCode DEBUG: Received a message with an unknown type:", request.type);
    }
});
