import type { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { User } from "../../entity/User";


export default class ChangeProfilePictureService {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }


    reqHandler = async (req: Request, res: Response) => {
        const url = req.protocol + "://" + req.get("host");
        const userId = res.locals.payload.id;
        const img = url + "/public/" + req.file?.filename;
        await this.updateUserProfilePicture(userId, img);

        return res.status(200).json({
            message: "Profile Picture update successful."
        });
    }

    // private async getUser(id: string): Promise<User | undefined> {
    //     const user = await this.userRepository.findOne(id);
    //     return user;
    // }

            
    private updateUserProfilePicture = async (id: string, profilePicture: string) => {
        await this.userRepository.update({
            id
        }, {
            profilePicture
        });
    }
}