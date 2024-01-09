require("dotenv").config()
// index.js
const express = require('express');
const serverless = require('serverless-http');
const AWS = require('aws-sdk');
const cors = require('cors')
// Initialize SQS with AWS SDK
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const QUEUE_URL = process.env.QUEUE_URL;

const app = express();
app.use(cors())
// Parse JSON bodies
app.use(express.json());

// Hello World endpoint
app.get('/', (req, res) => {
    console.log("hi");
    return res.send('Hello World!');
});

app.get('/hello', (req, res) => {
    console.log("hi2");
    return res.send('Hello World2!');
});

module.exports.app = app;
// Endpoint to trigger an SQS message
// app.post('/trigger-sqs', async (req, res) => {
//   const { message } = req.body;

//   const params = {
//     MessageBody: JSON.stringify(message),
//     QueueUrl: QUEUE_URL,
//   };

//   try {
//     await sqs.sendMessage(params).promise();
//     res.send('Message sent to SQS');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// Export the app for serverless
module.exports.handler = serverless(app);
