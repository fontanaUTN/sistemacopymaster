const connection = require('../database/db');

exports.init = (req, res)=>{
	if(req.session.loggedim){
		res.render('bajas_dobles_color', {
			login: true,
		});
	}
	else {
		res.render('bajas_dobles_color',{
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

	const meses = [0,'enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
	let table = `${req.session.sucursal}${meses[month]}`;

	let bDoblesColor = parseInt(req.body.input,10);

	if(isNaN(bDoblesColor)) { 
		res.render('bajas_dobles_color', {
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

	}else if(req.session.loggedim){

		connection.query(`SELECT * FROM ${table} WHERE id=${day}`, (error, results)=>{
			if (error) {
				console.log(error);
		 		res.render('bajas_dobles_color' , {
		 			alert:true,
		 			login: true,
		 			alertTitle: "Error",
		 			alertMessage: "¡Error de conexión!",
		 			alertIcon: "error",
		 			background: "#3a2a23",
		 			showConfirmButton: true,
		 			confirmButtonColor: '#ed4100',
		 			timer: false,
		 			ruta: '/bajas_dobles_color'
		 		})
			}
			else{
				let db = results[0].bajasDoblesColor;
				bDoblesColor = bDoblesColor + db;

				connection.query(`UPDATE ${table} SET bajasDoblesColor='${bDoblesColor}' WHERE id=${day}`, (error, results)=>{
				 	if(error){
				 		console.log(error);
				 		res.render('bajas_dobles_color' , {
				 			alert:true,
				 			login: true,
				 			alertTitle: "Error",
				 			alertMessage: "¡Error de conexión!",
				 			alertIcon: "error",
				 			background: "#3a2a23",
				 			showConfirmButton: true,
				 			confirmButtonColor: '#ed4100',
				 			timer: false,
				 			ruta: '/bajas_dobles_color'
				 		})	
				 	}
				 	else
				 	{
				 		res.render('bajas_dobles_color', {
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
		res.render('bajas_dobles_color',{
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