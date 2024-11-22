import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "./InventoryPage.css";
import DataTable from "../components/DataTable";
import { getItems } from "../api/itemsApi";
import { getLogs } from "../api/logsApi";

export default function InventoryPage() {
	const { items, logs } = useStateContext();
	const { param } = useParams();

	return (
		<>
			<div className="inventory-content">
				<div className="container">
					<div className="container-body">
						<DataTable type={param} data={param === 'all' ? items : param === 'in' ? logs.filter((log) => log.statuses_id === 1) : logs.filter((log) => log.statuses_id === 2)} />
					</div>
				</div>
			</div>
		</>
	);
}
