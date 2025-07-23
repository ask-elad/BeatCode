BeatCode Auto Pusher

<!-- Replace with your actual icon URL if you have one -->

BeatCode Auto Pusher is a powerful Chrome browser extension designed to automate your LeetCode workflow. It silently works in the background to detect whenever you get an "Accepted" submission on a LeetCode problem and automatically pushes your solution to a designated GitHub repository.

This tool is perfect for developers who want to maintain a personal archive of their solutions without any manual effort.
Key Features

    Fully Automatic: No buttons to click. The extension detects a successful submission and handles the entire process on its own.

    Zero Configuration UI: All settings (username, repository, and token) are hardcoded directly into the extension for simplicity and personal use.

    Smart File Naming: Automatically names the file based on the problem title (e.g., "Two Sum" becomes Two-Sum.cpp).

    Reliable Scraping: Built to be resilient to minor changes in LeetCode's website structure.

    Update Existing Solutions: If you solve the same problem again, the extension will update the existing file in your repository with the new solution.

🚨 CRITICAL SECURITY WARNING

This version of the extension is intended for personal use only. Your GitHub Personal Access Token (PAT) is hardcoded directly into the background.js file.

    DO NOT share this code publicly.

    DO NOT upload your extension folder to a public GitHub repository.

    Anyone who gets access to the background.js file will have full access to your GitHub account with the permissions granted to that token.

    It is strongly recommended to keep the repository this extension pushes to private.

Installation

Since this is a custom extension, it must be loaded manually in Chrome's Developer Mode.

    Download the Code:

        Clone or download this repository to your local machine.

    Open Chrome Extensions:

        Open your Google Chrome browser.

        Navigate to the extensions page by typing chrome://extensions in the address bar.

    Enable Developer Mode:

        In the top-right corner of the extensions page, find the "Developer mode" switch and turn it ON.

    Load the Extension:

        A new menu with "Load unpacked" will appear. Click on it.

        In the file selection dialog, navigate to and select the root folder of this extension (the folder that contains manifest.json).

The "BeatCode Auto Pusher" icon should now appear in your browser's toolbar, and the extension is active.
How It Works

    Setup (One-Time Only): Before installing, you must open the background.js file and replace the placeholder credentials with your actual GitHub username, the name of the repository you want to push to, and a valid Personal Access Token.

    Solve a Problem: Navigate to any LeetCode problem page and write your solution.

    Submit: Submit your code as you normally would.

    Get Accepted: Once the LeetCode page shows the "Accepted" status for your submission, the extension will automatically:

        Capture the problem title.

        Extract your code from the editor.

        Push the code to your specified GitHub repository, creating or updating the file as needed.

Project Structure

    manifest.json: The core configuration file that defines the extension's permissions and tells Chrome which scripts to run.

    content.js: This script is injected directly into LeetCode problem pages. Its job is to detect the "Accepted" submission and scrape the problem title and code from the page.

    background.js: The service worker that runs in the background. It contains the hardcoded credentials and listens for messages from content.js.

    github.js: A dedicated module that handles all communication with the GitHub API, making the code cleaner and more organized.

    /icons: A directory containing the icons for the extension.

Disclaimer: This extension relies on the specific HTML structure of the LeetCode website. If LeetCode significantly updates its site, the extension may need to be updated to continue functioning correctly.
