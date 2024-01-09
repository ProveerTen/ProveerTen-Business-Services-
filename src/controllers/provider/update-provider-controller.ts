import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { providerUpdate, verifyProvider } from "../../services/provider/update-provider";
import Provider from "../../models/provider";


export const updateProvider = async (req: Request, res: Response) => {
    console.log("Controlador");
  
  const document = req.params.document;
    
  try {
    verifyProvider(document, async (error: any, result: any) => {
      if (error) {
        console.log("11");
        
        return res.status(500).json({ error: error.message });
      }
      
      if (!result) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }

      try {
        const {
          document_provider,
          name_provider,
          last_name_provider,
          email_provider,
          password_provider,
          profile_photo_provider,
          nit_company,
          city_provider,
          neighborhood,
          street,
          number_street,
          number_provider
      } = req.body;
    
  const password_hash = await bcrypt.hash(password_provider, 10);
      const data: Provider = {
        document_provider,
        name_provider,
        last_name_provider,
        email_provider,
        password_provider: password_hash,
        profile_photo_provider,
        nit_company,
        city_provider,
        neighborhood,
        street,
        number_street,
        number_provider
    };
        
        providerUpdate(data, (error: any, results: any) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }

          if (results) {
            return res.status(200).json({ message: "Proveedor actualizado correctamente" });
          }
        });
      } catch (error) {
        return res.status(500).json({ error: "Error interno al actualizar el proveedor" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al buscar el proveedor" });
  }
};