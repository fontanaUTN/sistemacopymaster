exports.init = (req, res)=>{
	if(req.session.loggedim){
		res.render('home', {
			login: true,
		});
	}
	else {
		res.render('home',{
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