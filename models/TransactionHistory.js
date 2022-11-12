import db from "../db/database.js";
import { DataTypes } from "sequelize";

const TransactionHistory = db.define(
  "transaction_histories",
  {
    productId: {
      field: "productid",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      field: "userid",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
        notNull: true,
        len: {
          args: [1, 255],
          msg: "Display quantity must be between 1 and 255 characters in length",
        },
      },
    },
    total_price: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
        notNull: true,
        len: {
          args: [1, 255],
          msg: "Display total_price must be between 1 and 255 characters in length",
        },
      },
    },
    createdAt: {
      field: "createdat",
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: "updatedat",
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default TransactionHistory;
