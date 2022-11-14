import { TransactionHistory, Product, Users } from "../models/index.js";

export const createTransaction = async (req, res) => {
    const { productId, quantity } = req.body;
    const user = req.user;
    try {
        if (!productId) {
            res.status(401).send({ status: "error", message: "productId is required" });
            return;
          }
        const product = await Product.findOne({
            where: { id: Number(productId) },
          }).then((data) => {
            if (!data) {
              res
                .status(400)
                .send({ status: "error", message: "product doesn't exist" });
              return;
            }
            if(quantity > data.dataValues.stock){
                res
                .status(400)
                .send({ status: "error", message: "product out of stock" });
              return;
            }

            if(user.balance < data.dataValues.price){
                res
                    .status(400)
                    .send({ status: "error", message: "out of money" });
                return;
            }
            return data;
          });
          await Product.update(
            {
              stock: product.stock - quantity,
            },
            {
              where: {
                id: productId,
              },
            }
          )
        await TransactionHistory.create({
            productId: productId,
            userId: user.id,
            total_price: product.price,
            quantity: quantity,
        }).then((data) => {
            delete data.dataValues.id;
            delete data.dataValues.productId;
            delete data.dataValues.userId;
            delete data.dataValues.updatedAt;
            delete data.dataValues.createdAt;
            res.status(201).send({
                message: "You have successfully purchase the product",
                trancastionBill: data,
            });
        });
    } catch (e) {
        res.status(400).send({
            status: "error",
            message: e.message,
          });
    }
};

export const showTransaction = async (req, res) => {
    const user = req.user;
    try {
        await TransactionHistory.findAll({
            where:{
                userId: user.id
            },
            attributes: [
                "productId",
                "userId",
                "quantity",
                "total_price",
                "createdAt",
                "updatedAt"
            ],
            include: [
                {
                  model: Product,
                  attributes: ["id", "title", "price", "stock", "categoryId"],
                }
              ],
        order: [["createdAt", "DESC"]],
        }).then((data) => {
            res.status(200).send({ transactionHistories: data });
          });
    } catch (e) {
        res.status(400).send({
            status: "error",
            message: e.message,
        });
    }
};

export const showTransactionByAdmin = async (req, res) => {
    const user = req.user;
    try {
        await TransactionHistory.findAll({
            attributes: [
                "productId",
                "userId",
                "quantity",
                "total_price",
                "createdAt",
                "updatedAt"
            ],
            include: [
                {
                  model: Product,
                  attributes: ["id", "title", "price", "stock", "categoryId"],
                },
                {
                    model: Users,
                    attributes: ["id", "email", "balance", "gender", "role"],
                }
              ],
        order: [["createdAt", "DESC"]],
        }).then((data) => {
            res.status(200).send({ transactionHistories: data });
          });
    } catch (e) {
        res.status(400).send({
            status: "error",
            message: e.message,
        });
    }
};

export const showTransactionById = async (req, res) => {
    const { transactionId } = req.params;
    try {
        await TransactionHistory.findOne({
            where:{
                id: transactionId
            },
            attributes: [
                "productId",
                "userId",
                "quantity",
                "total_price",
                "createdAt",
                "updatedAt"
            ],
            include: [
                {
                  model: Product,
                  attributes: ["id", "title", "price", "stock", "categoryId"],
                }
              ],
        order: [["createdAt", "DESC"]],
        }).then((data) => {
            res.status(200).send({ transactionHistories: data });
          });
    } catch (e) {
        res.status(400).send({
            status: "error",
            message: e.message,
        });
    }
};