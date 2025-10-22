import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
      
        const token =
            req.headers.authorization?.split(' ')[1] ||  
            req.headers.token ||                         
            req.cookies?.token;                       

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Access denied. No token provided.",
                data: null
            });
        }

      
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

       
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

export default auth;
