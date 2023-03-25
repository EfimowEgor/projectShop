import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import CreateProduct from "./modals/CreateProduct";

const NavBar = observer(() => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const {seller} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        seller.setSeller({})
        seller.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }
    const handleCloseClick = () => {
        setIsAddProductModalOpen(false);
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="ms-auto">
                    <Button
                        variant={"outline-light"}
                        className="ms-2"
                        onClick={() => setIsAddProductModalOpen(true)}
                    >
                        Добавить продукт
                    </Button>
                    <Button variant={"outline-light"} href="#home" className="ms-2">Аналитика</Button>
                    <Button
                        variant={"outline-light"}
                        href="#home"
                        className="ms-5"
                        onClick={() => logOut()}
                    > Выход
                    </Button>
                </Nav>
            </Container>
            <CreateProduct show={isAddProductModalOpen} onHide={handleCloseClick}/>
        </Navbar>
    );
});

export default NavBar;