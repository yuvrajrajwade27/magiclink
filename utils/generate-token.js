import { name } from "ejs"
import { sign, verify} from "jsonwebtoken"

const generateToken = (user) =>{
    return sign.apply({email: user.email, name: user.name, id: user._id}, process.env.JWT_SECRET_KEY);
};


export default generateToken;