let API = require("../model/user");
const nodemailer = require("nodemailer");
const jwt= require('jsonwebtoken') // generate token

let bcrypt = require("bcrypt"); //password convertor

exports.createData = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // -change its required gmail.com
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "maulik.cdmi@gmail.com", // generated email
      pass: "gqzosfnxwnnaydmo", // generated password
    },
  });

  const sendMail = async (email) => {     //remove Immidiatly invoke function and add const sendmail
    const info = await transporter.sendMail({
      from: "maulik.cdmi@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Hello ✔",
      text: "Hello world?", // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
    });

    console.log("Message sent:", info.messageId);
  };

  try {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10); //promises handle
    data.profile = req.file.filename; // for create image data
    // console.log("==>", data.email);
    // add images before data create api
    sendMail(data.email);

    const userData = await API.create(req.body); //promises handle

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

exports.viewData = async (req,res) => {
  try {
    const allData = await API.find(); //promises handle
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

exports.deleteData = async (req,res) => {
  try {
    const deleteId = req.params.id;

    const checkData = await API.findById(deleteId); //promises handle
    // console.log(checkData);

    if (!checkData) throw new Error("Record not found");

    const deleteData = await API.findByIdAndDelete(deleteId); //promises handle
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

    const checkData = await API.findById(editId); //promises handle
    // console.log(checkData);

    if (!checkData) throw new Error("Record not found");

    const updateData = await API.findByIdAndUpdate(editId, req.body, {
      //promises handle
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



exports.loginUser = async (req, res) => {

    try {
        const emailVerify = await API.findOne({ email: req.body.email })

        if (!emailVerify) throw new Error("Invalid email")

        const passVerify = await bcrypt.compare(req.body.password, emailVerify.password)

        if (!passVerify) throw new Error('Invalid password')

        const token = jwt.sign({ id: emailVerify._id }, 'surat')

        res.status(200).json({
            status: 'Success',
            message: 'Login Successfully',
            loginUser: emailVerify,
            token
        })

    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}
