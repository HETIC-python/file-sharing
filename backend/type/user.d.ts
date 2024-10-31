export interface UserI {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    maxStorage: number,
    createdAt: Date
}

export interface UserRepositoryI {
    getAll: () => Promise<UserI[]>
    getOne: (id: number) => Promise<UserI|null>
    insert: (user: UserI) => Promise<UserI>
    update: (user: UserI) => Promise<UserI>
    delete: (id: number) => Promise<void>
    getDisponibleStorage: (id: number) => Promise<number>
}
