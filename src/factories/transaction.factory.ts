// import Faker from "faker";
import { define, factory } from "typeorm-seeding";
import Transaction from "../entity/Transaction";
import { User } from "../entity/User";

define(Transaction, () => {
    const txn1 = new Transaction();
    txn1.kind = "deposit";
    txn1.amount = 5000;
    txn1.user = factory(User)() as any;
    return txn1;
});


// define(Transaction, (faker: typeof Faker) => {
//     const txn2 = new Transaction();
//     txn2.kind = "withdrawal";
//     txn2.amount = 4300;
//     return txn2;
// })