const express = require('express');
const router = express.Router();
// reuire controller
const folderController = require("../controllers/folderController");

// add one Folder
router.post('/addfolder', folderController.addFolder )

// Remove one Folder
router.delete('/removefolder/:id', folderController.removeFolder)

//get all Folders
router.get('/allfolders', folderController.allFolders)

// update Folder by id
router.put('/updatefolder/:id', folderController.updateFolder)

//get Folder by id
router.get('/getfolder/:id', folderController.getFolder)

module.exports = router;