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
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export async function getUser() {
    return await axiosClient.get('/user').then((res) => {
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
        if (res.data.data.image) {
            res.data.data.image = res.data.data.image.replace("http://localhost:8000/storage/", "");
        }
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    })
}

export async function logout() {
    return await axiosClient.post('/logout').then((res) => {
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}