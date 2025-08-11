const express= require('express')
const apiRouter= express.Router()
const multer=require('multer')  // for input image  
const AM= require("../middleware/auth")//  for verify token and user


//---------------multer code-------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')    //====> change directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

//----------------------------------------------------------


let AC = require('../controller/user')

apiRouter.post('/',upload.single('profile'),AC.createData)
apiRouter.get('/',AM.autCheck,AC.viewData)                                 
apiRouter.delete('/:id',AM.autCheck,AC.deleteData)
apiRouter.patch('/:id',AM.autCheck,AC.editData)
apiRouter.post('/login',AC.loginUser)  // login
 
module.exports = apiRouter