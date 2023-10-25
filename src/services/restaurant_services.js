import { instance } from './axios';
// import axios from 'axios';
const fetchLogin = (loginData, config) => {
    return instance.post('/user/login', loginData, config);
};
const fetchDish = () => {
    return instance.get('/monan/list');
};


const createProduct = (param, config) => {
    
    return instance.post('/monan/create', param , config);
}
export { fetchLogin, fetchDish, createProduct };
