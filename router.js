const express = require ('express');
const router = express.Router();
//Conectamos con la base de datos
const connection = require('./database/db');
//Definimos las rutas a usar
router.get('/', (req, res) => { res.render('ingreso'); });
router.get('/registro', (req, res) => { res.render('registro'); });

const ingreso = require('./controllers/ingreso');
router.post('/auth', ingreso.ingreso);
router.post('/auth_new', ingreso.ingreso_new);
router.get('/ingreso_send_:ip', ingreso.ingreso_send);
router.get('/ingreso_new', (req, res) => { res.render('new_ingreso'); });

const register = require('./controllers/register');
router.post('/register', register.register);
// home
const home = require('./controllers/home');
router.get('/home_send', home.init);
// gastos diarios 
const gastosDiarios = require('./controllers/gastos_diarios');
router.get('/gastos_diarios', gastosDiarios.init);
router.post('/gastos_diarios_send', gastosDiarios.send);
// recaudacion
const recaudacion = require('./controllers/recaudacion');
router.get('/recaudacion', recaudacion.init);
router.post('/recaudacion_send', recaudacion.send);
// bajas simples
const bajasSimples = require('./controllers/bajas_simples');
router.get('/bajas_simples', bajasSimples.init);
router.post('/bajas_simples_send', bajasSimples.send);
// bajas dobles
const bajasDobles = require('./controllers/bajas_dobles');
router.get('/bajas_dobles', bajasDobles.init);
router.post('/bajas_dobles_send', bajasDobles.send);
// bajas simples color
const bSimplesColor = require('./controllers/bajas_simples_color');
router.get('/bajas_simples_color', bSimplesColor.init);
router.post('/bajas_simples_color_send', bSimplesColor.send);
// bajas dobles color
const bDoblesColor = require('./controllers/bajas_dobles_color');
router.get('/bajas_dobles_color', bDoblesColor.init);
router.post('/bajas_dobles_color_send', bDoblesColor.send);
// insumos
const insumos = require('./controllers/insumos');
router.get('/insumos', insumos.init);
router.post('/insumos_send', insumos.send);
// repuestos
const repuestos = require('./controllers/repuestos');
router.get('/repuestos', repuestos.init);
router.post('/repuestos_send', repuestos.send);
// Balance
const balance = require('./controllers/balance');
router.get('/balance_mensual', balance.init);
router.post('/balance_mensual_send', balance.send);
// Logout
const logout = require('./controllers/logout');
router.get('/logout', logout.logout)

module.exports = router;