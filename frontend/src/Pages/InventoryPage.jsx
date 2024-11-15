import { useState } from "react"
import { useParams } from "react-router-dom"
import './InventoryPage.css'
import DataTable from "../components/DataTable"
import { barang } from "../api/sampleData"

export default function InventoryPage() {
    const { param } = useParams();

    /* switch case
    param: all
        data: barang
    param: in
        data: log
        filter by status
    param: out
        data: log
        filter by status
    */

    return (
        <>
        <div className="inventory-content">
            <div className="container">
                <div className="container-body">
                    <DataTable type={param} data={barang} />
                </div>
            </div>
        </div>
        </>
    )
}