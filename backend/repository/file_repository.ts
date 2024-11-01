import {Pool} from "mysql2/promise";
import {FileI, FileRepositoryI} from "../type/file";

export function getFileRepository(database: Pool): FileRepositoryI {
    return {
        getAll: async () => {
            const [results] = await database.query("SELECT id,name,size, user_id FROM files");
            return results as FileI[];
        },
        getAllFromUser: async (user_id: number) => {
            const [results] = await database.query("SELECT id,name,size, user_id FROM files WHERE user_id = ?", [user_id]);
            return results as FileI[];
        },
        delete: async (id: number) => {
            await database.execute("DELETE FROM files WHERE id = ?", [id]);
        },
        getOne: async (id: number) => {
            const [results] = await database.execute("SELECT id,name,size, user_id FROM files WHERE id = ?", [id]);
            //@ts-ignore
            const file = results[0];
            return Promise.resolve({id: file.id, filename: file.name, size: file.size, mimeType:file.mimeType, userId: file.user_id});
        },
        async insert(file: FileI): Promise<FileI> {
            const res = await database.execute("INSERT INTO files (name, size, user_id) VALUES (?, ?, ?)", [file.filename, file.size, file.userId]);
            //@ts-ignore
            return Promise.resolve({id: res[0].insertId,filename: file.filename, size: file.size, mimeType:file.mimeType, userId: file.userId});
        },
        update(file: FileI): Promise<FileI> {
            database.execute("UPDATE files SET name = ?, size = ?, user_id = ? WHERE id = ?", [file.filename, file.size, file.userId, file.id]);
            return Promise.resolve({id: file.id, filename: file.filename, size: file.size, mimeType:file.mimeType, userId: file.size});
        },
        hasRight: async ({id, userId}) => {
            const [results] = await database.execute("SELECT id FROM files WHERE id = ? AND user_id = ?", [id, userId]);
            return (results as any).length > 0;
        }
    };
}
