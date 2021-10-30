const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// routing Middlewares
const authRoutes=require("./routes/usuarios")
app.use("api/user",authRoutes)

// Routes
app.use(require('./routes/usuarios'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
