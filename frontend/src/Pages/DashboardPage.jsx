import { useMemo } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import DataVisual from "../components/DataVisual";
import "./DashboardPage.css";

function DashboardPage() {
  const { magnitudes, categories, logs, items, lowStockProducts, topTenProducts } = useStateContext();
  const apiURL = "http://localhost:8000";
  const chartData = useMemo(() => {
  const labels = logs.map(log => new Date(log.created_at).toLocaleDateString());
  const eligibleProducts = logs.map(log => log.eligible_log_items);
  const defectiveProducts = logs.map(log => log.defectives_log_items);

    return {
      labels,
      datasets: [
        {
          label: "Eligible Products",
          data: eligibleProducts,
          borderColor: "#4F86F9",
          backgroundColor: "rgba(79, 134, 249, 0.2)",
          tension: 0.4,
          pointBackgroundColor: "#4F86F9",
          pointBorderColor: "#fff",
          pointHoverRadius: 8,
          pointRadius: 6,
        },
        {
          label: "Defective Products",
          data: defectiveProducts,
          borderColor: "#ff2525",
          backgroundColor: "rgba(229, 184, 160, 0.2)",
          tension: 0,
          pointBackgroundColor: "#ff2525",
          pointBorderColor: "#fff",
          pointHoverRadius: 8,
          pointRadius: 6,
        },
      ],
    };
  }, [logs]);

  return (
    <>
      <div className="dashboard-content">
        <div className="product-summary">
          <p id="title-subtable">Product Summary</p>
          <div className="summary-container">
            <div className="summary-item">
              <div className="icon-summary">
                <img
                  src="/src/assets/categories.jpg"
                  alt=""
                  id="icon-summary-item"
                />
              </div>
              <div className="quantity-summary">{categories.length}</div>
              <div className="title-summary"></div>
              Total Categories
            </div>
            <div className="vertical-divider"></div>
            <div className="summary-item">
              <div className="icon-summary">
                <img
                  src="/src/assets/total-product.jpg"
                  alt=""
                  id="icon-summary-item"
                />
              </div>
              <div className="quantity-summary">{items.length}</div>
              <div className="title-summary"></div>
              Total Products
            </div>
            <div className="vertical-divider"></div>
            <div className="summary-item">
              <div className="icon-summary">
                <img
                  src="/src/assets/product-in.jpg"
                  alt=""
                  id="icon-summary-item"
                />
              </div>
              <div className="quantity-summary">{logs.filter(l => l.statuses_id == 1).length}</div>
              <div className="title-summary"></div>
              Total Product-in
            </div>
            <div className="vertical-divider"></div>
            <div className="summary-item">
              <div className="icon-summary">
                <img
                  src="/src/assets/product-out.jpg"
                  alt=""
                  id="icon-summary-item"
                />
              </div>
              <div className="quantity-summary">{logs.filter(l => l.statuses_id == 2).length}</div>
              <div className="title-summary"></div>
              Total Product-out
            </div>
          </div>
        </div>
        <div className="low-stock">
          <p id="title-subtable">Low Quantity Stock</p>
          <div className="ls-product-container">
            {lowStockProducts.length > 0 ? lowStockProducts.map((product, index) => {
              return (
                <div key={index} className="ls-product">
                  <div className="ls-image">
                    <img src={product.image ? `${apiURL}/storage/${product.image}` : '/src/assets/defaultItemImage.png'} alt="" id="img-ls" />
                  </div>
                  <div className="ls-content">
                    <div className="ls-name">{product.name_items}</div>
                    <div className="ls-quantity">
                      Remaining Quantity : {product.eligible_items + product.defective_items} {magnitudes.find(magnitude => magnitude.id === product.magnitudes_id).name_magnitudes}
                    </div>
                  </div>
                </div>
              )
            }) : <div className="no-product">No product with low stock</div>}
          </div>
        </div>
        <div className="top-product">
          <p id="title-subtable">Top 10 Product</p>
          <div className="card-grid">
            {topTenProducts.length > 0 ? topTenProducts.map((log, index) => {
              const correspondingProduct = items.find(product => product.id === log.items_id);
              return (
                <div key={index} className="card-product">
                  <div className="card-image">
                    <img src={correspondingProduct.image ? `${apiURL}/storage/${correspondingProduct.image}` : `/src/assets/defaultItemImage.png`} alt="" />
                  </div>
                  <div className="card-content">
                    <div className="card-title">{correspondingProduct.name_items}</div>
                    <div className="card-category">{categories.find((c) => c.id == correspondingProduct.categories_id).name_categories}</div>
                  </div>
                  <div className="card-quantity">{log.total_items} {magnitudes.find(m => m.id == correspondingProduct.magnitudes_id).name_magnitudes}</div>
                </div>
              )
            }) : <p>No product available</p>}
          </div>
        </div>
        <div className="report-visualization">
          <p id="title-subtable">Report Visualization</p>
          <div className="chart">
            <DataVisual chartData={chartData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
