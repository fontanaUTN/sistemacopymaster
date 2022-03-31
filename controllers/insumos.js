const connection = require('../database/db');

exports.init = (req, res)=>{
	if(req.session.loggedim){
		res.render('insumos', {
			login: true,
		});
	}
	else {
		res.render('insumos',{
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

	let anillo7 = parseInt(req.body.anillo_7,10);
	let anillo9 = parseInt(req.body.anillo_9,10);
	let anillo12 = parseInt(req.body.anillo_12,10);
	let anillo14 = parseInt(req.body.anillo_14,10);
	let anillo17 = parseInt(req.body.anillo_17,10);
	let anillo20 = parseInt(req.body.anillo_20,10);
	let anillo23 = parseInt(req.body.anillo_23,10);
	let anillo25 = parseInt(req.body.anillo_25,10);
	let anillo29 = parseInt(req.body.anillo_29,10);
	let anillo33 = parseInt(req.body.anillo_33,10);
	let anillo40 = parseInt(req.body.anillo_40,10);
	let anillo45 = parseInt(req.body.anillo_45,10);
	let anillo50 = parseInt(req.body.anillo_50,10);
	let hojasA4 = parseInt(req.body.hojas_a4,10);
	let hojasOficio = parseInt(req.body.hojas_oficio,10);
	let hojasA3 = parseInt(req.body.hojas_a3,10);
	let hojasColor = parseInt(req.body.hojas_color,10);
	let cartulina = parseInt(req.body.cartulina,10);
	let plastificado = parseInt(req.body.plastificado,10);

	let year = req.body.fecha.slice(0, 4);
	let month = req.body.fecha.slice(5, 7);
	let day = req.body.fecha.slice(8, 10);

	const meses = [0,'enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
	let table = `${req.session.sucursal}insumos`;
	let fecha = `${day}/${month}/${year}`;


	if (isNaN(anillo7) && isNaN(anillo9) && isNaN(anillo12) && isNaN(anillo14) && isNaN(anillo17) 
	&& isNaN(anillo20) && isNaN(anillo23) && isNaN(anillo25) && isNaN(anillo29) && isNaN(anillo33)
	&& isNaN(anillo40) && isNaN(anillo45) && isNaN(anillo50) && isNaN(hojasA4) && isNaN(hojasOficio)
	&& isNaN(hojasA3) && isNaN(hojasColor) && isNaN(cartulina) && isNaN(plastificado)) {

		res.render('insumos', {
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
	else {

		if(isNaN(anillo7)){ anillo7 = 0;}else{ anillo7 = anillo7;}
		if(isNaN(anillo9)){ anillo9 = 0;}else{ anillo9 = anillo9;}
		if(isNaN(anillo12)){ anillo12 = 0;}else{ anillo12 = anillo12;}
		if(isNaN(anillo14)){ anillo14 = 0;}else{ anillo14 = anillo14;}
		if(isNaN(anillo17)){ anillo17 = 0;}else{ anillo17 = anillo17;}
		if(isNaN(anillo20)){ anillo20 = 0;}else{ anillo20 = anillo20;}
		if(isNaN(anillo23)){ anillo23 = 0;}else{ anillo23 = anillo23;}
		if(isNaN(anillo25)){ anillo25 = 0;}else{ anillo25 = anillo25;}
		if(isNaN(anillo29)){ anillo29 = 0;}else{ anillo29 = anillo29;}
		if(isNaN(anillo33)){ anillo33 = 0;}else{ anillo33 = anillo33;}
		if(isNaN(anillo40)){ anillo40 = 0;}else{ anillo40 = anillo40;}
		if(isNaN(anillo45)){ anillo45 = 0;}else{ anillo45 = anillo45;}
		if(isNaN(anillo50)){ anillo50 = 0;}else{ anillo50 = anillo50;}
		if(isNaN(hojasA4)){ hojasA4 = 0;}else{ hojasA4 = hojasA4;}
		if(isNaN(hojasA3)){ hojasA3 = 0;}else{ hojasA3 = hojasA3;}
		if(isNaN(hojasOficio)){ hojasOficio = 0;}else{ hojasOficio = hojasOficio;}
		if(isNaN(hojasColor)){ hojasColor = 0;}else{ hojasColor = hojasColor;}
		if(isNaN(cartulina)){ cartulina = 0;}else{ cartulina = cartulina;}
		if(isNaN(plastificado)){ plastificado = 0;}else{ plastificado = plastificado;}

		connection.query(`INSERT INTO ${table} SET ?`, {fecha:fecha, mes:month, anillo7:anillo7, anillo9:anillo9,
		anillo12:anillo12, anillo14:anillo14, anillo17:anillo17, anillo20:anillo20, anillo23:anillo23,
		anillo25:anillo25, anillo29:anillo29, anillo33:anillo33, anillo40:anillo40, anillo45:anillo45,
		anillo50:anillo50, ha4:hojasA4, ho:hojasOficio, ha3:hojasA3, hcolor:hojasColor,
		cartulina:cartulina, plastificado:plastificado}, (error, results)=>{
			if(error){
				console.log(error);
			 	res.render('insumos' , {
			 		alert:true,
			 		login: true,
			 		alertTitle: "Error",
			 		alertMessage: "¡Error de conexión!",
			 		alertIcon: "error",
			 		background: "#3a2a23",
			 		showConfirmButton: true,
			 		confirmButtonColor: '#ed4100',
			 		timer: false,
			 		ruta: '/insumos'
			 	})
			}
			
			res.render('insumos', {
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
		})
	}
}