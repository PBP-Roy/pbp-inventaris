import { useMemo, useState } from "react";
import {
	MaterialReactTable,
	MRT_GlobalFilterTextField,
	useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputBarangModal from "./InputBarangModal";
import { MRT_CustomToggleFiltersButton } from "./MRT_CustomToggleFiltersButton";
import { MRT_CustomCSVDownload } from "./MRT_CustomCSVDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { postItems, putItems, deleteItems } from "../api/itemsApi";
import { useStateContext } from "../contexts/ContextProvider";
import SuccessModal from "./SuccessModal";

const DataTable = ({ data, setData, type }) => {
	const { items, magnitudes, categories } = useStateContext();
	const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState("");
	const [rowData, setRowData] = useState(null);

	let tableHeader;
	let columns = [
		{
			accessorKey: "id",
			header: "Id",
			size: 80,
		},
		{
			accessorKey: "name_items",
			header: "Product Name",
		},
		{
			accessorKey: "stock",
			header: "Quantity",
		},
		{
			accessorKey: "eligible_items",
			header: "Usable",
		},
		{
			accessorKey: "defective_items",
			header: "Unusable",
		},
		{
			accessorKey: "magnitudes_id",
			header: "Magnitude",
			Cell: ({ cell }) => {
				const magnitude = magnitudes.find(
					(magnitude) => magnitude.id === cell.getValue()
				);
				return magnitude ? magnitude.name_magnitudes : "";
			},
		},
		{
			accessorKey: "categories_id",
			header: "Category",
			Cell: ({ cell }) => {
				const category = categories.find(
					(category) => category.id === cell.getValue()
				);
				return category ? category.name_categories : "";
			},
		},
		{
			accessorKey: "updated_at",
			header: "Last Update",
			Cell: ({ cell }) => {
				return (
					cell.getValue().split("T")[0] +
					" " +
					cell.getValue().split("T")[1].split(".")[0]
				);
			},
		},
	];

	switch (type) {
		case "all":
			tableHeader = "All Products";
			break;
		case "in":
			tableHeader = "Products In";
			columns = [
				{
					accessorKey: "id",
					header: "Id",
				},
				{
					accessorKey: "items_id",
					header: "Product Name",
					Cell: ({ cell }) => {
						const item = items.find(
							(item) => item.id === cell.getValue()
						);
						return item ? item.name_items : "";
					},
				},
				{
					header: "Quantity",
					Cell: ({ row }) => {
						return (
							row.original.eligible_log_items +
							row.original.defectives_log_items
						);
					},
				},
				{
					accessorKey: "eligible_log_items",
					header: "Usable",
				},
				{
					accessorKey: "defectives_log_items",
					header: "Unusable",
				},
				{
					accessorKey: "created_at",
					header: "Date In",
					Cell: ({ cell }) => {
						return (
							cell.getValue().split("T")[0] +
							" " +
							cell.getValue().split("T")[1].split(".")[0]
						);
					},
				},
			];
			break;
		case "out":
			tableHeader = "Products Out";
			columns = [
				{
					accessorKey: "id",
					header: "Id",
				},
				{
					accessorKey: "items_id",
					header: "Product Name",
					Cell: ({ cell }) => {
						const item = items.find(
							(item) => item.id === cell.getValue()
						);
						return item ? item.name_items : "";
					},
				},
				{
					header: "Quantity",
					Cell: ({ row }) => {
						return (
							row.original.eligible_log_items +
							row.original.defectives_log_items
						);
					},
				},
				{
					accessorKey: "eligible_log_items",
					header: "Usable",
				},
				{
					accessorKey: "defectives_log_items",
					header: "Unusable",
				},
				{
					accessorKey: "created_at",
					header: "Date Out",
					Cell: ({ cell }) => {
						return (
							cell.getValue().split("T")[0] +
							" " +
							cell.getValue().split("T")[1].split(".")[0]
						);
					},
				},
			];
			break;
		default:
			break;
	}

	const csvConfig = mkConfig({
		fieldSeparator: ",",
		decimalSeparator: ".",
		useKeysAsHeaders: true,
	});

	const handleExportData = () => {
		const csv = generateCsv(csvConfig)(data);
		download(csvConfig)(csv);
	};

	const handleAddData = async (payload) => {
		await postItems(payload).then((res) => {
			const newData = {
				...res.data,
				eligible_items: parseInt(res.data.eligible_items),
				defective_items: parseInt(res.data.defective_items),
			};
			setData([...data, newData]);
      setSuccessModalMessage("Product added successfully!");
      setSuccessModalOpen(true);
		}).catch(() => {
      alert("Failed to add product!");
    });
	};

	const handleEditData = async (payload) => {
		await putItems(payload.id, payload).then((res) => {
			const newData = {
				...res.data,
				eligible_items: parseInt(res.data.eligible_items),
				defective_items: parseInt(res.data.defective_items),
				stock:
					parseInt(res.data.eligible_items) +
					parseInt(res.data.defective_items),
			};
			setData(
				data.map((item) => (item.id === res.data.id ? newData : item))
			);
      setSuccessModalMessage("Product updated successfully!");
      setSuccessModalOpen(true);
		}).catch(() => {
      alert("Failed to update product!");
    });
	};

  const handleDeleteData = async (payload) => {
    await deleteItems(payload.id).then(() => {
      setData(data.filter((item) => item.id !== payload.id));
      setSuccessModalMessage("Product removed successfully!");
      setSuccessModalOpen(true);
    }).catch(() => {
      alert("Failed to remove product!");
    });
  }

	const handleOpenEditModal = (row) => {
		setRowData(row);
		setEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setEditModalOpen(false);
		setRowData(null);
	};

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  }

	const table = useMaterialReactTable({
		columns,
		data: data,
		createDisplayMode: "modal",
		editDisplayMode: "modal",
		enableCellActions: true,
		enableClickToCopy: "context-menu",
		enableColumnPinning: true,
		enableEditing: false,
		enableRowActions: true,
		getRowId: (row) => row.id,
		muiTableContainerProps: { sx: { minHeight: "500px" } },
		muiSearchTextFieldProps: {
			type: "string",
		},
		muiFilterTextFieldProps: {
			type: "string",
		},
		initialState: {
			columnPinning: {
				right: ["mrt-row-actions"],
			},
      sorting: [
        {
          id: "id",
          desc: false,
        }
      ],
			showGlobalFilter: true,
		},
		muiTablePaperProps: {
			elevation: 0,
		},
		renderCreateRowDialogContent: ({ table, row }) => (
			<>
				<InputBarangModal
					onCancel={() => {
						table.setCreatingRow(false);
					}}
					onConfirm={handleAddData}
					table={table}
					edit={false}
				/>
			</>
		),
		renderEditRowDialogContent: ({ row, table }) => (
			<>
				<InputBarangModal
					data={row.original}
					onCancel={() => {
						table.setEditingRow(false);
					}}
					onConfirm={handleEditData}
					table={table}
					edit={true}
				/>
			</>
		),
		renderRowActions: ({ row }) => (
			<Box sx={{ display: "flex" }}>
				{type == "all" && (
					<Tooltip title="Edit">
						<IconButton
							onClick={() => handleOpenEditModal(row.original)}>
							<EditIcon />
						</IconButton>
					</Tooltip>
				)}
				<Tooltip title="Delete">
					<IconButton
						color="error"
						onClick={() => handleDeleteData(row.original)}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</Box>
		),
		renderTopToolbar: ({ table }) => (
			<>
        {isSuccessModalOpen && (
          <SuccessModal onClose={handleCloseSuccessModal} message={successModalMessage} />
        )}
				{isEditModalOpen && (
					<InputBarangModal
						data={rowData}
						onCancel={handleCloseEditModal}
						onConfirm={(updatedData) => {
							handleEditData(updatedData);
							handleCloseEditModal();
						}}
						edit={true}
					/>
				)}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						padding: "0.5rem",
					}}>
					<Typography variant="h4">
						<span
							style={{
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								overflow: "hidden",
							}}>
							{tableHeader}
						</span>
					</Typography>
					<MRT_GlobalFilterTextField table={table} />
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							gap: "8px",
						}}>
						{type == "all" && (
							<Button
								variant="contained"
								onClick={() => table.setCreatingRow(true)}>
								Add Product
							</Button>
						)}
						<MRT_CustomToggleFiltersButton table={table} />
						<MRT_CustomCSVDownload onClick={handleExportData} />
					</div>
				</div>
			</>
		),
	});

	return <MaterialReactTable table={table} />;
};

export default DataTable;
