import {
  Product,
  TransactionHistory,
  Users,
  Category,
} from "../models/index.js";
import { numberWithCommas } from "../helpers/numberWithCommas.js";

export const createTransactionHistory = async (req, res) => {
  const user = req.user;
  const { productId, quantity } = req.body;
  try {
    if (!productId) {
      res
        .status(401)
        .send({ status: "error", message: "productId is required" });
      return;
    }

    await Product.findOne({
      where: { id: Number(productId) },
    }).then(async (data) => {
      // check if the desired product exists?
      if (!data) {
        res
          .status(400)
          .send({ status: "error", message: "product doesn't exist" });
        return;
      }

      // check whether the desired product is in stock
      if (Number(data.dataValues.stock) < quantity) {
        res.status(400).send({
          status: "error",
          quantity,
          stock: Number(data.dataValues.stock),
          message: `Available stock is less than the quantity you want to purchase. Only have ${data.dataValues.stock} items in stock`,
        });
        return;
      }

      // check whether the user's balance is sufficient to purchase the desired product
      const total_price = quantity * Number(data.dataValues.price);
      if (Number(user.balance) < total_price) {
        res.status(400).send({
          status: "error",
          quantity,
          price_of_item: `Rp. ${numberWithCommas(
            Number(data.dataValues.price)
          )} ,-`,
          total_price: `Rp. ${numberWithCommas(total_price)} ,-`,
          balance: `Rp. ${numberWithCommas(Number(user.balance))} ,-`,
          message: "Insufficient user balance to make a transaction.",
        });
        return;
      }

      // decrease stock
      await Product.update(
        {
          stock: Number(data.dataValues.stock) - quantity,
        },
        { where: { id: productId }, hooks: false }
      );

      // decrease balance
      await Users.update(
        {
          balance: Number(user.balance) - total_price,
        },
        {
          where: {
            id: user.id,
          },
          hooks: false,
        }
      );

      // add sold_product_amount
      await Category.update(
        {
          sold_product_amount: quantity,
        },
        { where: { id: data.dataValues.categoryId }, hooks: false }
      );

      // create Transaction History
      await TransactionHistory.create({
        productId: Number(productId),
        userId: user.id,
        quantity: quantity,
        total_price: total_price,
      });

      // response
      res.status(201).send({
        message: "You have successfully purchase the product",
        transactionBill: {
          total_price: total_price,
          quantity: quantity,
          product_name: data.dataValues.title,
        },
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

export const showTransactionUser = async (req, res) => {
  const user = req.user;
  try {
    await TransactionHistory.findAll({
      attributes: [
        "id",
        "productId",
        "userId",
        "quantity",
        "total_price",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Product,
          attributes: ["id", "title", "price", "stock", "categoryId"],
        },
      ],
      where: {
        userId: user.id,
      },
      order: [["createdAt", "DESC"]],
    }).then((data) => {
      data = data.map((item) => {
        item.dataValues.total_price = `Rp. ${numberWithCommas(
          item.dataValues.total_price
        )} ,-`;
        item.dataValues.product.price = `Rp. ${numberWithCommas(
          item.dataValues.product.price
        )} ,-`;
        return item;
      });
      res.status(200).send({ TransactionHistories: data });
    });
  } catch (e) {
    res.status(400).send({
      status: "error",
      message: e,
    });
  }
};

export const showTransactionAdmin = async (req, res) => {
  const user = req.user;
  try {
    await TransactionHistory.findAll({
      attributes: [
        "id",
        "productId",
        "userId",
        "quantity",
        "total_price",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Product,
          attributes: ["id", "title", "price", "stock", "categoryId"],
        },
        {
          model: Users,
          attributes: ["id", "email", "balance", "gender", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    }).then((data) => {
      data = data.map((item) => {
        item.dataValues.total_price = `Rp. ${numberWithCommas(
          item.dataValues.total_price
        )} ,-`;
        item.dataValues.product.price = `Rp. ${numberWithCommas(
          item.dataValues.product.price
        )} ,-`;
        item.dataValues.user.balance = `Rp. ${numberWithCommas(
          item.dataValues.user.balance
        )} ,-`;
        return item;
      });
      res.status(200).send({ TransactionHistories: data });
    });
  } catch (e) {
    res.status(400).send({
      status: "error",
      message: e,
    });
  }
};
export const showTransactionById = async (req, res) => {
  const { transactionId } = req.params;
  const user = req.user;
  try {
    await TransactionHistory.findOne({
      include: [
        {
          model: Product,
          attributes: ["id", "title", "price", "stock", "categoryId"],
        },
      ],
      where: {
        id: transactionId,
      },
    }).then((data) => {
      data.dataValues.total_price = `Rp. ${numberWithCommas(
        data.dataValues.total_price
      )} ,-`;
      data.dataValues.product.price = `Rp. ${numberWithCommas(
        data.dataValues.product.price
      )} ,-`;
      res.status(200).send({ TransactionHistories: data });
    });
  } catch (e) {
    res.status(400).send({
      status: "error",
      message: e,
    });
  }
};
