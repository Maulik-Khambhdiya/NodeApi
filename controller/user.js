let API = require("../model/user");

exports.createData = async (req, res) => {
  try {
    const userData = await API.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Data create successfully",
      data: userData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.viewData = async (req, res) => {
  try {
    const allData = await API.find();
    res.status(200).json({
      status: "success",
      message: "Data Found successfully",
      data: allData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
