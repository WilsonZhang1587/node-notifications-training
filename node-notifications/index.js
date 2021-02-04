const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json())

// Set Static path
app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = 'BEbR59GllBpkzCfAudE0rOM0sox0m6OoaQICdZCsyQzujY8ATcehV5Yo3H_Av8RwUdZE3kmBJJHgl372-sUXrHA';
const privateVapidKey = 'L0lPYSKIXXqQrPNttNn6Q8SXMh7wVE3HYiq0hp90Bbc';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

// Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get pushSubscripttion object
    const subscription = req.body

    // Send 201 - resource created
    res.status(201).json({}); 

    // Create payload
    const payload = JSON.stringify({ title: 'Push Test' }); 
    const options={
        proxy:"proxy url" // my proxy server
    }

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload, options).catch(err => console.error(err));
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))