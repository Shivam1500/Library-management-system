const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token not Found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decodedData) => {
        if (error) {
            return res.status(403).json({ message: "Failed to match token" })
        }
        req.user = decodedData;
        next();
    })
}

module.exports = verifyToken;