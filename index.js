const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const connection_url = require('./config/mongodb.js')
const propertyRoutes = require('./routes/property.routes')
const advertisementRoutes = require('./routes/advertisement.routes')
const auth = require('./routes/authroute.js')
const Regiter = require('./routes/authroute.js')
const session = require('express-session');
const Property = require('./models/property.model.js')

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4001;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 40000,
    family: 4
};


app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())
app.use(morgan('combined'))
app.use(express.json());
app.options('*', cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use(
    session({
      secret: 'Mynameisnipun',
      resave: false,
      saveUninitialized: false,
    })
  );

mongoose.Promise = global.Promise;
mongoose.connect(connection_url.url, options)
    .then(() => {
        console.log('Connected to the database successfully');
    })
    .catch(error => console.error('Could not connect to database', error));


app.get('/', (req, res) => {
    res.status(200).send("Realstate web app APIs")
})


app.get('/api/dashboard', (req, res) => {
console.log(req.session.isAuthenticated);
if (req.session.isAuthenticated) {
    // User is authenticated, respond with data
    next();
    // return res.json({ data: 'Dashboard data' });
} else {
    res.redirect('/login')
    // return res.status(401).json({ error: 'Not authenticated' });
}
});

app.use(`/api/v1/properties`, propertyRoutes)
app.use(`/api/v1/advertisements` , advertisementRoutes)
app.use(`/api/v1/auth`, auth)

app.post('/query',async(req,res)=>{
    try {
        console.log(req.body);
        const query = req.body;
        const result = await Property.find(query).exec(); // Use .exec() to execute the query
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(401).json("wrong");
    }
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})