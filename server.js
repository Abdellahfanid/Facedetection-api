const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'abdo',
		database:'facedetection'
	}
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{res.send(database.users);})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=> {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res)=> {image.handleImage(req, res, db)})

app.post('/imageUrl', (req, res)=> {image.handleApiCall(req, res)})

app.listen(3001, ()=>{console.log('app is running ');})


bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

/*bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
});*/

// Load hash from your password DB.





/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/Profile/: userId --> GET = user
/image --> PUT --> user

*/