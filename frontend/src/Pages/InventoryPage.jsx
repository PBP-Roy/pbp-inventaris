import { useState } from "react"
import './InventoryPage.css'
import DataTable from "../components/DataTable"
import { barang } from "../api/sampleData"

export default function InventoryPage() {
    return (
        <>
        <div className="inventory-content">
            <div className="container">
                <div className="container-body">
                    <DataTable type={'all'} data={barang} />
                </div>
            </div>
        </div>
        </>
    )
}