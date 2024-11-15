import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./InputBarangModal.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function InputBarangModal({ onCancel, onConfirm, data }) {
	const [payload, setPayload] = useState(data || {
		name_items: "",
		eligible_items: 0,
		defective_items: 0,
		magnitudes_id: -1,
		image: null,
		categories_id: -1,
	});

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		setPayload({
			...payload,
			image: URL.createObjectURL(file),
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,	
		accept: "image/*", // Accept only images
		maxFiles: 1,
	});

	const validateInput = () => {
		if(payload.name_items === "") {
			alert("Product name cannot be empty!");
			return false;
		}
		if(payload.eligible_items === 0 && payload.defective_items === 0) {
			alert("Product stock cannot be empty!");
			return false;
		}
		if(payload.magnitudes_id === -1) {
			alert("Product magnitude must be selected!");
			return false;
		}
		if(payload.categories_id === -1) {
			alert("Product category must be selected!");
			return false;
		}
		return true;
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if(validateInput()) {
			onConfirm(payload);
		}
	}

	return (
		<div className="container">
			<h3 style={{ marginTop: "15px" }}>{data ? 'Edit Product' : 'Add New Product'}</h3>
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
                        marginBottom: "15px"
					}}>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop the image here...</p>
					) : (
						<p style={{color: "grey"}}>
							Drag image here or <span className="link">Browse Image</span>
						</p>
					)}
					{payload.image && (
						<img
							src={payload.image}
							alt="Preview"
							style={{ maxWidth: "100%", maxHeight: "300px" }}
						/>
					)}
				</div>
				<div className="form-input">
					<label htmlFor="name_items">Product Name</label>
					<input
						placeholder="Enter product name"
						type="text"
						name="name_items"
						id="name_items"
						value={payload.name_items}
						onChange={(event) => setPayload({...payload, name_items: event.target.value})}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="eligible_items">Usable</label>
					<div className="number-input">
						<div onClick={() => setPayload({...payload, eligible_items: payload.eligible_items + 1})} className="btn">
						 	<AddIcon />
						</div>
						<input
							type="number"
							name="eligible_items"
							id="eligible_items"
							value={payload.eligible_items}
							onChange={(event) => setPayload({...payload, eligible_items: parseInt(event.target.value)})}
						/>
						<div onClick={() => payload.eligible_items > 0 && setPayload({...payload, eligible_items: payload.eligible_items - 1})} className="btn">
							<RemoveIcon />
						</div>
					</div>
				</div>
				<div className="form-input">
					<label htmlFor="defective_items">Unusable</label>
					<div className="number-input">
						<div onClick={() => setPayload({...payload, defective_items: payload.defective_items + 1})} className="btn">
							<AddIcon />
						</div>
						<input
							type="number"
							name="defective_items"
							id="defective_items"
							value={payload.defective_items}
							onChange={(event) => setPayload({...payload, defective_items: parseInt(event.target.value)})}
						/>
						<div onClick={() => payload.defective_items > 0 && setPayload({...payload, defective_items: payload.defective_items - 1})} className="btn">
							<RemoveIcon />
						</div>
					</div>
				</div>
				<div className="form-input">
					<label htmlFor="magnitudes_id">Magnitude</label>
					<select onChange={(event) => setPayload({...payload, magnitudes_id: event.target.value})} name="magnitudes_id" id="magnitudes_id">
						<option selected disabled>Enter Product Magnitude</option>
						{/* TODO: Foreign Key from another table, select option when editing */}
						<option value="kg">Kg</option>
						<option value="karung">Karung</option>
					</select>
				</div>
				<div className="form-input">
					<label htmlFor="categoty">Category</label>
					<select onChange={(event) => setPayload({...payload, categories_id: event.target.value})} name="category" id="category">
						<option selected disabled>
							Enter Product Category
						</option>
						{/* TODO: Foreign Key from another table, select option when editing */}
						<option value="makanan">Makanan</option>
						<option value="minuman">Minuman</option>
					</select>
				</div>

				<div className="form-buttons">
					<button onClick={(e) => {
						e.preventDefault();
						onCancel();
					}} className="btn-discard">Discard</button>
					<button type="submit" className="btn-confirm">Add Product</button>
				</div>
			</form>
		</div>
	);
}
