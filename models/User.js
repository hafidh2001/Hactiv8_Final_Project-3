import db from "../db/database.js";
import { DataTypes } from "sequelize";
import { hash } from "../helpers/bcrypt.js";

const Users = db.define(
  "users",
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        max: {
          args: [255],
          msg: "Maximum 255 characters allowed in full_name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please enter your email address in format youremail@example.com",
        },
        notEmpty: true,
        notNull: true,
        max: {
          args: [255],
          msg: "Maximum 255 characters allowed in email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: {
          args: [6, 10],
          msg: "Display password must be between 6 and 10 characters in length",
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isIn: {
          args: [["male", "female"]],
          msg: "Gender has only 'male' or 'female' values",
        },
        max: {
          args: [50],
          msg: "Maximum 50 characters allowed in gender",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isIn: {
          args: [["admin", "customer"]],
          msg: "Role has only 'admin' or 'customer' values",
        },
        max: {
          args: [50],
          msg: "Maximum 50 characters allowed in role",
        },
      },
    },
    balance: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
        notNull: true,
        min: {
          args: [0],
          msg: "Minimum Rp. 0 cash allowed in balance",
        },
        max: {
          args: [100000000],
          msg: "Maximum Rp. 100.000.000 cash allowed in balance",
        },
        len: {
          args: [1, 255],
          msg: "Display balance must be between 1 and 255 characters in length",
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
      beforeValidate: (users) => {
        users.gender = users.gender.toLowerCase();
        users.role = users.role.toLowerCase();
        users.balance = 0;
      },
      afterValidate: async (users) => {
        users.password = await hash(users.password);
      },
      beforeCreate: () => {
        // console.log("beforeCreate");
      },
      afterCreate: (users) => {
        users.balance = `Rp. ${users.balance} ,-`;
      },
    },
  }
);

export default Users;
