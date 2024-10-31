import {Pool} from "mysql2/promise";
import {FileI, FileRepositoryI} from "../type/file";

export function getFileRepository(database: Pool): FileRepositoryI {
    return {
        getAll: async () => {
            const [results] = await database.query("SELECT id,filename,size, user_id FROM file");
            return results as FileI[];
        },
        getAllFromUser: async (user_id: number) => {
            const [results] = await database.query("SELECT id,filename,size, user_id FROM file WHERE user_id = ?", [user_id]);
            return results as FileI[];
        },
        delete: async (id: number) => {
            await database.execute("DELETE FROM file WHERE id = ?", [id]);
        },
        getOne: async (id: number) => {
            const [results] = await database.execute("SELECT id,filename,size, user_id FROM file WHERE id = ?", [id]);
            //@ts-ignore
            return results[0];
        },
        insert(file: FileI): Promise<FileI> {
            database.execute("INSERT INTO file (filename, size, user_id) VALUES (?, ?, ?)", [file.filename, file.size, file.userId]);
            return Promise.resolve({filename: file.filename, size: file.size, mimeType:file.mimeType, userId: file.size});
        },
        update(file: FileI): Promise<FileI> {
            database.execute("UPDATE file SET filename = ?, size = ?, user_id = ? WHERE id = ?", [file.filename, file.size, file.userId, file.id]);
            return Promise.resolve({id: file.id, filename: file.filename, size: file.size, mimeType:file.mimeType, userId: file.size});
        }
    };
}
