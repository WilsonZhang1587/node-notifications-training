const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json())

// Set Static path
app.use(express.static(path.join(__dirname, 'client')));

mongoose.connect('mongodb://192.168.205.15:27017/notified', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", err => console.log(err));
db.once("open", () => console.log("Connected to Database"));

const publicVapidKey = 'BEbR59GllBpkzCfAudE0rOM0sox0m6OoaQICdZCsyQzujY8ATcehV5Yo3H_Av8RwUdZE3kmBJJHgl372-sUXrHA';
const privateVapidKey = 'L0lPYSKIXXqQrPNttNn6Q8SXMh7wVE3HYiq0hp90Bbc';
webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

const testSchema = new mongoose.Schema(
    {
        data: { type: String, required: true }, // required: function() { return this.userId != null; } 附加驗證器
        test: { type: Number, required: true }
    },
    { versionKey: false }
);
const tests = mongoose.model("tests", testSchema)

let n;
// Subscribe Route
app.post('/subscribe', async (req, res) => {
    const test = await tests.find();

    // Get pushSubscripttion object
    const subscription = req.body

    // Send 201 - resource created
    res.status(201).json(test); 

    // Create payload
    const payload = JSON.stringify({ title: 'Push Test' }); 
    const options = {
        proxy: "proxy url" // my proxy server
    }

    // if (test.length !== n) {
    //     // Pass object into sendNotification
    //     webpush.sendNotification(subscription, payload, options).catch(err => console.error(err));
    //     n = test.length
    // }
    webpush.sendNotification(subscription, payload, options).catch(err => console.error(err));
})
app.post('/add', async (req, res) => {
    const testObject = new tests({
        data: req.body.data,
        test: req.body.test
    });
    const newtest = await testObject.save();
    res.status(201).json(newtest);
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))