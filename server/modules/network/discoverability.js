// Submit server information to server browsers
const submitToServerBrowsers = async () => {
    try {
        const serverInfo = {
            name: config.serverName,
            ip: config.serverIP,
            port: config.serverPort,
            players: getPlayerCount(),
            gameMode: config.gameMode
        }

        // List of server browser APIs
        const serverBrowsers = [
            'https://api.serverbrowser1.com/submit',
            'https://api.serverbrowser2.com/submit',
            'https://api.serverbrowser3.com/submit'
        ]

        // Submit to each server browser
        const submissions = serverBrowsers.map(async (url) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serverInfo)
            })

            if (!response.ok) {
                throw new Error(`Failed to submit to ${url}: ${response.statusText}`)
            }

            return response.json()
        })

        const results = await Promise.all(submissions)
        console.log('Server submitted to all server browsers successfully:', results)
    } catch (error) {
        console.error('Error submitting server to server browsers:', error)
    }
}

// Call the function to submit server information
submitToServerBrowsers()

// Set up periodic submission (e.g., every 5 minutes)
setInterval(submitToServerBrowsers, 5 * 60 * 1000)