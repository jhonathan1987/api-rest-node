const express = require('express');
const app = express();
require('dotenv').config({ path: './src/.env' });


const session = require("express-session");

// app.use(session({
//   secret: "secret",
//   resave: true,
//   saveUninitialized: true
// }))

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const authRoutes = require("./routes/usuarios");
const validaToken = require("./routes/validateToken");
const admin = require("./routes/admin");

app.use("/api",admin);
app.use("/api", authRoutes);


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);

});
