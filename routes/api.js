const express= require('express')
const apiRouter= express.Router()


let AC = require('../controller/user')

apiRouter.post('/',AC.createData)
apiRouter.get('/',AC.viewData)

module.exports = apiRouter