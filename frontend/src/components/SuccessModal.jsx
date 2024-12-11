import { Modal, Box } from "@mui/material";
import "./SuccessModal.css";

export default function SuccessModal({ onClose, message }) {
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        //   width: "90%",
          maxWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          textAlign: "center",
        }}
      >
        <div id="success_tic">
          <div className="modal-content">
            <button
              className="close"
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <div className="page-body">
              <div className="head">
                <h3>Success</h3>
                <h4>{message || "Operation completed successfully!"}</h4>
              </div>
              <div className="checkmark-circle">
                <div className="background"></div>
                <div className="checkmark draw"></div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}