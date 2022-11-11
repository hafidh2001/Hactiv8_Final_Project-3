import db from "../db/database.js";

await db.query(`DROP TABLE IF EXISTS users CASCADE;`).then((res) => {
  console.log(res);
});
await db.query(`DROP TABLE IF EXISTS categories CASCADE;`).then((res) => {
  console.log(res);
});
await db.query(`DROP TABLE IF EXISTS products CASCADE;`).then((res) => {
  console.log(res);
});
await db.query(`DROP TABLE IF EXISTS transaction_histories;`).then((res) => {
  console.log(res);
});

await db.close();
