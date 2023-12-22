const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

const app = express();

const authRoute = require("./routes/authRoute");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server running successfully");
});

app.get("/health", (req, res) => {
    let state = "OK";
    const healthData = {
        serverName: "WeekList Server",
        currentTime: new Date(),
        state: state,
    };
    try {
        res.send(healthData);
    } catch (error) {
        state = error.message;
        res.send(healthData);
    }
});


const port = process.env.port || 3000
app.listen(port, () => {
    mongoose.connect(process.env.MongoDB_URL)
    .then(() => console.log('server is started'))
    .catch((error) => console.log(error.message))
})

app.use("/auth", authRoute);