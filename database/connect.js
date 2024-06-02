const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect('mongodb://127.0.0.1:27017/Videos_DB', options).then(connect => {
    console.log("=> connect to databse successfully!")
}).catch(err => {
    console.log("=> connect to database with error :")
    console.log(err);
});
