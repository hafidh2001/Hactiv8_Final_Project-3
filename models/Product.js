import db from "../db/database.js";
import { DataTypes } from "sequelize";

const Products = db.define(
  "products",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        max: {
          args: [255],
          msg: "Maximum 255 characters allowed in title",
        },
      },
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
        notNull: true,
        min: {
          args: [0],
          msg: "Minimum Rp. 0 payment allowed in price",
        },
        max: {
          args: [50000000],
          msg: "Maximum Rp. 50.000.000 payment allowed in price",
        },
        len: {
          args: [1, 255],
          msg: "Display price must be between 1 and 255 characters in length",
        },
      },
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
        notNull: true,
        min: {
          args: [5],
          msg: "Minimum 5 items allowed in stock",
        },
        len: {
          args: [1, 255],
          msg: "Display stock must be between 1 and 255 characters in length",
        },
      },
    },
    categoryId: {
      field: "categoryid",
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default Products;
