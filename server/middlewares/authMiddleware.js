import jwt from "jsonwebtoken"

const protect = async(req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.stauts(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.userId = decode.userId;
        next() ;
    } catch (error) {
        return res.satus(401).json({
            message: "Unauthorized"
        })
    }

}

export default protect ;