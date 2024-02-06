import { Request, Response } from "express";
import { providerDelete, verifyProvider } from "../services/provider";


export const deleteProvider = async (req: Request, res: Response) => {
  const document_provider = req.params.document;
    
  try {
    verifyProvider(document_provider, async (error: any, result: any) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      
      if (!result) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }

      try {
  
        
        providerDelete(document_provider, (error: any, results: any) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }

          if (results) {
            return res.status(200).json({ message: "Proveedor eliminado correctamente" });
          }
        });
      } catch (error) {
        return res.status(500).json({ error: "Error interno al eliminar el proveedor" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al buscar el proveedor" });
  }
};