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

exports.deleteData = async(req , res) => {
    try {
        const deleteId = req.params.id

        const checkData = await API.findById(deleteId)
        // console.log(checkData);

        if(!checkData) throw new Error('Record not found')
        
        const deleteData = await API.findByIdAndDelete(deleteId)
        res.status(200).json({
            status : 'Success',
            message : 'Data Delete SuccessFully',
            data : deleteData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            message : error.message
        })
    }
}

exports.editData = async(req , res) => {
    try {   
        const editId = req.params.id
        const updateData = await API.findByIdAndUpdate(editId , req.body , {new : true})
        res.status(200).json({
            status : 'Success',
            message : 'Data Update SuccessFully',
            data : updateData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            message : error.message
        })
    }
}
