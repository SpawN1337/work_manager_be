const express = require('express');
const router = express.Router();
// reuire controller
const placeController = require("../controllers/placeController");

// add one place
router.post('/addplace', placeController.addPlace)

// Remove one place
router.delete('/removeplace/:id', placeController.removePlace)

//get all places
router.get('/allplaces', placeController.allPlaces)

// update place by id
router.put('/updateplace/:id', placeController.updatePlace)

//get place by id
router.get('/getplace/:id', placeController.getPlace)

module.exports = router;