import axiosClient from './axiosClient';

export async function getItems() {
    return await axiosClient.get('/Item').then((res) => {
        return res.data; //.data
    }).catch((err) => {
        return err;
    });
}

export async function postItems(data) {
    return await axiosClient.post('/Item', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        console.log(res);
        return res.data;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export async function putItems(id, data) {
    return await axiosClient.post(`/Item/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }   
    }).then((res) => {
        console.log(res);
        return res.data;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export async function getItemsById(id) {
    return await axiosClient.get(`/Item/${id}`).then((res) => {
        console.log(res);
        return res.data; //.data
    }).catch((err) => {
        return err;
    });
}

export async function deleteItems(id) {
    await axiosClient.delete(`/Item/${id}`).then((res) => {
        console.log(res);
        return res.data;
    })
}