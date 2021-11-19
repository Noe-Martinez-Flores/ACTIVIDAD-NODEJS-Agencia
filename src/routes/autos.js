const express = require ('express');
const router = express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => {
    let listAutos =  await pool.query('SELECT * FROM autos');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listAutos: listAutos

    });
});

router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    let autos = await pool.query ('SELECT * FROM autos WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Consulta especifica Exitosa",
        autos: autos
    });
});

router.post('/create', async (req,res) => {
    const {nombre,matricula,añoVerificacion,fechaRegistro,marca} = req.body;
    const auto = {nombre,matricula,añoVerificacion,fechaRegistro,marca};
    const date = req.body;
    const status = req.body;
    
    var fecha = new Date();
    var month = fecha.getUTCMonth();
    var day = fecha.getUTCDate();
    var year = fecha.getUTCFullYear();
    
    actualización = year+"-"+month+"-"+day
    date.fechaActualizacion = actualización;
    fechaActualizacion =  date.fechaActualizacion;

    status.estado = "1";
    estado = status.estado;

    
    

    await pool.query('INSERT INTO autos set ?, `fechaActualizacion` = ?, `estado` = ?', [auto,fechaActualizacion,estado]);
    res.json({
        status: 200,
        message: "se ha registrado correctamente",
        auto: auto
    });
});

router.post('/update/:id', (req,res) => {
    const {id} = req.params;
    const {nombre,matricula,añoVerificacion,estado,marca} = req.body;
    const auto = {nombre,matricula,añoVerificacion,estado,marca};
    const date = req.body;
    
    var fecha = new Date();
    var month = fecha.getUTCMonth();
    var day = fecha.getUTCDate();
    var year = fecha.getUTCFullYear();

    actualización = year+"-"+month+"-"+day
    date.fechaActualizacion = actualización;
    fechaActualizacion =  date.fechaActualizacion;

    
    pool.query('UPDATE autos SET ?,`fechaActualizacion` = ? WHERE id = ?', [auto,fechaActualizacion, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        auto : auto
    });
});

router.post('/delete/:id', (req,res) => {
    const {id} = req.params;
    pool.query('DELETE FROM autos WHERE  id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha Eliminado correctamente"
    });
});

module.exports = router;