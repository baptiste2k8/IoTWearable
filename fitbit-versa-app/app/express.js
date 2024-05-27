// import * as express from "express";
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

// WebSocket server example (Node.js with ws library)
import { Server } from 'ws';
const server = new Server({ port: 8080 });

server.on('connection', socket => {
    socket.on('message', message => {
        console.log('Received:', message);
        socket.send('Hello from server');
    });
});