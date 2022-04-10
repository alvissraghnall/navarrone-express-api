import { randomUUID } from "crypto";
import { define, factory } from "typeorm-seeding";
import { User } from "../entity/User";
import { VerificationToken } from "../entity/VerificationToken";


define(VerificationToken, () => {
    const newTkn = new VerificationToken();
    newTkn.user = factory(User)() as any;
    newTkn.token = randomUUID();
    newTkn.expiresAt = new Date(Date.now());

    return newTkn;
})