import { useState } from "react";
import { Line } from "react-chartjs-2";
import DataVisual from "../components/DataVisual";
import "./Report.css";

export default function Report() {
  return (
    <>
      {/* button header product inventory */}
      <div className="header">
        <div className="headerCategori">
          <button className="categoriProducts">
            <span>Product-in</span>
          </button>
          <button className="categoriProducts">
            <span>Product-out</span>
          </button>
          <button className="categoriProducts">
            <span>Broken Product</span>
          </button>
        </div>
      </div>
      {/*End header */}

      {/* Start overview */}
      <div className="overview-container">
        <div className="overview-info">
          <div className="quantity-overview">100</div>
          <div className="title-overview">Total Products-in</div>
        </div>
        <div className="vertical-divider"></div>
        <div className="overview-info">
          <div className="quantity-overview">70</div>
          <div className="title-overview">Total Caragories-in</div>
        </div>
        <div className="vertical-divider"></div>
        <div className="overview-info">
          <div className="quantity-overview">80</div>
          <div className="title-overview">Total Viable Products</div>
        </div>
        <div className="vertical-divider"></div>
        <div className="overview-info">
          <div className="quantity-overview">110</div>
          <div className="title-overview">Total Non-viable Products</div>
        </div>
      </div>

      {/* Data Visualisasi */}
      <div className="data-visual-container">
        <h1>Data Visualization</h1>
        <div className="chart">
          <DataVisual />
        </div>
      </div>
    </>
  );
}
