import { getRepository, Repository } from "typeorm";
import type { Request, Response } from "express";
import { User } from "../../entity/User";

export default class ProfileService {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    private getDetails = async (id: string) => {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        return user;
    }

    userDetails = async (req: Request, res: Response) => {
        const {id} = res.locals.payload;
        const user = await this.getDetails(id);

        if(!user) {
            return res.status(404).send("No user with ID provided found.");
        }
        return res.status(200)
            .json(user);
    }
}