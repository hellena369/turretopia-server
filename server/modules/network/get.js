
let ws = new WebSocket('ws://turretopia.alphexo.dev:372');

// wait until the connection is open
ws.onopen = () => {
    // create a json message with 'get' command and key
    const message = JSON.stringify({
        command: 'get',
        key: 'testKey'
    });

    // send the message to the server
    ws.send(message);
};

// handle the response from the server
ws.onmessage = (event) => {
    console.log('Server Response:', event.data);
};