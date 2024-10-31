export interface FileI {
    id?: number,
    filename: string,
    size: number,
    mimeType: string,
    userId: number
}

export interface FileRepositoryI {
    getAll: () => Promise<FileI[]>
    getAllFromUser: (user_id:number) => Promise<FileI[]>
    getOne: (id: number) => Promise<FileI|null>
    insert: (file: FileI) => Promise<FileI>
    update: (file: FileI) => Promise<FileI>
    hasRight: ({id: number, userId: number}) => Promise<boolean>
    delete: (id: number) => Promise<void>
}
