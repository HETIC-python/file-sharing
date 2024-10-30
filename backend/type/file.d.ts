export interface FileI {
    id?: number,
    filename: string,
    size: number,
    mimeType: string,
    userId: number
}

export interface FileRepositoryI {
    getAll: () => Promise<FileI[]>
    getOne: (id: number) => Promise<FileI>
    insert: (file: FileI) => Promise<FileI>
    update: (file: FileI) => Promise<FileI>
    delete: (id: number) => Promise<void>
}
