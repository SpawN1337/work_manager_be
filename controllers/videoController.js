const Video = require('../models/videoSchema');
const fs = require('fs');
var mongoose = require('mongoose');
const si = require('systeminformation');

//get all videos
exports.search = async (req, res) => {
  if (req.body.words != null || req.body.aircraft != null || req.body.aircraft != null || req.body.place != null
    || req.body.start != null || req.body.end != null) {
    var pipeline = [
      // {
      //   $lookup:
      //   {
      //     from: "aircrafts",
      //     localField: "aircraft",
      //     foreignField: "_id",
      //     as: "aircraft"
      //   }
      // },
      // {
      //   $set: {
      //     aircraft: "$aircraft.nomAirCraft",
      //   }
      // },
      {
        $project: {
          name: "$name",
          aircraft: "$aircraft",
          place: "$place",
          tag: "$tag",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
        }
      }]
    if (req.body.aircraft != null) {
      // pipeline.unshift({ $match: { "aircraft": mongoose.Types.ObjectId(req.body.aircraft) } });
      pipeline.unshift({ $match: { "aircraft": req.body.aircraft } });
    }
    if ((req.body.start != null)) {
      pipeline.unshift({ $match: { "date": { "$gte": new Date(req.body.start) } } });
    }
    if (req.body.end != null) {
      pipeline.unshift({ $match: { "date": { "$lte": new Date(req.body.end) } } });
    }
    if (req.body.words != null) {
      pipeline.unshift({ $match: { $text: { $search: req.body.words } } });
    }
    try {
      const videos = await Video.aggregate(pipeline);
      res.status(200).json({ videos });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else { res.status(500).json({ message: 'لم يتم تحديد معلومات البحث' }); }
};

//dayvideos
exports.dayvideos = async (req, res) => {
  if (req.body.date) {
    var pipeline = [
      // {
      //   $lookup:
      //   {
      //     from: "aircrafts",
      //     localField: "aircraft",
      //     foreignField: "_id",
      //     as: "aircraft"
      //   }
      // },
      // {
      //   $set: {
      //     aircraft: "$aircraft.nomAirCraft",
      //   }
      // },
      {
        $project: {
          name: "$name",
          aircraft: "$aircraft",
          place: "$place",
          tag: "$tag",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
        }
      }]
    if ((req.body.date != null)) {
      pipeline.unshift({ $match: { "date": { "$eq": new Date(req.body.date) } } });
    }
    try {
      const videos = await Video.aggregate(pipeline);
      res.status(200).json({ videos });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  else { res.status(500).json({ message: 'لم يتم تحديد اليوم' }); }
};

//get all videos
exports.getVideos = async (req, res) => {
  var pipeline = [
    {
      $lookup:
      {
        from: "aircrafts",
        localField: "aircraft",
        foreignField: "_id",
        as: "aircraft"
      }
    },
    {
      $set: {
        aircraft: "$aircraft.nomAirCraft",
      }
    },
    {
      $project: {
        name: "$name",
        aircraft: "$aircraft",
        place: "$place",
        tag: "$tag",
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
      }
    }]
  const videos = await Video.aggregate(pipeline);
  res.status(200).json({ videos });
};


//watch video
exports.getVideo = async (req, res) => {
  const disks = await si.fsSize();
  const video = await Video.findById(req.params.id)
  for (const i in disks) {
    filePath = disks[i].mount + "/" + video.videoPath;
    if (fs.existsSync(filePath)) {
      filePath = filePath;
      break;
    }
  }

  try {
    if (!filePath) {
      return res.status(500).json({ message: 'لم يتم العثور على الفيديو' });
    }
    else {
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      let range = req.headers.range;
      console.log("range", range)
      if (!range) range = 'bytes=0-'
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4'
        };
        res.writeHead(206, head);
        file.pipe(res);
      }
      else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res)
      }
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'لم يتم العثور على الفيديو' });
  }


}

//remove by Id Inspecstib Contoller
exports.removeVideo = async (req, res) => {
  const disks = await si.fsSize();
  const video = await Video.findById(req.params.id)
  for (const i in disks) {
    try {
      const filePath = disks[i].mount + '/' + video.videoPath;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        const deleteVideo = await Video.findByIdAndDelete(req.params.id);
        return res.json({ message: 'Deleted video successfully' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // If the loop completes without finding the video file
  res.status(500).json({ message: 'لم يتم العثور على الفيديو لحذفه' });

  // for (const i in disks) {
  //   try {

  //     filePath = disks[i].mount + "/" + video.videoPath;
  //     if (fs.existsSync(filePath)) {
  //       fs.unlinkSync(filePath);
  //       const deleteVideo = await Video.findByIdAndDelete(req.params.id)
  //       res.json({ message: 'deleted Video successfully' });
  //     }
  //     // else{res.status(500).json({ message: 'لم يتم العثور على الفيديو لحذفه' });}


  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  //   res.status(500).json({ message: 'لم يتم العثور على الفيديو لحذفه' });
  // }
}

//update Consominfo by id controller
// exports.updateVideo = async (req, res) => {
//   try {
//     const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     res.json(updatedVideo);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }

// }

exports.postVideo = async (req, res) => {
  console.log("body",req.body)
  console.log("file",req.file)
    const _id = req.body._id;
    const name = req.body.name;
    const aircraft = req.body.aircraft;
    const place = req.body.place;
    const date = req.body.date;
    const tag = req.body.tag.split(",");
    const filename = req.file.filename;
    const videoPath = 'videos/' + req.file.filename; // Note: set path dynamically
    const video = new Video({
      _id,
      name,
      aircraft,
      place,
      date,
      tag,
      filename,
      videoPath,
    });
    try {
    const createdVideo = await video.save();
    res.status(201).json({
      video: {
        ...createdVideo._doc,
      },
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'فيديو بنفس الاسم موجود بالفعل' });
  }
};

//Get disks
exports.disk = async (req, res) => {
  try {
    const disks = await si.fsSize();
    // const rootDisk = disks.find(disk => disk.mount === '/'); //routDisk
    res.json(disks);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}