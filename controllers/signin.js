const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission'); //within end excecution within a function we have to do return. 
     }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); // true
            //console.log(isValid);
            if (isValid) {
                return db.select('*').from('users') //hay que retornarla in order for db.select rememberss
                    .where('email', '=', email)
                    .then(user => {
                        //console.log(user);
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))


    /*     //res.send('signin')//express comes with a built in Json method
        // res.json('signin')//that way we receive "whatever" in json formatinstead of whatever
        bcrypt.compare("klk2", '$2a$10$O0X6B7Coans55msGKGhWieIO2jf7x61hR2GQw4PheS2xpY8RfLMI2', function (err, res) {
            // res == true
            console.log('first guess', res)
        });
        bcrypt.compare("veggies", '$2a$10$O0X6B7Coans55msGKGhWieIO2jf7x61hR2GQw4PheS2xpY8RfLMI2', function (err, res) {
            // res = false
            console.log('second guess', res)
        });
     */
    /*     if (req.body.email === database.users[0].email &&
            req.body.password === database.users[0].password) {
                res.json('success');
            } else {
                res.status(400).json('error loggin in');
            } */
}

module.exports = {
    handleSignin: handleSignin
}