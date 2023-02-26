// const contextPath = import.meta.env.BASE_URL;
const contextPath = 'http://192.168.1.57/';
export default class CustomerService {
    getCustomersSmall() {
        return fetch(contextPath + 'api/customers-small')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomersMedium() {
        return fetch(contextPath + 'api/customers-medium')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomersLarge() {
        return fetch(contextPath + 'api/customers-large')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomersXLarge() {
        return fetch(contextPath + 'api/customers-xlarge')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomers(params) {
        const queryParams = Object.keys(params)
            .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
        return fetch('https://www.primefaces.org//demo/data/customers?' + queryParams).then((res) => res.json());
    }
}
