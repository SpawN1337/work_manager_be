const Place = require('../models/placeSchema')

//add Place Controller
exports.addPlace = async (req, res) => {
    try {
        const createdPlace = await Place.create(req.body)
        res.status(200).json({ message: 'تمت الإضافة بنجاح' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//remove by Id Place Contoller
exports.removePlace = async (req, res) => {
    try {
        const deletedPlace = await Place.findByIdAndDelete(req.params.id)
        res.json({ message: 'تمت عملية الحذف بنجاح' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get all Places 
exports.allPlaces = async (req, res) => {
    try {
        const Places = await Place.find({}).populate();
        res.json(Places);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//update Place by id controller
exports.updatePlace = async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedPlace);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get Place By id contoller
exports.getPlace = async (req, res) => {
    try {
        const getPlace = await Place.findById(req.params.id)
        res.json(getPlace);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}