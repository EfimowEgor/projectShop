const Router = require('express')
const router = new Router()

const productRouter = require('./productsRouter')
const userRouter = require('./userRouter')
const sellerRouter = require('./sellerRouter')

router.use('/user', userRouter)
router.use('/seller', sellerRouter)
router.use('/product', productRouter)

module.exports = router
