const connection = require('../database/db');

exports.init = (req, res)=>{
	if(req.session.loggedim){
		res.render('recaudacion', {
			login: true,
		});
	}
	else {
		res.render('recaudacion',{
			login: false,
	 		alert: true,
	 		alertTitle: "advertencia",
	 		alertMessage: "Disculpe, debe iniciar sesión",
	 		alertIcon: "warning",
	 		background: "#3a2a23",
	 		showConfirmButton: true,
	 		confirmButtonColor: '#ed4100',
	 		timer: false,
	 		ruta: '/'
	 	});
	}
}

exports.send = (req, res)=>{

	let year = req.body.fecha.slice(0, 4);
	let month = req.body.fecha.slice(5, 7);
	let day = req.body.fecha.slice(8, 10);
	
	if (month < 10 ){
		month = month.slice(-1);
	}

	const meses = [0,'enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
	let table = `${req.session.sucursal}${meses[month]}`;

	let recaudacion = parseInt(req.body.recaudacion,10);

	if(isNaN(recaudacion)) { 
		res.render('recaudacion', {
			alert:true,
			login: true,
			alertTitle: "Exito",
			alertMessage: "¡Datos enviados correctamente!",
			alertIcon: "success",
			background: "#3a2a23",
			showConfirmButton: false,
			confirmButtonColor: '#ed4100',
			timer: 1200,
			ruta: '/home_send'
		});
	}
	else if(req.session.loggedim){
		connection.query(`SELECT * FROM ${table} WHERE id=${day}`, (error, results)=>{
			if (error) {
				console.log(error);
		 		res.render('recaudacion' , {
		 			alert:true,
		 			login: true,
		 			alertTitle: "Error",
		 			alertMessage: "¡Error de conexión!",
		 			alertIcon: "error",
		 			background: "#3a2a23",
		 			showConfirmButton: true,
		 			confirmButtonColor: '#ed4100',
		 			timer: false,
		 			ruta: '/recaudacion'
		 		})
			}
			else{
				let db = results[0].recaudacion;
				recaudacion = recaudacion + db;

				connection.query(`UPDATE ${table} SET recaudacion='${recaudacion}' WHERE id=${day}`, (error, results)=>{
				 	if(error){
				 		console.log(error);
				 		res.render('recaudacion' , {
				 			alert:true,
				 			login: true,
				 			alertTitle: "Error",
				 			alertMessage: "¡Error de conexión!",
				 			alertIcon: "error",
				 			background: "#3a2a23",
				 			showConfirmButton: true,
				 			confirmButtonColor: '#ed4100',
				 			timer: false,
				 			ruta: '/recaudacion'
				 		})	
				 	}
				 	else
				 	{
				 		res.render('recaudacion', {
				 			alert:true,
				 			login: true,
				 			alertTitle: "Exito",
				 			alertMessage: "¡Datos enviados correctamente!",
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
		})
	}
	else {
		res.render('recaudacion',{
			login: false,
	 		alert: true,
	 		alertTitle: "advertencia",
	 		alertMessage: "Disculpe, debe iniciar sesión",
	 		alertIcon: "warning",
	 		background: "#3a2a23",
	 		showConfirmButton: true,
	 		confirmButtonColor: '#ed4100',
	 		timer: false,
	 		ruta: '/'
	 	});
	}
}
