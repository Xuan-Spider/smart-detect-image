
const RegisterController = (req, res,db, bcrypt) => {
	const {email, name, password} = req.body;
	const hash = bcrypt.hashSync(password);
	//step1  : thuc hien transaction vao bang login
	//step2 : tra ve email tu bang login neu thanh cong roi ms insert vao bang user
	db.transaction(trx => {
		trx.insert({
			hash : hash,
			email : email
		})
		.into('login')
		.returning('email')
		.then(emailLogin => {
			return trx('users')
			.returning('*')
			.insert({
				email : emailLogin[0],
				name : name,
				joined : new Date()
			}).then(user => {
				res.json(user[0]); 	
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})	
	.catch(err => res.status(400).json("unable to register"))

}

module.exports = {
	RegisterController : RegisterController
}