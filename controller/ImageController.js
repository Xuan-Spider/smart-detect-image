
const ImageController = (req, res,db, bcrypt) => {
	const {id} = req.body;
	console.log(res.body);
	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0]);
	  }).catch(err => {
	  	res.status(400).json("get err");
	  })
}

module.exports = {
	ImageController : ImageController
}