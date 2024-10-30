import {Repository} from "../type/repository";
import {getFileRepository} from "..repository/file_repository";
import {Connection, Pool} from "mysql2/promise";

export function getRepository(database: Pool): Repository {
    return {
        todoRepository: getFileRepository(database)
    }
}
