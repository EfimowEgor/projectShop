import {makeAutoObservable} from "mobx";

export default class sellerStore {
    constructor() {
        this._isAuth = false
        this._seller = {}
        this._sellerId = -1
        makeAutoObservable(this)
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setSeller(seller) {
        this._seller = seller
    }
    get isAuth() {
        return this._isAuth
    }
    get seller() {
        return this._seller
    }
}