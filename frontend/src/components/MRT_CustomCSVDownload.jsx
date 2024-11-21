import Tooltip from "@mui/material/Tooltip";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const MRT_CustomCSVDownload = ({ onClick }) => {

	return (
		<Tooltip id="MRT_CustomCSVDownload" title="Download Data as CSV">
			<div
				onClick={onClick}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#ddd"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ffffff"}
				style={{
					display: "flex",
					border: "1px #808285 solid",
					borderRadius: "4px",
					padding: "6px 16px",
					alignItems: "center",
          cursor: "pointer",
          gap: "8px",
          color: "#808285",
          marginLeft: "8px",
				}}>
                <FileDownloadIcon />
				<p style={{ margin: "0", color: "#808285" }}>Download</p>
			</div>
		</Tooltip>
	);
};
