const connection = require('../database/db');

exports.init = (req, res)=>{
	if(req.session.loggedim){
		res.render('repuestos', {
			login: true,
		});
	}
	else {
		res.render('repuestos',{
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

exports.send = (req, res) => {

	let respuesto1 = req.body.respuesto;
	let precio1 = parseInt(req.body.precio,10);
	let respuesto2 = req.body.respuesto2;
	let precio2 = parseInt(req.body.precio2,10);
	let respuesto3 = req.body.respuesto3;
	let precio3 = parseInt(req.body.precio3,10);
	let respuesto4 = req.body.respuesto4;
	let precio4 = parseInt(req.body.precio4,10);
	let cantidad = 1;

	let year = req.body.fecha.slice(0, 4);
	let month = req.body.fecha.slice(5, 7);
	let day = req.body.fecha.slice(8, 10);
	
	if (month < 10 ){
		month = month.slice(-1);
	}

	const meses = [0,'enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
	let table = `${req.session.sucursal}otros`;
	let fecha = `${day}/${month}/${year}`;

	if (respuesto1 == "" && isNaN(precio1)){
		res.render('repuestos', {
			alert:true,
			login: true,
			alertTitle: "Exito",
			alertMessage: "¡Datos enviados correctamente!",
			alertIcon: "success",
			background: "#3a2a23",
			showConfirmButton: false,
	 		confirmButtonColor: '#ed4100',
			timer: 1200,
			ruta: 'home_send'
	 	});
	}
	else{

		if(isNaN(precio1)){ precio1 = 0;}else{ precio1 = precio1;}

		connection.query(`INSERT INTO ${table} SET ?`, {fecha:fecha, cantidad:cantidad, remito:respuesto1,
		precio:precio1, mes:month}, (error, results)=>{
			if(error){
				console.log(error);
		 		res.render('repuestos' , {
		 			alert:true,
		 			login: true,
		 			alertTitle: "Error",
		 			alertMessage: "¡Error de conexión!",
		 			alertIcon: "error",
		 			background: "#3a2a23",
		 			showConfirmButton: true,
		 			confirmButtonColor: '#ed4100',
		 			timer: false,
		 			ruta: '/repuestos'
		 		})	
			}
			else if (respuesto2 == "" && isNaN(precio2)){
				res.render('repuestos', {
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
			
				if(isNaN(precio2)){ precio2 = 0;}else{ precio2 = precio2;}

				connection.query(`INSERT INTO ${table} SET ?`, {fecha:fecha, cantidad:cantidad, remito:respuesto2,
				precio:precio2, mes:month}, (error, results)=>{
					if(error){
						console.log(error);
			 			res.render('repuestos' , {
			 				alert:true,
			 				login: true,
			 				alertTitle: "Error",
			 				alertMessage: "¡Error de conexión!",
			 				alertIcon: "error",
			 				background: "#3a2a23",
			 				showConfirmButton: true,
			 				confirmButtonColor: '#ed4100',
			 				timer: false,
			 				ruta: '/repuestos'
			 			})	
					}
					else if (respuesto3 == "" && isNaN(precio3)){
						res.render('repuestos', {
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
					else {

						if(isNaN(precio3)){ precio3 = 0;}else{ precio3 = precio3;}

						connection.query(`INSERT INTO ${table} SET ?`, {fecha:fecha, cantidad:cantidad, remito:respuesto3,
						precio:precio3, mes:month}, (error, results)=>{
							if(error){
								console.log(error);
					 			res.render('repuestos' , {
					 				alert:true,
					 				login: true,
					 				alertTitle: "Error",
					 				alertMessage: "¡Error de conexión!",
					 				alertIcon: "error",
					 				background: "#3a2a23",
					 				showConfirmButton: true,
					 				confirmButtonColor: '#ed4100',
					 				timer: false,
					 				ruta: '/repuestos'
					 			})	
							}
							else if(respuesto4 == "" && isNaN(precio4)){
								res.render('repuestos', {
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
							else {

								if(isNaN(precio4)){ precio4 = 0;}else{ precio4 = precio4;}

								connection.query(`INSERT INTO ${table} SET ?`, {fecha:fecha, cantidad:cantidad, remito:respuesto4,
								precio:precio4, mes:month}, (error, results)=>{
									if(error){
										console.log(error);
							 			res.render('repuestos' , {
							 				alert:true,
							 				login: true,
							 				alertTitle: "Error",
							 				alertMessage: "¡Error de conexión!",
							 				alertIcon: "error",
							 				background: "#3a2a23",
							 				showConfirmButton: true,
							 				confirmButtonColor: '#ed4100',
							 				timer: false,
							 				ruta: '/repuestos'
							 			})	
									}
									else{
										res.render('repuestos', {
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
				})
			}
		})
	}
}
