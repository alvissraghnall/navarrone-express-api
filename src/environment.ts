const production = {
    logging: true,
    type: "postgres",
    host: process.env.DBHOST!,
    port: parseInt(process.env.DBPORT!),
    username: process.env.DBUSER!,
    password: process.env.DBPWD!,
    database: process.env.DBNAME!,
    entities: [
    __dirname + "/entity/*.ts"
    ],
    synchronize: true,
}