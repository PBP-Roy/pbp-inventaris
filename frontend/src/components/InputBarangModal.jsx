import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./InputBarangModal.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function InputBarangModal({ onCancel, onConfirm, data }) {
	const [image, setImage] = useState(null);
	const [payload, setPayload] = useState(data || {});

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		setImage(URL.createObjectURL(file));
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,	
		accept: "image/*", // Accept only images
		maxFiles: 1,
	});

	return (
		<div className="container">
			<h3 style={{ marginTop: "15px" }}>{data ? 'Edit Product' : 'Add New Product'}</h3>
			<form action="">
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
					{image && (
						<img
							src={image}
							alt="Preview"
							style={{ maxWidth: "100%", maxHeight: "300px" }}
						/>
					)}
				</div>
				<div className="form-input">
					<label htmlFor="name">Product Name</label>
					<input
						placeholder="Enter product name"
						type="text"
						name="name"
						id="name"
					/>
				</div>
				<div className="form-input">
					<label htmlFor="quantity">Quantity</label>
					<div className="number-input">
						<div className="btn">
							<AddIcon />
						</div>
						<input
							type="number"
							name="quantity"
							id="quantity"
						/>
						<div className="btn">
							<RemoveIcon />
						</div>
					</div>
				</div>
				<div className="form-input">
					<label htmlFor="usable">Usable</label>
					<div className="number-input">
						<div className="btn">
						 	<AddIcon />
						</div>
						<input
							type="number"
							name="usable"
							id="usable"
						/>
						<div className="btn">
							<RemoveIcon />
						</div>
					</div>
				</div>
				<div className="form-input">
					<label htmlFor="unusable">Unusable</label>
					<div className="number-input">
						<div className="btn">
							<AddIcon />
						</div>
						<input
							type="number"
							name="unusable"
							id="unusable"
						/>
						<div className="btn">
							<RemoveIcon />
						</div>
					</div>
				</div>
				<div className="form-input">
					<label htmlFor="magnitude">Magnitude</label>
					<input
						placeholder="Enter product magnitude"
						type="text"
						name="magnitude"
						id="magnitude"
					/>
				</div>
				<div className="form-input">
					<label htmlFor="categoty">Category</label>
					<select name="category" id="category">
						<option value="none" disabled>
							Enter Product Category
						</option>
						<option value="makanan">Makanan</option>
						<option value="minuman">Minuman</option>
					</select>
				</div>

				<div className="form-buttons">
					<button onClick={(e) => {
						e.preventDefault();
						onCancel();
					}} className="btn-discard">Discard</button>
					<button onClick={(e) => {
						e.preventDefault();
						onConfirm();
					}} className="btn-confirm">Add Product</button>
				</div>
			</form>
		</div>
	);
}
