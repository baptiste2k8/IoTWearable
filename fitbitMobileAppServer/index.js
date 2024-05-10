/*This application receives the data from fitbit device 
and send them to wiMP Web server using Websocket Protocol*/
/* Follow this step to install certificate for your machine
https://thriveread.com/nodejs-https-server-with-express-and-createserver/?expand_article=1 */

const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const app = express();
const PORT = 3006; // You can change the port as needed

// Create a connection pool to MariaDB
const pool = mariadb.createPool({
    host: 'localhost', // Change this to your MariaDB host
    user: 'root', // Change this to your MariaDB username
    password: 'root', // Change this to your MariaDB password
    database: 'fitbit_data', // Change this to your MariaDB database name
    connectionLimit: 5 // Adjust as needed
});

const keys = {
  key: fs.readFileSync('./cert/localhost.key'),
  cert: fs.readFileSync('./cert/localhost.crt')
};

const server = https.createServer(keys, app);
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.post('/fitbitdata', async(req, res) => {
    const { fitbit_rate, timestamp } = req.body;
    console.log(`fitbit_rate is ${fitbit_rate}`);
    console.log(`timestamp is ${timestamp}`);
    if (!fitbit_rate || !timestamp) {
        return res.status(400).json({ error: 'fitbit_rate and timestamp are required' });
    }

    try {
        const conn = await pool.getConnection();
        await conn.query('INSERT INTO fitbit_data (fitbit_rate, timestamp) VALUES (?, ?)', [fitbit_rate, timestamp]);
        conn.release();
        //ws.send(JSON.stringify({ fitbit_rate, timestamp }));
        return res.status(200).json({ message: 'Data stored successfully' });
    } catch (err) {
        console.error('Error storing data:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
  res.send('Fitbit server is running');
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is listening on https://localhost:${PORT}`);
});