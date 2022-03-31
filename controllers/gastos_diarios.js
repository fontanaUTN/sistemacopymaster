const connection = require('../database/db');

exports.init = (req, res)=>{
	if(req.session.loggedim){
		res.render('gastos_diarios', {
			login: true,
		});
	}
	else {
		res.render('gastos_diarios',{
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

	let gastos1 = parseInt(req.body.gastos1,10);
	let gastos2 = parseInt(req.body.gastos2,10);
	let gastos3 = parseInt(req.body.gastos3,10);
	let gastos4 = parseInt(req.body.gastos4,10);

	if(isNaN(gastos1)) { gastos1 = 0; }	else{ gastos1 = gastos1; }
	if(isNaN(gastos2)) { gastos2 = 0; }	else{ gastos2 = gastos2; }
	if(isNaN(gastos3)) { gastos3 = 0; }	else{ gastos3 = gastos3; }
	if(isNaN(gastos4)) { gastos4 = 0; }	else{ gastos4 = gastos4; }

	let gastos = gastos1 + gastos2 + gastos3;

	if(req.session.loggedim){
		if(gastos == 0){
			res.render('gastos_diarios', {
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
		else{
			connection.query(`SELECT * FROM ${table} WHERE id=${day}`, (error, results)=>{
				if (error) {
					console.log(error);
			 		res.render('gastos_diarios' , {
			 			alert:true,
			 			login: true,
			 			alertTitle: "Error",
			 			alertMessage: "¡Error de conexión!",
			 			alertIcon: "error",
			 			background: "#3a2a23",
			 			showConfirmButton: true,
			 			confirmButtonColor: '#ed4100',
			 			timer: false,
			 			ruta: '/gastos_diarios'
			 		})
				}
				else{
					let db = results[0].gastos;
					gastos = gastos + db;

					connection.query(`UPDATE ${table} SET gastos='${gastos}' WHERE id=${day}`, (error, results)=>{
					 	if(error){
					 		console.log(error);
					 		res.render('gastos_diarios' , {
					 			alert:true,
					 			login: true,
					 			alertTitle: "Error",
					 			alertMessage: "¡Error de conexión!",
					 			alertIcon: "error",
					 			background: "#3a2a23",
					 			showConfirmButton: true,
					 			confirmButtonColor: '#ed4100',
					 			timer: false,
					 			ruta: '/gastos_diarios'
					 		})	
					 	}
					 	else
					 	{
					 		res.render('gastos_diarios', {
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
	}
	else {
		res.render('gastos_diarios',{
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
