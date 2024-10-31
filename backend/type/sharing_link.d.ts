export interface SharingLinkI {
    id?: number,
    fileId: number,
    link: string,
    createdAt: Date,
    expiresAt: Date
}

export interface SharingLinkRepositoryI {
    getAll: () => Promise<SharingLinkI[]>
    getOne: (id: number) => Promise<SharingLinkI>
    getOneByLink: (link: string) => Promise<SharingLinkI>
    insert: (link: SharingLinkI) => Promise<SharingLinkI>
    update: (link: SharingLinkI) => Promise<SharingLinkI>
    delete: (id: number) => Promise<void>
}
