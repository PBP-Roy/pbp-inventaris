import axiosClient from "./axiosClient";

export async function getStatuses() {
    return await axiosClient.get("/status").then((res) => {
        return res.data; //.data
    }).catch((err) => {
        return err;
    });
}