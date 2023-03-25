import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

const CreateProduct = observer(({show, onHide, onAddProduct}) => {
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
    const addProduct = function() {
        let request = new XMLHttpRequest();

        request.open('POST', process.env.REACT_APP_PATH_ADDING, false);

        let formData = new FormData();
        formData.append('price', `${price}`)
        formData.append('Width', `${width}`)
        formData.append('Height', `${height}`)
        formData.append('Quantity', `${quantity}`)
        formData.append('KSR', KSR)
        formData.append('TypeId', `${getKeyByValue(Types, selectedTypeName)}`)
        formData.append('CategoryId', `${getKeyByValue(Categories, selectedCategoryName)}`)
        formData.append('SellerId', `${sellerID}`)
        formData.append('Image', file)

        request.send(formData);
        console.log(request.response);
        window.location.reload();
    };

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
                    Добавить продукт
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
                        placeholder="Введите цену"
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите высоту продукта (М)"
                        onChange={e => setHeight(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ширину продукта (мм)"
                        onChange={e => setWidth(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите количество"
                        onChange={e => setQuantity(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите КСР"
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
                <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;