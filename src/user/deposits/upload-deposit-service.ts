import type { Request, Response } from "express";

export default class UploadDepositService {
    
    reqHandler = async (req: Request, res: Response) => {
        const url = req.protocol + "://" + req.get("host");
        const userId = res.locals.payload.id;
        const imageUrl = url + "/deposits/" + req.file?.filename;

        
    }
}