import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "./InventoryPage.css";
import DataTable from "../components/DataTable";

export default function InventoryPage() {
	const { items, logs } = useStateContext();
	const { param } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({
        elements: [],
        changed: false
    });

    if (!data.changed) {
		switch (param) {
			case "all":
				setData({elements: items, changed: true});
				break;
			case "in":
				setData({elements: logs.filter((log) => log.statuses_id === 1), changed: true});
				break;
			case "out":
				setData({elements: logs.filter((log) => log.statuses_id === 2), changed: true});
				break;
			default:
				break;
		}
    }

	useEffect(() => {
        if (data.changed) {
            setIsLoading(false);
        }
    }, [data]);

	useEffect(() => {
		if (data.changed) {
			setData({...data, changed: false});
		}
	}, [param]);

	return (
		<>
			<div className="inventory-content">
				<div className="container">
					<div className="container-body">
						{isLoading ? (
							<h1>Loading...</h1>
						) : (
                            <DataTable type={param} data={data.elements} />
                        )}
					</div>
				</div>
			</div>
		</>
	);
}
