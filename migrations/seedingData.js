import db from "../db/database.js";
import * as bcrypt from "bcrypt";

const hashSync = (input) => {
  return bcrypt.hashSync(input, 10);
};

try {
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
} catch (e) {
  console.log({
    status: "error",
    field: e.errors[0].path,
    value: e.errors[0].value,
    message: e.errors[0].message,
  });
}
await db.close();
