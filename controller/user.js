let API = require("../model/user");

let bcrypt = require("bcrypt");  //password generator

exports.createData = async (req, res) => {
  try {
    let data = req.body;
    data.password= await bcrypt.hash(data.password,10)   //promises handle

    const userData = await API.create(req.body);   //promises handle
    data.profile= req.file.filename            // for create image data
    

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
    const allData = await API.find();     //promises handle
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

exports.deleteData = async (req, res) => {
  try {
    const deleteId = req.params.id;

    const checkData = await API.findById(deleteId);  //promises handle
    // console.log(checkData);

    if (!checkData) throw new Error("Record not found");

    const deleteData = await API.findByIdAndDelete(deleteId);  //promises handle
    res.status(200).json({
      status: "Success",
      message: "Data Delete SuccessFully",
      data: deleteData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.editData = async (req, res) => {
  try {
    const editId = req.params.id;

    const checkData = await API.findById(editId);  //promises handle
    // console.log(checkData);

    if (!checkData) throw new Error("Record not found");

    const updateData = await API.findByIdAndUpdate(editId, req.body, {    //promises handle
      new: true,
    });
    res.status(200).json({
      status: "Success",
      message: "Data Update SuccessFully",
      data: updateData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
