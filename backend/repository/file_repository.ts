import {Pool} from "mysql2/promise";
import {FileI, FileRepositoryI} from "../type/file";

export function getFileRepository(database: Pool): FileRepositoryI {
    return {
        getAll: async () => {
            const [results] = await database.query("SELECT id, name, path FROM file");
            return results as FileI[];
        },
        delete: async (id: number) => {
            await database.execute("DELETE FROM file WHERE id = ?", [id]);
        },
        getOne: async (id: number) => {
            const [results] = await database.execute("SELECT id, name, path FROM file WHERE id = ?", [id]);
            //@ts-ignore
            return results[0];
        },
        insert(file: FileI): Promise<FileI> {
            return Promise.resolve({id: 1, name: "test", path: "/path/to/file"});
        },
        update(file: FileI): Promise<FileI> {
            return Promise.resolve({id: 1, name: "test", path: "/path/to/file"});
        },
    };
}
