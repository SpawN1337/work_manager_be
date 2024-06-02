const Grade = require('../models/gradeSchema')

//add Grade Controller
exports.addGrade = async (req, res) => {
    try {
        const createdGrade = await Grade.create(req.body)
        res.json(createdGrade);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//remove by Id Grade Contoller
exports.removeGrade = async (req, res) => {
    try {
        const deletedGrade = await Grade.findByIdAndDelete(req.params.id)
        res.json({ message: 'deleted Grade successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get all Grades 
exports.allGrades = async (req, res) => {
    try {
        const Grades = await Grade.find({}).populate();
        res.json(Grades);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//update AirCraGradeft by id controller
exports.updateGrade = async (req, res) => {
    try {
        const updatedGrade = await AirCGraderaft.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedGrade);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get Grade By id contoller
exports.getGrade = async (req, res) => {
    try {
        const Grade = await Grade.findById(req.params.id)
        res.json(Grade);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}