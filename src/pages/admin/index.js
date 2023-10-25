import React, { useEffect, useState } from 'react';
import './style.scss';
import { Button, Form, Input, notification } from 'antd';
import { createProduct, fetchDish } from '../../services/restaurant_services';

function AdminPage() {
    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [imgProduct, setImgProduct] = useState('');
    const [descriptionProduct, setDescription] = useState('');

    const [list, setList] = useState([]);

    const getList = async () => {
        await fetchDish().then((response) => {
            setList(response);
        });
    };

    useEffect(() => {
        getList();
    }, []);

    const register = async () => {
        const config = {
            headers: {
                token: localStorage.getItem('access_token') || '',
            },
        }; //

        await createProduct(
            {
                TenMonAn: nameProduct,
                Mota: descriptionProduct,
                Gia: priceProduct,
                AnhMonAn: imgProduct,
            },
            config,
        )
            .then((response) => {
                notification.open({
                    type: 'success',
                    message: 'Tạo món ăn thành công',
                    description: '',
                    duration: 2,
                });
                getList();
            })
            .catch((err) => {
                notification.open({
                    type: 'error',
                    message: err.response.data.error || 'Có lỗi',
                    description: '',
                    duration: 2,
                });
            });
    };

    return (
        <div className="row">
            <div className="col-6">
                <div className="d-flex flex-wrap">
                    {list &&
                        list.map((item) => (
                            <div className="col-md-4 ps-3 mb-5" key={item.id}>
                                <div className="img_item">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="d-flex flex-column align-items-center mt-3">
                                    <span className="">{item.price}đ</span>
                                    <span className="mt-3 item">{item.name}</span>
                                </div>
                                {/* <div className="d-flex justify-content-center mt-4">
                                    <button className="btn_buy px-4 py-2">Thêm</button>
                                </div> */}
                            </div>
                        ))}
                </div>
            </div>
            <div className="col-6">
                <div className="mt-5 d-flex justify-content-center">
                    <div className="login">
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên sản phẩm"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Cần nhập tên sản phẩm',
                                    },
                                ]}
                            >
                                <Input
                                    onChange={(e) => {
                                        setNameProduct(e.target.value);
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Giá"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter price',
                                    },
                                ]}
                            >
                                <Input
                                    onChange={(e) => {
                                        setPriceProduct(e.target.value);
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter description',
                                    },
                                ]}
                            >
                                <Input
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Ảnh minh hoạ"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter image',
                                    },
                                ]}
                            >
                                <Input
                                    onChange={(e) => {
                                        setImgProduct(e.target.value);
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <button className="button_login" type="primary" onClick={register}>
                                    Tạo mới
                                </button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
