import {FileRepositoryI} from "./file";
import {SharingLinkRepositoryI} from "./sharing_link";
import {UserRepositoryI} from "./user";

export interface Repository {
    fileRepository: FileRepositoryI,
    sharingLinkRepository: SharingLinkRepositoryI,
    userRepository: UserRepositoryI
}
