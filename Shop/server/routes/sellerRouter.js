const Router = require('express')
const router = new Router()
const sellerController = require('../controllers/sellerController')
const authMiddleware = require('../middleware/sellerAuthMiddleware')

router.post('/registrationSeller', sellerController.registration)
router.post('/loginSeller', sellerController.login)
router.get('/authSeller', authMiddleware, sellerController.check)

module.exports = router
