const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.insertOne("burger_name", req.body.burger_name, (result) => {
    // Send back the ID of the new quote
    res.json({ burger_name: result });
  });
});

router.put("/api/burgers/:id", (req, res) => {
  const id = req.params.id;

  console.log("devoured", req.body.devoured);

  burger.updateOne(
    req.body.devoured, id, (result) => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

module.exports = router;
