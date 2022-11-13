export const authorizationAdmin = async (req, res, next) => {
    // get authentication data
    const user = req.user;
    try {
      // check if the data is admin or not
      if (user.role !== "admin") {
        res.status(403).json({
          status: "error",
          message: `User with email '${user.email}' does not have permission to access`,
        });
        return;
      }
      next();
    } catch (error) {
      next(error);
    }
  };