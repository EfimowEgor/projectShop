import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/sellerAPI";

const App = observer(() => {
    const {seller} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        check().then(data => {
            seller.setSeller(data)
            seller._sellerId = data.id
            seller.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
})

export default App;
