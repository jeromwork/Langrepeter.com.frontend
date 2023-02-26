// const contextPath = import.meta.env.BASE_URL;
const contextPath = 'http://192.168.1.57/';
export default class ProductService {
    getProductsSmall() {
        return fetch(contextPath + 'api/products')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProducts() {
        return fetch(contextPath + 'demo/data/products.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch(contextPath + 'demo/data/products-orders-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
