const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body; //using destructuring we say rename name pass from req.body.
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // });
    /*  database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0, //because will be new user with empty entries
        joined: new Date() //it will generate whatever this is run
    }) */
    if (!email || !name || !password) {
       return res.status(400).json('incorrect form submission'); //within end excecution within a function we have to do return. 
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => { //you create a transaction when doing more than 2 things at once. and you use trx instead of db to this operations. inserting into login. returning email and then we use the loginemail to also return another trx transaction to insert into the users and respond with json. and in order to this to get added we have to make sure that we commit and in case anything fails we rollback the changes!!! 
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*') //sending a res.json but it will respond What?. knex is built with this in mind and has a feature or method (RETURNING) so instead of doing another select statement and grabbing user. we can just say returning * so this says users insert "ann" and return all columns
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]); //grab the last item in the array. if not doing it. when sending something it will be loading forever.
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'))
}


module.exports = {
    handleRegister: handleRegister
};