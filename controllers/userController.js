import moment from "moment";
import { Users } from "../models/index.js";
import { compare } from "../helpers/bcrypt.js";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config.js";
import { numberWithCommas } from "../helpers/numberWithCommas.js";

export const showUser = async (req, res) => {
  try {
    await Users.findAll({
      attributes: [
        ["id", "no"],
        "full_name",
        "email",
        "password",
        "gender",
        "role",
        "balance",
        "createdAt",
      ],
      order: [["createdAt", "DESC"]],
    }).then((data) => {
      // console.log(data);
      data = data.filter(
        (item) =>
          (item.dataValues.balance = `Rp. ${numberWithCommas(
            item.dataValues.balance
          )} ,-`)
      );
      data = data.filter(
        (item) =>
          (item.dataValues.createdAt = moment(item.dataValues.createdAt).format(
            "dddd, DD MMMM YYYY"
          ))
      );
      res.status(200).send(data);
    });
  } catch (e) {
    res.status(400).send({
      status: "error",
      message: e,
    });
  }
};

export const registerUser = async (req, res) => {
  const { full_name, email, password, gender } = req.body;
  try {
    await Users.create(
      {
        full_name: full_name,
        email: email,
        password: password,
        gender: gender,
        role: "customer",
      },
      {
        hooks: true,
      }
    ).then((data) => {
      delete data.dataValues.password;
      delete data.dataValues.role;
      delete data.dataValues.updatedAt;
      // console.log(data.dataValues);
      res.status(201).send({
        user: data,
      });
    });
  } catch (e) {
    res.status(400).send({
      status: "error",
      field: e.errors[0].path,
      value: e.errors[0].value,
      message: e.errors[0].message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email == null || password == null) {
      res
        .status(400)
        .send({ status: "error", message: "email & password are required" });
      return;
    }
    await Users.findOne({ where: { email: email } }).then(async (data) => {
      if (!data) {
        res
          .status(400)
          .send({ status: "error", message: "email does not exist" });
        return;
      }
      if (!(await compare(password, data.password))) {
        res
          .status(400)
          .send({ status: "error", message: "password does not match" });
        return;
      } else {
        delete data.dataValues.password;
        // console.log(data.dataValues);
        const token = jwt.sign({ ...data.dataValues }, jwt_secret, {
          expiresIn: "24h",
        });
        res.status(200).send({ token: token });
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const user = req.user;
  const { full_name, email } = req.body;

  try {
    if (Number(userId) !== user.id) {
      res
        .status(401)
        .send({ status: "error", message: "authorization failed" });
      return;
    }
    await Users.update(
      {
        full_name: full_name,
        email: email,
      },
      {
        where: {
          id: user.id,
        },
        hooks: false,
      }
    ).then(async (data) => {
      if (data[0] === 1) {
        await Users.findOne({
          where: { id: user.id },
        }).then((data) => {
          if (!data) {
            res
              .status(400)
              .send({ status: "error", message: "user doesn't exist" });
            return;
          }
          delete data.dataValues.password;
          delete data.dataValues.gender;
          delete data.dataValues.role;
          delete data.dataValues.balance;
          // console.log(data.dataValues);
          res.status(200).send({
            user: data,
          });
        });
      }
    });
  } catch (e) {
    res.status(400).send({
      status: "error",
      field: e.errors[0].path,
      value: e.errors[0].value,
      message: e.errors[0].message,
    });
  }
};

export const topupUser = async (req, res) => {
  const user = req.user;
  const { balance } = req.body;
  try {
    await Users.update(
      {
        balance: balance,
      },
      {
        where: {
          id: user.id,
        },
        hooks: false,
      }
    ).then(async (data) => {
      if (data[0] === 1) {
        res.status(200).send({
          message: `Your balance has been successfully updated to Rp. ${numberWithCommas(
            balance
          )} ,-`,
        });
      }
    });
  } catch (e) {
    res.status(400).send({
      status: "error",
      field: e.errors[0].path,
      value: e.errors[0].value,
      message: e.errors[0].message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const user = req.user;
  try {
    if (Number(userId) !== user.id) {
      res
        .status(401)
        .send({ status: "error", message: "authorization failed" });
      return;
    }
    await Users.destroy({
      where: {
        id: user.id,
      },
      // truncate: true,
    }).then((data) => {
      if (data === 1) {
        res.status(200).send({
          message: "Your account has been successfully deleted",
        });
      }
    });
  } catch (e) {
    res.status(400).send({
      status: "error",
      message: e,
    });
  }
};
