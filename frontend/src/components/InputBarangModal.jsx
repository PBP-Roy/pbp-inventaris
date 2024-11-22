import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./InputBarangModal.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CachedIcon from '@mui/icons-material/Cached';
import { useStateContext } from "../contexts/ContextProvider";
import { postItems } from "../api/itemsApi";
import { postMagnitudes } from "../api/magnitudesApi";

export default function InputBarangModal({ onCancel, onConfirm, data, table, edit }) {
	const { categories, magnitudes, user, setMagnitudes } = useStateContext();
	const [isAddNewMagnitude, setIsAddNewMagnitude] = useState(false);
	const [isMagnitudeAdded, setIsMagnitudeAdded] = useState(false);
	const [editQtyStatus, setEditQtyStatus] = useState({
		plus: false,
		minus: false
	});
	const [preview, setPreview] = useState(null);
	const [payload, setPayload] = useState(
		data ? {
			id: data.id,
			name_items: data.name_items,
			eligible_items: data.eligible_items,
			defective_items: data.defective_items,
			magnitudes: magnitudes.find((m) => m.id === data.magnitudes_id).name_magnitudes,
			categories: categories.find((c) => c.id === data.categories_id).name_categories,
			image: null,
			_method: 'PUT',
		} : {
			name_items: "",
			eligible_items: 0,
			defective_items: 0,
			magnitudes: "",
			categories: "",
			image: null,
		}
	);
	const [magnitudePayload, setMagnitudePayload] = useState({
		name_magnitudes: "",
		users_id: 1, // TODO: Change to user.id when register/login is done
	});

	

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreview(reader.result);
		};
		setPayload({
			...payload,
			image: file,
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [],
		}, // Accept only images
		maxFiles: 1,
	});

	const validateInput = () => {
		if (payload.name_items === "") {
			alert("Product name cannot be empty!");
			return false;
		}
		if (payload.eligible_items === 0 && payload.defective_items === 0) {
			alert("Product stock cannot be empty!");
			return false;
		}
		if (payload.magnitudes === "") {
			alert("Product magnitude must be selected!");
			return false;
		}
		if (payload.categories === "") {
			alert("Product category must be selected!");
			return false;
		}
		return true;
	};

	useEffect(() => {
		if (isMagnitudeAdded) {
			onConfirm(payload);
			edit ? table.setEditingRow(false) : table.setCreatingRow(false);
		}
	}, [isMagnitudeAdded]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validateInput()) {
			if (isAddNewMagnitude) {
				postMagnitudes(magnitudePayload).then((res) => {
					setMagnitudes([...magnitudes, res.data]);
					setPayload({...payload, magnitudes: res.data.name_magnitudes});
					setIsMagnitudeAdded(true);
				}).catch((err) => {
					alert(err.message);
					return;
				});
			} else {
				onConfirm(payload);
				edit ? table.setEditingRow(false) : table.setCreatingRow(false);
			}
		}
	};

	return (
		<div className="container">
			<h3 style={{ marginTop: "15px" }}>
				{data ? "Edit Product" : "Add New Product"}
			</h3>
			<form onSubmit={handleSubmit}>
				<div
					{...getRootProps()}
					style={{
						border: "2px dashed #ccc",
						padding: "20px",
						textAlign: "center",
						cursor: "pointer",
						borderRadius: "10px",
						maxWidth: "30%",
						margin: "auto",
						marginBottom: "5px",
					}}>
					<input {...getInputProps()} />
					{preview ? (
						<>
							<img
								src={preview}
								alt="Preview"
								style={{ maxWidth: "100%", maxHeight: "300px" }}
							/>
						</>
					) : isDragActive ? (
						<p>Drop the image here...</p>
					) : (
						<p style={{ color: "grey" }}>
							Drag image here or{" "}
							<span className="link">Browse Image</span>
						</p>
					)}
				</div>
				{preview && (
					<p className="removeImage" onClick={() => setPreview(null)}>
						Remove Image
					</p>
				)}
				<div className="form-input">
					<label htmlFor="name_items">Product Name</label>
					<input
						placeholder="Enter product name"
						type="text"
						name="name_items"
						id="name_items"
						value={payload.name_items}
						onChange={(event) =>
							setPayload({
								...payload,
								name_items: event.target.value,
							})
						}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="eligible_items">Usable</label>
					<div className="number-input">
					{!editQtyStatus.minus ? <div
							onClick={() => {
								if (edit) {
									setEditQtyStatus({...setEditQtyStatus, plus: true});
								}
								setPayload({
									...payload,
									eligible_items:
										payload.eligible_items + 1,
								});
							}}
							className="btn">
							<AddIcon />
						</div> : <div
							onClick={() => {
								setEditQtyStatus({plus: false, minus: false});
								setPayload({
									...payload,
									eligible_items:
										data.eligible_items,
									defective_items: data.defective_items,
								});
							}}
							className="btn">
							<CachedIcon />
						</div>}
						<input
							type="number"
							name="eligible_items"
							id="eligible_items"
							value={payload.eligible_items}
							onChange={(event) =>
								setPayload({
									...payload,
									eligible_items: parseInt(
										event.target.value
									),
								})
							}
						/>
						{!editQtyStatus.plus ? <div
							onClick={() => {
								if (edit) {
									setEditQtyStatus({...setEditQtyStatus, minus: true});
								}
								setPayload({
									...payload,
									eligible_items:
										payload.eligible_items - 1,
								});
							}}
							className="btn">
							<RemoveIcon />
						</div> : <div
							onClick={() => {
								setEditQtyStatus({plus: false, minus: false});
								setPayload({
									...payload,
									eligible_items:
										data.eligible_items,
									defective_items: data.defective_items,
								});
							}}
							className="btn">
							<CachedIcon />
						</div>}
					</div>
				</div>
				<div className="form-input">
					<label htmlFor="defective_items">Unusable</label>
					<div className="number-input">
						{!editQtyStatus.minus ? <div
							onClick={() => {
								if (edit) {
									setEditQtyStatus({...setEditQtyStatus, plus: true});
								}
								setPayload({
									...payload,
									defective_items:
										payload.defective_items + 1,
								});
							}}
							className="btn">
							<AddIcon />
						</div> : <div
							onClick={() => {
								setEditQtyStatus({plus: false, minus: false});
								setPayload({
									...payload,
									defective_items:
										data.defective_items,
									eligible_items: data.eligible_items,
								});
							}}
							className="btn">
							<CachedIcon />
						</div>}
						<input
							type="number"
							name="defective_items"
							id="defective_items"
							value={payload.defective_items}
							onChange={(event) =>
								setPayload({
									...payload,
									defective_items: parseInt(
										event.target.value
									),
								})
							}
						/>
						{!editQtyStatus.plus ? <div
							onClick={() => {
								if (edit) {
									setEditQtyStatus({...setEditQtyStatus, minus: true});
								}
								setPayload({
									...payload,
									defective_items:
										payload.defective_items - 1,
								});
							}}
							className="btn">
							<RemoveIcon />
						</div> : <div
							onClick={() => {
								setEditQtyStatus({plus: false, minus: false});
								setPayload({
									...payload,
									defective_items:
										data.defective_items,
									eligible_items: data.eligible_items,
								});
							}}
							className="btn">
							<CachedIcon />
						</div>}
					</div>
				</div>
				<div className="form-input">
					<label htmlFor="magnitudes">Magnitude</label>
					<select
						onChange={(event) => {
							if (event.target.value === "addnew") {
								setIsAddNewMagnitude(true);
								setPayload({
									...payload,
									magnitudes: "",
								});
							} else {
								setIsAddNewMagnitude(false);
								setPayload({
									...payload,
									magnitudes: event.target.value,
								});
							}
						}}
						defaultValue={payload.magnitudes}
						name="magnitudes"
						id="magnitudes">
						<option value="" disabled>
							Enter Product Magnitude
						</option>
						{/* TODO: Select option when editing */}
						{magnitudes.map((magnitude) => {
							return (
								<option
									key={magnitude.id}
									value={magnitude.name_magnitudes}>
									{magnitude.name_magnitudes}
								</option>
							);
						})}
						<option value="addnew">Add...</option>
					</select>
				</div>
				{isAddNewMagnitude && (
					<div className="form-input">
						<label htmlFor="add_name_magnitudes">Magnitude Name</label>
						<input
							placeholder="Enter magnitude name"
							type="text"
							name="add_name_magnitudes"
							id="add_name_magnitudes"
							value={magnitudePayload.name_magnitudes}
							onChange={(event) =>
								setMagnitudePayload({
									...magnitudePayload,
									name_magnitudes: event.target.value,
								})
							}
						/>
					</div>
				)}
				<div className="form-input">
					<label htmlFor="categoty">Category</label>
					<select
						onChange={(event) =>
							setPayload({
								...payload,
								categories: event.target.value,
							})
						}
						defaultValue={payload.categories}
						name="category"
						id="category">
						<option value="" disabled>
							Enter Product Category
						</option>
						{/* TODO: Select option when editing */}
						{categories.map((category) => {
							return (
								<option
									key={category.id}
									value={category.name_categories}>
									{category.name_categories}
								</option>
							);
						})}
					</select>
				</div>

				<div className="form-buttons">
					<button
						onClick={(e) => {
							e.preventDefault();
							onCancel();
						}}
						className="btn-discard">
						Discard
					</button>
					<button type="submit" className="btn-confirm">
						{edit ? "Edit Product" : "Add Product"}
					</button>
				</div>
			</form>
		</div>
	);
}
