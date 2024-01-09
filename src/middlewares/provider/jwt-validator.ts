import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const role_= "company";

export const authJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenAuth = req.header("Authorization");
  
      if (!tokenAuth) {
        return res.status(403).json({ error: "Token no proporcionado" });
      }
  
      let secret_key: any = process.env.SECRET_KEY;
  
      const decoded = jwt.verify(tokenAuth, secret_key);
      const exp: any = decoded;
      const expirationDate = new Date(exp * 1000);
  
      if (expirationDate < new Date()) {
        console.log("Token expirado");
        return res.status(400).json({ message: "El token ha expirado" });
      }
  
          const {role}:any = decoded;
          
          if (role === role_){
              console.log("entra");
              console.log(role);
              next(); 
          }
           else { 
              return res.status (400).json({message : "Rol no permitido"})
          
          }
           
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  
  export default authJwt