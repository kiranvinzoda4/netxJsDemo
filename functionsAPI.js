import axios from 'axios'
import { URL } from './config'

function getHeaders(type = 'AdminToken') {
    const token = (type === 'AdminToken') ? localStorage.getItem('smsToken') : localStorage.getItem('smsCustomerToken') ? localStorage.getItem('smsCustomerToken') : null
    const headers = {
        // 'accept': 'application/json',
        'Content-Type': 'application/json',
        token
    }
    return headers
}

export const apiGet = (apiURL = '/URL_HERE', params = {}, tokenType = 'AdminToken') => {
    const url = URL + apiURL
    const headerConfig = {
        headers: getHeaders(tokenType),
        params
    }
    return new Promise(async (resolve, reject) => {
        await axios.get(url, headerConfig)
            .then((data) => resolve(data))
            .catch((error) => {
                if (error.response) {
                    if (error.response.data) {
                        reject(error.response.data.detail)
                    } else {
                        reject('Something went wrong!')
                    }
                } else {
                    // reject(error.message)
                    reject('Something went wrong!')
                }
            });
    });
};

export const apiPost = (apiURL = '/URL_HERE', data = {}, params = {}, tokenType = 'AdminToken') => {
    const url = URL + apiURL
    const headerConfig = { headers: getHeaders(tokenType), params }
    return new Promise(async (resolve, reject) => {
        await axios.post(url, data, headerConfig)
            .then((data) => resolve(data))
            .catch((error) => {
                if (error.response) {
                    if (error.response.data) {
                        reject(error.response.data.detail)
                    } else {
                        reject('Something went wrong!')
                    }
                } else {
                    // reject(error.message)
                    reject('Something went wrong!')
                }
            });
    });
};

export const apiPut = (apiURL = '/URL_HERE', data = {}, params = {}, tokenType = 'AdminToken') => {
    const url = URL + apiURL
    const headerConfig = { headers: getHeaders(tokenType), params }
    return new Promise(async (resolve, reject) => {
        await axios.put(url, data, headerConfig)
            .then((data) => resolve(data))
            .catch((error) => {
                if (error.response) {
                    if (error.response.data) {
                        reject(error.response.data.detail)
                    } else {
                        reject('Something went wrong!')
                    }
                } else {
                    // reject(error.message)
                    reject('Something went wrong!')
                }
            });
    });
};

export const apiDelete = (apiURL = '/URL_HERE') => {
    const url = URL + apiURL
    const headerConfig = { headers: getHeaders() }
    return new Promise(async (resolve, reject) => {
        await axios.delete(url, headerConfig)
            .then((data) => resolve(data))
            .catch((error) => {
                if (error.response) {
                    if (error.response.data) {
                        reject(error.response.data.detail)
                    } else {
                        reject('Something went wrong!')
                    }
                } else {
                    // reject(error.message)
                    reject('Something went wrong!')
                }
            });
    });
};

export const apiOptions = (apiURL = '/URL_HERE', params = {}) => {
    const url = URL + apiURL
    const headerConfig = { headers: getHeaders(), params }
    return new Promise(async (resolve, reject) => {
        await axios.options(url, headerConfig)
            .then((data) => resolve(data))
            .catch((error) => {
                reject(error.message)
            });
    });
};

export const apiGetFile = (apiURL = '/URL_HERE', params = {}) => {
    const url = URL + apiURL
    const headerConfig = {
        headers: getHeaders(),
        params,
        responseType: 'blob'
    }
    return new Promise(async (resolve, reject) => {
        await axios.get(url, headerConfig)
            .then((data) => resolve(data))
            .catch((error) => {
                if (error.response) {
                    if (error.response.data) {
                        reject(error.response.data.detail)
                    } else {
                        reject('Something went wrong!')
                    }
                } else {
                    // reject(error.message)
                    reject('Something went wrong!')
                }
            });
    });
};

export const apiPostFile = (apiURL = '/URL_HERE', data = {}, params = {}) => {
    const url = URL + apiURL
    const headerConfig = {
        headers: getHeaders(),
        params,
        responseType: 'blob'
    }

    return new Promise(async (resolve, reject) => {
        await axios.post(url, data, headerConfig)
            .then((data) => resolve(data))
            .catch((error) => {
                if (error.response) {
                    reject('No voucher available for print.')
                } else {
                    // reject(error.message)
                    reject('Something went wrong!')
                }
            });
    });
};