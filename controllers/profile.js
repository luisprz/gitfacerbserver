const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    //let found = false; //because we re reasignin it 
    db.select('*').from('users').where({ id }) //because both properties and value are the same i dont have to di id:id
        .then(user => {
            //console.log(user)
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not Found')
            }
        })
        .catch(err => res.status(400).json('Error getting user'))


    /*  database.users.forEach(users => { //foreach will run through the users one at a time and we'll say if user from db === user id from received params we'll respond with json user
        if(users.id === id) {
            found = true;
            return res.json(users); //instead of returning from a loop just send that return and if isnt found instead of else, do a variable found with is default to false.
        }
    }) // we can also do a map or a filter to see if we can find a person with an id 
     */
    // if (!found) {
    //     res.status(400).json('Not Found');
    // }
}

module.exports = {
    handleProfileGet
};