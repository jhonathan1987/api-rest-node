const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysqlConnection = require('../database.js');

// router.get("/user", (req, res) => {
//     res.json({
//         error: null,
//         data: {
//             title: "mi ruta",
//             user: req.user
//         }
//     })
// })


router.post('/login', async (req, res) => {
    const username = req.body.usuario;
    const password = req.body.contrasena;
    console.log("entro")
    if (username && password) {
      mysqlConnection.query('SELECT * FROM usuarios where usuario=?', [username], async (err, row, fields) => {
        if (row.length > 0) {
          const passValida = await bcrypt.compare(password, row[0].contrasena);
          if (passValida) {
  
            //jwt
            const user = {
              nombre: row[0].nombre,
              id: row[0].id
            }
            const token =jwt.sign(user, process.env.TOKEN_SECRET)
            res.json({token})
  
           // res.header("auh-token", token).json({ valido: "usuario correcto", token })
  
            res.redirect('/');
          } else {
            res.status(400).json({ invalido: "usuario o contraseña incorrecto" })
          }
  
        } else {
          res.status(400).json({ invalido: "usuario o contraseña incorrecto" })
        }
      });
    } else {
      res.status(400).json({ validacio: "llene todos los campos" });
    }
  
  });

module.exports = router;