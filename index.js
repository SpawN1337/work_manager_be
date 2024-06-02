const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const flash = require('connect-flash');//?
const session = require('express-session');//?
const bodyParser = require('body-parser');
const path = require('path');
//Require to use .env
require('dotenv').config()

const app = express()
const port = 5000

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));

//Morgan Config
app.use(morgan('dev'))

// database connection 
require('./database/connect')

//BearerStrategy with passport
require('./passport/bearerStrategy')
app.use('/images', express.static(path.join('images')));
// config body parser
app.use(express.json())
app.use(bodyParser.json());
// cors
app.use(cors()) 

app.get('/', (req, res) => {
  res.send({mesage : 'Hello World!'})
})
//flash
app.use(flash());

// require routes 
const userApi = require('./routes/userAPi');
const authApi = require('./routes/authAPI');
const videoApi = require('./routes/videoAPI');
const folderApi = require('./routes/folderAPI');
const placeApi = require('./routes/placeAPI');
const gradeApi = require('./routes/gradeAPI');

app.use('/api/v1', userApi);
app.use('/api/v1', authApi);
app.use('/api/v1', videoApi);
app.use('/api/v1', folderApi);
app.use('/api/v1', placeApi);
app.use('/api/v1', gradeApi);


app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})
