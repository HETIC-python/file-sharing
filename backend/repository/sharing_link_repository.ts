import {Pool} from "mysql2/promise";
import {SharingLinkI, SharingLinkRepositoryI} from "../type/sharing_link";

export function getSharingLinkRepository(database: Pool): SharingLinkRepositoryI {
    return {
        getAll: async () => {
            const [results] = await database.query("SELECT id, link, expiration_date, user_id FROM sharing_link");
            return results as SharingLinkI[];
        },
        delete: async (id: number) => {
            await database.execute("DELETE FROM sharing_link WHERE id = ?", [id]);
        },
        getOne: async (id: number) => {
            const [results] = await database.execute("SELECT id, link, expiration_date, user_id FROM sharing_link WHERE id = ?", [id]);
            //@ts-ignore
            return results[0];
        },
        insert(sharingLink: SharingLinkI): Promise<SharingLinkI> {
            database.execute("INSERT INTO sharing_link (link, expiration_date, user_id) VALUES (?, ?, ?)", [sharingLink.link, sharingLink.expireAt, sharingLink.fileId]);
            return Promise.resolve({link: sharingLink.link, expireAt: sharingLink.expireAt, fileId: sharingLink.fileId, createdAt: sharingLink.createdAt });
        },
        update(sharingLink: SharingLinkI): Promise<SharingLinkI> {
            database.execute("UPDATE sharing_link SET link = ?, expiration_date = ?, user_id = ? WHERE id = ?", [sharingLink.link, sharingLink.expireAt, sharingLink.fileId, sharingLink.id]);
            return Promise.resolve({id: sharingLink.id, link: sharingLink.link, expireAt: sharingLink.expireAt, fileId: sharingLink.fileId, createdAt: sharingLink.createdAt});
        },
        getOneByLink: async (link: string) => {
            const [results] = await database.execute("SELECT id, link, expiration_date, user_id FROM sharing_link WHERE link = ?", [link]);
            //@ts-ignore
            return results[0];
        }
    };
}
