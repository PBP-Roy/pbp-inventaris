import axiosClient from "./axiosClient";

export async function getSummary() {
    return await axiosClient.get('/summary').then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export async function getLowStockProducts() {
    return await axiosClient.get('/low').then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}