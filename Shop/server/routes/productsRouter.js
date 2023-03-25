const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/', productController.create)
router.get('/', productController.getAll)
router.get('/productList', productController.getAllNoPagination)
router.get('/load/:id', productController.getAllLoad)
router.get('/delete/:id', productController.deleteProduct)
router.put('/update/:id', productController.updateProduct)
router.get('/:id', productController.getOne)

module.exports = router
