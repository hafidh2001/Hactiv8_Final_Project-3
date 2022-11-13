import db from "../db/database.js";
import { DataTypes } from "sequelize";

const Categories = db.define(
  "categories",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        max: {
          args: [255],
          msg: "Maximum 255 characters allowed in type",
        },
      },
    },
    sold_product_amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
        notNull: true,
        len: {
          args: [1, 255],
          msg: "Display price must be between 1 and 255 characters in length",
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
    hooks: {
      beforeValidate: (categories) => {
        categories.sold_product_amount = 0;
      },
      afterCreate: (categories) => {
        categories.sold_product_amount = categories.sold_product_amount;
      },
    },
  }
);

export default Categories;
