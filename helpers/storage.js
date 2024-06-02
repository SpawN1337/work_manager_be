const multer = require('multer');
const fs = require('fs');
const si = require('systeminformation');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = req.body.disk + '/videos';
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        cb(err);
      } else {
        cb(null, folderPath);
      }
    });
  },
  filename: (req, file, cb) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = file.originalname + '.' + fileType;
    const filePath = req.body.disk + '/videos/' + fileName;
    if (!fs.existsSync(filePath)) {
      cb(null, fileName);
    } else {
      cb(new Error('فيديو بنفس الاسم موجود بالفعل'));
    }
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['video/mp4', 'video/mpeg', 'video/3gpp'];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single('video');

module.exports = (req, res, next) => {
  storage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: 'Bad Request: ' + err.message });
    } else if (err) {
      res.status(409).json({ message: 'Conflict: ' + err.message });
    } else {
      next();
    }
  });
};  