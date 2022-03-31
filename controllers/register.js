const connection = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.register = async (req, res) => {
	const name = req.body.name.toLowerCase();
	const codigo = req.body.codigo;
	const password = req.body.password;
	const sucursal = req.body.sucursal.toLowerCase();

	let passwordHaash = await bcryptjs.hash(password, 8);

	if (codigo == '2021'){
		connection.query('INSERT INTO login SET ?', {nameLogin: name, passwordLogin: passwordHaash, sucursal: sucursal}, async(error, results)=>{
		 	if(error){
		 		res.render('registro' , {
		 			alert:true,
		 			alertTitle: "Error",
		 			alertMessage: "¡Error en el registro!",
		 			alertIcon: "error",
		 			background: "#3a2a23",
		 			showConfirmButton: true,
		 			confirmButtonColor: '#ed4100',
		 			timer: false,
		 			ruta: '/registro'
		 		})	
		 	}
		 	else
		 	{
		 		res.render('registro', {
		 			alert:true,
		 			alertTitle: "Registro",
		 			alertMessage: "¡Usuario registrado correctamente!",
		 			alertIcon: "success",
		 			background: "#3a2a23",
		 			showConfirmButton: false,
		 			confirmButtonColor: '#ed4100',
		 			timer: 1200,
		 			ruta: '/'
		 		});
		 	}
		})
	}
	else {
		res.render('registro' , {
			alert:true,
			alertTitle: "Error",
			alertMessage: "¡El código ingresado no es válido!",
			alertIcon: "error",
			background: "#3a2a23",
			showConfirmButton: true,
			confirmButtonColor: '#ed4100',
			timer: false,
			ruta: '/registro'
		})	
	}
}