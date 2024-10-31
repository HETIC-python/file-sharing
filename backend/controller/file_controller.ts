import e, {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import {App} from "../type/app";

export function getAll(app: App) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const files = app.repository.fileRepository.getAll().then(data => {return data})

        res.json(files)
        res.send()

    }
}

export function getAllFromUser(app: App) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const files = app.repository.fileRepository.getAllFromUser(parseInt(req.params.user_id)).then(data => {return data})

        res.json(files)
        res.send()
    }
}

export function getOne(app: App) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const file = app.repository.fileRepository.getOne(parseInt(req.params.id)).then(data =>{return data})

        res.json(file)
        res.send()
    }
}

export function addFile(app: App) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json(errors.array())
        }

        const file = req.file;
        console.log(file);
        
        if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
        }

        app.repository.fileRepository.insert({id: 0,
            filename: file.filename,
            size: file.size,
            mimeType: file.mimetype,
            userId: parseInt(req.params.user_id)
        }).then(data => console.log(data)).catch(err => console.log(err))

        res.status(201)
        res.send()
    }
}

export function download(app: App) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const file = await app.repository.fileRepository.getOne(parseInt(atob(req.params.hash))).then(data =>{return data})
        const sharing_link = await app.repository.sharingLinkRepository.getOneByLink(req.url).then(data =>{return data})
        
        if (new Date() > sharing_link.expireAt){
            res.status(403).send()
            return
        }
        
        res.download(`upload/${file.filename}`)
        res.send()
    }
}




