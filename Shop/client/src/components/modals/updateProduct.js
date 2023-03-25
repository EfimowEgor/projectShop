import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {editProduct} from "../../http/productAPI";

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

const updateProduct = observer(({show, onHide, id, p, w, h, KSR_param, quantityParam, categoryName, typeName, img}) => {
    const {seller} = useContext(Context)
    const sellerID = seller._sellerId
    const [selectedTypeName, setSelectedTypeName] = useState('')
    const [selectedCategoryName, setSelectedCategoryName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [KSR, setKSR] = useState('')



    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeProduct = () => {
        // console.log('tut')
        //
        let formData = new FormData();
        formData.append('price', `${price || p}`)
        formData.append('Width', `${width || w}`)
        formData.append('Height', `${height || h}`)
        formData.append('Quantity', `${quantity || quantityParam}`)
        formData.append('KSR', KSR || KSR_param)
        formData.append('TypeId', `${getKeyByValue(Types, selectedTypeName) || getKeyByValue(Types, typeName)}`)
        formData.append('CategoryId', `${getKeyByValue(Categories, selectedCategoryName) || getKeyByValue(Categories, categoryName)}`)
        formData.append('SellerId', `${sellerID}`)
        if (file != null) {
            formData.append('Image', file)
        }
        else
            formData.append('Image', img)

        // window.location.reload();
        fetch(process.env.REACT_APP_PATH_EDITING + id, {
            method: 'PUT',
            body: formData
        })
            .then(response => response.text())
            .then(message => console.log(message));
    }

    // Изменить на нормальные запросы
    const Categories =
        {
            1 : 'Обои'
        }
    const Types =
        {
            1 : 'Обои бумажные',
            2 : 'Обои виниловые',
            3 : 'Обои на тканевой основе',
            4 : 'Обои водостойкие'
        }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedCategoryName || 'Выберите категорию'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.entries(Categories).map(([key, value]) =>
                                <Dropdown.Item
                                    onClick={() => setSelectedCategoryName(value)}
                                >
                                    {value}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedTypeName || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.entries(Types).map(([key, value]) =>
                                <Dropdown.Item
                                    onClick={() => setSelectedTypeName(value)}
                                >
                                    {value}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        placeholder={p}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={h}
                        onChange={e => setHeight(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={w}
                        onChange={e => setWidth(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={quantityParam}
                        onChange={e => setQuantity(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={KSR_param}
                        onChange={e => setKSR(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Отменить</Button>
                <Button variant="outline-success" onClick={changeProduct}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default updateProduct;