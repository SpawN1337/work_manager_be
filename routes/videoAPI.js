const express = require('express');
const router = express.Router();

// reuire Controller
const VideoController = require('../controllers/videoController')
const storage = require('../helpers/storage');

// add one Video
router.get('/getuploads', VideoController.getVideo);

// router.post('/addvideo', VideoController.ad)
router.post('/upload', storage, VideoController.postVideo);

// Remove one Video
router.delete('/removeupload/:id', VideoController.removeVideo)

// search
router.post('/search', VideoController.search)
//daysearch
router.post('/dayvideos', VideoController.dayvideos)

// get all Videos
router.get('/getvideos', VideoController.getVideos)

// update Video by id
// router.put('/updatevideo/:id', VideoController.updateVideo)

//get Video by id
router.get('/getupload/:id', VideoController.getVideo)

//get disks
router.get('/disks', VideoController.disk)



module.exports = router;