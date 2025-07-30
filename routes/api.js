const express= require('express')
const apiRouter= express.Router()


let AC = require('../controller/user')

apiRouter.post('/',AC.createData)
apiRouter.get('/',AC.viewData)
apiRouter.delete('/:id',AC.deleteData)
apiRouter.patch('/:id',AC.editData)

module.exports = apiRouter