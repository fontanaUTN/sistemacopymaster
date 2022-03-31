const connection = require('../database/db');

exports.logout = (req, res) =>{
	idLogin = req.session.idLogin;

	connection.query('UPDATE login SET ? WHERE idLogin = ?', [{ip:null}, idLogin], (error, result)=>{
		if(error){
			console.log(error);
		}
		else{
			req.session.destroy(()=>{
				res.redirect('/')
			})
		}
	})
}