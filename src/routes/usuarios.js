const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all Employees
router.get('/', async (req, res) => {
  mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An User by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log("usuario con id " + id);
    }
  });
});

// by User
router.get('/user/:usuario', (req, res) => {
  const { usuario } = req.params;
  mysqlConnection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (err, row, fields) => {

    if (row[0] != null) {
      res.json({ message: "No disponible" });
    } else {
      res.json({ message: "disponible" });
    }
  });
});

// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM usuarios WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Usuario Deleted' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An Employee
router.post('/', (req, res) => {
  const { usuario, contraseña, nombre, apellido, telefono, id_rol, estado } = req.body;
  // console.log(id, usuario, contraseña);
  const datos = { usuario, contraseña, nombre, apellido, telefono, id_rol, estado }
  mysqlConnection.query("insert into usuarios set ?", [datos], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Usuario guardado' });
    } else {
      console.log(err);
    }
  });

});


router.put('/:id', (req, res) => {
  const { usuario, contraseña, nombre, apellido, telefono, id_rol, fecha_actualizacion, estado } = req.body;
  const datos = { usuario, contraseña, nombre, apellido, telefono, id_rol, fecha_actualizacion, estado }
  const { id } = req.params;

  mysqlConnection.query('UPDATE usuarios set ? WHERE id = ?', [datos, id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'usuario Updated' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
