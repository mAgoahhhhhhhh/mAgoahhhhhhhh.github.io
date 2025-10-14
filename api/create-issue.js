// /api/create-issue.js

export default async function handler(req, res) {
    // 1. Only allow POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // 2. Get environment variables for GitHub
    // These are kept secret on your hosting platform
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO; // e.g., 'your-username/your-private-repo'

    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        console.error("Missing GitHub environment variables");
        return res.status(500).json({ message: 'Server configuration error.' });
    }

    try {
        // 3. Get form data from the request body
        const { name, message, facebook, instagram, twitter } = req.body;

        // Basic validation
        if (!name || !message) {
            return res.status(400).json({ message: 'Name and message are required.' });
        }

        // 4. Format the data for the GitHub Issue
        const issueTitle = `New Message from ${name}`;
        
        // Use Markdown for a nicely formatted issue body
        const issueBody = `
**From:** ${name}
**Message:**
> ${message}

---
**Contacts:**
- **Facebook:** ${facebook || 'Not provided'}
- **Instagram:** ${instagram || 'Not provided'}
- **Twitter (X):** ${twitter || 'Not provided'}
        `;

        // 5. Send the data to the GitHub API to create an issue
        const response = await fetch(`https://api.github.com/repos/${mAgoahhhhhhhh/test_grad}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${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}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
                title: issueTitle,
                body: issueBody,
            }),
        });

        // 6. Handle the response from GitHub
        if (!response.ok) {
            const errorData = await response.json();
            console.error('GitHub API Error:', errorData);
            throw new Error('Failed to create GitHub issue.');
        }

        // 7. Send a success response back to the frontend
        return res.status(201).json({ message: 'Success! Issue created.' });

    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ message: 'Sorry, something went wrong.' });
    }
}