import { DataTypes } from "sequelize";
import Users from "./User.js";
import Product from "./Product.js";
import Category from "./Category.js";
import TransactionHistory from "./TransactionHistory.js";

// association between model Products and model Categories
Category.hasMany(Product, {
  foreignKey: {
    field: "categoryid",
    name: "categoryId",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

Product.belongsTo(Category, {
  foreignKey: {
    field: "categoryid",
    name: "categoryId",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

// association between model Users and model Photos with junction model Comment
Users.hasMany(TransactionHistory, {
  foreignKey: {
    field: "userid",
    name: "userId",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

TransactionHistory.belongsTo(Users, {
  foreignKey: {
    field: "userid",
    name: "userId",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

Product.hasMany(TransactionHistory, {
  foreignKey: {
    field: "productid",
    name: "productId",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

TransactionHistory.belongsTo(Product, {
  foreignKey: {
    field: "productid",
    name: "productId",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

// Users.belongsToMany(
//   Product,
//   { through: TransactionHistory },
//   {
//     foreignKey: {
//       name: "userId",
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     onDelete: "CASCADE",
//     onUpdate: "RESTRICT",
//   }
// );

// Product.belongsToMany(
//   Users,
//   { through: TransactionHistory },
//   {
//     foreignKey: {
//       name: "userId",
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     onDelete: "CASCADE",
//     onUpdate: "RESTRICT",
//   }
// );

export { Users, Product, Category, TransactionHistory };
