/* end points to be created :

/ --> res = this is working
/signin -> POST = responds with success/fail
will also have a register --> POST = user
/profile/:userId --> GET = user     //will have a proile with aditional parameter like userid and returns the user
/image --> PUT --> user  
*/


//For postman HTML form uses form-data. while json form uses raw data and then JSON (app/json)

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

/*  //console.log(postgres.select('*').from('users'));//if i actually want to access something from the users i will have to do .then because it returns a promise and we get our response
 db.select('*').from('users').then(data => {
     console.log(data);

 }); */


const app = express();


// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             password: 'cookies',
//             email: 'john@gmail.com',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             password: 'bananas',
//             email: 'Sally@gmail.com',
//             entries: 0,
//             joined: new Date()
//         }
//     ]/* ,
//     login: [
//         {
//             id: '987',
//             has: '',
//             email: 'john@gmail.com'
//         }
//     ] */
// }


// app.use(express.static(__dirname + '/public')) //in order to get express to send static files we can do that middleware that comes with express already. and within here we give our file path //going to printout node then public
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send(database.users) })

//We're not gonna necessarily just say sign in and that's it. We want to check whatever the user enters on the front end it's going to come back here in the response or in the request and we want to check it with our current list of users to make sure that their passwords match so it sounds like we need some sort of a database
//Error people always forget. When we are sending data from the front end and is using json, well we need to parse it. because express doesnt know what we just send over. and to be able to request that body we need to body parserRR!!!
app.post('/signin', signin.handleSignin(db, bcrypt)) //cleaner without repetition req,res way //automatically receives req and res
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })//its call dependency injection! where we are calling whatever dependencies this function needs. //register.hadnleregister will get the request and response so that when register endpoint gets hit i get req and res
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db) })


//we will receive users id from the body and we wanna say that if the user id matches, we'll response with the user.entries and this entries we wanna increase.
//to test, postman /image post req wich means a Body and we can just pass users id.


app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })


//old image endpoint
/* app.put('/image', (req, res) => { //we have to find the ids in order to update the entries
    const { id } = req.body; //instead of params we will receive users id from the BODY!
    let found = false; //because we re reasignin it 
    database.users.forEach(users => { //foreach will run through the users one at a time and we'll say if user from db === user id from received params we'll respond with json user
        if (uses.id === id) {
            found = true;
            user.entries ++
            return res.json(users.entries); //instead of returning from a loop just send that return and if isnt found instead of else, do a variable found with is default to false.
        }
    })
    if (!found) {
        res.status(400).json('Not Found');
    }
})
 */


//THIS IS HOW TO USE BCRYPTNODEJS
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     //store hash in your password DB
// })
// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(3001, () => {
    console.log('app is running on port 3001');
})






//Important things to remember: 
//
// app.use(bodyParser.urlencoded({extended: false})); //porque solo le dijimos to parse urlencoded, needs to also know about json
// app.use(bodyParser.json()); //to bodyparser know about json
// app.get('/', (req, res) => {
// /*  req.query = what we do when a get query
//     req.body = we can add that middleware to receive whatever the requests sense in the body
//     req.header = to throw all headers of the data
//     req.params = this is a syntax where you use the parameters of the URL of example /:id you get the id parameter      */ 
//     //most popular used properties of request 
//     res.send("getting root");
// });

// app.get('/profile', (req, res) => {
//     res.send("getting profile");
// });

// POST requests are never cached
// POST request will not remain in the browser history
// No restriction on data length
// app.post('/profile', (req, res) => { 
//     console.log(req.body)
//     res.send('Success');
// });
// app.listen(3000);

