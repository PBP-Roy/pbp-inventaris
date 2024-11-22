import axiosClient from "./axiosClient";

export async function getMagnitudes() {
    return await axiosClient.get('/magnitude').then((res) => {
        return res.data; //.data
    }).catch((err) => {
        return err;
    });
}

export async function postMagnitudes(data) {
    return await axiosClient.post('/magnitude', data).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
}

export async function putMagnitudes(id, data) {
    return await axiosClient.put(`/magnitude/${id}`, data).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
}

export async function getMagnitudesById(id) {
    return await axiosClient.get(`/magnitude/${id}`).then((res) => {
        return res.data; //.data
    }).catch((err) => {
        return err;
    });
}

export async function deleteMagnitudes(id) {
    return await axiosClient.delete(`/magnitude/${id}`).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
}