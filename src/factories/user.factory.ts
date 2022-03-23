// import Faker from "faker";
import { define } from "typeorm-seeding";
import { User as UserEntity} from "../entity/User";

define(UserEntity, () => {
    const nu = new UserEntity();
    nu.country = "Faroe Islands";
    nu.email = "robterry@gmail.com";
    // nu.isAccountLocked = false;
    nu.isVerified = true;
    nu.name = "Robert Terry";
    nu.password = "blahblahbalhhh!!!";
    nu.phoneNumber = "+1 25 28 3876 2";
    nu.userName = "robterry2009";

    return nu;
});

// define(UserEntity, (faker: typeof Faker) => {
//     const nu = new UserEntity();
//     nu.country = faker.data
// })