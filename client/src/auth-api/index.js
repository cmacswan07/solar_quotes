import api from 'api';

function getUser() {
    return api.get('/api/user').
    then((res) => {
        return res;
    });
}

function registerUser(inputs) {
    return api.post('/api/users', {
        username: inputs.username,
        password: inputs.password,
        email: inputs.email
    })
    .then((res, reject) => {
        if (res.data) {
            return res;
        } else {
            reject();
        }
    })
}

function login(inputs) {
    return api.post('/api/login', {
        username: inputs.username,
        password: inputs.password
    })
    .then((res, reject) => {
        if (!res.data) {
            reject();
        } else {
            return res;
        }
    });
}

function logout() {
    return api.get('/api/logout');
}

export {
    registerUser,
    getUser,
    login,
    logout
}