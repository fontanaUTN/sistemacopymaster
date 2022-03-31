const connection = require('../database/db');

exports.init = (req, res)=>{
	if(req.session.loggedim){
		res.render('bajas_simples', {
			login: true,
		});
	}
	else {
		res.render('bajas_simples',{
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

	let bajasSimples = parseInt(req.body.input,10);

	if(isNaN(bajasSimples)) { 
		res.render('bajas_simples', {
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
	else	if(req.session.loggedim) {

		connection.query(`SELECT * FROM ${table} WHERE id=${day}`, (error, results)=>{
			if (error) {
				console.log(error);
		 		res.render('bajas_simples' , {
		 			alert:true,
		 			login: true,
		 			alertTitle: "Error",
		 			alertMessage: "¡Error de conexión!",
		 			alertIcon: "error",
		 			background: "#3a2a23",
		 			showConfirmButton: true,
		 			confirmButtonColor: '#ed4100',
		 			timer: false,
		 			ruta: '/bajas_simples'
		 		})
			}
			else{
				let db = results[0].bajasSimples;
				bajasSimples = bajasSimples + db;

				connection.query(`UPDATE ${table} SET bajasSimples='${bajasSimples}' WHERE id=${day}`, (error, results)=>{
				 	if(error){
				 		console.log(error);
				 		res.render('bajas_simples' , {
				 			alert:true,
				 			login: true,
				 			alertTitle: "Error",
				 			alertMessage: "¡Error de conexión!",
				 			alertIcon: "error",
				 			background: "#3a2a23",
				 			showConfirmButton: true,
				 			confirmButtonColor: '#ed4100',
				 			timer: false,
				 			ruta: '/bajas_simples'
				 		})	
				 	}
				 	else
				 	{
				 		res.render('bajas_simples', {
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
		res.render('bajas_simples',{
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
