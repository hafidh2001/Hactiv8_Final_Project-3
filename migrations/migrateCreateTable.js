import db from "../db/database.js";

await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`).then((res) => {
  console.log(res);
});

await db
  .query(
    `CREATE TABLE IF NOT EXISTS users
(
   id                SERIAL PRIMARY KEY,
   full_name         VARCHAR (255) NOT NULL,
   email             VARCHAR (255) UNIQUE NOT NULL,
   password          VARCHAR (255) NOT NULL,
   gender            VARCHAR (50) NOT NULL,
   role              VARCHAR (50) NOT NULL,
   balance           NUMERIC (255) NOT NULL,
   createdAt         TIMESTAMP,
   updatedAt         TIMESTAMP
);`
  )
  .then((res) => {
    console.log(res);
  });

await db
  .query(
    `CREATE TABLE IF NOT EXISTS categories
(
   id                  SERIAL PRIMARY KEY,
   type                VARCHAR (255) NOT NULL,
   sold_product_amount NUMERIC (255) NOT NULL,
   createdAt        TIMESTAMP,
   updatedAt        TIMESTAMP
);`
  )
  .then((res) => {
    console.log(res);
  });

await db
  .query(
    `CREATE TABLE IF NOT EXISTS products
(
   id               SERIAL PRIMARY KEY,
   title            VARCHAR (255) NOT NULL,
   price            NUMERIC (255) NOT NULL,
   stock            NUMERIC (255) NOT NULL,
   categoryId       INTEGER NOT NULL,
   createdAt        TIMESTAMP,
   updatedAt        TIMESTAMP,
   CONSTRAINT fk_category_product FOREIGN KEY(categoryId) REFERENCES categories(id) ON DELETE
   CASCADE ON UPDATE RESTRICT
);`
  )
  .then((res) => {
    console.log(res);
  });

await db
  .query(
    `CREATE TABLE IF NOT EXISTS transaction_histories
(
   id               SERIAL PRIMARY KEY,
   productId        INTEGER NOT NULL,
   userId           INTEGER NOT NULL,
   quantity         NUMERIC (255) NOT NULL,
   total_price      NUMERIC (255) NOT NULL,
   createdAt        TIMESTAMP,
   updatedAt        TIMESTAMP,
   CONSTRAINT fk_product_transaction_histories FOREIGN KEY(productId) REFERENCES products(id) ON DELETE
   CASCADE ON UPDATE RESTRICT,
   CONSTRAINT fk_user_transaction_histories FOREIGN KEY(userId) REFERENCES users(id) ON DELETE
   CASCADE ON UPDATE RESTRICT
);`
  )
  .then((res) => {
    console.log(res);
  });

await db.close();
