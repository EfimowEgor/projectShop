import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Modal} from "react-bootstrap";
import NavBar from "../components/NavBar";
import {Context} from "../index";
import {deleteProduct} from "../http/productAPI";
import UpdateProduct from "../components/modals/updateProduct";

let ID = -1
let curPrice, curWidth, curHeight, curQuantity, curKSR, curType, curCategory, curImg

const Adm = () => {
    const {seller} = useContext(Context)
    const sellerID = seller._sellerId
    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

    const handleClose = () => setShow(false);
    const clickShow = () => setShow(true);
    const clickShowEdit = () => setIsEditProductModalOpen(true)
    const clickDelete = (id) => {
        console.log(ID)
        deleteProduct(id)
        setShow(false)
        window.location.reload();
    }
    const passID = (id) => {
        ID = id
        console.log(ID)
    }
    const getValues = (price, width, height, KSR, category, type, quantity, img) => {
        curPrice = price
        curWidth = width
        curHeight = height
        curKSR = KSR
        curCategory = category
        curType = type
        curQuantity = quantity
        curImg = img
        console.log(curImg)
    }

    useEffect(() => {
        const getProduct = async () => {
            const res = await fetch(process.env.REACT_APP_PATH_DELETION + sellerID)
            const getData = await res.json()
            setProduct(getData)
            console.log(getData)
        }
        getProduct()
    }, [])

    return (
        <Container className="d-flex flex-column">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Удаление продукта</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить продукт?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => {
                        clickDelete(ID);
                    }}>
                        Ок
                    </Button>
                </Modal.Footer>
            </Modal>
            <NavBar />
            <Container className="d-flex justify-content-between mt-3 pl-3 pr-3">
                <h2 className="align-items-center"> Мои продукты </h2>
            </Container>
            <table className="table table-bordered text-bg-dark">
                <thead>
                    <tr>
                        <th>Цена</th>
                        <th>Высота</th>
                        <th>Ширина</th>
                        <th>Количество</th>
                        <th>КСР</th>
                        <th>Категория</th>
                        <th>Тип</th>
                    </tr>
                </thead>
                <tbody>
                {
                    product.map( (getProd) => (
                        <tr>
                            <td> {getProd.price}</td>
                            <td> {getProd.Height}</td>
                            <td> {getProd.Width}</td>
                            <td> {getProd.Quantity}</td>
                            <td> {getProd.KSR}</td>
                            <td> {getProd.Category.Category_Name}</td>
                            <td> {getProd.Type.Type_Name}</td>
                            <td style={{textAlign: "center"}}> {
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        passID(getProd.id);
                                        clickShow()
                                    }}
                                >
                                    Удалить
                                </button>}
                            </td>
                            <td style={{textAlign: "center"}}> {
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        passID(getProd.id);
                                        getValues
                                        (
                                            getProd.price,
                                            getProd.Width,
                                            getProd.Height,
                                            getProd.KSR,
                                            getProd.Category.Category_Name,
                                            getProd.Type.Type_Name,
                                            getProd.Quantity,
                                            getProd.Image
                                        );
                                        clickShowEdit();
                                    }}
                                >
                                    Изменить
                                </button>}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <UpdateProduct
                show={isEditProductModalOpen}
                onHide={() => setIsEditProductModalOpen(false)}
                id={ID}
                p={curPrice}
                w={curWidth}
                h={curHeight}
                quantityParam={curQuantity}
                KSR_param={curKSR}
                typeName={curType}
                categoryName={curCategory}
                img={curImg}
            />
        </Container>
    );
};

export default Adm;