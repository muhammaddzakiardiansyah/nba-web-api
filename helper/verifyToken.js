const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('token');
    if(!req.header('token')) {
        return res.status(400).send({message: 'Token harus ada!'});
    } else {
        jwt.verify(token, 'wokawokawok', (err, decoded) => {
            if(!err) {
                if(decoded.role === 'admin') {
                    return next();
                } else if(decoded.role === 'admin') {
                    return res.status(400).send({message: 'maaf anda tidak memiliki akses'});
                } else {
                    return res.status(403).send({message: 'maaf anda tidak memiliki akses'});
                }
            } else {
                return res.status(400).status({message: 'token anda tidak valid'});
            }
        });
    }
}

module.exports = verifyToken;