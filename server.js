const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express();

const signinController = require('./controller/SigninController.js');
const registerController = require('./controller/RegisterColltroller.js');
const getProfileController = require('./controller/GetProfileCtl.js');
const imageController = require('./controller/ImageController.js');


const db = knex({
	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    user : 'xuan20cm',
    password : '123',
    database : 'smart-brain'
	}
})
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {signinController.SigninController(req, res, db, bcrypt)})

app.post('/register', (req, res) => {registerController.RegisterController(req, res, db, bcrypt)} )

app.get('/profile/:id', (req, res) => {getProfileController.GetProfileController(req, res, db, bcrypt)})

app.put('/image',(req, res) => {imageController.ImageController(req, res, db, bcrypt)})

app.listen(3000, () => {
	console.log('app is running');
})

