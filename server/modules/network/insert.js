
let ws = new WebSocket('ws://turretopia.alphexo.dev:372');

// wait until the connection is open
ws.onopen = () => {
    // create a json message with 'insert' command, key, and data
    const message = JSON.stringify({
        command: 'insert',
        key: 'testKey',
        data: 'This is the data to be inserted'
    });

    // send the message to the server
    ws.send(message);
};

// handle the response from the server
ws.onmessage = (event) => {
    console.log('Server Response:', event.data);
};