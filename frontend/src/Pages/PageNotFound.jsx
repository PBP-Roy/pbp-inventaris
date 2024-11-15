import { useState } from "react";
import "./PageNotFound.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

function PageNotFound() {
  return (
    <>
      <div className="background">
        <div className="error-container">
          <div className="error-form">
            <h1>404</h1>
            <p>Page Not Found</p>
            <a href="/" className="back-home">
              <div className="icon">
                {<KeyboardDoubleArrowLeftIcon />} Go Back Home
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
