// const contextPath = import.meta.env.BASE_URL;
const contextPath = 'http://192.168.1.57/';
export default class CountryService {
    getCountries() {
        return fetch(contextPath + 'demo/data/countries.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
