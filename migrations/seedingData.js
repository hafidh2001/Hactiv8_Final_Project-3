import db from "../db/database.js";
import * as bcrypt from "bcrypt";

const hashSync = (input) => {
  return bcrypt.hashSync(input, 10);
};

await db
  .query(
    `INSERT INTO users
(
    full_name,
    email,
    password,
    gender,
    role,
    balance,
    createdat,
    updatedat
)
VALUES
(
    'admin haped',
    'admin_haped@gmail.com',
    '${hashSync("admin12345")}',
    'male',
    'admin',
    100000000,
    '${new Date().toISOString()}',
    '${new Date().toISOString()}'
);`
  )
  .then((res) => {
    console.log(res);
  });

await db.close();
