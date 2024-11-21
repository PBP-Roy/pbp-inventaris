import axiosClient from "./axiosClient";

export async function getLogs() {
    return await axiosClient.get('/log').then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
}

export async function deleteLogs(id) {
    return await axiosClient.delete(`/log/${id}`).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    });
}