const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '0d8a2d7fde5e43488016c5e2e10ff6af'
  });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        /* "https://samples.clarifai.com/face-det.jpg" */
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}


        

const handleImage = (req, res, db) => { //we have to find the ids in order to update the entries
    const { id } = req.body; //instead of params we will receive users id from the BODY!
    db('users').where('id', '=', id) //equals not === because its sql
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            //console.log(entries);
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}