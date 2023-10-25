import logo from '../../assets/imgs/sv_logo_dashboard.png';
import { Link, useNavigate } from 'react-router-dom';
import './header.scss';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
function Header() {
    const name = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : {};
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName(name.username);
        
    }, [name]);


    const ClickLogOut = () => {
        localStorage.clear('user_info');
        navigate('/login');
        notification.open({
            type: 'success',
            message: 'Đăng xuất thành công',
            description: '',
            duration: 2,
        });
    };

    return (
        <header className="container-fluid p-0 py-4 header">
            <div className="container p-0 d-flex justify-content-between">
                <div className="">
                    <img src={logo} alt="logo"></img>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                        <div className="me-4 fs-5 fst-mormal header_hover">Trang chủ</div>
                    </Link>
                    <div className="me-4 fs-5 fst-mormal header_hover">Giới thiệu</div>
                    <Link to="/product" style={{ textDecoration: 'none', color: 'black' }}>
                        <div className="me-4 fs-5 fst-mormal header_hover">Sản phẩm</div>
                    </Link>
                </div>

                <div className="d-flex justify-content-end align-items-center">
                    {userName ? (
                        <div className='wrap_user'>
                            <span className="fw-bolder ">
                                {userName}
                            </span>
                            <p className="log_out mt-3 fw-normal" onClick={ClickLogOut}>
                                    Đăng xuất
                                </p>
                        </div>
                    ) : (
                        <div className="fs-5 fst-mormal header_hover">
                            <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                                Đăng nhập
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
