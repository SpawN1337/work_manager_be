const Folder = require('../models/folderSchema')

//add Folder Controller
exports.addFolder = async (req, res) => {
    try {
        const createdFolder = await Folder.create(req.body)
        res.status(200).json({ message: 'تمت الإضافة بنجاح' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//remove by Id Folder Contoller
exports.removeFolder = async (req, res) => {
    try {
        const deletedFolder = await Folder.findByIdAndDelete(req.params.id)
        res.json({ message: 'تمت عملية الحذف بنجاح' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get all Folders 
exports.allFolders = async (req, res) => {
    try {
        const Folders = await Folder.find({}).populate();
        res.json(Folders);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//update Folder by id controller
exports.updateFolder = async (req, res) => {
    try {
        const updatedFolder = await Folder.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedFolder);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get Folder By id contoller
exports.getFolder = async (req, res) => {
    try {
        const getFolder = await Folder.findById(req.params.id)
        res.json(getFolder);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}