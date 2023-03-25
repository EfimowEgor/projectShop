const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const {hash} = require("bcrypt");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY_USER,
        {expiresIn: '24h'}
    )
}
class UserController {
    async registration (req, res, next) {
        const {login, password, name, role} = req.body
        if (!login || !password || !name) {
            return next(ApiError.badRequest('Incorrect login or password or name'))
        }
        const candidate = await User.findOne({where: {
                login: req.body.login
            }})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует.'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login: login, RoleId: 1, password: hashPassword, name: name})
        const token = generateJwt(user.id, user.login, user.role, user.name)
        return res.json({token})
    }
    async login (req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {
            login: login
            }})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден.'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Введён неверный логин или пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role, user.name)
        return res.json({token})
    }
    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role, req.user.name)
        return res.json({token})
    }
}

module.exports = new UserController()