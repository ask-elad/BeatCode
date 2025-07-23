
export const github = {
    /**
     * Pushes a file to a GitHub repository. It will create a new file or update an existing one.
     * @param {string} username - The GitHub username.
     * @param {string} repo - The GitHub repository name.
     * @param {string} token - The GitHub Personal Access Token.
     * @param {string} filePath - The path of the file in the repository (e.g., "Two Sum.cpp").
     * @param {string} content - The content of the file.
     * @param {string} commitMessage - The commit message.
     * @returns {Promise<object>} - A promise that resolves with the API response.
     */
    async pushFile(username, repo, token, filePath, content, commitMessage) {
        const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${encodeURIComponent(filePath)}`;
        
        // Base64 encode the file content. This is required by the GitHub API.
        const encodedContent = btoa(unescape(encodeURIComponent(content)));

        // First, check if the file already exists to get its SHA hash.
        // The SHA is required to update an existing file.
        let sha;
        try {
            const existingFileResponse = await fetch(apiUrl, {
                headers: { "Authorization": `token ${token}` }
            });
            if (existingFileResponse.ok) {
                const fileData = await existingFileResponse.json();
                sha = fileData.sha;
            }
        } catch (error) {
            console.log("BeatCode: File likely doesn't exist, creating a new one. Error:", error);
        }

        const payload = {
            message: commitMessage,
            content: encodedContent,
            committer: {
                name: username,
                email: `${username}@users.noreply.github.com` // A standard no-reply email
            }
        };

        // If we found a SHA, add it to the payload to perform an update.
        if (sha) {
            payload.sha = sha;
        }

        // Make the PUT request to create or update the file.
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                "Authorization": `token ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`GitHub API Error: ${errorData.message}`);
        }

        return await response.json();
    }
};
