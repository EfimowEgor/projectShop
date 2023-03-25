import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sellerStore from "./store/sellerStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
            seller: new sellerStore()
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
