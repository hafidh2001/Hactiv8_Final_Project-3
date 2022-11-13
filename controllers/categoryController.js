import { Category, Product } from "../models/index.js";

export const createCategory = async (req, res) => {
  const user = req.user;
  const { type } = req.body;
  try {
    await Category.create(
      {
        type: type,
      },
      {
        hooks: true,
      }
    ).then((data) => {
      res.status(201).send({ category: data });
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

export const showCategories = async (req, res) => {
  const user = req.user;
  try {
    await Category.findAll({
      attributes: [
        "id",
        "type",
        "sold_product_amount",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Product,
        },
      ],
      order: [["createdAt", "DESC"]],
    }).then((data) => {
      res.status(200).send({ categories: data });
    });
  } catch (e) {
    res.status(400).send({
      status: "error",
      message: e,
    });
  }
};

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const user = req.user;
  const { type } = req.body;
  try {
    await Category.findOne({
      where: { id: categoryId },
    }).then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ status: "error", message: "category doesn't exist" });
        return;
      }
    });
    await Category.update(
      {
        type: type,
      },
      { where: { id: categoryId }, hooks: false }
    ).then(async (data) => {
      if (data[0] === 1) {
        await Category.findOne({
          where: { id: categoryId },
        }).then((data) => {
          if (!data) {
            res
              .status(400)
              .send({ status: "error", message: "category doesn't exist" });
            return;
          }
          res.status(200).send({
            category: data,
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

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const user = req.user;
  try {
    await Category.findOne({
      where: { id: categoryId },
    }).then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ status: "error", message: "category doesn't exist" });
        return;
      }
    });
    await Category.destroy({
      where: { id: categoryId },
      // truncate: true,
    }).then((data) => {
      if (data === 1) {
        res.status(200).send({
          message: "Category has been successfully deleted",
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
