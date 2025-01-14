const express = require("express");
const router = new express.Router();

const Events = require("../models/eventModel");

router.get("/", (req, res) => {
    res.send("Hello from the other side");
});

//ADD Event
router.post("/event", async(req, res) => {
    try {
        const addEvent = new Events(req.body);
        const createEve = await addEvent.save();
        res.status(201).send(createEve);
        console.log(`Event Id: ${createEve._id}`);
    } catch(e) {
        res.status(400).send(e);
    }
});

//GET All Events
router.get("/event", async(req, res) => {
    try {
        const getEvent = await Events.find({});
        res.send(getEvent);
    } catch(e) {
        res.satus(400).send(e);
    }
});

//get particular event using id
// router.get("/event/:id", async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const getEve = await Events.findById(_id);
//         res.send(getEve);
//     } catch(e) {
//         res.status(400).send(e);
//     }
// });

//get particular event using name
// router.get("/event/:name", async(req, res) => {
//     try {
//         const name = req.params.name;
//         const getEve = await Events.find({name : name});
//         res.send(getEve);
//     } catch(e) {
//         res.status(400).send(e);
//     }
// });

//FILTER event using category_id
router.get("/event/:category_id", async(req, res) => {
    try {
        const category_id = req.params.category_id;
        const getEve = await Events.find({category_id : category_id});
        res.send(getEve);
    } catch(e) {
        res.status(400).send(e);
    }
});

//UPDATE Event using id
router.patch("/event/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const updateEve = await Events.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateEve);
        console.log("Success");
    } catch(e) {
        res.status(500).send(e);
    }
});

//DELETE Event using id
router.delete("/event/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const delEvent = await Events.findByIdAndDelete(_id);
        res.send(delEvent);
        console.log("Success");
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router;