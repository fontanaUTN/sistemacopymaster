const connection = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.ingreso = async (req, res) => {
	const name = req.body.name.toLowerCase();
	const password = req.body.password;

	let passwordHaash = await bcryptjs.hash(password, 8);

	if (name && password){
		connection.query('SELECT * FROM login WHERE nameLogin =?', [name], async (error, results)=>{
			if (Object.keys(results).length == 0 || !(await bcryptjs.compare(password, results[0].passwordLogin))){
				res.render('ingreso', {
		 			alert:true,
		 			alertTitle: "Error",
		 			alertMessage: "¡Ingreso incorrecto!",
		 			alertIcon: "error",
		 			background: "#3a2a23",
		 			showConfirmButton: true,
		 			confirmButtonColor: '#ed4100',
		 			timer: false,
		 			ruta: '/'
		 		});
			}
			else {
				req.session.loggedim = true;
				req.session.sucursal = results[0].sucursal;
				req.session.idLogin = results[0].idLogin;

				res.render('ingreso', {
		 			alert:true,
		 			alertTitle: "Ingreso",
		 			alertMessage: "¡Ingreso correcto",
		 			alertIcon: "success",
		 			background: "#3a2a23",
		 			showConfirmButton: false,
		 			confirmButtonColor: '#ed4100',
		 			timer: 1200,
		 			ruta: '/home_send'
		 		});
			}
		})
	}
	else {
		res.render('registro', {
			alert:true,
			alertTitle: "Error",
			alertMessage: "¡Ingreso incorrecto!",
			alertIcon: "error",
			background: "#3a2a23",
			showConfirmButton: true,
			confirmButtonColor: '#ed4100',
			timer: false,
			ruta: '/'
		});
	}
} 

exports.ingreso_new = async (req, res) => {
	const name = req.body.name.toLowerCase();
	const password = req.body.password;
	const ip = req.body.ip;

	let passwordHaash = await bcryptjs.hash(password, 8);

	if (name && password){
		connection.query('SELECT * FROM login WHERE nameLogin =?', [name], async (error, results)=>{
			if (Object.keys(results).length == 0 || !(await bcryptjs.compare(password, results[0].passwordLogin))){
				res.render('new_ingreso', {
		 			alert:true,
		 			alertTitle: "Error",
		 			alertMessage: "¡Ingreso incorrecto!",
		 			alertIcon: "error",
		 			background: "#3a2a23",
		 			showConfirmButton: true,
		 			confirmButtonColor: '#ed4100',
		 			timer: false,
		 			ruta: '/'
		 		});
			}
			else {
				let id = results[0].idLogin;
				let sucursal = results[0].sucursal;

				if(ip != 0) {
					connection.query('UPDATE login SET ? WHERE idLogin = ?', [{ip:ip}, id], (error, result)=>{
						if(error){
							console.log(error);
						}
						else{
							req.session.loggedim = true;
							req.session.sucursal = sucursal;
							req.session.idLogin = id;

							res.render('new_ingreso', {
					 			alert:true,
					 			alertTitle: "Ingreso",
					 			alertMessage: "¡Ingreso correcto",
					 			alertIcon: "success",
					 			background: "#3a2a23",
					 			showConfirmButton: false,
					 			confirmButtonColor: '#ed4100',
					 			timer: 1200,
					 			ruta: '/home_send'
					 		});
						}
					})
				}
				else {
					req.session.loggedim = true;
					req.session.sucursal = sucursal;
					req.session.idLogin = id;	

					res.render('new_ingreso', {
			 			alert:true,
			 			alertTitle: "Ingreso",
			 			alertMessage: "¡Ingreso correcto",
			 			alertIcon: "success",
			 			background: "#3a2a23",
			 			showConfirmButton: false,
			 			confirmButtonColor: '#ed4100',
			 			timer: 1200,
			 			ruta: '/home_send'
			 		});
				}
			}
		})
	}
	else {
		res.render('new_ingreso', {
			alert:true,
			alertTitle: "Error",
			alertMessage: "¡Ingreso incorrecto!",
			alertIcon: "error",
			background: "#3a2a23",
			showConfirmButton: true,
			confirmButtonColor: '#ed4100',
			timer: false,
			ruta: '/'
		});
	}
} 

exports.ingreso_send = (req, res) => {
	const ip = req.params.ip;

	connection.query('SELECT * FROM login WHERE ip =?', [ip], (error, results)=>{
		if (results.length == 0){
			res.redirect('/ingreso_new');
		}
		else {
			req.session.loggedim = true;
			req.session.sucursal = results[0].sucursal;	
			req.session.idLogin = results[0].idLogin;

			res.redirect('/home_send');
		}
	})
}