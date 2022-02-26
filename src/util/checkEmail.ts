// // import pool from "../db";

// export default async function (id: string) {
//   try {
//     const isVerified = await pool.query("SELECT email_is_verified FROM users WHERE user_id = $1", [
//       id
//     ]);

//     if(isVerified.rows[0].email_is_verified === false) return false;

//     else if (isVerified.rows[0].email_is_verified === true) return true;

//     console.log(isVerified.rows[0].email_is_verified);
//   } catch (err) {
//     const _err = <Error>err;
//     console.error(_err.message);
//     return "Server error. mehhh.";
//   }

// };
