const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Seller} = require('../models/models')
const {hash} = require("bcrypt");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY_SELLER,
        {expiresIn: '24h'}
    )
}
class SellerController {
    async registration (req, res, next) {
        const {login, password, role, INN} = req.body
        if (!login || !password || !INN) {
            return next(ApiError.badRequest('Incorrect login or password or INN'))
        }
        const candidate = await Seller.findOne({where: {
                login: req.body.login
            }})
        if (candidate) {
            return next(ApiError.badRequest('Email занят.'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const seller = await Seller.create({login: login, RoleId: 2, password: hashPassword, INN: INN})
        const token = generateJwt(seller.id, seller.login, seller.role)
        return res.json({token})
    }
    async login (req, res, next) {
        const {login, password} = req.body
        const seller = await Seller.findOne({where: {
                login: login
            }})
        if (!seller) {
            return next(ApiError.internal('Пользователь не найден.'))
        }
        let comparePassword = bcrypt.compareSync(password, seller.password)
        if (!comparePassword) {
            return next(ApiError.internal('Введён неверный логин или пароль'))
        }
        const token = generateJwt(seller.id, seller.login, seller.role)
        return res.json({token})
    }
    async check (req, res, next) {
        const token = generateJwt(req.seller.id, req.seller.login, req.seller.role)
        return res.json({token})
    }
}

module.exports = new SellerController()