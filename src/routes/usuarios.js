const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//require("dotenv").config({ path: "./.env" });



const mysqlConnection = require('../database.js');





// GET all Employees
router.get('/', async (req, res) => {
  mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
      console.log(req.user);
    } else {
      console.log(err);
    }
  });
});

// by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, row, fields) => {

    if (!err) {
      res.json(row[0]);
    } else {
      res.json({ message: err });
    }
  });
});

// DELETE An user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM usuarios WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Usuario Deleted' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An user
router.post('/', async (req, res) => {
  const { contrasena, nombre, apellido, telefono, id_rol, estado } = req.body;
  let usuario = nombre[0] + apellido.split(" ")[0] + apellido.split(" ")[1][0];
  // cifrar contraseña
  const saltos = await bcrypt.genSalt(10);
  const contra = await bcrypt.hash(contrasena, saltos);
  const segundoNombre = nombre.split(" ")[1];
  let asignaLetra = 0;
  let userValido = true;
  mysqlConnection.query("select usuario from usuarios", async (err, rows, fields) => {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].usuario == usuario) {
        asignaLetra++;
        usuario = nombre[0] + segundoNombre.substring(0, asignaLetra) + apellido.split(" ")[0] + apellido.split(" ")[1][0];
        i = -1;
        console.log(asignaLetra);
      }
      if (asignaLetra > segundoNombre.length) {
        userValido = false;
        break;
      }
    }

    if (userValido) {
      const datos = {
        usuario,
        contrasena: contra,
        nombre,
        apellido,
        telefono,
        id_rol,
        estado
      };

    mysqlConnection.query("insert into usuarios set ?", [datos], (err, row, fields) => {
        if (!err) {
          res.json({ status: 'Usuario guardado' });
        } else {
          console.log(err);
        }
      });
    } else {
      res.json({ status: 'No se puede asignar este usuario' });
    }

  });







}
);



router.put('/:id', async (req, res) => {
  const { usuario, contrasena, nombre, apellido, telefono, id_rol, fecha_actualizacion, estado } = req.body;

  const saltos = await bcrypt.genSalt(10);
  const contra = await bcrypt.hash(contrasena, saltos);


  const datos = { usuario, contrasena: contra, nombre, apellido, telefono, id_rol, fecha_actualizacion, estado }
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
