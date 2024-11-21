import axiosClient from "./axiosClient";

export async function getCategories() {
    return await axiosClient.get("/kategori").then((res) => {
        return res.data; //.data
    }).catch((err) => {
        return err;
    });
}

export async function postCategories(data) {
    return await axiosClient.post("/kategori", data).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
}

export async function putCategories(id, data) {
    return await axiosClient.put(`/kategori/${id}`, data).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
}

export async function getCategoriesById(id) {
    return await axiosClient.get(`/kategori/${id}`).then((res) => {
        return res.data; //.data
    }).catch((err) => {
        return err;
    });
}

export async function deleteCategories(id) {
    return await axiosClient.delete(`/kategori/${id}`).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
}