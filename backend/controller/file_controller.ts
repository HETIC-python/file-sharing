import e, {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import {App} from "../type/app";
import { unlink } from "fs";
import { json } from "stream/consumers";

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
        
        //@ts-ignore
        const file = req.file;
        
        if (!file) {
        const error = new Error("Please upload a file");
        (error as any).httpStatusCode = 400;
        return res.json({status:400,success:true,error, message: "Please upload a file"});
        }


        const errors = validationResult(file)
        if (!errors.isEmpty()) {
            return res.json({status:422, success:false ,errors : errors.array()})
        }
        
        const user = await app.repository.userRepository.getOne(parseInt(req.params.user_id)).then(data =>{return data})
        const storageUsed = await app.repository.userRepository.getUsedStorage(parseInt(req.params.user_id)).then(data =>{return data})

        if (user===null){
            unlink(`upload/${file.filename}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            res.status(404)            
            return res.json({status :404, success : false, message: "User not found"})
        }

        if (user.maxStorage < storageUsed + file.size/10**9){
            unlink(`upload/${file.filename}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            res.status(400)
            return res.json({status :400, success : false, message: "Not enough storage"})
        }

        app.repository.fileRepository.insert({id: 0,
            filename: file.filename,
            size: file.size/10**9, // size in GB
            mimeType: file.mimetype,
            userId: parseInt(req.params.user_id)
        }).then(data => console.log(data)).catch(err => console.log(err))

        res.json({status :201, success : true, message: "File uploaded successfully"})
    }
}


export function download(app: App) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const file = await app.repository.fileRepository.getOne(parseInt(atob(req.params.hash).replace('Phrase secrete',''))).then(data =>{return data})
        const sharing_link = await app.repository.sharingLinkRepository.getOneByLink(req.url).then(data =>{return data})
        
        if (file === null){
            return res.json({status:404, success:false, message: "File not found"})
        }

        if (new Date() > sharing_link.expiresAt){
            return res.json({status:403, success:false, message: "Link expired"})
        }

        res.download(`upload/${file.filename}`)
    }
}

export function getFilesFromUser(app: App) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const files = await app.repository.fileRepository.getAllFromUser(parseInt(req.params.user_id)).then(data =>{return data})        
        res.json(files)
    }
}


