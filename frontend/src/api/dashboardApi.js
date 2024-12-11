import axiosClient from "./axiosClient";

export async function getLowStockProducts() {
    return await axiosClient.get('/low').then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export async function getTopTenProducts() {
    return await axiosClient.get('/top').then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}