import moment from "moment";
import { Product, Category } from "../models/index.js";

export const createProduct = async (req, res) => {
    const { title, price, stock, categoryId } = req.body;
    try {
        if (!categoryId) {
            res.status(401).send({ status: "error", message: "categoryId is required" });
            return;
          }
        await Category.findOne({
            where: { id: Number(categoryId) },
          }).then((data) => {
            if (!data) {
              res
                .status(400)
                .send({ status: "error", message: "category doesn't exist" });
              return;
            }
          });
        await Product.create({
            title: title,
            price: price,
            stock: stock,
            categoryId: Number(categoryId),
        }).then((data) => {
            res.status(201).send({
                product: data,
            });
        });
    } catch (e) {
        res.status(400).send({
            status: "error",
            message: e.message,
        });
    }
};

export const showProduct = async (req, res) => {
    try {
        await Product.findAll({
            attributes: [
                "id",
                "title",
                "price",
                "stock",
                "categoryId",
                "createdAt",
                "updatedAt"
            ],
        order: [["createdAt", "DESC"]],
        }).then((data) => {
            res.status(200).send({ products: data });
          });
    } catch (e) {
        res.status(400).send({
            status: "error",
            message: e.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { price, stock, title } =
      req.body;
    try {
      await Product.update(
        {
          price: price,
          stock: stock,
          title: title,
        },
        {
          where: {
            id: productId,
          },
        }
      ).then(async (data) => {
        if (data[0] === 1) {
          await Product.findOne({
            where:{id:productId}
          }).then((data) => {
            if(!data){
              res
                .status(400)
                .send({ status: "error", message: "User doesn't exist" });
              return;
            }
            res.status(200).send({
              product: data,
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

export const updateCategoryId = async (req, res) => {
    const { productId } = req.params;
    const { categoryId } =
      req.body;
    try {
        if (!categoryId) {
            res.status(401).send({ status: "error", message: "categoryId is required" });
            return;
          }
        await Category.findOne({
            where: { id: Number(categoryId) },
          }).then((data) => {
            if (!data) {
              res
                .status(400)
                .send({ status: "error", message: "category doesn't exist" });
              return;
            }
          });
      await Product.update(
        {
          categoryId: categoryId,
        },
        {
          where: {
            id: productId,
          },
        }
      ).then(async (data) => {
        if (data[0] === 1) {
          await Product.findOne({
            where:{id:productId}
          }).then((data) => {
            if(!data){
              res
                .status(400)
                .send({ status: "error", message: "User doesn't exist" });
              return;
            }
            res.status(200).send({
              product: data,
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

export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
      await Product.destroy({
        where: {
          id: productId,
        },
        // truncate: true,
      }).then((data) => {
        if (data === 1) {
          res.status(200).send({
            message: "Product has been successfully deleted",
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