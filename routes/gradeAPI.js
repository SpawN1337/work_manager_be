const express = require('express');
const router = express.Router();
// reuire controller
const gradeController = require("../controllers/gradeController");

// add one grade
router.post('/addgrade', gradeController.addGrade)

// Remove one grade
router.delete('/removegrade/:id', gradeController.removeGrade)

//get all grade
router.get('/allgrades', gradeController.allGrades)

// update grade by id
router.put('/updategrade/:id', gradeController.updateGrade)

//get grade by id
router.get('/getgrade/:id', gradeController.getGrade)

module.exports = router;