import {Pool} from "mysql2/promise";
import {UserI, UserRepositoryI} from "../type/user";

export function getUserRepository(database: Pool): UserRepositoryI {
    return {
        getAll: async () => {
            const [results] = await database.query("SELECT id, first_name,last_name, email, max_storage FROM users");
            return results as UserI[];
        },
        delete: async (id: number) => {
            await database.execute("DELETE FROM users WHERE id = ?", [id]);
        },
        getOne: async (id: number) => {
            const [results] = await database.execute("SELECT id, first_name,last_name, email, max_storage FROM users WHERE id = ?", [id]);
            //@ts-ignore
            if (results.length === 0) return null;
            const user = results[0];
            return Promise.resolve({id: user.id, firstName: user.first_name,lastName : user.last_name, email: user.email, maxStorage: user.max_storage,password :user.password, createdAt: user.created_at});
        },
        insert(user: UserI): Promise<UserI> {
            database.execute("INSERT INTO users (first_name,last_name, email, password, max_storage) VALUES (?, ?, ?, ?)", [user.firstName,user.lastName, user.email, user.password, user.maxStorage]);
            return Promise.resolve({id: user.id, firstName: user.firstName,lastName : user.lastName, email: user.email, password: user.password, maxStorage: user.maxStorage, createdAt: user.createdAt });
        },
        update(user: UserI): Promise<UserI> {
            database.execute("UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, max_storage = ? WHERE id = ?", [user.firstName,user.lastName, user.email, user.password, user.maxStorage, user.id]);
            return Promise.resolve({id: user.id,  firstName: user.firstName,lastName : user.lastName, email: user.email, password: user.password, maxStorage: user.maxStorage, createdAt: user.createdAt });
        },
        getUsedStorage: async (id :number) => {
            const [results] = await database.execute("SELECT SUM(size) as total FROM files WHERE user_id = ?", [id]);
            return (results as any)[0].total;
        }
    };
}
