import {Repository} from "../type/repository";
import {getFileRepository} from "../repository/file_repository";
import {getSharingLinkRepository} from "../repository/sharing_link_repository";
import {getUserRepository} from "../repository/user_repository";
import {Connection, Pool} from "mysql2/promise";

export function getRepository(database: Pool): Repository {
    return {
        fileRepository: getFileRepository(database),
        sharingLinkRepository: getSharingLinkRepository(database),
        userRepository: getUserRepository(database),

    }
}
