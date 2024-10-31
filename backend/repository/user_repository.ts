import {Pool} from "mysql2/promise";
import {UserI, UserRepositoryI} from "../type/user";

export function getUserRepository(database: Pool): UserRepositoryI {
    return {
        getAll: async () => {
            const [results] = await database.query("SELECT id, firstname,lastname, email, max_storage FROM user");
            return results as UserI[];
        },
        delete: async (id: number) => {
            await database.execute("DELETE FROM user WHERE id = ?", [id]);
        },
        getOne: async (id: number) => {
            const [results] = await database.execute("SELECT id, firstname,lastname, email, max_storage FROM user WHERE id = ?", [id]);
            //@ts-ignore
            return results[0];
        },
        insert(user: UserI): Promise<UserI> {
            database.execute("INSERT INTO user (firstname,lastname, email, password, max_storage) VALUES (?, ?, ?, ?)", [user.firstName,user.lastName, user.email, user.password, user.maxStorage]);
            return Promise.resolve({id: user.id, firstName: user.firstName,lastName : user.lastName, email: user.email, password: user.password, maxStorage: user.maxStorage, createdAt: user.createdAt });
        },
        update(user: UserI): Promise<UserI> {
            database.execute("UPDATE user SET username = ?, email = ?, password = ?, max_storage = ? WHERE id = ?", [user.firstName,user.lastName, user.email, user.password, user.maxStorage, user.id]);
            return Promise.resolve({id: user.id,  firstName: user.firstName,lastName : user.lastName, email: user.email, password: user.password, maxStorage: user.maxStorage, createdAt: user.createdAt });
        },
    };
}
