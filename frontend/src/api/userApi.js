import axiosClient from "./axiosClient";

export async function login(payload) {
    return await axiosClient.post('/login', payload).then((res) => {
        console.log(res);
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export async function register(payload) {
    return await axiosClient.post('/register', payload).then((res) => {
        console.log(res);
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export async function getUser() {
    return await axiosClient.get('/user').then((res) => {
        console.log(res);
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export async function updateUser(id, payload) {
    return await axiosClient.post(`/users/${id}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        console.log(res);
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    })
}