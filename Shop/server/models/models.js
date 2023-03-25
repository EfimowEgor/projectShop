const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false
})

const Seller = sequelize.define('Seller', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    INN: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})

const Favorite = sequelize.define('Favorite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}, {
    timestamps: false
})

const Basket = sequelize.define('Basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Product_Quantity: {type: DataTypes.INTEGER, allowNull: false}
}, {
    timestamps: false
})

const Orders = sequelize.define('Orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Product_Quantity: {type: DataTypes.INTEGER, allowNull: false}
}, {
    timestamps: false
})

const Product_Reviews = sequelize.define('Product_Reviews', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Product_Review: {type: DataTypes.STRING},
    Product_Grade: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
}, {
    timestamps: false
})

const Roles = sequelize.define('Roles', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Role_Name: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})

const Categories = sequelize.define('Categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Category_Name: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})

const Types = sequelize.define('Types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Type_Name: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})

const Product = sequelize.define('Product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    Height: {type: DataTypes.INTEGER, allowNull: false},
    Width: {type: DataTypes.INTEGER, allowNull: false},
    Quantity: {type: DataTypes.INTEGER, allowNull: false},
    KSR: {type: DataTypes.STRING, allowNull: false},
    Image: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false,
    }
)

// Создание связей для Избранного
User.hasMany(Favorite, {onDelete: 'CASCADE', hooks: true})
Favorite.belongsTo(User)

Product.hasMany(Favorite, {onDelete: 'CASCADE', hooks: true})
Favorite.belongsTo(Product)

// Создание связей для Корзины
User.hasMany(Basket, {onDelete: 'CASCADE', hooks: true})
Basket.belongsTo(User)

Product.hasMany(Basket, {onDelete: 'CASCADE', hooks: true})
Basket.belongsTo(Product)

// Создание связей для Заказов
User.hasMany(Orders, {onDelete: 'CASCADE', hooks: true})
Orders.belongsTo(User)

Product.hasMany(Orders, {onDelete: 'CASCADE', hooks: true})
Orders.belongsTo(Product)

// Создание связей для Оценок Продуктов
Product.hasMany(Product_Reviews, {onDelete: 'CASCADE', hooks: true})
Product_Reviews.belongsTo(Product)

User.hasMany(Product_Reviews, {onDelete: 'CASCADE', hooks: true})
Product_Reviews.belongsTo(User)

// Создание связей для Продукта
Seller.hasMany(Product, {onDelete: 'CASCADE', hooks: true, foreignKey: 'SellerId'})
Product.belongsTo(Seller)

Categories.hasMany(Product, {onDelete: 'CASCADE', hooks: true, foreignKey: 'CategoryId'})
Product.belongsTo(Categories)

Types.hasMany(Product, {foreignKey: 'TypeId'})
Product.belongsTo(Types)

// Создание связей для Покупателя
Roles.hasOne(User, {foreignKey: 'RoleId'})
User.belongsTo(Roles)

// Создание связей для продавца
Roles.hasOne(Seller, {foreignKey: 'RoleId'})
Seller.belongsTo(Roles)

module.exports = {
    User,
    Seller,
    Favorite,
    Basket,
    Orders,
    Product_Reviews,
    Roles,
    Categories,
    Types,
    Product
}