const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('token');
    if(!req.header('token')) {
        return res.status(400).send({message: 'Token harus ada!'});
    } else {
        jwt.verify(token, 'wokawokawok', (err, decoded) => {
            console.log(err)
            if(err) {
                return res.status(400).send({message: 'token anda tidak valid'});
            } else {
                if(decoded.role === 'admin') {
                    return next();
                } else if(decoded.role === 'admin') {
                    return res.status(400).send({message: 'maaf anda tidak memiliki akses'});
                } else {
                    return res.status(403).send({message: 'maaf anda tidak memiliki akses'});
                }
            }
        });
    }
}

module.exports = verifyToken;