const jwt = require("jsonwebtoken");

const verifiToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ error: "acceso denegado" })
    }

    try {

        const verificado = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verificado;
        next();


    } catch (error) {
        res.status(400).json({ error: "token no valido" })
    }
}

module.exports = verifiToken;