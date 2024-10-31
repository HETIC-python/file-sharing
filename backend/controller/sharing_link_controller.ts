import { NextFunction, Request, Response } from "express";
import { App } from "../type/app";

export function generate(app: App) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const user = await app.repository.userRepository.getOne(parseInt(req.params.user_id)).then(data => {return data}).catch(err => {console.log(err); return null})
        const file = await app.repository.fileRepository.getOne(parseInt(req.params.file_id)).then(data => {return data}).catch(err => {console.log(err); return null})     
        if(file == null){
            return res.json({status:404,success:false, message: "File not found"})
        }

        if(user == null){
            return res.json({status:404,success:false, message: "User not found"})
        }

        if(await hasRight(app, parseInt(req.params.file_id), parseInt(req.params.user_id)) == false){
            return res.json({status:403,success:false, message: "You don't have the right to share this file"})
        } 

        const toHash = req.params.file_id + "Phrase secrete";
        const public_file_link = `/public_link/download/${btoa(toHash)}`
        
        const currentDate: Date = new Date();
        const expireDate: Date = new Date(currentDate)
        expireDate.setHours(currentDate.getHours() + 1) // 1 hour expiration date
        ;
        const sharing_link =await app.repository.sharingLinkRepository.insert(
            {
                fileId: parseInt(req.params.file_id),
                link: public_file_link,
                createdAt: currentDate,
                expiresAt: expireDate
            }
        ).then(data =>{return data}).catch(err => {console.log(err); return null})        

        if(sharing_link == null){
            return res.json({status:500, success:false, message: "An error occured while generating the sharing link"})
        }

        res.json({status:201, success: true, link : sharing_link})
    }
}

function hasRight(app: App, file_id: number, user_id: number) {

        const hasRight = app.repository.fileRepository.hasRight({
            id:file_id, 
            userId:user_id
        }).then(data => {return data}).catch(err => {console.log(err); return false})
        return hasRight
}
