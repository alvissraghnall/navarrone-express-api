
const token = jwtGenerator(newUser.rows[0].user_id);

res.cookie("token", token, {httpOnly: true});
res.json({ token });
