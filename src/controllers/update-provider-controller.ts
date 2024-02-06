import { Request, Response } from "express";

import profile from '../services/profile-service';
import updateService from "../services/update-profile-service";
import { changePassProvider } from '../services/changePassword-service';


import { dataDecoded } from '../middlewares/auth-token';

export const updateProvider = async (req: Request, res: Response) => {
  try {

    const { email_provider, document_provider } = req.body;

    let result: any = await profile.getProviderByCompany(dataDecoded.id, document_provider);

    if (result.length == 0) {
      return res.status(404).json({ Status: 'Error' });
    }

    let data = {
      email: email_provider,
      role: 'provider',
      id: document_provider
    }

    updateService.updateDataProvider(data, req.body, (error: any, results: any) => {
      if (error) {
        res.status(500).json({ "error-controller": error });
      }
      if (results) {
        res.status(200).json({ "Status": "oki", "result": results });
      }
    });
  } catch (error) {
    console.log('Error');
    res.status(400).json(error)
  }
};

export const updateProviderPassword = async (req: Request, res: Response) => {
  console.log('a');

  try {

    const { email_provider, document_provider } = req.body;

    console.log(email_provider);
    console.log(document_provider);

    console.log(req.body.password_provider);

    let result: any = await profile.getProviderByCompany(dataDecoded.id, document_provider);

    if (result.length == 0) {
      return res.status(404).json({ Status: 'Error' });
    }

    let data = {
      email: email_provider,
      role: 'provider',
      id: document_provider
    }

    changePassProvider(data, req.body, (error: any, results: any) => {
      if (error) {
        res.status(500).json({ "error-controller": error });
      }
      if (results) {
        res.status(200).json({ "Status": "oki", "result": results });
      }
    });
  } catch (error) {
    console.log('Error');
    res.status(400).json(error)
  }
};
