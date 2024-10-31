import e, {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import {App} from "../type/app";

export function generate(app: App) {
    return async (req: Request, res: Response, next: NextFunction) => {

        if(await hasRight(app, parseInt(req.params.file_id), parseInt(req.params.user_id)) == false){
            res.status(403).send()
            return
        } 

        const public_file_link = `public_link/${btoa(req.params.user_id)}/${btoa(req.params.file_id)}`
        const currentDate: Date = new Date();
        const expireDate: Date = new Date(currentDate)
        expireDate.setHours(currentDate.getHours() + 20)
        ;
        const sharing_link = app.repository.sharingLinkRepository.insert(
            {
                fileId: parseInt(req.params.file_id),
                link: public_file_link,
                createdAt: currentDate,
                expireAt: expireDate
            }
        ).then(data =>{return data})

        res.json(sharing_link)
        res.send()
    }
}

function hasRight(app: App, file_id: number, user_id: number) {

        const hasRight = app.repository.fileRepository.hasRight({
            id:file_id, 
            userId:user_id
        }).then(data => {return data}).catch(err => {console.log(err); return false})
        return hasRight
}
