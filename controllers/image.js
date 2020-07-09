const Clarifai = require ('clarifai');
const app = new Clarifai.App({
  apiKey: '087e65c59b0f4c5689820b2915fffac3'
});

const handleApiCall = (req, res)=>{
	app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input)
    .then(data=> {
    	res.json(data);
    })
    .catch(err=> res.status(400).json('UNABLE TO WORK WITH API'))
}


const handleImage =(req, res, db)=>{
	const {id}= req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json('ERROR GETTING ENTRIES'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}