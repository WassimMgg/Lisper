import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = new express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        const secret = result.data.secret;
        const username = result.data.username;
        res.render("index.ejs", {
            secret: JSON.stringify(secret),
            user: JSON.stringify(username), 
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});


