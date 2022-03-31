const connection = require('../database/db');

exports.init = (req, res)=>{
	if(req.session.loggedim){
		res.render('balance', {
			login: true,
		});
	}
	else {
		res.render('balance',{
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
	let maquina1 = parseInt(req.body.maquina1,10);
	let maquina2 = parseInt(req.body.maquina2,10);
	let maquina3 = parseInt(req.body.maquina3,10);
	let maquina4 = parseInt(req.body.maquina4,10);
	let maquina5 = parseInt(req.body.maquina5,10);
	let c280negro = parseInt(req.body.negro_c280,10);
	let c280color = parseInt(req.body.color_c280,10);
	let c754negro = parseInt(req.body.negro_c754,10);
	let c754color = parseInt(req.body.color_c754,10);

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
	if(isNaN(maquina1)){ maquina1 = 0;}else{ maquina1 = maquina1;}
	if(isNaN(maquina2)){ maquina2 = 0;}else{ maquina2 = maquina2;}
	if(isNaN(maquina3)){ maquina3 = 0;}else{ maquina3 = maquina3;}
	if(isNaN(maquina4)){ maquina4 = 0;}else{ maquina4 = maquina4;}
	if(isNaN(maquina5)){ maquina5 = 0;}else{ maquina5 = maquina5;}
	if(isNaN(c280negro)){ c280negro = 0;}else{ c280negro = c280negro;}
	if(isNaN(c280color)){ c280color = 0;}else{ c280color = c280color;}
	if(isNaN(c754negro)){ c754negro = 0;}else{ c754negro = c754negro;}
	if(isNaN(c754color)){ c754color = 0;}else{ c754color = c754color;}

	let anilloA = anillo7 + anillo9 + anillo12;
	let anilloB = anillo14 + anillo17 + anillo20;
	let anilloC = anillo23 + anillo25 + anillo29;
	let anilloD = anillo33 + anillo40 + anillo45 + anillo50;

	let month = req.body.fecha.slice(5, 7);
	let sucursal = 0;

	if(req.session.sucursal == 'habegger'){
		sucursal = 1;
	}else if (req.session.sucursal == 'rivadavia'){
		sucursal = 2;
	}else if (req.session.sucursal == 'iturraspe'){
		sucursal = 3;
	}

	if(req.session.loggedim){
		connection.query(`INSERT INTO balance SET ?`, {mes:month, sucursal:sucursal, anilloA:anilloA, anilloB:anilloB,
		anilloC:anilloC, anilloD:anilloD, ha4:hojasA4, ho:hojasOficio, ha3:hojasA3, hcolor:hojasColor,
		cartulina:cartulina, plastificado:plastificado, m1:maquina1, m2:maquina2, m3:maquina3, m4:maquina4,
		m5:maquina5, c280negro:c280negro, c280color:c280color, c754negro:c754negro, c754color:c754color }, (error, results)=>{
			if(error){
				console.log(error);
			 	res.render('balance' , {
			 		alert:true,
			 		login: true,
			 		alertTitle: "Error",
			 		alertMessage: "¡Error de conexión!",
			 		alertIcon: "error",
			 		background: "#3a2a23",
			 		showConfirmButton: true,
			 		confirmButtonColor: '#ed4100',
			 		timer: false,
			 		ruta: '/balace_mensual'
			 	})
			}
			else {
				res.render('balance', {
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
		})
	}
	else {
		res.render('balance',{
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