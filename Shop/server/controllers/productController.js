const uuid = require('uuid')
const path = require('path');
const {Product, Categories, Types} = require('../models/models')
const ApiError = require('../error/ApiError');
class ProductController {
    async create (req, res, next) {
        try {
            let {price, Height, Width, Quantity, KSR} = req.body
            const img = req.files['Image']
            console.log(req.files, '\n')
            console.log(req.body)
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({
                price: price,
                Height: Height,
                Width: Width,
                SellerId: req.body.SellerId,
                Quantity: Quantity,
                KSR: KSR,
                CategoryId: req.body.CategoryId,
                TypeId: req.body.TypeId,
                Image: fileName
            })
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async addToCart(req, res, next) {
        try {
            let {Quantity} = req.body

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll (req, res) {
        let {sellerId, typeId, limit, page} = req.body
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (!sellerId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (sellerId && !typeId) {
            products = await Product.findAndCountAll({where: {sellerId}, limit, offset})
        }
        if (!sellerId && typeId) {
            products = await Product.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (sellerId && typeId) {
            products = await Product.findAndCountAll({where: {sellerId, typeId}, limit, offset})
        }
        return res.json(products)
    }
    async getAllNoPagination(req, res) {
        const products = await Product.findAll({

        })
        return res.json(products)
    }
    async getAllLoad (req, res, id) {
        const products = await Product.findAll({
            include: [Categories, Types],
            attributes: {
                exclude: ['CategoryId', 'TypeId']
            },
            where: {
                SellerId: req.params.id,
            }
        })
        {console.log(req.params.id)}
        return res.json(products)
    }

    async deleteProduct(req, res) {
        try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        } catch (e) {
            return res.json(e.message)
        }
    }
    async updateProduct(req, res) {
        try {
            const updates = req.body
            await Product.update(updates, {
                where: {
                    id: req.params.id
                }
            })
            return req.params
        } catch (e) {
            return res.json(e.message)
        }
    }

    async getOne (req, res) {
        const {id} = req.params
        const product = await Product.findOne({where:
                {id: id}
        })
        return res.json(product)
    }
}

module.exports = new ProductController()