import { TransactionHistory } from "../models/index.js";

export const authorizationTransactionHistory = async (req, res, next) => {
  const { transactionId } = req.params;
  const user = req.user;
  try {
    await TransactionHistory.findOne({
      where: { id: transactionId },
    }).then((data) => {
      if (!data) {
        res.status(400).send({
          status: "error",
          message: "transaction history doesn't exist",
        });
        return;
      }
      // check if the data is admin or not
      if (data.userId !== user.id && user.role !== "admin") {
        res.status(403).json({
          status: "error",
          message: `User with email '${user.email}' does not have permission to access`,
        });
        return;
      }
    });
    next();
  } catch (error) {
    next(error);
  }
};
