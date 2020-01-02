const express = require("express");
const uuid = require("uuid");
const fs = require("fs");
const router = express.Router();

let data = fs.readFileSync("playlist.json", "utf8");
let playlist = JSON.parse(data);

//Add new musician

router.post("/add", (req, res) => {
    console.log(req.body.nameOfMusician);
    const newMusicians = {
        id: uuid.v4(),
        nameOfMusician: req.body.nameOfMusician
    };

    if (!newMusician.nameOfMusician || newMusician.nameOfMusician == " ") {
        return res.status(400).json({
            message: "Please insert Musician's name."
        });
    }

    playlist.push(newMusician);

    fs.writeFile("playlist.json", JSON.stringify(playlist), err => {
        if (err) console.log(`Oops Something went wrong ${err}`);
    });

    res.json(playlist);
});

//Edit an exisiting musician

router.post("/:id", (req, res) => {
    for (let i = 0; i < playlist.length; i++) {
        if (playlist[i].id == req.body.id) {
            playlist[i].nameOfMusician = req.body.nameOfMusician;
            res.json({
                message: `Musician (${req.body.id}) has been updated to ${req.body.nameOfMusician}`
            });
        }
    }
    fs.writeFile("playlist.json", JSON.stringify(playlist), err => {
        if (err) console.log(`Oops something went wrong ${err}`);
    });
});

//Delete a musician

router.post("/delete/:id", (req, res) => {
    let found = playlist.some(Musician => {
        return Musician.id == req.body.id;
    });
    playlist;

    if (found == true) {
        res.json({
            message: `Musician(${req.body.id}) deleted`
        });
        let Musician = playlist.filter(Musician => Musician.id !== req.body.id);

        fs.writeFile("playlist.json", JSON.stringify(Musician), err => {
            if (err) console.log(`Oops something went wrong ${err}`);
        });
    } else {
        res.status(400).json({
            message: `Musician (${req.body.id}) does not exist`
        });
    }
});

// List all musicians 

router.get("/list", (req, res) => {
    res.json(playlist);
});

module.exports = router;