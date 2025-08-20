const jwt = require("jsonwebtoken");
const USER = require("../model/user");
exports.authCheck = async (req, res, next) => {
  // console.log("======");

  try {
    
    const token = req.headers.authorization;
    // console.log(token);

    if (!token) throw new Error("Attach token");

    const tokenVerify = jwt.verify(token, "surat");

    console.log("===>",tokenVerify);
    

    console.log(tokenVerify);

    if (!tokenVerify) throw new Error("Invalid token");

    const userVerify = await USER.findById(tokenVerify.id);

    if (!userVerify) throw new Error("Invalid User");

    next();
    
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
