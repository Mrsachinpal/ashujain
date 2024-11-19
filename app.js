const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/ashujain";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.send("Hi,I am root");
});

app.get("/listing", async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }}
)

    app.get("/testListing", async (req, res) => {
        let sampleListing = new Listing({
            title: "My New Villa",
            description: "By the beach",
            price: 1200,
            location: "Calangute, Goa",
            country: "India",
        });
        await sampleListing.save();
        console.log("sample was saved");
        res.send("sucessful testing");
    });

    app.listen(8080, () => {
        console.log("server is listening to port 8080");
    });